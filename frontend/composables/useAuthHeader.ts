import User from '../composables/interfaces/useUserInterface'
export default function authHeader() {

    let user: User = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) { 
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    } 
  }
  