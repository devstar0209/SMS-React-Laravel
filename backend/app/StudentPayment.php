<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentPayment extends Model
{
    //
    protected $fillable = [
        'student_id', 'customer_name', 'card_id',
        'account_name', 'account_no', 'bsb', 'plan', 'method'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public $timestamps = false;

    protected $table = 'student_payment';

    public function student()
    {
        return $this->belongsTo('App\Student');
    }

    public function option()
    {
        return $this->hasOne('App\StudentPaymentPlan', 'id', 'plan');
    }
}
