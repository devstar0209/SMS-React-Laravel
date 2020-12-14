<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// use App\Http\Controllers\UserApiController;
// use Illuminate\Routing\Route;

Route::get('/test', function() {
	try {
		\DB::connection()->getPdo();
	} catch (\Exception $e) {
		die("Could not connect to the database.  Please check your configuration. error:" . $e );
	}
	return;
});

Route::post('/oauth/token', 		'UserApiController@authenticate');
Route::post('/app/oauth/token', 	'UserApiController@authenticateApp');
Route::post('teacher/oauth/token', 	'UserApiController@authenticateTeacher');

Route::post('/signup' , 			'UserApiController@signup');

Route::post('/auth/facebook', 		'Auth\SocialLoginController@facebookViaAPI');
Route::post('/forgot/password',     'UserApiController@forgot_password');
Route::post('/reset/password',      'UserApiController@reset_password');

Route::post('parent/register', 		'UserApiController@registerParent');
Route::post('register/teacher', 	'UserApiController@registerTeacher');
Route::post('register/player', 		'UserApiController@registerPlayer');
Route::post('app/register', 		'UserApiController@app_register');

Route::group(['prefix' => 'player'], function () {
	Route::post('/member/request', 				'PlayerApiController@requestMember');
	Route::post('/member/pay', 					'PlayerApiController@payMemberFee');
	Route::post('/member/profile/add', 			'PlayerApiController@addMemberProfileByApp');
	
});

