<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
class StudentMakeup extends Model
{
    protected $fillable=['student_id', 'date', 'status'];

    protected $table="student_makeup";

    public $timestamps = false;
}