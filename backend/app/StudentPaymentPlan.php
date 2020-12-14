<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentPaymentPlan extends Model
{
    //
    protected $fillable = [
        'duration', 'price'
    ];

    public $timestamps = false;

    protected $table = 'payment_plan';

}
