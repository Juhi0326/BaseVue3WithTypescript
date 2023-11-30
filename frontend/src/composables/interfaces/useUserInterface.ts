interface User {
    email: string,
    password: string,
    resetLink?: string,
    role: string,
    userName: string,
    cart?: Array<Object>,
    userImage?: string,
    accessToken: string,
    userId: string
  }

  export default User