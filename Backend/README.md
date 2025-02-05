Here is the updated version of your `README.md` with unnecessary information removed, keeping it clean and to the point:

```markdown
# Backend API Documentation

## Endpoints

### POST /users/login

#### Description
Authenticates an existing user and generates a JWT token for further authentication.

#### Request Body
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

#### Example Request
```json
{
    "email": "user@example.com",
    "password": "securepassword"
}
```

#### Responses

##### Success Response (200 OK)
If the login credentials are correct, the server returns a JWT token and user details.

```json
{
    "token": "your_jwt_token_here",
    "user": {
        "id": "user_id",
        "firstname": "John",
        "lastname": "Doe",
        "email": "user@example.com"
    }
}
```

##### Error Responses

###### 400 Bad Request (Validation Error)
Occurs when the request body does not meet validation rules.

```json
{
    "errors": [
        { "msg": "Invalid Email", "param": "email", "location": "body" },
        { "msg": "Password must be at least 6 characters", "param": "password", "location": "body" }
    ]
}
```

###### 401 Unauthorized (Invalid Credentials)
Occurs when the provided email or password is incorrect.

```json
{
    "message": "Invalid Credentials"
}
```

#### Notes
- The returned JWT token should be included in the `Authorization` header for accessing protected routes.

---

### GET /users/profile

#### Description
Retrieves the profile information of the authenticated user.

#### Authentication
Requires a valid JWT token to be passed in the `Authorization` header or cookies.

#### Success Response (200 OK)
If the user is authenticated, the server returns the user's profile details.

```json
{
    "id": "user_id",
    "firstname": "John",
    "lastname": "Doe",
    "email": "user@example.com"
}
```

##### Error Response (401 Unauthorized)
Occurs if the user is not authenticated or the token is invalid/expired.

```json
{
    "message": "Unauthorized Access"
}
```

---

### GET /users/logout

#### Description
Logs the user out by clearing their authentication token from the cookies and adding the token to a blacklist.

#### Authentication
Requires a valid JWT token to be passed in the `Authorization` header or cookies.

#### Success Response (200 OK)
If the user is successfully logged out, the server will clear the token and return a success message.

```json
{
    "message": "Logout successful"
}
```

##### Error Response (401 Unauthorized)
Occurs if the user is not authenticated or the token is invalid.

```json
{
    "message": "Unauthorized Access"
}
```

---

### Summary of Important Details:
- **Authentication for `/users/profile`**: Requires a valid JWT token.
- **Authentication for `/users/logout`**: Requires a valid JWT token to clear it from the user's session and blacklist it.
```
