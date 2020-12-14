<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlayerBookingHistory extends Model
{
    //
    protected $fillable = [
        'user_id', 'class_id', 'amount', 'payment_method','status', 'transaction_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    // protected $hidden = [
    //     'created_at', 'updated_at',
    // ];


    protected $table = 'player_booking_history';
}
