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
use App\School;
use App\Classes;
use App\PlayerMember;

use App\Http\Controllers\MerchantPaymentController;

class PlayerApiController extends Controller
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
            'school_name' => 'required|max:255',
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

        if($UserProfile == null){

            if(School::where('name', $request->name)->count() > 0)
                return response()->json(['error' => 'The school exist already'], 500);
            
            $School = School::create([
                'name' => $request->school_name
            ]);

            $UserProfile = UserProfile::create([
                'user_id' => $User->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'address' => $request->address,
                'city' => $request->city,
                'country' => isset($request->country) ? $request->country : null,
                'dob' => substr($request->dob, 0, 10),
                'mobile' => $request->mobile,
                'profile' => isset($request->profile) ? $request->profile : null,
                'suburb' => isset($request->suburb) ? $request->suburb : null,
                'postalcode' => isset($request->postalcode) ? $request->postalcode : null,
                'grade' => 0,
                'school_id' => $School->id
            ]);

            $UserProfile = UserProfile::with('school')->find($UserProfile->id);

            return response()->json(['data' => $UserProfile, 'message' => 'Created new Profile successfully']);
            
        }
        else {

            $UserProfile->first_name = $request->first_name;
            $UserProfile->last_name = $request->last_name;
            $UserProfile->address = $request->address;
            $UserProfile->city = $request->city;
            if(isset($request->country))
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

            // echo Carbon::createFromFormat('d/m/Y', $request->dob);

            $School = $UserProfile->school;
            School::find($School->id)->update(['name' => $request->school_name]);

            $UserProfile = UserProfile::with('school')->find($UserProfile->id);

            return response()->json(['data' => $UserProfile, 'message' => 'Updated the Profile successfully']);
        }

    }
    
    public function requestMember(Request $request) {
        $this->validate($request, [
            'member_plan'=> 'required',
            'member_card'=> 'required',
            // 'member_card'=> 'required|mimes:jpg,png,jpeg|max:50000',
            'member_no' => 'required',
            'id' => 'required'
        ]);
        $user = User::find($request->id);

        $membership = $user->membership;

        if(!isset($membership)) 
            PlayerMember::create([
                'user_id' => $user->id,
                'member_no' => $request->member_no,
                'member_card' => $request->member_card,
                'fee_plan' => $request->member_plan,
                'status' => 0,
                'pay_status' => 0
            ]);

        $member_plan = DB::table('member_fee_plan')->where('id', $request->member_plan)->first();

        return response()->json(['member_fee' => $member_plan->fee]);
    }

    public function payMemberFee(Request $request) {
        $this->validate($request, [
            'card_number' => 'required',
            'expiry' => 'required',
            'cvc' => 'required',
            'fee' => 'required',
            'id' => 'required'
        ]);
        try{
            
            $user = User::find($request->id);

            $userprofile = $user->userprofile;
            $result = (new MerchantPaymentController)->directPayCard($userprofile, $request->all(), $request->fee);
    
            if(!$result['status'])
                return response()->json(['error' => $result['responseData']['responseMessage']], 500);
    
            $membership = $user->membership;
            $membership->pay_status = 1;
            $membership->save();
            
            return response()->json(['success' => true]);
        }catch(Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function addMemberProfileByApp(Request $request) {
        // Log::info('member profile'.json_encode($request));
        // $this->validate($request, [
        //     'id' => 'required',
        //     'first_name' => 'required|max:255',
        //     'last_name' => 'required|max:255',
        //     'address' => 'required|max:255',
        //     'city' => 'required|max:255',
        //     'postalcode' => 'required|max:255',
        //     // 'country' => 'required|max:255',
        //     // 'state' => 'required|max:255',
        //     'dob' => 'required',
        //     'mobile' => 'required',
        //     // 'email' => 'required|email',

        // ]);

        UserProfile::create([
            'user_id' => $request->id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'address' => $request->address,
            'city' => $request->city,
            // 'state' => $request->state,
            // 'country' => $request->country,
            'dob' => substr($request->dob, 0, 10),
            'mobile' => $request->mobile,
            // 'profile' => isset($request->profile) ? $request->profile : null,
            // 'suburb' => isset($request->suburb) ? $request->suburb : null,
            'postalcode' => isset($request->postalcode) ? $request->postalcode : null,
            'grade' => 2,
        ]);

        return response()->json(['success' => true, 'message' => 'Created new Profile successfully']);
    }

}

