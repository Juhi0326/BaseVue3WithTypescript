interface User {
    email: String,
    password: String,
    resetLink?: String,
    role: String,
    userName: String,
    cart?: Array<Object>,
    userImage?: String,
    accessToken: String,
  }

  export default User