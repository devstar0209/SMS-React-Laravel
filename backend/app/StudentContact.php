<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentContact extends Model
{
    //
    protected $fillable = [
        'student_id', 'user_id', 'first_name', 'last_name', 'mobile', 'work', 'occupation','relationship' 
    ];

    public $timestamps = false;

    protected $table = 'student_contact';
}
