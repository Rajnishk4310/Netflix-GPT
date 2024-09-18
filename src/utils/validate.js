export const checkValidData = (email, password) => {
    // Email regex to validate email addresses
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const isEmailValid = emailRegex.test(email);
  
    // Password regex to validate password
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const isPasswordValid = passwordRegex.test(password);
  
    // Check if email is valid
    if (!isEmailValid) return "Email ID is not valid";
    
    // Check if password is valid
    if (!isPasswordValid) return "Password is not valid";
  
    return null;
  };
  