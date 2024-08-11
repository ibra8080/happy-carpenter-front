import axios from "axios";

axios.defaults.baseURL = 'https://happy-carpenter-ebf6de9467cb.herokuapp.com/';
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// Function to get cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Set the CSRF token in the header before each request
axios.interceptors.request.use(
  config => {
    config.headers['X-CSRFToken'] = getCookie('csrftoken');
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
