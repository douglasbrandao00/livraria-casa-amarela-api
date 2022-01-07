# Login
  ## Use Case
   - Receive a **POST** request in **/api/login/** 
   - Check if **email** and **password** are valid
   - Search user by email
   - Compare password candidate with database password
   - Generate a token and store it
   - return status code 200 and nom sensitive user data

   ## Exceptions

    - Return 404 is api does not exists
    - Return 400 if email or password are not valid
    - Return 401 if email is not registred
    - return 500 if a error occurs in token generationo
    - return 500 if a error occurs in store user token
