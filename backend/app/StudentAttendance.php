<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentAttendance extends Model
{
    protected $fillable = ['student_id', 'class_id', 'day', 'status', 'week', 'date'];

    protected $hidden = ['created_at', 'updated_at'];

    public $timestamps = false;

    public function student(){
        return $this->belongsTo('App\Student');
    }
}
