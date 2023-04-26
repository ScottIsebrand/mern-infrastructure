// The users-service.js module will definitely need to make AJAX requests to the Express server.
// The logic of making the HTTP request is in this file

import { getToken } from './users-service';

// * SignUpForm/SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)

// * handleSubmit <--> [signUp]users-service.js <--> [signUp]users-api.js <-Internet-> server.js (Express), then back to api, then service...

// This is the base path of the Express route we'll define
const BASE_URL = '/api/users';

// SignUp
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

// Login
export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}
// Check token
export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

// Helper Functions
async function sendRequest(url, method = 'GET', payload = null) {
  console.log('>>>>>>>>>: ', payload);
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  // Send token to backend
  const token = getToken();

  if (token) {
    // Ensure the headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}
