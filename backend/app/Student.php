<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    //
    protected $fillable = [
        'first_name', 'last_name', 'email', 'mobile', 'profile', 'dob', 
        'address', 'suburb', 'city', 'state', 'country', 'postalcode', 'school_id','grade', 'class_id', 'active', 'gol_id', 'note'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function contact(){
        return $this->hasMany('\App\StudentContact', 'student_id', 'id');
    }

    public function payment(){
        return $this->hasOne('\App\StudentPayment', 'student_id', 'id');
    }

    public function attendance($class){
        return $this->hasMany('App\StudentAttendance')->where('class_id', $class)->get();
    }

    public function attendanceWeek($class, $start, $end){
        return $this->hasMany('App\StudentAttendance')->where('class_id', $class)->where('date', '>=', $start)->where('date', '<=', $end)->get();
    }

    public function events(){
        return $this->belongsToMany('App\Events');
    }
}
