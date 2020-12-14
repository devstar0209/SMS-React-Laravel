import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// const API_BASE_URL = 'http://3.104.51.240/api';
const API_BASE_URL = 'https://387fcabb4553.ngrok.io/api';//vaish
// const API_BASE_URL = 'https://76515d09ce92.ngrok.io/api';

let TOKEN = '';
AsyncStorage.getItem('loggedInUser')
  .then((res) => {
    if (res) {
      var user = JSON.parse(res);
      TOKEN = user.remember_token;
    }
  })

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    axios.post(
      API_BASE_URL + '/app/oauth/token',
      {
        email: email,
        password: password
      }
    )
      .then(function (response) {
        if (response.data.user.remember_token) TOKEN = response.data.user.remember_token;
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}

export const signup = (email, password, role, playerAsMember) => {
  return new Promise((resolve, reject) => {
    axios.post(
      API_BASE_URL + '/app/register',
      {
        email: email,
        password: password,
        role: role,
        is_member: playerAsMember
      }
    )
      .then(function (response) {
        console.log('error: ', response);
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}

export const setPayMethod = (param) => { }

export const updateProfile = (param) => {
  console.log('update profile params: ', param)
  return new Promise((resolve, reject) => {
    axios.post(
      API_BASE_URL + '/profile/update',
      param,
      {
        headers: {
          Authorization: 'Bearer ' + TOKEN,
        }
      }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}

export const addMemberProfile = (param) => {
  return new Promise((resolve, reject) => {
    axios.post(
      API_BASE_URL + '/player/member/profile/add',
      param
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}

export const uploadMembership = (param) => {
  return new Promise((resolve, reject) => {
    axios.post(
      API_BASE_URL + '/player/member/request',
      param
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}

export const payMemberFee = (param) => {
  return new Promise((resolve, reject) => {
    axios.post(
      API_BASE_URL + '/player/member/pay',
      param
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}

////////////////////////////////////////////
export const getClassForTeacher = () => {
  return new Promise((resolve, reject) => {
    axios.get(
      API_BASE_URL + '/teacher/class/list',
      {
        headers: {
          Authorization: 'Bearer ' + TOKEN,
        }
      }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}

export const getAttendance = (id) => {
  return new Promise((resolve, reject) => {
    axios.post(
      API_BASE_URL + '/teacher/attendance/detail',
      {
        id: id
      },
      {
        headers: {
          Authorization: 'Bearer ' + TOKEN,
        }
      }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}

export const setAttendance = (param) => {
  return new Promise((resolve, reject) => {
    axios.post(
      API_BASE_URL + '/teacher/app/attendance/save',
      {
        param: param
      },
      {
        headers: {
          Authorization: 'Bearer ' + TOKEN,
        }
      }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}

/////////////////////////////////////////////////
export const getClass = () => {
  return new Promise((resolve, reject) => {
    axios.get(
      API_BASE_URL + '/classes/list',
      {
        headers: {
          Authorization: 'Bearer ' + TOKEN,
        }
      }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}

export const getBooking = () => {
  return new Promise((resolve, reject) => {
    axios.get(
      API_BASE_URL + '/bookings/list',
      {
        headers: {
          Authorization: 'Bearer ' + TOKEN,
        }
      }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}
/////////////////////////////////////////////////////

export const getKidList = () => {
  return new Promise((resolve, reject) => {
    axios.get(
      API_BASE_URL + '/parent/kid/list',
      {
        headers: {
          Authorization: 'Bearer ' + TOKEN
        }
      }
    )
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export const createKid = (param) => {
  return new Promise((resolve, reject) => {
    axios.post(
      API_BASE_URL + '/parent/kid/create',
      {
        first_name: param.firstName,
        last_name: param.lastName,
        gender: param.gender,
        dob: param.dob,
        age: param.age,
        email: param.email,
        mobile: param.mobile,
        address: param.address,
        suburb: param.suburb,
        city: param.city,
        state: param.state,
        country: param.country,
        class_id: param.classIds
      },
      {
        headers: {
          Authorization: 'Bearer ' + TOKEN,
        }
      }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}

export const updateKid = (param) => {
  return new Promise((resolve, reject) => {
    axios.post(
      API_BASE_URL + '/parent/kid/update',
      {
        id: param.id,
        first_name: param.firstName,
        last_name: param.lastName,
        gender: param.gender,
        dob: param.dob,
        age: param.age,
        email: param.email,
        mobile: param.mobile,
        address: param.address,
        suburb: param.suburb,
        city: param.city,
        state: param.state,
        country: param.country,
        class_id: param.classIds
      },
      {
        headers: {
          Authorization: 'Bearer ' + TOKEN,
        }
      }
    )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}

//////////////////////////////////////
export const setBookingNow = (classId) => {
  return new Promise((resolve, reject) => {
    axios.post(
      API_BASE_URL + '/class/checkout',
      {
        class_id: classId
      },
      {
        headers: {
          Authorization: 'Bearer ' + TOKEN,
        }
      }
    )
      .then(function (response) {      
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
  })
}