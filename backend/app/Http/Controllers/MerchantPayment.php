<?php

namespace App\Http\Controllers;

use Log;
use Exception;

class MerchantPayment{

    protected $api_key;
    protected $uuid;
    protected $api_passphrase;

    function __construct($api_key, $uuid, $passphrase){
        $this->api_key = $api_key;
        $this->uuid = $uuid;
        $this->api_passphrase = $passphrase;
    }

    public function addCard($card_no, $card_expiry, $card_cvc, $customer_name) {
        define('MW_API_ENDPOINT', 'https://base.merchantwarrior.com/token/');
        // Setup POST data
        $postData = array (
            'method' => 'addCard',
            'merchantUUID' => $this->uuid,
            'apiKey' => $this->api_key,
            'cardName' => $customer_name,
            'cardNumber' => preg_replace("/\s+/", "", $card_no),
            'cardExpiryMonth' => substr($card_expiry, 0, 2),
            'cardExpiryYear' => substr($card_expiry, 3, 2)
        );
        
        $result = $this->curl_payment($postData);

        Log::info('add card: '. json_encode($result));

        return $result;
    }

    public function getCard($cardId) {
        $postData = array (
            'method' => 'cardInfo',
            'merchantUUID' => $this->uuid,
            'apiKey' => $this->api_key,
            'cardID' => $cardId
          );

        $result = $this->curl_payment($postData);

        return $result;
    }

    public function removeCard($cardId) {
        $postData = array (
            'method' => 'removeCard',
            'merchantUUID' => $this->uuid,
            'apiKey' => $this->api_key,
            'cardID' => $cardId
          );

        $result = $this->curl_payment($postData);

        return $result['status'];
    }

    public function changeCardExpiry($cardId, $card_expiry) {
        $postData = array (
            'method' => 'changeExpiry',
            'merchantUUID' => $this->uuid,
            'apiKey' => $this->api_key,
            'cardID' => $cardId,
            'cardExpiryMonth' => substr($card_expiry, 0, 2),
            'cardExpiryYear' => substr($card_expiry, 3, 2)
          );

        $result = $this->curl_payment($postData);

        return $result['status'];
    }

    public function processCard($amount, $studentPayment, $student) {
        $postData = array (
            'method' => 'processCard',
            'merchantUUID' => $this->uuid,
            'apiKey' => $this->api_key,
            'transactionAmount' => $amount,
            'transactionCurrency' => 'AUD',
            'transactionProduct' => 'Test Product',
            'customerName' => $student->first_name.$student->last_name,
            'customerCountry' => $student->country,
            'customerState' => $student->state,
            'customerCity' => $student->city,
            'customerAddress' => $student->address,
            'customerPostCode' => $student->postalcode,
            // 'customerPhone' => $student->phone,
            // 'customerEmail' => $student->email,
            // 'customerIP' => '1.1.1.1',
            'hash' => $this->generateHash($amount),
            'cardID' => $studentPayment->card_id,
            
          );

        $result = $this->curl_payment($postData);

        $show = json_encode($result);
        Log::info("processCard: ".$show);

        return $result;
    }

    
    public function processAuth($amount, $studentPayment, $student) {
        define('MW_API_ENDPOINT', 'https://base.merchantwarrior.com/token/');
        $hash = $this->generateHash($amount);
        Log::info("apikey: ".$this->api_key);
        
        $postData = array (
            'method' => 'processAuth',
            'merchantUUID' => $this->uuid,
            'apiKey' => $this->api_key,
            'transactionAmount' => $amount,
            'transactionCurrency' => 'AUD',
            'transactionProduct' => 'Test Product',
            'customerName' => $student->first_name.$student->last_name,
            'customerCountry' => $student->country,
            'customerState' => $student->state,
            'customerCity' => $student->city,
            'customerAddress' => $student->address,
            'customerPostCode' => $student->postalcode,
            // 'customerPhone' => $student->phone,
            // 'customerEmail' => $student->email,
            // 'customerIP' => '1.1.1.1',
            'hash' => $hash,
            'cardID' => $studentPayment->card_id,
          );
          
        $result = $this->curl_payment($postData);

        $show = json_encode($result);
        Log::info("processAuth: ".$show);

        return $result;
    }

