<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Log;
use Auth;
use Hash;
use Storage;
use Setting;
use Exception;
use Notification;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use App\Notifications\ResetPasswordOTP;

use App\User;
use App\UserProfile;
use App\UserPayment;
use App\Classes;

use App\Http\Controllers\MerchantPaymentController;


class UserApiController extends Controller
{
    public function authenticate(Request $request)
    {
        $this->validate($request, [
                'social_unique_id' => ['required_if:login_by,facebook,google','unique:users'],
                'login_by' => 'in:manual,facebook,google',
                'email' => 'required|email',
                'password' => 'required',
                'role' => 'required'
            ]);

        $role = $request->role['value'];

        $credentials = $request->only('email', 'password');
        // try {
            if (!Auth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid email or password'], 401);
            }
        // } catch (JWTException $e) {
        //     // something went wrong whilst attempting to encode the token
        //     return response()->json(['error' => 'could_not_create_token'], 500);
        // }
        
        $user = Auth::user();

        if($user->grade != $role)
            return response()->json(['error' => 'Invalid user'], 500);

        $user->remember_token = $user->createToken('user')->accessToken;
        $user->save();
        
        $userpayment = $user->payment;
        $userprofile = $user->userprofile;
        
        // $user->is_payment = false;
        $user1 = array(
            'email' => $user->email,
            'username' => $user->username,
            'grade' => $role,
            'userprofile' => isset($userprofile) ? array(
                    'first_name' => $userprofile->first_name,
                    'last_name' => $userprofile->last_name,
                    'profile' => $userprofile->profile,
                    'school_name' => $userprofile->school_name,
                ): null,
            'payment' => isset($userpayment)? array('id' => $userpayment->id): null
            );
            return response()->json(['token' => $user->remember_token, 'user' => $user1]);

    }

    public function authenticateApp(Request $request)
    {
        $this->validate($request, [
                'social_unique_id' => ['required_if:login_by,facebook,google','unique:users'],
                'login_by' => 'in:manual,facebook,google',
                'email' => 'required|email',
                'password' => 'required',
            ]);

        $credentials = $request->only('email', 'password');
        // try {
            if (!Auth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        // } catch (JWTException $e) {
        //     // something went wrong whilst attempting to encode the token
        //     return response()->json(['error' => 'could_not_create_token'], 500);
        // }
        
        $user = Auth::user();

        $user->remember_token = $user->createToken('user')->accessToken;
        $user->save();
        
        $user->payment;
        $user->userprofile;
        
        return response()->json(['user' => $user]);

    }
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */

    public function signup(Request $request)
    {
        $this->validate($request, [
                // 'username' => 'required|max:255',
                'email' => 'required|email|max:255',
                'password' => 'required|min:6',
                'role' => 'required'
            ]);
        $role = $request->role['value'];
        try{

            if(User::where('email', $request->email)->where('grade', $role)->count() > 0)
                return response()->json(['error' => 'The user exist already'], 500);
            
            $data = $request->all();

            $data['password'] = bcrypt($request->password);
            $data['grade'] = $role;
            $user = User::create($data);

            $data['user_id'] = $user->id;
            UserProfile::create($data);

            return response()->json(['success' => true, 'is_member' => $request->is_member, 'id' => $user->id]);
        } catch (Exception $e) {
             return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */

    public function change_password(Request $request){

        $this->validate($request, [
                'password' => 'required|confirmed|min:6',
                'old_password' => 'required',
            ]);

        $User = Auth::user();

        if(Hash::check($request->old_password, $User->password))
        {
            $User->password = bcrypt($request->password);
            $User->save();

            if($request->ajax()) {
                return response()->json(['message' => trans('api.user.password_updated')]);
            }else{
                return back()->with('flash_success', 'Password Updated');
            }

        } else {
            if($request->ajax()) {
                return response()->json(['error' => trans('api.user.change_password')], 500);
            }else{
                return back()->with('flash_error',trans('api.user.change_password'));
            }
        }

    }

    public function registerParent(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            'country' => 'required|max:255',
            // 'dob' => 'required',
            'postalcode' => 'required',
            'mobile' => 'required',
            'password' => 'required|min:6',
            'email' => 'required|email',
        ]);

        if(User::where('email', $request->email)->count() > 0)
            return response()->json(['error' => 'The Email exist already'], 500);

        $Parent = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'grade' => 3,
        ]);

