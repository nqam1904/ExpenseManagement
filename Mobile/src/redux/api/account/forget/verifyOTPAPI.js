import { API_URL } from '../../../../config/Config';

export function verifyOTPAPI(_id, otp) {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({ _id: _id, otp: otp });

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };

   const url = API_URL + '/user/verifyOTP';

   const response = fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => {
         console.log('err sendOTPAPI', error);
         return { error: error };
      });
   return response;
}