    public function processBank($amount, $studentPayment, $student) {
        define('MW_API_ENDPOINT', 'https://base.merchantwarrior.com/post/');
        $postData = array (
            'method' => 'processDDebit',
            'merchantUUID' => $this->uuid,
            'apiKey' => $this->api_key,
            'transactionAmount' => $amount,
            'transactionCurrency' => 'AUD',
            'transactionProduct' => 'A1234',
            // 'customerName' => 'Test Customer',
            'customerCountry' => $student->country,
            'customerState' => $student->state,
            'customerCity' => $student->city,
            'customerAddress' => $student->address,
            'customerPostCode' => $student->postcode,
             // 'customerPhone' => $student->phone,
            // 'customerEmail' => $student->email,
            // 'customerIP' => '1.1.1.1',
            'paymentAccountBSB' => $studentPayment->bsb,
            'paymentAccountNumber' => $studentPayment->account_no,
            'paymentAccountName' => $studentPayment->account_name,
            'hash' => $this->generateHash($amount)
          );
          
        $result = $this->curl_payment($postData);

        $show = json_encode($result);
        Log::info("processBank: ".$show);

        return $result;
    }

    public function directPayCard($customer, $card, $amount) {
        define('MW_API_ENDPOINT', 'https://base.merchantwarrior.com/post/');
        $card = json_decode($card);
        $postData = array (
            'method' => 'processCard',
            'merchantUUID' => $this->uuid,
            'apiKey' => $this->api_key,
            'transactionAmount' => number_format($amount,2, ".", ""),
            'transactionCurrency' => 'AUD',
            'transactionProduct' => 'A1234',
            'customerName' => $customer->first_name.' '.$customer->last_name,
            'customerCountry' => $customer->country,
            'customerState' => $customer->state,
            'customerCity' => $customer->city,
            'customerAddress' => $customer->address,
            'customerPostCode' => $customer->postalcode,
            'paymentCardNumber' => preg_replace("/\s+/", "", $card->card_number),
            'paymentCardExpiry' => preg_replace(array("/\s+/", "/\//"), "", $card->expiry),
            'paymentCardName' => $customer->first_name.' '.$customer->last_name,
            'paymentCardCSC' => $card->cvc,
            'hash' => $this->generateHash(number_format($amount,2, ".", ""))
          );
          
        $result = $this->curl_payment($postData);

        $show = json_encode($result);
        Log::info("processDirectPayCard: ".$show);

        return $result;
    }

    public function generateHash($amount) {
        $hashCode = md5($this->api_passphrase) . $this->uuid . $amount . 'AUD';
        return md5(strtolower($hashCode));
    }

    public function curl_payment($postData) {
        $curl = curl_init();
          
        // Setup CURL params for this request
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_URL, MW_API_ENDPOINT);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($postData, '', '&'));
        
        // Run CURL
        $response = curl_exec($curl);
        $error = curl_error($curl);
        
        // Check for CURL errors
        // if (isset($error) && strlen($error)) {
        //   throw new Exception("CURL Error: {$error}");
        // }
        
        // Parse the XML
        $xml = simplexml_load_string($response);
        
        // Convert the result from a SimpleXMLObject into an array
        $xml = (array)$xml;
        
        // Validate the response - the only successful code is 0
        $status = ((int)$xml['responseCode'] === 0) ? true : false;
        
        // Make the response a little more useable
        $result = array (
          'status' => $status, 
          'transactionID' => (isset($xml['transactionID']) ? $xml['transactionID'] : null),
          'responseData' => $xml
        );

        return $result;
    }
}