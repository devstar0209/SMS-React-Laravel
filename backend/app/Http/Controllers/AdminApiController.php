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
use App\PlayerMember;

class AdminApiController extends Controller
{

    public function dashboard(Request $request) {
        $user = Auth::user();
        // $history = $user->checkouthistory;

        $history_temp = StudentCheckoutHistory::orderBy('id', 'desc')->take(5)->get();
        $history=array();

        foreach($history_temp as $item){
            $student = Student::find($item->student_id);
            if($student->school_id == $user->school_id) {
                $item->first_name = $student->first_name;
                $item->last_name = $student->last_name;
                // $item->amount = $fmt->formatCurrency($item->amount, "AUD");;
                array_push($history, $item);
            }
        }

        $InactiveStudents = Student::where('school_id', $user->school_id)->where('active', '<>', 1)->get();

        $members = PlayerMember::where('status', 0)->where('pay_status', 1)->with('user', 'feePlan')->get();
        
        return response()->json(['checkouthistory' => $history, 'inactivestudents' => $InactiveStudents, 'members' => $members]);
    }
    //

    public function getCoaches(){
        $user = Auth::user();

        if(is_null($user->userprofile))
            return response()->json(['error' => 'Please fill out profile'], 500);

        $coaches = UserProfile::where('grade', 1)->where('school_id', $user->school_id)->get();

        return $coaches;
    }

    public function getCoacheList(Request $request)
    {

        $Coaches = $this->getCoaches();

        return response()->json(['data' => $Coaches]);
    }

    public function getCoacheDetail(Request $request)
    {
        $id = $request->id;

        $UserProfile = UserProfile::find($id);
        $User = User::find($UserProfile->user_id);
        
        if($UserProfile != null){
            $School = $UserProfile->school;
            $UserProfile->school_name = $School->name;
            $UserProfile->email = $User->email;
            $UserProfile->password = $User->password;
        }else{
            $UserProfile = $User;
        }

        return response()->json(['data' => $UserProfile]);
    }

