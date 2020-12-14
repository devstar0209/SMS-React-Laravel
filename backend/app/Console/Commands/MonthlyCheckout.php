<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Log;
use DB;

use App\Http\Controllers\MerchantPaymentController;

use Carbon\Carbon;

use App\Student;
use App\StudentCheckoutHistory;
use App\StudentPayment;

class MonthlyCheckout extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'monthly:checkout';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Checkout student monthly';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $studentpayments = StudentPayment::where('plan', 3)->where('method', '<>', 3)->get();

        foreach($studentpayments as $studentpayment) {
            switch($studentpayment->method) {
                case 1:
                    $result = (new MerchantPaymentController)->processAuth(number_format($studentpayment->option->price, 2, '.', ''), $studentpayment, $studentpayment->student);
                    if($result['status']){
                        (new MerchantPaymentController)->processCard(number_format($studentpayment->option->price, 2, '.', ''), $studentpayment, $studentpayment->student);
                        StudentCheckoutHistory::create([
                            'student_id' => $studentpayment->student_id,
                            'amount' => $studentpayment->option->price,
                            'payment_method' => $studentpayment->method,
                            'status' => 'Paid'
                        ]);
                    }
                    else{
                        StudentCheckoutHistory::create([
                            'student_id' => $studentpayment->student_id,
                            'amount' => $studentpayment->option->price,
                            'payment_method' => $studentpayment->method,
                            'status' => 'Error'
                        ]);
                    }
                break;
                case 2:
                    $result = (new MerchantPaymentController)->processBank($studentpayment->option->price, $studentpayment, $studentpayment->student);
                    if(!$result['status']){
                        StudentCheckoutHistory::create([
                            'student_id' => $studentpayment->student_id,
                            'amount' => $studentpayment->option->price,
                            'payment_method' => $studentpayment->method,
                            'status' => 'Error'
                        ]);
                    }
                    else{
                        StudentCheckoutHistory::create([
                            'student_id' => $studentpayment->student_id,
                            'amount' => $studentpayment->option->price,
                            'payment_method' => $studentpayment->method,
                            'status' => 'Error'
                        ]);
                    }
                break;
            }
            
        }
    }
}
