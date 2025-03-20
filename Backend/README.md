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


### POST /users/register

#### Description
Registers a new user in the system.

#### Request Body
- `firstname` (string, required): The first name of the user.  
- `lastname` (string, required): The last name of the user.  
- `email` (string, required): The email address of the user. Must be a valid email format.  
- `password` (string, required): The password for the user. Must be at least 6 characters long.  

#### Example Request

```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "user@example.com",
    "password": "securepassword"
}

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


### Endpoints

---

## Captain Routes

### **POST /captains/register**

#### **Description**
Registers a new captain in the system.

#### **Request Body**
| Field             | Type    | Required | Description |
|------------------|---------|----------|-------------|
| `firstname`      | String  | Yes      | First name of the captain. Must be at least 3 characters. |
| `lastname`       | String  | No       | Last name of the captain. |
| `email`          | String  | Yes      | Email address of the captain. Must be a valid email format. |
| `password`       | String  | Yes      | Password for the captain. Must be at least 6 characters. |
| `vehicleColor`   | String  | Yes      | Color of the captain's vehicle. Must be at least 3 characters. |
| `vehiclePlate`   | String  | Yes      | License plate of the captain's vehicle. Must be at least 3 characters. |
| `vehicleCapacity`| Integer | Yes      | Seating capacity of the vehicle. Must be at least 1. |
| `vehicleType`    | Enum    | Yes      | Type of vehicle. Allowed values: `car`, `motorcycle`, `auto`. |

#### **Example Request**
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "password": "securepassword",
    "vehicleColor": "Red",
    "vehiclePlate": "MP 04 AB 1450",
    "vehicleCapacity": 4,
    "vehicleType": "car"
}
```

#### **Responses**

##### **Success Response (201 Created)**
If the registration is successful, the server returns a JWT token and captain details.
```json
{
    "token": "your_jwt_token_here",
    "captain": {
        "id": 1,
        "firstname": "John",
        "lastname": "Doe",
        "email": "johndoe@example.com",
        "vehicleColor": "Red",
        "vehiclePlate": "MP 04 AB 1450",
        "vehicleCapacity": 4,
        "vehicleType": "car",
        "createdAt": "2025-02-06T12:00:00.000Z",
        "updatedAt": "2025-02-06T12:00:00.000Z"
    }
}
```

##### **Error Responses**

###### **400 Bad Request (Validation Error)**
Occurs when the request body does not meet validation rules.
```json
{
    "errors": [
        { "msg": "Invalid Email", "param": "email", "location": "body" },
        { "msg": "Color must be at least 3 characters", "param": "vehicleColor", "location": "body" }
    ]
}
```

###### **400 Bad Request (Captain Already Exists)**
Occurs if the captain is already registered with the same email.
```json
{
    "message": "Captain is Already exists"
}
```

###### **500 Internal Server Error**
Occurs if there is an unexpected error on the server.
```json
{
    "message": "Internal Server Error"
}
```


## Captain Routes

### **POST /captains/register**

#### Description
Registers a new captain in the system.

#### Request Body
| Field             | Type    | Required | Description |
|-------------------|---------|----------|-------------|
| `firstname`       | String  | Yes      | First name of the captain. Must be at least 3 characters. |
| `lastname`        | String  | No       | Last name of the captain. |
| `email`           | String  | Yes      | Email address of the captain. Must be a valid email format. |
| `password`        | String  | Yes      | Password for the captain. Must be at least 6 characters. |
| `vehicleColor`    | String  | Yes      | Color of the captain's vehicle. Must be at least 3 characters. |
| `vehiclePlate`    | String  | Yes      | License plate of the captain's vehicle. Must be at least 3 characters. |
| `vehicleCapacity` | Integer | Yes      | Seating capacity of the vehicle. Must be at least 1. |
| `vehicleType`     | Enum    | Yes      | Type of vehicle. Allowed values: `car`, `motorcycle`, `auto`. |