    public function createCoacheDetail(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            //'country' => 'required|max:255',
            'dob' => 'required',
            'mobile' => 'required',
            'no_of_classes' => 'required',
            'total_hours' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        $User = Auth::user();

        if(is_null($User->userprofile))
            return response()->json(['error' => 'Please fill out profile'], 500);

        if(User::where('email', $request->email)->count() > 0)
            return response()->json(['error' => 'The Email exist already'], 500);

        $Coache = User::create([
            'email' => $request->email,
            'grade' => 1,
            'password' => bcrypt($request->password)
        ]);

        $UserProfile = UserProfile::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'address' => $request->address,
            'city' => $request->city,
            // 'country' => isset($request->country)?$request->country: null,
            'dob' => substr($request->dob, 0, 10),
            'mobile' => $request->mobile,
            'profile' => isset($request->profile) ? $request->profile : null,
            // 'suburb' => isset($request->suburb) ? $request->suburb : null,
            'postalcode' =>  $request->postalcode,
            'no_of_classes' => $request->no_of_classes != "" ? $request->no_of_classes : null,
            'total_hours' => $request->total_hours != "" ? $request->total_hours : null,
            'school_id' => $User->school_id,
            'user_id' => $Coache->id,
            'grade' => 1,
            'certification' => isset($request->certification)? $request->certification : null
        ]);
        
        return response()->json(['data' => $UserProfile]);
    }

    public function updateCoacheDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            // 'school_name' => 'required|max:255',
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            //'country' => 'required|max:255',
            'dob' => 'required',
            'mobile' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        
        $UserProfile = UserProfile::find($request->id);
        
        if($UserProfile->user->email != $request->email && User::where('email', $request->email)->count() > 0)
            return response()->json(['error' => 'The Email exist already'], 500);

        $UserProfile->first_name = $request->first_name;
        $UserProfile->last_name = $request->last_name;
        $UserProfile->address = $request->address;
        $UserProfile->city = $request->city;
        $UserProfile->country = isset($request->country)?$request->country: null;
        $UserProfile->dob = substr($request->dob, 0, 10);
        $UserProfile->mobile = $request->mobile;
        $UserProfile->postalcode = $request->postalcode;
        $UserProfile->profile = $request->profile;
        $UserProfile->suburb = $request->suburb;
        $UserProfile->no_of_classes = $request->no_of_classes != "" ? $request->no_of_classes : null;
        $UserProfile->total_hours = $request->total_hours != "" ? $request->total_hours : null;

        if(isset($request->certification))
            $UserProfile->certification = $request->certification;

        $UserProfile->save();

        // echo Carbon::createFromFormat('d/m/Y', $request->dob);

        $User = User::find($UserProfile->user_id);

        $User->update(['email' => $request->email, 'password' => bcrypt($request->password)]);

        return response()->json(['data' => $User->userprofile]);
    }

    public function deleteCoacheDetail(Request $request)
    {
        $id = $request->id;

        $UserProfile = UserProfile::find($id);
        UserProfile::find($id)->delete();
        
        User::find($UserProfile->user_id)->delete();

        return response()->json(['data' => true]);
    }

    public function getPlayerList(Request $request)
    {

        $players = UserProfile::where('grade', 2)->select(['first_name', 'last_name', 'id'])->get();

        return response()->json(['data' => $players]);
    }

    public function getPlayerDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);

        $id = $request->id;

        $userProfile = UserProfile::find($id);
        $user = User::find($userProfile->user_id);
        
        if($userProfile != null){
            $school = $userProfile->school;
            $userProfile->school_name = $school->name;
            $userProfile->email = $user->email;
            $userProfile->membership = $user->membership;
        }else{
            $user->membership;
            $userProfile = $user;
        }

        return response()->json(['data' => $userProfile]);
    }

    public function updatePlayerDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            // 'school_name' => 'required|max:255',
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            //'country' => 'required|max:255',
            'dob' => 'required',
            'mobile' => 'required',
            'email' => 'required|email',
        ]);

        
        $UserProfile = UserProfile::find($request->id);
        
        if($UserProfile->user->email != $request->email && User::where('email', $request->email)->count() > 0)
            return response()->json(['error' => 'The Email exist already'], 500);

        $UserProfile->first_name = $request->first_name;
        $UserProfile->last_name = $request->last_name;
        $UserProfile->address = $request->address;
        $UserProfile->city = $request->city;
        $UserProfile->country = isset($request->country)?$request->country: null;
        $UserProfile->dob = substr($request->dob, 0, 10);
        $UserProfile->mobile = $request->mobile;
        $UserProfile->postalcode = $request->postalcode;
        $UserProfile->profile = $request->profile;
        $UserProfile->suburb = $request->suburb;

        $UserProfile->save();

        return response()->json(['data' => true]);
    }

    public function approvePlayer(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);

        $id = $request->id;

        $userProfile = UserProfile::find($id);
        $user = User::find($userProfile->user_id);

        $member = $user->membership;
        $member->status = 1;
        $member->save();
        
        if($userProfile != null){
            $school = $userProfile->school;
            $userProfile->school_name = $school->name;
            $userProfile->email = $user->email;
            $userProfile->membership = $user->membership;
        }else{
            $user->membership;
            $userProfile = $user;
        }

        return response()->json(['data' => $userProfile]);
    }

    public function approveMember(Request $request) {
        $this->validate($request, [
            'id' => 'required'
        ]);

        $id = $request->id;
        PlayerMember::find($id)->update(['status'=> 1]);

        $members = PlayerMember::where('status', 0)->where('pay_status', 1)->with('user', 'feePlan')->get();

        return response()->json(['members' => $members]);

    }

    public function deletePlayerDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);

        $id = $request->id;

        $UserProfile = UserProfile::find($id);
        UserProfile::find($id)->delete();
        
        User::find($UserProfile->user_id)->delete();

        return response()->json(['data' => true]);
    }

    public function getClassCoaches(Request $request){
        $Coaches = $this->getCoaches();

        return response()->json(['data' => $Coaches]);
    }

    public function getClassList(Request $request)
    {
        $user = Auth::user();

        if(is_null($user->userprofile))
            return response()->json(['error' => 'Please fill out profile'], 500);

        $Classes = Classes::where('school_id', $user->school_id)->get();

        foreach($Classes as $class){
            $class->student_count = count($class->students);
            preg_match_all('/\d+/', json_encode($class->makeup), $makeup);
        }

        return response()->json(['data' => $Classes]);
    }

    public function getClassDetail(Request $request)
    {
        $user = Auth::user();

        $id = $request->id;

        $Class = Classes::find($id);

        $Coaches = $this->getCoaches();

        $students = Student::where('school_id', $user->school_id)->get();

        return response()->json(['classes' => $Class, 'coaches' => $Coaches, 'students' => $students]);
    }

    public function createClassDetail(Request $request)
    {
        $this->validate($request, [
            'type' => 'required|max:255',
            'area' => 'required|max:255',
            'day' => 'required',
            'start_time' => 'required',
            'finish_time' => 'required',
            'duration' => 'required|max:255',
            'max_no' => 'required',
            'min_age' => 'required',
            'max_age' => 'required',
        ]);

        $User = Auth::user();

        $day = $request->day;

        try{

            // if(Classes::where('type', $request->type)->where('school_id', $User->userprofile->school_id)->count() > 0)
            if(Classes::where('type', $request->type)->count() > 0)
                return response()->json(['error' => 'The Class type exist already'], 500);
    
            $Class = Classes::create([
                'type' => $request->type,
                'area' => $request->area,
                'day' => $request->day['value'],
                'start_time' => $request->start_time,
                'finish_time' => $request->finish_time,
                'duration' => $request->duration,
                'coaches' => json_encode($request->coaches),
                'max_no' => $request->max_no,
                'min_age' => $request->min_age,
                'max_age' => $request->max_age,
                'price' => $request->price,
                'fee' => $request->fee,
                'fee' => $request->member_fee,
                'school_id' => $User->school_id
            ]);
    
            preg_match_all('/\d+/', json_encode($request->coaches), $coaches);
    
            foreach($coaches[0] as $item){
                DB::table('classes_user')->insert(['user_id' => $item, 'classes_id' => $Class->id]);
            }
        }catch(Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }


        return response()->json(['data' => $Class]);
    }

    public function updateClassDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'type' => 'required|max:255',
            'area' => 'required|max:255',
            'day' => 'required|max:255',
            'start_time' => 'required',
            'finish_time' => 'required',
            'duration' => 'required|max:255',
            'max_no' => 'required',
            'min_age' => 'required',
            'max_age' => 'required',
        ]);

        $Class = Classes::find($request->id);
        $user = Auth::user();
        
        if($Class->type != $request->type && Classes::where('type', $request->type)->where('school_id', $user->school_id)->count() > 0)
            return response()->json(['error' => 'The Class type exist already'], 500);
        
        $Class->type = $request->type;
        $Class->area = $request->area;
        // if($Class->day != $request->day)
        //     $Class->day = json_encode($request->day);
        $Class->day = $request->day[0]['value'];
        $Class->start_time = $request->start_time;
        $Class->finish_time = $request->finish_time;
        $Class->duration = $request->duration;
        $Class->fee = $request->fee;
        $Class->member_fee = $request->member_fee;
        $Class->price = $request->price;
        
        $Class->max_no = $request->max_no;
        $Class->min_age = $request->min_age;
        $Class->max_age = $request->max_age;

        if($Class->coaches != $request->coaches) {
            preg_match_all('/\d+/', json_encode($Class->coaches), $coaches);
    
            foreach($coaches[0] as $item){
                DB::table('classes_user')->where(['user_id' => $item, 'classes_id' => $Class->id])->delete();
            }
    
            preg_match_all('/\d+/', json_encode($request->coaches), $coaches);
    
            foreach($coaches[0] as $item){
                DB::table('classes_user')->insert(['user_id' => $item, 'classes_id' => $Class->id]);
            }

            $Class->coaches = json_encode($request->coaches);
        }

        $Class->save();

        return response()->json(['data' => $Class]);
    }

    public function deleteClassDetail(Request $request)
    {
        $id = $request->id;

        Classes::find($id)->delete();
        
        return response()->json(['data' => true]);
    }

    public function getEventCoaches(Request $request){
        $Coaches = $this->getCoaches();

        $User = Auth::user();

        if(is_null($User->userprofile))
            return response()->json(['error' => 'Please fill out profile'], 500);

        $Students = Student::where('school_id', $User->school_id)->get();

        return response()->json(['coaches' => $Coaches, 'students' => $Students]);
    }

    public function getEventList(Request $request)
    {
        $User = Auth::user();

        if(is_null($User->userprofile))
            return response()->json(['error' => 'Please fill out profile'], 500);

        $Events = Events::where('school_id', $User->school_id)->get();

        return response()->json(['data' => $Events]);
    }

    public function getEventDetail(Request $request)
    {
        $id = $request->id;

        $User = Auth::user();

        if(is_null($User->userprofile))
            return response()->json(['error' => 'Please fill out profile'], 500);

        $Event = Events::find($id);

        $Coaches = $this->getCoaches();
        $Students = Student::where('school_id', $User->school_id)->get();

        return response()->json(['event' => $Event, 'coaches' => $Coaches, 'students' => $Students]);
    }

    public function createEventDetail(Request $request)
    {
        $this->validate($request, [
            'type' => 'required|max:255',
            'name' => 'required|max:255',
            'organiser' => 'required|max:255',
            'start_time' => 'required',
            'finish_time' => 'required',
            'start_date' => 'required',
            'finish_date' => 'required',
            'location' => 'required|max:255',
            'status' => 'required',
            'fee' => 'required',
        ]);

        $User = Auth::user();

        if(is_null($User->userprofile))
            return response()->json(['error' => 'Please fill out profile'], 500);

        if(Events::where('name', $request->name)->count() > 0)
            return response()->json(['error' => 'The event name exist already'], 500);

        $Event = Events::create([
            'type' => $request->type,
            'name' => $request->name,
            'start_time' => $request->start_time,
            'finish_time' => $request->finish_time,
            'start_date' => substr($request->start_date, 0, 10),
            'finish_date' => substr($request->finish_date, 0, 10),
            'organiser' => $request->organiser,
            'coaches' => isset($request->coaches)?json_encode($request->coaches): null,
            'students' => isset($request->students)?json_encode($request->students): null,
            'location' => $request->location,
            'status' => json_encode($request->status),
            'fee' => $request->fee,
            'school_id' => $User->school_id
        ]);

        preg_match_all('/\d+/', json_encode($request->coaches), $coaches);

        foreach($coaches[0] as $coache){
            DB::table('events_user')->insert(['user_id' => $coache, 'events_id' => $Event->id]);
        }
        
        return response()->json(['data' => $Event]);
    }

    public function updateEventDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'type' => 'required|max:255',
            'name' => 'required|max:255',
            'organiser' => 'required|max:255',
            'start_time' => 'required',
            'finish_time' => 'required',
            'start_date' => 'required',
            'finish_date' => 'required',
            'location' => 'required|max:255',
            'status' => 'required',
            'fee' => 'required',
        ]);

        $Event = Events::find($request->id);

        if($Event->name != $request->name && Events::where('name', $request->name)->count() > 0)
            return response()->json(['error' => 'The event name exist already'], 500);

        
        $Event->type = $request->type;
        $Event->name = $request->name;
        $Event->start_time = $request->start_time;
        $Event->finish_time = $request->finish_time;
        $Event->start_date = substr($request->start_date, 0, 10);
        $Event->finish_date = substr($request->finish_date, 0, 10);
        $Event->organiser = $request->organiser;
            
        if($request->students != $Event->students)
            $Event->students = json_encode($request->students);
        $Event->location = $request->location;
        if($request->status != $Event->status)
            $Event->status = json_encode($request->status);
        $Event->fee = $request->fee;

        if($request->coaches != $Event->coaches) {
            preg_match_all('/\d+/', json_encode($Event->coaches), $coaches);

            foreach($coaches[0] as $coache){
                // DB::table('events_user')->insert(['user_id' => $coache, 'events_id' => $Event->id]);
                DB::table('events_user')->where('user_id', $coache)->where('events_id', $Event->id)->delete();
            }
    
            preg_match_all('/\d+/', json_encode($request->coaches), $coaches);
    
            foreach($coaches[0] as $coache){
                DB::table('events_user')->insert(['user_id' => $coache, 'events_id' => $Event->id]);
            }

            $Event->coaches = json_encode($request->coaches);
        }
        

        $Event->save();

        return response()->json(['data' => $Event]);
    }

    public function deleteEventDetail(Request $request)
    {
        $id = $request->id;

        Events::find($id)->delete();
        
        return response()->json(['data' => true]);
    }

    public function getStudentList(Request $request)
    {
        $User = Auth::user();

        if(is_null($User->userprofile))
            return response()->json(['error' => 'Please fill out profile'], 500);

        $Students = Student::where('school_id', $User->school_id)->get();

        return response()->json(['data' => $Students]);
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

        return response()->json(['data' => $Student, 'classes' => $classes, 'makeup_classes_history' => $makeup_classes_history, 'makeup_classes' => $makeup]);
    }

    public function createStudentDetail(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            'state' => 'required|max:255',
            // 'country' => 'required|max:255',
            'dob' => 'required',
            'mobile' => 'required',
            'email' => 'required|email',
            'grade' => 'required',
            'gol_id' => 'required',
            'note' => 'max:300',
            'active' => 'required',
        ]);

        $User = Auth::user();
        if(is_null($User->userprofile))
            return response()->json(['error' => 'Please fill out profile'], 500);
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
                'mobile' => $request->mobile,
                'email' => $request->email,
                'grade' => $request->grade,
                'gol_id' => $request->gol_id,
                'active' => $request->active,
                'profile' => isset($request->profile) ? $request->profile : null,
                'suburb' => isset($request->suburb) ? $request->suburb : null,
                'postalcode' => isset($request->postalcode) ? $request->postalcode : null,
                'note' => isset($request->note)? $request->note : null,
                'school_id' => $User->school_id,
            ]);
            
            $classes = Classes::where('school_id', $Student->school_id)->get();
    
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
    
            return response()->json(['data' => $Student, 'classes' => $classes]);
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }

    public function updateStudentDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            'state' => 'required|max:255',
            // 'country' => 'required|max:255',
            'dob' => 'required',
            'mobile' => 'required',
            'email' => 'required|email',
            'grade' => 'required',
            'gol_id' => 'required',
            'active' => 'required',
            'note' => 'max:300',
        ]);

        try{
            $Student = Student::find($request->id);
        
            $Student->first_name = $request->first_name;
            $Student->last_name = $request->last_name;
            $Student->address = $request->address;
            $Student->city = $request->city;
            $Student->state = $request->state;
            $Student->dob = substr($request->dob, 0, 10);
            $Student->mobile = $request->mobile;
            $Student->email = $request->email;
            $Student->grade = $request->grade;
            $Student->gol_id = $request->gol_id;
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

                
            return response()->json(['data' => $Student->contact]);
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }

    public function deleteStudentDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);

        $id = $request->id;

        $Student = Student::find($id);
        $Contact = $Student->contact;
        if(count($Contact) > 0)
        $Contact->delete();
        $Student->delete();
        StudentMakeup::where('student_id', $id)->delete();
        
        return response()->json(['data' => true]);
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

    public function createStudentContactDetail(Request $request)
    {
        $this->validate($request, [
            'student_id' => 'required',//student_id
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'relationship' => 'required|max:255',
            'mobile' => 'required',
        ]);

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
            $StudentContact->student_id = $request->student_id;

            $StudentContact->save();

            return response()->json(['message' => "Updated the student contact successfuly"]);

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
            ]);
            return response()->json(['message' => "Created the student contact successfuly"]);
        }
    }

    public function updateStudentContactDetail(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'relationship' => 'required|max:255',
            'mobile' => 'required',
        ]);

        $StudentContact = StudentContact::find($request->id);

        if($StudentContact->relationship != $request->relationship && StudentContact::where('relationship', $request->relationship)->count() > 0){
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
        
        return response()->json(['data' => $StudentContact]);
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

    // public function createPaymentOption(Request $request) {
    //     $this->validate($request, [
    //         'student_id' => 'required',
    //         'plan' => 'required'
    //     ]);

    //     $paymentoption = StudentPaymentOption
    // }

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

    public function saveStudentAttendance(Request $request){
        $this->validate($request, [
            'student_id' => 'required',
            'class_id' => 'required',
            'data' => 'required'
        ]);

        $student = Student::find($request->student_id);
        $class = Classes::find($request->class_id);

        try{
            StudentAttendance::where('student_id', $request->student_id)->where('class_id', $request->class_id)->delete();
    
            foreach($request->data as $item){
                StudentAttendance::create([
                    'student_id' => $request->student_id,
                    'class_id' => $request->class_id,
                    'date' => $item,
                    'status' => 1
                ]);
            }
            return response()->json(['message' => 'Saved successfully']);
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }
    public function saveStudentMakeupAttendance(Request $request){
        $this->validate($request, [
            'student_id' => 'required',
        ]);

        try{
            StudentMakeup::where('student_id', $request->student_id)->update(['status'=> 0]);
            foreach($request->data as $item){
               StudentMakeup::where('date', $item)->where('student_id', $request->student_id)->update(['status'=> 1]);
            }
            return response()->json(['message' => 'Saved makeup/trial successfully']);
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }

    public function saveClassAttendance(Request $request){
        $this->validate($request, [
            'class_id' => 'required',
            // 'attendance' => 'required'
        ]);

        $attendance = $request->attendance;

        foreach($attendance as $item) {
            StudentAttendance::create([
                'student_id' => $item['student_id'],
                'class_id' => $request->class_id,
                'status' => 1,
                'date' => Carbon::createFromFormat('d/m/Y', $item['day'])->format('Y-m-d')
            ]);
        }

        $absent = $request->absent;

        foreach($absent as $item){
            StudentAttendance::where('student_id', $item['student_id'])
                ->where('class_id', $request->class_id)
                ->where('date', Carbon::createFromFormat('d/m/Y', $item['day'])->format('Y-m-d'))
                ->delete();
        }

        return response()->json(['success' => true]);
    }

    public function getClassAttendance(Request $request){
        $this->validate($request, [
            'class_id' => 'required',
            'duration' => 'required',
            // 'first_day' => 'required',
        ]);

        $classId = $request->class_id;

        $class = Classes::find($classId);

        $students = $class->students;

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
        $date = $date->addMonths(2)->endOfMonth();// end day of month
        $last = $date->format("Y-m-d");

        Log::info('last'. $last);

        foreach($students as $student) {
            $attendances_temp = $student->attendanceWeek($request->class_id, $start, $last);
            $attendances = [];
            foreach($attendances_temp as $item) {
                $temp = Carbon::createFromFormat('Y-m-d', $item->date)->format('d/m/Y');
                $attendances[] = $temp;
            }
            $student->days = $attendances;
        }

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

        return response()->json(['attendance' => $students, 'class_id' => $classId, 'class_name' => $class->type , 'term' => $terms, 'start_day' => $start]);
    }

    public function report(Request $request){
        $this->validate($request, [
            'report_type' => 'required'
        ]);

        $User = Auth::user();

        if(is_null($User->userprofile))
            return response()->json(['error' => 'Please fill out profile'], 500);

        $type = $request->report_type;
        try{
            switch($type){
                case 1:
                    $data = $this->getStudentEnrollmentReport();
                break;
                case 2:
                    $data = $this->getStudentFeeReport();
                break;
                case 3:
                    $data = $this->getStudentGradeReport();
                break;
                case 4:
                    $data = $this->getClassReport();
                break;
                case 5:
                    $data = $this->getStaffReport();
                break;
            }
    
            return response()->json(['data' => $data]);
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function getStudentEnrollmentReport(){
        $user = Auth::user();

        $Classes = Classes::where('school_id', $user->school_id)->get();

        foreach($Classes as $class){
            $class->student_count = count($class->students);
        }

        return $Classes;
    }

    public function getStudentFeeReport(){
        $User = Auth::user();

        $Students = Student::with('payment')->where('school_id', $User->school_id)->get();

        return $Students;
    }

    public function getClassReport(){
        $user = Auth::user();

        $Classes = Classes::where('school_id', $user->school_id)->get();

        foreach($Classes as $class){
            $class->student_count = count($class->students);
            preg_match_all('/\d+/', json_encode($class->makeup), $makeup);
            $class->makeup_count = isset($class->makeup)?count($makeup[0]): 0;
        }

        return $Classes;
    }

    public function getStudentGradeReport(){
        $User = Auth::user();

        $Students = Student::where('school_id', $User->school_id)->groupBy('grade')->select(DB::raw('count(*) as student_count, grade'))->get();

        return $Students;
    }

    public function getStaffReport(){
        $user = Auth::user();

        $Coaches = UserProfile::where('school_id', $user->school_id)->get();

        foreach($Coaches as $item){
            $coache = $item->user;
            $item->classes_count = count($coache->classes);
        }

        return $Coaches;
    }
    
}

