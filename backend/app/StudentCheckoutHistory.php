<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentCheckoutHistory extends Model
{
    //
    protected $fillable = [
        'student_id', 'amount', 'payment_method','status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    // protected $hidden = [
    //     'created_at', 'updated_at',
    // ];


    protected $table = 'student_checkout_history';

    public function student() {
        return $this->belongsTo('App\Student');
    }
}
