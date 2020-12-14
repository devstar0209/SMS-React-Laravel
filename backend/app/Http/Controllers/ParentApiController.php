<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use DB;
use Log;
use Carbon\Carbon;
use Exception;

use App\User;
use App\UserProfile;
use App\Student;
use App\StudentContact;
use App\School;
use App\Classes;
use App\Events;
use App\StudentCheckoutHistory;
use App\StudentAttendance;
use App\StudentMakeup;

class ParentApiController extends Controller
{

    public function getEventList(Request $request)
    {
        $this->validate($request, [
            'student_id' => 'required'
        ]);

        $Student = Student::find($request->student_id);

        $Events = $Student->events;

        return response()->json(['data' => $Events]);
    }

    public function getEventDetail(Request $request)
    {
        $id = $request->id;

        $User = Auth::user();

        $Event = Events::find($id);

        $Coaches = UserProfile::where('grade', 1)->where('school_id', $Event->school_id)->get();
        $Students = Student::where('school_id', $Event->school_id)->get();

        return response()->json(['event' => $Event, 'coaches' => $Coaches, 'students' => $Students]);
    }

    public function getStudentList(Request $request)
    {
        $User = Auth::user();

        try{
            $Students = $User->students;
            return response()->json(['data' => $Students]);
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }

    public function createStudent(Request $request) {
        $this->validate($request, [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            'state' => 'required|max:255',
            // 'country' => 'required|max:255',
            'dob' => 'required',
            // 'mobile' => 'required',
            // 'email' => 'required|email',
            // 'grade' => 'required',
            // 'gol_id' => 'required',
            'note' => 'max:300',
            // 'active' => 'required',
        ]);

        $User = Auth::user();
        try{
            $Student = Student::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'country' => isset($request->country)?$request->country: null,
                'dob' => substr($request->dob, 0, 10),
                'gender' => $request->gender,
                'class_id' => isset($request->class_id) ? json_encode($request->class_id) : null,
                'mobile' => $request->mobile??'',
                'email' => $request->email??'',
                'grade' => $request->grade,
                'gol_id' => $request->gol_id,
                'active' => $request->active,
                'profile' => isset($request->profile) ? $request->profile : null,
                'suburb' => isset($request->suburb) ? $request->suburb : null,
                'postalcode' => isset($request->postalcode) ? $request->postalcode : null,
                'note' => isset($request->note)? $request->note : null,
                'school_id' => $User->userprofile->school->id,
            ]);

            DB::table('student_user')->insert(['student_id' => $Student->id, 'user_id' => $User->id]);
            
    
            if(isset($request->class_id)) {
                preg_match_all('/\d+/', json_encode($request->class_id), $classes);
    
                foreach($classes[0] as $class){
                    DB::table('classes_student')->insert(['student_id' => $Student->id, 'classes_id' => $class]);
                }
            }

            if(isset($request->makeup_1))
                StudentMakeup::create([
                    'student_id' => $request->id,
                    'date' => $request->makeup_1,
                    'status' => 0
                ]);
            if(isset($request->makeup_2))
                StudentMakeup::create([
                    'student_id' => $request->id,
                    'date' => $request->makeup_2,
                    'status' => 0
                ]);
            if(isset($request->makeup_3))
                StudentMakeup::create([
                    'student_id' => $request->id,
                    'date' => $request->makeup_3,
                    'status' => 0
                ]);
            $Student->contact;
            return response()->json(['message' => 'Registered successfully', 'data' => $Student]);
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getStudentDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);

        $id = $request->id;

        $Student = Student::find($id);

        $classes = Classes::where('school_id', $Student->school_id)->get();
        $makeup_classes_history = StudentMakeup::where('student_id', $request->id)->get();

        $makeup = [];

        if(count($makeup_classes_history)){
            $now = Carbon::now();
            $month = $now->month;
            $term = $month % 3;
            $term = $term == 3? 3:$term;
            $now->subMonths($term - 1);
            $date = $now->firstOfMonth();
            $start = $date->format('d/m/Y');
            $date = $date->addMonths(2);
            $date = $date->lastOfMonth();
            $end = $date->format('d/m/Y');

            $makeup = StudentMakeup::where('student_id', $id)->where('date', '>=', $start)->get();
            if(isset($makeup[0])) $Student->makeup_1 = $makeup[0]->date;
            if(isset($makeup[1])) $Student->makeup_2 = $makeup[1]->date;
            if(isset($makeup[2])) $Student->makeup_3 = $makeup[2]->date;
        }

