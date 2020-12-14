<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    //
    protected $fillable = [
        'type', 'area', 'day', 'start_time', 'finish_time','duration', 'coaches', 'min_age','max_age', 'max_no', 'school_id', 'price', 'fee', 'member_fee'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function students(){
        return $this->belongsToMany('App\Student');
    }

    public function studentsAttendance() {
        return $this->hasMany('App\StudentAttendance','class_id', 'id')->with('student');
    }

}
