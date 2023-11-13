

import axios from 'axios'

export const moviesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.REACT_APP_MOVIE_DB_API_KEY
    }
})


// get token
export const fetchToken = async function() {
    try {
       const {data} = await moviesApi.get('/authentication/token/new') ;
       const token = data.request_token;
       if(data.success) {
              localStorage.setItem('request_token', token)
              window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`
       }

    } catch (error) {
        console.log(error)
    }
}
export const createSessionId = async function () {
    const token = localStorage.getItem('request_token');
    if (token) {
      try {
        const { data } = await moviesApi.post('/authentication/session/new', {
          request_token: token,
        });
        const sessionId =  data.session_id;
        localStorage.setItem('session_id', sessionId);
        return sessionId;
      } catch (error) {
        console.error('Error creating session:', error);
        throw error; // Add this line to throw the error
      }
    }
   
  };