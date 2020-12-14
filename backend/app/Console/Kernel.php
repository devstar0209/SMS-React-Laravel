<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use App\StudentPayment;
use App\Student;
use App\Http\Controllers\MerchantPaymentController;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        \App\Console\Commands\CustomCommand::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('weekly:checkout')
                 ->weeklyOn(4, '9:00');

        $schedule->command('fortnightly:checkout')
                 ->twiceMonthly();
        
        $schedule->command('monthly:checkout')
                 ->monthlyOn(1, '9:00');

        $schedule->command('everymin:checkout')
                 ->everyMinute();

        // $studentsPayment = StudentPayment::where('method', '<>', 3)->get();

        // foreach($studentsPayment as $student) {
        //     $plan = $student->plan;
        //     switch($plan) {
        //         case 0:
        //             $schedule->call(function() use ($student) {
        //             //    if((new MerchantPaymentController)->processAuth(12.00, $student->payment, $student->student)){
        //             //     (new MerchantPaymentController)->processCard(12.00, $student->payment, $student->student);
        //             //    }
        //             Log::info("payment schedule: weekly".$student->student_id);
        //               })->everyMinute();
        //         break;
        //         case 1:
        //         break;
        //         case 2:
        //         break;
        //         case 3:
        //         break;
        //         case 4:
        //         break;
        //     }
            
        // }

    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
