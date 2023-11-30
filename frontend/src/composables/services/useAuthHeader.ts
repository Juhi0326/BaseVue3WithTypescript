export default function authHeader() {
    let user = JSON.parse(localStorage.getItem("user") as string );
    if (user && user.accessToken) { 
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    } 
  }