        $Student->contact;

        return response()->json(['data' => $Student, 'classes' => $classes, 'makeup_classes_history' => $makeup_classes_history, 'makeup_classes' => $makeup]);
    }

    public function updateStudentDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            // 'address' => 'required|max:255',
            'city' => 'required|max:255',
            'state' => 'required|max:255',
            // 'country' => 'required|max:255',
            'dob' => 'required',
            // 'mobile' => 'required',
            // 'email' => 'required|email',
            // 'grade' => 'required',
            // 'gol_id' => 'required',
            // 'active' => 'required',
            'note' => 'max:300',
        ]);

        try{
            $Student = Student::find($request->id);
        
            $Student->first_name = $request->first_name;
            $Student->last_name = $request->last_name;
            if(isset($request->address))
            $Student->address = $request->address;
            $Student->city = $request->city;
            $Student->state = $request->state;
            $Student->dob = substr($request->dob, 0, 10);
            // $Student->mobile = $request->mobile;
            // $Student->email = $request->email;
            // $Student->grade = $request->grade;
            // $Student->gol_id = $request->gol_id;
            if(isset($request->active))
                $Student->active = $request->active;
            if(isset($request->country))
                $Student->country = $request->country;
            if(isset($request->profile))
                $Student->profile = $request->profile;
            if(isset($request->suburb))
                $Student->suburb = $request->suburb;
            if(isset($request->postalcode))
                $Student->postalcode = $request->postalcode;
            if(isset($request->gender))
                $Student->gender = $request->gender;
            if(isset($request->note))
                $Student->note = $request->note;
    
            if($request->class_id != $Student->class_id) {
    
                preg_match_all('/\d+/', json_encode($Student->class_id), $classes);
    
                foreach($classes[0] as $class){
                    DB::table('classes_student')->where('student_id', $Student->id)->where('classes_id', $class)->delete();
                }
    
                preg_match_all('/\d+/', json_encode($request->class_id), $classes);
                
                foreach($classes[0] as $class){
                    DB::table('classes_student')->insert(['student_id' => $Student->id, 'classes_id' => $class]);
                }
    
                $Student->class_id = json_encode($request->class_id);
            }
    
            $Student->save();

            $now = Carbon::now();
            $month = $now->month;
            $term = $month % 3;
            $term = $term == 3? 3:$term;
            $now->subMonths($term - 1);
            $date = $now->firstOfMonth();
            $start = $date->format('d/m/Y');

            $makeup = StudentMakeup::where('student_id', $request->id)->where('date', '>=', $start)->get();

            if(count($makeup)){
                if(isset($request->makeup_1)){
                    if($request->makeup_1 != $makeup[0]->date){
                        StudentMakeup::where('id', $makeup[0]->id)->update(['date' => $request->makeup_1]);
                    }
                }
                if(isset($request->makeup_2)){
                    if(count($makeup) > 1){
                        if($request->makeup_2 != $makeup[1]->date){
                            StudentMakeup::where('id', $makeup[1]->id)->update(['date' => $request->makeup_2]);
                        }
                    }else{
                        StudentMakeup::create([
                            'student_id' => $request->id,
                            'date' => $request->makeup_2,
                            'status' => 0
                        ]);
                    }
                }
                if(isset($request->makeup_3)){
                    if(count($makeup) > 2){
                        if($request->makeup_3 != $makeup[2]->date){
                            StudentMakeup::where('id', $makeup[2]->id)->update(['date' => $request->makeup_3]);
                        }
                    }else{
                        StudentMakeup::create([
                            'student_id' => $request->id,
                            'date' => $request->makeup_3,
                            'status' => 0
                        ]);
                    }
                }
            }else {
                if(isset($request->makeup_1)){
                        StudentMakeup::create([
                            'student_id' => $request->id,
                            'date' => $request->makeup_1,
                            'status' => 0
                        ]);
    
                }
                if(isset($request->makeup_2))
                    StudentMakeup::create([
                        'student_id' => $request->id,
                        'date' => $request->makeup_2,
                        'status' => 0
                    ]);
                if(isset($request->makeup_3))
                    StudentMakeup::create([
                        'student_id' => $request->id,
                        'date' => $request->makeup_3,
                        'status' => 0
                    ]);
            }

            $Student->contact; 
            return response()->json(['data' => $Student]);
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }

    
    public function updateStudentContactDetail(Request $request)
    {
        $this->validate($request, [
            'student_id' => 'required',//student_id
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'relationship' => 'required|max:255',
            'mobile' => 'required',
        ]);

        $Student = Student::find($request->student_id);
        try{
            if(isset($request->id)){
                $StudentContact = StudentContact::find($request->id);
    
                if($StudentContact->relationship != $request->relationship && StudentContact::where('student_id', $request->student_id)->where('relationship', $request->relationship)->count() > 0){
                    return response()->json(['error' => 'The relationship exist already'], 500);
                }
    
                $StudentContact->first_name = $request->first_name;
                $StudentContact->last_name = $request->last_name;
                if(isset($request->work))
                    $StudentContact->work = $request->work;
                if(isset($request->occupation))
                    $StudentContact->occupation = $request->occupation;
                $StudentContact->relationship = $request->relationship;
                $StudentContact->mobile = $request->mobile;
    
                $StudentContact->save();
    
                $Student->contact;
    
                return response()->json(['message' => "Updated the student contact successfuly", 'data' => $Student]);
    
            }else {
                if(StudentContact::where('student_id', $request->student_id)->where('relationship', $request->relationship)->count() > 0){
                    return response()->json(['error' => 'The relationship exist already'], 500);
                }
    
                $StudentContact = StudentContact::create([
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'work' => isset($request->work)?$request->work:null,
                    'occupation' => isset($request->occupation)?$request->occupation: null,
                    'relationship' => $request->relationship,
                    'mobile' => $request->mobile,
                    'student_id' => $request->student_id,
                    'user_id' => Auth::user()->id
                ]);
                $Student->contact;
                return response()->json(['message' => "Created the student contact successfuly", 'data' => $Student]);
            }
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }

    public function deleteStudentContactDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);
        
        $id = $request->id;

        StudentContact::find($id)->delete();
        
        return response()->json(['data' => true]);
    }


    public function getBookingClassesList(Request $request) {
        $user = Auth::user();

        $booking_list = $user->classes;

        return response()->json($booking_list);
    }

    public function getStudentAttendanceHistory(Request $request)
    {
        $this->validate($request, [
            'student_id' => 'required',
            'class_id' => 'required',
            'duration' => 'required',
            'first_day' => 'required',
        ]);

        $student = Student::find($request->student_id);
        $class = Classes::find($request->class_id);

        $now = Carbon::now();
        switch($request->duration){
            case 0://current
                $date = $now->firstOfMonth();
            break;
            case 1://prev
                $date = Carbon::createFromFormat('Y-m-d', $request->first_day);
                $date = $date->subMonth(3);
            break;
            case 2://next
                $date = Carbon::createFromFormat('Y-m-d', $request->first_day);
                $date = $date->addMonth(3);
            break;
        }
        $delta = $date->month%3 == 0 ? 3 : $date->month%3;
        $date = $date->subMonths($delta-1);
        $date = $date->firstOfMonth();

        while(1){
            
            if($date->dayOfWeek == $class->day)
                break;
            else $date->addDay(1);
        }

        $start = $date->format("Y-m-d");//first class day of month
        $date = $now->addMonths(3)->endOfMonth();// end day of month
        $last = $date->format("Y-m-d");

        $attendances_temp = $student->attendanceWeek($request->class_id, $start, $last);
        $attendances = [];
        $attendances[] = '1111-01-01';
        foreach($attendances_temp as $item) {
            $temp = Carbon::createFromFormat('Y-m-d', $item->date)->format('d/m/Y');
            $attendances[] = $temp;
        }

        // preg_match_all('/\d+/', json_encode($class->makeup), $makeup_temp);
        // $makeup = $makeup_temp[0];
        // $makeup_students = [];
        // foreach($makeup as $item) {
        //     $student = Student::find($item);
        //     $attendances = $student->attendanceWeek($classId, $start, $last);
        //     $temp = [];
        //     foreach($attendances as $item) {
        //         $temp[] = $item->date;
        //     }
        //     $student->days = $temp;
        //     $makeup_students[] = $student;
        // }

        $terms = array();
        $date = $now->createFromFormat('Y-m-d', $start);
        $month = $date->month;

        while(1){
            if($date->month == $month || $date->month == $month+1 || $date->month == $month+2){
                array_push($terms, $date->format("d/m/Y"));
                $date->addWeek(1);
            }
            else break;
        }

        return response()->json(['attendance' => $attendances, 'term' => $terms, 'start_day' => $start]);
    }

    
}

