<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Log;
use Exception;
use DB;
use Auth;
// use Setting;

use App\Student;
use App\StudentCheckoutHistory;
use App\PlayerBookingHistory;
use App\StudentPayment;
use App\Classes;
use App\Settings;

require_once 'MerchantPayment.php';

class MerchantPaymentController extends Controller{

    function getInstance(){
        $api_key = Settings::where('key','merchant_api_key')->select('value')->first()->value;
        $uuid = Settings::where('key','merchant_uuid')->select('value')->first()->value;
        $api_passphrase = Settings::where('key','merchant_api_passphrase')->select('value')->first()->value;

        return new MerchantPayment($api_key, $uuid, $api_passphrase);
    }

    public function getStudentPaymentDetail(Request $request) {
        $this->validate($request, [
            'student_id' => 'required'
        ]);

        $id = $request->student_id;

        $student = Student::find($id);

        if(isset($student->payment))
            $student->payment->option;

        return response()->json($student);
    }

    public function createStudentPaymentDetail(Request $request) {
        $this->validate($request, [
            'student_id' => 'required',
            'plan' => 'required',
            'method' => 'required'
        ]);

        $student_id = $request->student_id;
        $plan = $request->plan;
        $method = $request->method;

        $card_no = $request->card_no;
        $card_expiry = $request->card_expiry;
        $card_cvc = $request->card_cvc;
        $customer_name = $request->customer_name;

        $account_name = $request->account_name;
        $account_no = $request->account_no;
        $bsb = $request->bsb;
        
        $studentpayment = StudentPayment::where('student_id', $student_id)->first();
        $student = Student::find($student_id);
        try{
            switch($method) {
                case 1:
                    $result = $this->getInstance()->addCard($card_no, $card_expiry, $card_cvc, $customer_name);
                
                    if($result['status']) {
                        $cardId = $result['responseData']['cardID'];
                        if(isset($studentpayment)){
                            $studentpayment->card_id = $cardId;
                            $studentpayment->customer_name = $customer_name;
                            $studentpayment->method = $method;
                            $studentpayment->plan = $plan;
                            $studentpayment->save();

                            $studentpayment->option;

                            return response()->json(['message' => "Updated card successfully", 'payment' => $studentpayment]);
                        }
                        else {
                            $studentpayment = StudentPayment::create([
                                'card_id' => $cardId,
                                'customer_name' => $customer_name,
                                'student_id' => $student_id,
                                'plan' => $plan,
                                'method' => $method
                            ]);
                            $studentpayment->option;
                            return response()->json(['message' => "Added card successfully", 'payment' => $studentpayment]);
                        }
                    }
                    else{
                        return response()->json(['error' => $result['responseData']['responseMessage']], 500);
                    }
                break;
                case 2:
                        if(isset($studentpayment)){
                            $studentpayment->account_name = $account_name;
                            $studentpayment->account_no = $account_no;
                            $studentpayment->bsb = $bsb;
                            $studentpayment->method = $method;
                            $studentpayment->plan = $plan;
                            $studentpayment->save();

                            $studentpayment->option;

                            return response()->json(['message' => 'Updated info of the bank successfully', 'payment' => $studentpayment]);
                        }
                        else {
                            $studentpayment = StudentPayment::create([
                                'student_id' => $student_id,
                                'account_name' => $account_name,
                                'account_no' => $account_no,
                                'bsb' => $bsb,
                                'plan' => $plan,
                                'method' => $method
                            ]);

                            $studentpayment->option;

                            return response()->json(['message' => 'Added info of the bank successfully', 'payment' => $studentpayment]);
                        }
        
                    break;
                case 3:
                    if(isset($studentpayment)){
                        $studentpayment->method = $method;
                        $studentpayment->plan = $plan;
                        $studentpayment->save();

                        $studentpayment->option;
                        return response()->json(['message' => 'Updated Cash method successfully', 'payment' => $studentpayment]);
                    }
                    else {
                        $studentpayment = StudentPayment::create([
                            'student_id' => $student_id,
                            'plan' => $plan,
                            'method' => $method
                        ]);

                        $studentpayment->option;
                        
                        return response()->json(['message' => 'Added Cash method successfully', 'payment' => $studentpayment]);
                    }

                    break;
            }

        }catch(Exception $e) {
            Log::info("payemnt: " . $e->getMessage());
            return response()->json(['error' => 'Something wrong'], 500);
        }
 
    }

