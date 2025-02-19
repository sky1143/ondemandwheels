
# Odwx - Ride-Hailing Application

Odwx is a ride-hailing application that allows users to book rides and captains (drivers) to accept and fulfill ride requests. The application is built using React, GSAP for animations, and Axios for API communication. It includes user and captain authentication, ride booking, and real-time ride tracking.

## Features

### User Features
- **User Authentication**: Users can sign up, log in, and log out.
- **Ride Booking**: Users can search for pickup and destination locations, select a vehicle type, and confirm a ride.
- **Real-Time Ride Tracking**: Users can track their ride in real-time once a captain accepts the request.
- **Profile Management**: Users can view and manage their profile information.

### Captain Features
- **Captain Authentication**: Captains can sign up, log in, and log out.
- **Ride Acceptance**: Captains can accept ride requests from users.
- **Vehicle Management**: Captains can register their vehicle details (color, plate number, capacity, and type).
- **Profile Management**: Captains can view and manage their profile information.

### Shared Features
- **Protected Routes**: Both user and captain routes are protected, ensuring only authenticated users can access them.
- **Responsive Design**: The application is designed to work seamlessly across different devices.

## Technologies Used
- **React**: Frontend library for building user interfaces.
- **GSAP (GreenSock Animation Platform)**: For smooth animations and transitions.
- **Axios**: For making HTTP requests to the backend API.
- **React Router**: For navigation and routing within the application.
- **Context API**: For state management across components.
- **Local Storage**: For storing authentication tokens.

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your machine.

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/odwx-ride-hailing-app.git
   cd odwx-ride-hailing-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   VITE_BASE_URL=your-backend-api-url
   ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
odwx-ride-hailing-app/
├── src/
│   ├── assets/               # Static assets like images and logos
│   ├── components/           # Reusable components
│   ├── context/              # Context providers for state management
│   ├── pages/                # Application pages
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Entry point
├── .env                      # Environment variables
├── package.json              # Project dependencies and scripts
├── README.md                 # Project documentation
```

## Components

### User Components
- **Home**: Main page for ride booking.
- **LocationSearchPanel**: Panel for searching pickup and destination locations.
- **VehiclePanel**: Panel for selecting a vehicle type.
- **ConfirmRide**: Panel for confirming ride details.
- **LookingForDriver**: Panel displayed while searching for a captain.

### Captain Components
- **CaptainHome**: Main page for captains to accept ride requests.
- **CaptainLogin**: Login page for captains.
- **CaptainSignup**: Signup page for captains.

### Shared Components
- **UserProtectWrapper**: Wrapper component to protect user routes.
- **CaptainProtectWrapper**: Wrapper component to protect captain routes.
- **UserLogout**: Component for user logout.
- **CaptainLogout**: Component for captain logout.

## API Endpoints

### User Endpoints
- **Login**: `POST /users/login`
- **Signup**: `POST /users/register`
- **Profile**: `GET /users/profile`
- **Logout**: `GET /users/logout`

### Captain Endpoints
- **Login**: `POST /captains/login`
- **Signup**: `POST /captains/register`
- **Profile**: `GET /captains/profile`
- **Logout**: `GET /captains/logout`

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your branch and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [your-email@example.com](mailto:your-email@example.com).
```

### Key Points in the README:
1. **Overview**: A brief description of the project and its purpose.
2. **Features**: Highlights the key functionalities for both users and captains.
3. **Technologies**: Lists the technologies and libraries used.
4. **Installation**: Step-by-step instructions to set up the project locally.
5. **Project Structure**: Provides an overview of the folder structure.
6. **Components**: Describes the main components of the application.
7. **API Endpoints**: Lists the backend API endpoints used in the project.
8. **Contributing**: Guidelines for contributing to the project.
9. **License**: Information about the project's license.
10. **Contact**: Contact information for questions or feedback.

This `README.md` file is comprehensive and should help users and contributors understand and work with your project effectively.