Route::group(['middleware' => ['auth:api']], function () {

	// user profile
	Route::post('/change/password' , 					'UserApiController@change_password');
	Route::post('/update/location' , 					'UserApiController@update_location');

	Route::post('/profile/update', 						'UserApiController@updateProfileDetail');
	Route::get('/profile/detail', 						'UserApiController@getProfileDetail');

	Route::post('/profile/payment/card/update', 		'UserApiController@updateCardPaymentDetail');
	Route::post('/profile/payment/bank/update', 		'UserApiController@updateBankPaymentDetail');
	Route::post('/profile/payment/card/payframe', 		'UserApiController@updateCardPayframe');

	Route::post('/class/checkout', 						'MerchantPaymentController@checkoutClass');
	Route::get('/bookings/list', 						'UserApiController@bookingClasses');
	Route::get('/classes/list', 						'UserApiController@getClassesList');
	
	Route::group(['prefix' => 'admin'], function () {

		Route::get('/coache/list', 					'AdminApiController@getCoacheList');
		Route::get('/coache/detail', 				'AdminApiController@getCoacheDetail');
		Route::post('/coache/create', 				'AdminApiController@createCoacheDetail');
		Route::post('/coache/update', 				'AdminApiController@updateCoacheDetail');
		Route::post('/coache/delete', 				'AdminApiController@deleteCoacheDetail');
		
		Route::get('/player/list', 					'AdminApiController@getPlayerList');
		Route::get('/player/detail', 				'AdminApiController@getPlayerDetail');
		Route::post('/player/update', 				'AdminApiController@updatePlayerDetail');
		Route::post('/player/delete', 				'AdminApiController@deletePlayerDetail');
		Route::post('/player/approve', 				'AdminApiController@approvePlayer');
		
		Route::post('/member/approve', 				'AdminApiController@approveMember');

		Route::get('/class/list', 					'AdminApiController@getClassList');
		Route::get('/class/detail', 				'AdminApiController@getClassDetail');
		Route::post('/class/create', 				'AdminApiController@createClassDetail');
		Route::post('/class/update', 				'AdminApiController@updateClassDetail');
		Route::post('/class/delete', 				'AdminApiController@deleteClassDetail');
		Route::post('/class/coaches', 				'AdminApiController@getClassCoaches');

		Route::get('/event/list', 					'AdminApiController@getEventList');
		Route::get('/event/detail', 				'AdminApiController@getEventDetail');
		Route::post('/event/create', 				'AdminApiController@createEventDetail');
		Route::post('/event/update', 				'AdminApiController@updateEventDetail');
		Route::post('/event/delete', 				'AdminApiController@deleteEventDetail');
		Route::post('/event/coaches', 				'AdminApiController@getEventCoaches');

		Route::get('/student/list', 				'AdminApiController@getStudentList');
		Route::get('/student/detail', 				'AdminApiController@getStudentDetail');
		Route::post('/student/create', 				'AdminApiController@createStudentDetail');
		Route::post('/student/update', 				'AdminApiController@updateStudentDetail');
		Route::post('/student/delete', 				'AdminApiController@deleteStudentDetail');

		Route::get('/student/contact/detail', 		'AdminApiController@getStudentContactDetail');
		Route::post('/student/contact/create', 		'AdminApiController@createStudentContactDetail');
		Route::post('/student/contact/update', 		'AdminApiController@updateStudentContactDetail');
		Route::post('/student/contact/delete', 		'AdminApiController@deleteStudentContactDetail');

		Route::get('/student/payment/detail', 		'MerchantPaymentController@getStudentPaymentDetail');
		Route::post('/student/payment/create', 		'MerchantPaymentController@createStudentPaymentDetail');
		Route::post('/student/payment/update', 		'MerchantPaymentController@updateStudentPaymentDetail');
		Route::post('/student/payment/delete', 		'MerchantPaymentController@deleteStudentPaymentDetail');

		Route::post('/student/checkout', 			'MerchantPaymentController@checkout');// it has issue, not use now
		Route::post('student/paymentoption/create',	'AdminApiController@createPaymentOption'); // not use

		Route::post('/student/attendance', 			'AdminApiController@getStudentAttendanceHistory');
		Route::post('/student/attendance/save', 	'AdminApiController@saveStudentAttendance');
		Route::post('/student/makeup/save', 		'AdminApiController@saveStudentMakeupAttendance');
		Route::get('dashboard/init',				'AdminApiController@dashboard');
		Route::get('report', 						'AdminApiController@report');

		Route::post('/attendance/save',				'AdminApiController@saveClassAttendance');
		Route::post('/attendance/detail',			'AdminApiController@getClassAttendance');
	});

	Route::group(['prefix' => 'parent'], function () {

		Route::get('/event/list', 					'ParentApiController@getEventList');
		Route::get('/event/detail', 				'ParentApiController@getEventDetail');

		Route::get('/kid/list', 					'ParentApiController@getStudentList');
		Route::post('/kid/create', 					'ParentApiController@createStudent');
		Route::get('/kid/detail', 					'ParentApiController@getStudentDetail');
		Route::post('/kid/update', 					'ParentApiController@updateStudentDetail');
		
		Route::post('/kid/contact/update', 			'ParentApiController@updateStudentContactDetail');
		Route::post('/kid/contact/delete', 			'ParentApiController@deleteStudentContactDetail');
		
		Route::post('/booking/list', 				'ParentApiController@getBookingClassesList');
		Route::get('/classes/list', 				'ParentApiController@getClassesList');

		Route::get('/kid/payment/detail', 			'MerchantPaymentController@getStudentPaymentDetail');
		Route::post('/kid/payment/create', 			'MerchantPaymentController@createStudentPaymentDetail');
		Route::post('/kid/payment/update', 			'MerchantPaymentController@updateStudentPaymentDetail');
		Route::post('/kid/payment/delete', 			'MerchantPaymentController@deleteStudentPaymentDetail');

		Route::post('/kid/checkout', 				'MerchantPaymentController@checkout');
		Route::post('kid/paymentoption/create',		'ParentApiController@createPaymentOption');

		Route::post('/kid/attendance', 				'ParentApiController@getStudentAttendanceHistory');

		Route::get('/event/list', 					'ParentApiController@getEventList');
		Route::get('/event/detail', 				'ParentApiController@getEventDetail');

	});

	Route::group(['prefix' => 'teacher'], function () {
		
		Route::get('/class/list', 					'TeacherApiController@getClassList');
		Route::get('/class/detail', 				'TeacherApiController@getClassDetail');
		
		Route::post('/attendance/save',				'TeacherApiController@saveClassAttendance');
		Route::post('/app/attendance/save',			'TeacherApiController@saveAppClassAttendance');
		Route::post('/attendance/detail',			'TeacherApiController@getClassAttendance');
		Route::post('/attendance/prev',				'TeacherApiController@getPrevClassAttendance');
		Route::post('/attendance/next',				'TeacherApiController@getNextClassAttendance');
		Route::post('/attendance/today',			'TeacherApiController@getClassAttendance');

		Route::get('/event/list', 					'TeacherApiController@getEventList');
		Route::get('/event/detail', 				'TeacherApiController@getEventDetail');

		Route::get('/student/list', 				'TeacherApiController@getStudentList');
		Route::get('/student/detail', 				'TeacherApiController@getStudentDetail');

		Route::get('/student/contact/detail', 		'TeacherApiController@getStudentContactDetail');

		Route::get('/student/payment/detail', 		'MerchantPaymentController@getStudentPaymentDetail');
	});
});
