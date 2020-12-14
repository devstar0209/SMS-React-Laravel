<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MemberFeePlan extends Model
{
    //
    protected $fillable = [
        'plan', 'fee'
    ];

    public $timestamps = false;

    protected $table = 'member_fee_plan';

}
