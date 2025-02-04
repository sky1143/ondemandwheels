# Backend API Documentation

## Endpoints

### POST /users/register

#### Description
This endpoint is used to register a new user.

#### Request Body
The request body must be a JSON object containing the following fields:

- `firstname` (string): The first name of the user. Must be at least 3 characters long.
- `lastname` (string, optional): The last name of the user. Must be at least 3 characters long if provided.
- `email` (string): The email address of the user. Must be a valid email address.
- `password` (string): The password for the user. Must be at least 6 characters long.

## Example Response:
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}

    Responses
    201 Created
    Description: User successfully registered.
    Body: A JSON object containing the JWT token and user details.
    Example

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": 1,
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com",
        "socketId": null,
        "createdAt": "2023-10-01T12:34:56.789Z",
        "updatedAt": "2023-10-01T12:34:56.789Z"
    }
}

400 Bad Request
Description: Invalid input data.
Body: A JSON object containing the validation errors.
Example
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Firstname must be at least 3 character",
            "param": "firstname",
            "location": "body"
        },
        {
            "msg": "Password must be at least 6 character",
            "param": "password",
            "location": "body"
        }
    ]
}

### Example Request

curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}'


