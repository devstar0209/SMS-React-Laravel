<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    //
    protected $fillable = [
        'first_name', 'last_name', 'mobile', 'profile', 'dob', 
        'address', 'suburb', 'state', 'city', 'country', 'postalcode', 
        'no_of_classes', 'total_hours', 'classes', 'school_id',
        'user_id','grade', 'certification', 'school_name'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    protected $table="user_profile";

    public function user(){
        return $this->belongsTo('App\User');
    }

    
    public function school(){
        return $this->hasOne('App\School', 'id', 'school_id');
    }

    
}
