<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Log;
use DB;
use Carbon\Carbon;

use App\User;
use App\UserProfile;
use App\Student;
use App\StudentContact;
use App\School;
use App\Classes;
use App\Events;
use App\StudentAttendance;
use App\StudentMakeup;
use Exception;

class TeacherApiController extends Controller
{
    
    public function getProfileDetail(Request $request)
    {
        $User = Auth::user();


        $UserProfile = $User->userprofile;
        if($UserProfile != null){
            $School = $UserProfile->school;
            $UserProfile->school_name = $School->name;
            $UserProfile->email = $User->email;
        }else{
            $UserProfile = $User;
        }

        return response()->json(['data' => $UserProfile]);
    }

    public function updateProfileDetail(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            // 'country' => 'required|max:255',
            'dob' => 'required',
            'mobile' => 'required',
            'email' => 'required|email',

        ]);

        $User = Auth::user();

        $data = $request->all();

        $UserProfile = $User->userprofile;

        if($request->email != $User->email && User::where('email', $request->email)->count() > 0)
            return response()->json(['error' => 'The Email exist already'], 500);

        $User->update(['email' => $request->email]);

        $UserProfile->first_name = $request->first_name;
        $UserProfile->last_name = $request->last_name;
        $UserProfile->address = $request->address;
        $UserProfile->city = $request->city;
        $UserProfile->country = $request->country;
        $UserProfile->dob = substr($request->dob, 0, 10);
        $UserProfile->mobile = $request->mobile;
        // if(isset($request->profile))
            $UserProfile->profile = $request->profile;
        if(isset($request->suburb))
            $UserProfile->suburb = $request->suburb;
        if(isset($request->postalcode))
            $UserProfile->postalcode = $request->postalcode;
        $UserProfile->save();

        return response()->json(['data' => $UserProfile, 'message' => 'Updated the Profile successfully']);
    
    }

    public function getClassList(Request $request)
    {
        $User = Auth::user();

        $Classes = Classes::where('school_id', $User->school_id)->get();
        // $Classes = $User->classes;

        return response()->json(['data' => $Classes]);
    }

    public function getClassDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);
        
        $id = $request->id;

        $Class = Classes::find($id);

        return response()->json($Class);
    }

    public function getClassAttendance(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);

        $classId = $request->id;

        $class = Classes::find($classId);

        $students = $class->students;

        $class_day = $class->day;

        $now = Carbon::now();

        $date = $now->firstOfMonth();

        while(1){
            
            if($date->dayOfWeek == $class_day)
                break;
            else $date->addDay(1);
        }

        $start = $date->format("Y-m-d");//first class day of month
        $date = $now->endOfMonth();// end day of month
        $last = $date->format("Y-m-d");

        foreach($students as $student) {
            $student_temp=[];
            $attendances = $student->attendanceWeek($classId, $start, $last);
            $temp = [];
            foreach($attendances as $item) {
                $temp[] = $item->date;
            }
            $student->days = $temp;
        }

        $School = $class->school_id;
        $today = Carbon::now()->format('d/m/Y');
        Log::info('today'.$today);
        $makeup_data = StudentMakeup::where('date', $today)->get();
        $makeup_students = [];
        foreach($makeup_data as $item) {
            $student = Student::find($item->student_id);
            if($student->school_id == $School)
                $makeup_students[] = array('id' => $student->id, 'first_name' => $student->first_name, 'last_name' => $student->last_name, 'status' => $item->status);
        }

        $terms = array();

        $date = $now->createFromFormat('Y-m-d', $start);
        $month = $date->month;

        while(1){
            if($date->month == $month){
                array_push($terms, $date->format("Y-m-d"));
                $date->addWeek(1);
            }
            else break;
        }

        return response()->json(['attendance' => $students, 'makeup_attendance' => $makeup_students, 'term' => $terms, 'class_id' => $class->id, 'class_name' => $class->type, 'startday' => $start]);
    }

    public function getPrevClassAttendance(Request $request)
    {
        $this->validate($request, [
            'class_id' => 'required',
            'startday' => 'required'
        ]);

        $classId = $request->class_id;

        $class = Classes::find($classId);

        $students = $class->students;

        $class_day = $class->day;

        $now = Carbon::now();

        $startday = $now->createFromFormat("Y-m-d", $request->startday);

        $date = $startday->subMonth(1);
        $date = $date->firstOfMonth();

        Log::info('lastmont'. $date);

        while(1){
            
            if($date->dayOfWeek == $class_day)
                break;
            else $date->addDay(1);
        }

        $start = $date->format("Y-m-d");//first class day of month
        $date = $date->endOfMonth();// end day of month
        $last = $date->format("Y-m-d");

        foreach($students as $student) {
            $student_temp=[];
            $attendances = $student->attendanceWeek($classId, $start, $last);
            $temp = [];
            foreach($attendances as $item) {
                $temp[] = $item->date;
            }
            $student->days = $temp;
        }

        preg_match_all('/\d+/', json_encode($class->makeup), $makeup_temp);
        $makeup = $makeup_temp[0];
        $makeup_students = [];
        foreach($makeup as $item) {
            $student = Student::find($item);
            $attendances = $student->attendanceWeek($classId, $start, $last);
            $temp = [];
            foreach($attendances as $item) {
                $temp[] = $item->date;
            }
            $student->days = $temp;
            $makeup_students[] = $student;
        }

        $terms = array();

        $date = $now->createFromFormat('Y-m-d', $start);
        $month = $date->month;

        while(1){
            if($date->month == $month){
                array_push($terms, $date->format("Y-m-d"));
                $date->addWeek(1);
            }
            else break;
        }

        return response()->json(['attendance' => $students, 'makeup_attendance' => $makeup_students, 'term' => $terms, 'class_id' => $class->id, 'class_name' => $class->type, 'startday' => $start]);
    }

    public function getNextClassAttendance(Request $request)
    {
        $this->validate($request, [
            'class_id' => 'required',
            'startday' => 'required'
        ]);

        $classId = $request->class_id;

        $class = Classes::find($classId);

        $students = $class->students;

        $class_day = $class->day;

        $now = Carbon::now();

        $startday = $now->createFromFormat("Y-m-d", $request->startday);

        $date = $startday->addMonth(1);
        $date = $date->firstOfMonth();

        while(1){
            
            if($date->dayOfWeek == $class_day)
                break;
            else $date->addDay(1);
        }

        $start = $date->format("Y-m-d");//first class day of month
        $date = $date->endOfMonth();// end day of month
        $last = $date->format("Y-m-d");

        foreach($students as $student) {
            $student_temp=[];
            $attendances = $student->attendanceWeek($classId, $start, $last);
            $temp = [];
            foreach($attendances as $item) {
                $temp[] = $item->date;
            }
            $student->days = $temp;
        }

        preg_match_all('/\d+/', json_encode($class->makeup), $makeup_temp);
        $makeup = $makeup_temp[0];
        $makeup_students = [];
        foreach($makeup as $item) {
            $student = Student::find($item);
            $attendances = $student->attendanceWeek($classId, $start, $last);
            $temp = [];
            foreach($attendances as $item) {
                $temp[] = $item->date;
            }
            $student->days = $temp;
            $makeup_students[] = $student;
        }

        $terms = array();

        $date = $now->createFromFormat('Y-m-d', $start);
        $month = $date->month;

        while(1){
            if($date->month == $month){
                array_push($terms, $date->format("Y-m-d"));
                $date->addWeek(1);
            }
            else break;
        }

        return response()->json(['attendance' => $students, 'makeup_attendance' => $makeup_students, 'term' => $terms, 'class_id' => $class->id, 'class_name' => $class->type, 'startday' => $start]);
    }

    public function saveClassAttendance(Request $request){
        $this->validate($request, [
            'class_id' => 'required',
            'attendance' => 'required'
        ]);

        $attendance = $request->attendance;

        foreach($attendance as $item) {
            StudentAttendance::create([
                'student_id' => $item['student_id'],
                'class_id' => $request->class_id,
                'status' => 1,
                'date' => $item['day']
            ]);
        }

        $today = Carbon::now()->format('d/m/Y');

        StudentMakeup::whereIn('student_id', $request->makeup_attendance)->where('date', $today)->update(['status' => 1]);

        return response()->json(['success' => true]);
    }

    public function saveAppClassAttendance(Request $request) {
        Log::info("attendance data from app: ". json_encode($request->param));
        try{
            $data = json_decode($request->param);
    
            foreach($data as $item) {
                $id = $item->id;
                $term = $item->ym;
                $attendances = $item->days;
    
                StudentAttendance::where('student_id', $id)->where('date', 'like', $term.'%')->delete();
                foreach($attendances as $date) {
                    StudentAttendance::create([
                        'student_id' => $id,
                        'class_id' => intval($item->class_id),
                        'status' => 1,
                        'date' => $date
                    ]);
                }
            }
    
            return response()->json(['success' => true]);
        }catch(Exception $e){
            Log::info('attendance data issue:'.$e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function getEventList(Request $request)
    {
        $User = Auth::user();

        $School = $User->userprofile->school;

        // $Events = Events::where('school_id', $School->id)->get();
        $Events = $User->events;

        return response()->json(['data' => $Events]);
    }

    public function getEventDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);

        $id = $request->id;

        $User = Auth::user();

        $Event = Events::find($id);

        preg_match_all('/\d+/', $Event->students, $students_group);

        $students = "";
        foreach($students_group[0] as $item){
            $temp_student = "";
            $student = Student::find(intval($item));
            $temp_student .= $student->first_name . " " . $student->last_name;
            $students .= $temp_student . ", ";
        }

        $Event->students = $students;

        return response()->json(['event' => $Event]);
    }

    public function getStudentList(Request $request)
    {
        $User = Auth::user();

        $Classes = $User->classes;
        $classes = [];
        $students = [];

        // foreach($Classes as $class) {
        //     array_push($classes, $class->id);
        //     // $students_set = Classes::find($class->id)->students;
        // }

        // $pivot = DB::table('classes_student')->whereIn('classes_id', $classes)->get();

        // $Students = Student::where('school_id', $User->userprofile->school->id)->whereIn('class_id', $classes)->get();
        $students = DB::select('select * from students where students.id in (select student_id from classes_student where classes_id in (select id from classes where school_id = '.$User->userprofile->school_id.'))');
        return response()->json(['data' => $students]);
    }

    public function getStudentDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);

        $id = $request->id;

        $student = Student::find($id);
        $contact = $student->contact;
        $payment = $student->payment;
        $events = $student->events;

        return response()->json(['personal' => $student, 'contact' => $contact, 'payment' => $payment, 'events' => $events]);
    }

    public function getStudentContactDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);
        
        $id = $request->id;

        $Student = Student::find($id);

        return response()->json(['data' => $Student->contact]);
    }

}