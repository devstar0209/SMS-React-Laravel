<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens,Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password','username', 'grade', 'login_by', 'social_unique_id', 'remember_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];

    /**
     * The services that belong to the user.
     */

    public function userprofile(){
        return $this->hasOne('App\UserProfile');
    }

    public function classes(){
        return $this->belongsToMany('App\Classes');
    }

    public function students() {
        return $this->belongsToMany('App\Student');
    }

    public function events(){
        return $this->belongsToMany('App\Events');
    }

    public function contact() {
        return $this->hasOne('App\StudentContact');
    }

    public function payment() {
        return $this->hasOne('App\UserPayment');
    }

    public function membership() {
        return $this->hasOne('App\PlayerMember');
    }

}
