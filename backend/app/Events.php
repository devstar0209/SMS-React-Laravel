<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    //
    protected $fillable = [
        'type', 'name', 'organiser', 'start_time', 'finish_time', 'start_date', 'finish_date','location', 'status', 'fee', 'coaches', 'students','school_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at',
    ];
}