#### Example Request
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "password": "securepassword",
    "vehicleColor": "Red",
    "vehiclePlate": "MP 04 AB 1450",
    "vehicleCapacity": 4,
    "vehicleType": "car"
}
```

#### Responses

##### **Success Response (201 Created)**
If the registration is successful, the server returns a JWT token and captain details.
```json
{
    "token": "your_jwt_token_here",
    "captain": {
        "id": 1,
        "firstname": "John",
        "lastname": "Doe",
        "email": "johndoe@example.com",
        "vehicleColor": "Red",
        "vehiclePlate": "MP 04 AB 1450",
        "vehicleCapacity": 4,
        "vehicleType": "car",
        "createdAt": "2025-02-06T12:00:00.000Z",
        "updatedAt": "2025-02-06T12:00:00.000Z"
    }
}
```

##### **Error Responses**

###### **400 Bad Request (Validation Error)**
Occurs when the request body does not meet validation rules.
```json
{
    "errors": [
        { "msg": "Invalid Email", "param": "email", "location": "body" },
        { "msg": "Color must be at least 3 characters", "param": "vehicleColor", "location": "body" }
    ]
}
```

###### **400 Bad Request (Captain Already Exists)**
Occurs if the captain is already registered with the same email.
```json
{
    "message": "Captain is Already exists"
}
```

###### **500 Internal Server Error**
Occurs if there is an unexpected error on the server.
```json
{
    "message": "Internal Server Error"
}
```

---

### **POST /captains/login**

#### Description
Authenticates an existing captain and generates a JWT token for further authentication.

#### Request Body
- `email` (string, required): The email address of the captain. Must be a valid email format.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.

#### Example Request
```json
{
    "email": "johndoe@example.com",
    "password": "securepassword"
}
```

#### Responses

##### Success Response (200 OK)
If the login credentials are correct, the server returns a JWT token and captain details.
```json
{
    "token": "your_jwt_token_here",
    "captain": {
        "id": 1,
        "firstname": "John",
        "lastname": "Doe",
        "email": "johndoe@example.com",
        "vehicleColor": "Red",
        "vehiclePlate": "MP 04 AB 1450",
        "vehicleCapacity": 4,
        "vehicleType": "car"
    }
}
```

##### Error Responses

###### **400 Bad Request (Validation Error)**
Occurs when the request body does not meet validation rules.
```json
{
    "errors": [
        { "msg": "Invalid Email", "param": "email", "location": "body" },
        { "msg": "Password must be at least 6 characters", "param": "password", "location": "body" }
    ]
}
```

###### **401 Unauthorized (Invalid Credentials)**
Occurs when the provided email or password is incorrect.
```json
{
    "message": "Invalid Credentials"
}
```

---

### **GET /captains/profile**

#### Description
Retrieves the profile information of the authenticated captain.

#### Authentication
Requires a valid JWT token to be passed in the `Authorization` header or cookies.

#### Success Response (200 OK)
If the captain is authenticated, the server returns the captain's profile details.
```json
{
    "id": 1,
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "vehicleColor": "Red",
    "vehiclePlate": "MP 04 AB 1450",
    "vehicleCapacity": 4,
    "vehicleType": "car"
}
```

##### Error Response (401 Unauthorized)
Occurs if the captain is not authenticated or the token is invalid/expired.
```json
{
    "message": "Unauthorized Access"
}
```

---

### **POST /captains/logout**

#### Description
Logs the captain out by clearing their authentication token from the cookies and adding the token to a blacklist.

#### Authentication
Requires a valid JWT token to be passed in the `Authorization` header or cookies.

#### Success Response (200 OK)
If the captain is successfully logged out, the server will clear the token and return a success message.
```json
{
    "message": "Logout successful"
}
```

##### Error Response (401 Unauthorized)
Occurs if the captain is not authenticated or the token is invalid.
```json
{
    "message": "Unauthorized Access"
}
```

---

## Summary of Important Details:
- **Authentication for `/users/profile`**: Requires a valid JWT token.
- **Authentication for `/users/logout`**: Requires a valid JWT token to clear it from the user's session and blacklist it.
- **Validation for `/captains/register`**: Requires all required fields to be present and valid.
- **Error Handling**: Includes validation errors, duplicate entries, and unexpected failures.
- **JWT Token**: A token is returned upon successful registration for authentication.
- **Authentication for `/captains/profile`**: Requires a valid JWT token.
- **Authentication for `/captains/logout`**: Requires a valid JWT token to clear it from the captain's session and blacklist it.
- **Validation for `/captains/register`**: Requires all required fields to be present and valid.
- **Error Handling**: Includes validation errors, duplicate entries, and unexpected failures.
- **JWT Token**: A token is returned upon successful registration and login for authentication.
```

