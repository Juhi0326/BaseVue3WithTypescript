interface User {
    email: String,
    password: String,
    resetLink?: String,
    role: String,
    userName: String,
    cart?: Array<Object>,
    imagePath?: String,
    accessToken: String,
  }

  export default User