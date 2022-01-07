# SignUp User

## Use Case
  - Receive a **POST** request in **/api/signup/** route
  - Check if **name, email, password and confirmPassword** 
  - Check if password and confirmPassword are equals
  - Check if email is valid
  - Check if exists a registred user with email candidate
  - Encrypt password
  - Save new user in database with encrypted password
  - Returns status code 201

## Exceptions
  - Returns 404 if api does not exists
  - Returns 400 if user cadidate date is invalid
  - Returns 403 if email candidate is already in use
  - Returns 500 if an error occurs in encrypt process
  - Returns 500 if an error occurs when save new user