        $UserProfile = UserProfile::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'address' => $request->address,
            'city' => $request->city,
            'country' => $request->country,
            'dob' => substr($request->dob, 0, 10),
            'mobile' => $request->mobile,
            'suburb' => isset($request->suburb) ? $request->suburb : null,
            'postalcode' =>  $request->postalcode,
            'user_id' => $Parent->id,
            'grade' => 1
        ]);
        
        return response()->json(['success' => true]);
    }

    public function registerPlayer(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            // 'country' => 'required|max:255',
            'dob' => 'required',
            'postalcode' => 'required',
            'mobile' => 'required',
            'password' => 'required|min:6',
            'email' => 'required|email|unique:users',
        ]);

        if(User::where('email', $request->email)->count() > 0)
            return response()->json(['error' => 'The Email exist already'], 500);

        $player = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'grade' => 2,
        ]);
        
        UserProfile::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'address' => $request->address,
            'city' => $request->city,
            // 'country' => $request->country,
            // 'state' => $request->state,
            'dob' => substr($request->dob, 0, 10),
            'mobile' => $request->mobile,
            // 'profile' => isset($request->profile) ? $request->profile : null,
            'suburb' => isset($request->suburb) ? $request->suburb : null,
            'postalcode' =>  $request->postalcode,
            'user_id' => $player->id,
            'grade' => 2,
        ]);

        // if($request->is_member) {

        //     $player->remember_token = $player->createToken('user')->accessToken;
        //     $player->save();

        //     $userpayment = $player->payment;
        //     $userprofile = $player->userprofile;
            
        //     // $user->is_payment = false;
        //     $user1 = array(
        //         'email' => $player->email,
        //         'username' => $player->username,
        //         'grade' => $player->grade,
        //         'userprofile' => isset($userprofile) ? array(
        //                 'first_name' => $userprofile->first_name,
        //                 'last_name' => $userprofile->last_name,
        //                 'profile' => $userprofile->profile,
        //             ): null,
        //         'payment' => isset($userpayment)? array('id' => $userpayment->id): null
        //         );
        //         return response()->json(['token' => $player->remember_token, 'is_member' => $request->is_member, 'user' => $user1]);
        // }
        
        return response()->json(['is_member' => $request->is_member, 'id' => $player->id]);
    }

    public function app_register(Request $request) {
        $this->validate($request, [
            'role' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if(User::where('role', $request->role)->where('email', $request->email)->count() > 0)
            return response()->json(['error' => 'The Email exist already'], 500);

        try{
            
            $user = User::create([
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'grade' => $request->role,
            ]);

            return response()->json(['is_member' => $request->is_member, 'id' => $user->id, 'success' => true]);

        }catch(Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }

   
    public function getProfileDetail(Request $request)
    {
        $user = Auth::user();
        if($user->userprofile == null)
            $user->userprofile=[];
        else
            $user->userprofile->email = $user->email;
        $user->payment;

        return response()->json(['data' => $user]);
    }

    public function updateProfileDetail(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            'postalcode' => 'required|max:255',
            'country' => 'required|max:255',
            'state' => 'required|max:255',
            // 'dob' => 'required',
            'mobile' => 'required',
            'email' => 'required|email',

        ]);

        $User = Auth::user();

        $data = $request->all();

        $UserProfile = UserProfile::where('user_id', $User->id)->first();

        if($request->email != $User->email)
            if(User::where('email', $request->email)->count() > 0)
                return response()->json(['error' => 'The Email exist already'], 500);
            else
                $User->update(['email' => $request->email]);

        if($UserProfile == null){

            // if(School::where('name', $request->name)->count() > 0)
            //     return response()->json(['error' => 'The school exist already'], 500);
            
            // $School = School::create([
            //     'name' => $request->school_name
            // ]);

            UserProfile::create([
                'user_id' => $User->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'country' => $request->country,
                'dob' => isset($request->dob)?substr($request->dob, 0, 10): null,
                'mobile' => $request->mobile,
                'profile' => isset($request->profile) ? $request->profile : null,
                'suburb' => isset($request->suburb) ? $request->suburb : null,
                'postalcode' => isset($request->postalcode) ? $request->postalcode : null,
                'grade' => 0,
            ]);

            $User->userprofile;
            $User->payment;
            return response()->json(['data' => $User, 'message' => 'Created new Profile successfully']);
            
        }
        else {

            $UserProfile->first_name = $request->first_name;
            $UserProfile->last_name = $request->last_name;
            $UserProfile->address = $request->address;
            $UserProfile->city = $request->city;
            $UserProfile->state = $request->state;
            $UserProfile->country = $request->country;
            if(isset($request->dob))
                $UserProfile->dob = substr($request->dob, 0, 10);
            $UserProfile->mobile = $request->mobile;
            // if(isset($request->profile))
                $UserProfile->profile = $request->profile;
            if(isset($request->suburb))
                $UserProfile->suburb = $request->suburb;
            if(isset($request->postalcode))
                $UserProfile->postalcode = $request->postalcode;
            if(isset($request->school_name))
                $UserProfile->school_name = $request->school_name;
            $UserProfile->save();

            // echo Carbon::createFromFormat('d/m/Y', $request->dob);

            // $School = $UserProfile->school;
            // School::find($School->id)->update(['name' => $request->school_name]);

            $User->userprofile;
            $User->payment;

            return response()->json(['data' => $User, 'message' => 'Updated the Profile successfully']);
        }

    }

    public function updateCardPaymentDetail(Request $request) {
        $this->validate($request, [
            'customer_name' => 'required',
            'card_no' => 'required',
            'card_expiry' => 'required',
            'card_cvc' => 'required',
        ]);

        $user = Auth::user();

        $card_no = $request->card_no;
        $card_expiry = $request->card_expiry;
        $card_cvc = $request->card_cvc;
        $customer_name = $request->customer_name;

        $userpayment = UserPayment::where('user_id', $user->id)->first();

        try{
            if(isset($userpayment)){
                    $result = (new MerchantPaymentController)->addCard($card_no, $card_expiry, $card_cvc, $customer_name);
                    
                    if($result['status']) {
                        $cardId = $result['responseData']['cardID'];
                        $cardNumber = $result['responseData']['cardNumber'];
                        if(isset($userpayment)){
                            $userpayment->card_id = $cardId;
                            $userpayment->card_alias = $cardNumber;
                            $userpayment->customer_name = $customer_name;
                            $userpayment->save();

                        }

                    }
                    else{
                        return response()->json(['error' => $result['responseData']['responseMessage']], 500);
                    }
               
                $user->userprofile;
                $user->payment;
                return response()->json(['message' => 'Updated payment', 'data' => $user]);
            }else {
                $result = (new MerchantPaymentController)->addCard($card_no, $card_expiry, $card_cvc, $customer_name);
                
                if($result['status']) {
                    $cardId = $result['responseData']['cardID'];
                    $cardNumber = $result['responseData']['cardNumber'];
                    $userpayment = UserPayment::create([
                        'card_id' => $cardId,
                        'card_alias' => $cardNumber,
                        'customer_name' => $customer_name,
                        'user_id' => $user->id,
                    ]);

                    $user->userprofile;
                    $user->payment;
                }
                else{
                    return response()->json(['error' => $result['responseData']['responseMessage']], 500);
                }
                

                return response()->json(['message' => 'Added payment', 'data' => $user]);
            }
            
        
        }catch(Exception $e) {
            Log::info("payment: " . $e->getMessage());
            return response()->json(['error' => 'Something wrong'], 500);
        }
 
    }

    public function updateCardPayframe(Request $request) {
        $this->validate($request, [
            'cardId' => 'required',
            'cardAlias' => 'required'
        ]);

        $user = Auth::user();
        $userpayment = UserPayment::where('user_id', $user->id)->first();
        
        if(isset($userpayment)) {
            $userpayment->card_id = $request->cardId;
            $userpayment->card_alias = $request->cardAlias;
            $userpayment->save();
        }
        else {
            UserPayment::create([
                'user_id' => $user->id,
                'card_id' => $request->cardId,
                'card_alias' => $request->cardAlias
            ]);
        }

        return response()->json(['message' => 'Added payment', 'data' => $user]);

    }

    public function updateBankPaymentDetail(Request $request) {

        $this->validate($request, [
            'account_name' => 'required',
            'account_no' => 'required',
            'bsb' => 'required',
        ]);

        $user = Auth::user();

        $account_name = $request->account_name;
        $account_no = $request->account_no;
        $bsb = $request->bsb;
        
        $userpayment = UserPayment::where('user_id', $user->id)->first();
        try{
            if(isset($userpayment)){
    
                if(isset($userpayment)){
                    $userpayment->account_name = $account_name;
                    $userpayment->account_no = $account_no;
                    $userpayment->bsb = $bsb;
                    $userpayment->save();
                }

                $user->userprofile;
                $user->payment;

                return response()->json(['message' => 'Updated payment', 'data' => $user]);
            }else {
                $userpayment = UserPayment::create([
                    'user_id' => $user->id,
                    'account_name' => $account_name,
                    'account_no' => $account_no,
                    'bsb' => $bsb,
                ]);

                $user->userprofile;
                $user->payment;

                return response()->json(['message' => 'Added payment', 'data' => $user]);
            }
            
        
        }catch(Exception $e) {
            Log::info("payment: " . $e->getMessage());
            return response()->json(['error' => 'Something wrong'], 500);
        }
 
    }

    /**
     * Forgot Password.
     *
     * @return \Illuminate\Http\Response
     */


    public function forgot_password(Request $request){

        $this->validate($request, [
                'email' => 'required|email|exists:users,email',
            ]);

        try{  
            Log::info('New Request for password reset');
            $user = User::where('email' , $request->email)->first();

            $otp = mt_rand(100000, 999999);

            $user->otp = $otp;
            $user->save();

            Notification::send($user, new ResetPasswordOTP($otp));

            return response()->json([
                'message' => 'OTP sent to your email!',
                'user' => $user
            ]);

        }catch(Exception $e){
                return response()->json(['error' => trans('api.something_went_wrong')], 500);
        }
    }


    /**
     * Reset Password.
     *
     * @return \Illuminate\Http\Response
     */

    public function reset_password(Request $request){

        $this->validate($request, [
                'password' => 'required|confirmed|min:6',
                'id' => 'required|numeric|exists:users,id'

            ]);

        try{

            $User = User::findOrFail($request->id);
            // $UpdatedAt = date_create($User->updated_at);
            // $CurrentAt = date_create(date('Y-m-d H:i:s'));
            // $ExpiredAt = date_diff($UpdatedAt,$CurrentAt);
            // $ExpiredMin = $ExpiredAt->i;
            $User->password = bcrypt($request->password);
            $User->save();
            if($request->ajax()) {
                return response()->json(['message' => 'Password Updated']);
            }
           
            

        }catch (Exception $e) {
            if($request->ajax()) {
                return response()->json(['error' => trans('api.something_went_wrong')]);
            }
        }
    }

    public function getClassesList(Request $request)
    {

        // $classes = Classes::where('min_age', '>=', 10)->get();
        // return response()->json(['data' => $classes]);
        // DB::table('classes_user')->where('')->count();
        try{
            $user = Auth::user();
            if($user->grade == 2)
                $classes = Classes::where('min_age', '>=', 18)->get();
            if($user->grade == 3)
                $classes = Classes::where('max_age', '<', 18)->get();
            // $temp = [];
    
            // foreach($classes as $class) {
            //     $count = count($class->students);
            //     if($class->max_no > $count)
            //         $temp[] = $class;
            // }

            return response()->json(['data' => $classes]);
        }catch(Exception $e) {
            Log::info('get class list: '.$e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }

    public function bookingClasses(Request $request) {
        $user = Auth::user();

        $classes = $user->classes;

        return response()->json(['data' => $classes]);
    }


    /**
     * Show the email availability.
     *
     * @return \Illuminate\Http\Response
     */

    public function verify(Request $request)
    {
        $this->validate($request, [
                'email' => 'required|email|max:255|unique:users',
            ]);

        try{
            
            return response()->json(['message' => trans('api.email_available')]);

        } catch (Exception $e) {
             return response()->json(['error' => trans('api.something_went_wrong')], 500);
        }
    }

}
