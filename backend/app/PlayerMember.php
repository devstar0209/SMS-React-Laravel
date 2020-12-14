<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlayerMember extends Model
{
    //
    protected $fillable = [
        'user_id', 'member_no', 'member_card', 'fee_plan', 'status', 'pay_status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'updated_at',
    ];

    protected $table="player_members";

    public function user(){
        return $this->belongsTo('App\User')->with('userprofile');
    }

    public function feePlan() {
        return $this->belongsTo('App\MemberFeePlan',  'fee_plan');
    }
    
}
