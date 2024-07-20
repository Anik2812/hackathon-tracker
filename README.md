# 🏆 Hackathon Participation Tracker

<p align="center">
  <img src="https://your-image-url-here.com/hackathon-tracker-logo.png" alt="Hackathon Tracker Logo" width="200"/>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#technologies">Technologies</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D%2012.0.0-green.svg" />
  <img src="https://img.shields.io/badge/npm-%3E%3D%206.0.0-green.svg" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" />
</p>

## 🚀 Features

- 👤 User authentication (register, login, logout)
- 📝 CRUD operations for hackathon entries
- 🖼️ Profile picture upload and display
- 🏅 Hackathon win status tracking
- 📊 Interactive pie chart of won vs. total hackathons
- 🔍 Detailed view for each hackathon entry
- 📱 Responsive design for seamless mobile experience


## 🛠️ Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Anik2812/hackathon-tracker.git
   cd hackathon-tracker
   ```

2. Install backend dependencies:
   `npm install`

3. Install frontend dependencies:
  `cd client
   npm install`

4. Create a `.env` file in the root directory and add the following:
   `MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000`

## Running the Application

1. Start the backend server:
   node server.js
   
2. In a new terminal, start the frontend development server:
   `cd client
   npm start`

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user
- GET /api/hackathons - Get all hackathons for the logged-in user
- POST /api/hackathons - Add a new hackathon
- PUT /api/hackathons/:id - Update a hackathon
- DELETE /api/hackathons/:id - Delete a hackathon
- GET /api/hackathons/stats - Get hackathon statistics
- GET /api/user/profile - Get user profile
- POST /api/user/upload-image - Upload user profile image

## 🔧 Technologies

### Backend
* Node.js
* Express.js
* MongoDB with Mongoose
* JSON Web Tokens (JWT)
* Multer

### Frontend
* React.js
* Material-UI
* Axios
* React Router
* Chart.js


## 👏 Acknowledgements

* React.js
* Material-UI
* Node.js
* Express.js
* MongoDB

<p align="center"> Made by Anik </p>
 