    public function addCard($card_no, $card_expiry, $card_cvc, $customer_name) {
        $result = $this->getInstance()->addCard($card_no, $card_expiry, $card_cvc, $customer_name);
                
        return $result;
    }

    public function checkout(Request $request) {
        $this->validate($request, [
            'student_id' => 'required',
            'price' => 'required'
        ]);

        try{

            $amount = $request->price;
            $id = $request->student_id;
    
            $student = Student::find($id);
            $method = $student->payment->method;
    
            switch($method) {
                case 1:
                    $result = $this->getInstance()->processAuth(number_format($amount, 2, '.', ''), $student->payment, $student);
                    if($result['status']){
                        $this->getInstance()->processCard(number_format($amount, 2, '.', ''), $student->payment, $student);
                    }
                    else{
                        StudentCheckoutHistory::create([
                            'student_id' => $id,
                            'amount' => $amount,
                            'payment_method' => $method,
                            'status' => 'Error'
                        ]);
                        return response()->json(['error' => $result['responseData']['responseMessage']], 500);
                    }
                    break;
                case 2:
                    $result = $this->getInstance()->processBank($amount, $student->payment, $student);
                    if(!$result['status']){
                        StudentCheckoutHistory::create([
                            'student_id' => $id,
                            'amount' => $amount,
                            'payment_method' => $method,
                            'status' => 'Error'
                        ]);
                        return response()->json(['error' => $result['responseData']['responseMessage']], 500);
                    }
                    break;
            }

            StudentCheckoutHistory::create([
                'student_id' => $id,
                'amount' => $amount,
                'payment_method' => $method,
                'status' => 'Paid'
            ]);
    
            return response()->json(['message' => "Checkout successfully"]);
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function checkoutClass(Request $request) {
        $this->validate($request, [
            'class_id' => 'required',
        ]);

        $class = Classes::find($request->class_id);

        $user = Auth::user();

        $price = $class->price;
        $fee = $class->fee;
        $member_fee = $class->member_fee;
        if(isset($user->membership))
            $amount = $price + $member_fee;
        else
            $amount = $price + $fee;
        $method = 0;
        try{
            if(isset($user->payment->card_id)) {
                $result = $this->getInstance()->processAuth(number_format($amount, 2, '.', ''), $user->payment, $user->userprofile);
                if($result['status']){
                    $result = $this->getInstance()->processCard(number_format($amount, 2, '.', ''), $user->payment, $user->userprofile);
                    if(!$result['status'])
                        return response()->json(['error' => $result['responseData']['responseMessage']], 500);
                }
                else{
                    
                    return response()->json(['error' => $result['responseData']['responseMessage']], 500);
                }
            }else if(isset($user->payment->account_no)){
                $result = $this->getInstance()->processBank($amount, $user->payment, $user->userprofile);
                if(!$result['status']){
                    
                    return response()->json(['error' => $result['responseData']['responseMessage']], 500);
                }
            } else {
                return response()->json(['error' => 'Please add your payment.'], 500);
            }
                    
            PlayerBookingHistory::create([
                'user_id' => $user->id,
                'class_id' => $class->id,
                'amount' => $amount,
                'transaction_id' => $result['transactionID'],
                'status' => 'Paid'
            ]);
    
            DB::table('classes_user')->insert(['user_id' => $user->id, 'classes_id' => $class->id]);
    
            return response()->json(['message' => 'Booked successfully']);
        }catch(Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }

    public function directPayCard($customer, $card, $amount) {
        try{
            $temp = json_encode($card);
            $temp = json_decode($temp);
            // Log::info('card expiry: '.implode("",preg_split("[0-9]+", $temp->expiry)));
            Log::info('card expiry: '.preg_replace(array("/\s+/", "/\//"), "", $temp->expiry));
            $result = $this->getInstance()->directPayCard($customer, json_encode($card), $amount);
    
            return $result;
        }catch(Exception $e){
            return $e->getMessage();
        }
    }
}