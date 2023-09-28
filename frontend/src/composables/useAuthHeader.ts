import User from '../composables/interfaces/useUserInterface'
export default function authHeader() {

    let user: User = JSON.parse(localStorage.getItem("user") as string);
    if (user && user.accessToken) { 
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    } 
  }
  