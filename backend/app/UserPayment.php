<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserPayment extends Model
{
    //
    protected $fillable = [
        'user_id', 'customer_name', 'card_id', 'card_alias',
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

    protected $table = 'user_payment';

    public function user()
    {
        return $this->belongsTo('App\User');
    }

}
