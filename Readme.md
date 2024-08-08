# E-commerce Backend

This is the backend service for an E-commerce platform. It is built using Node.js, Express, and MongoDB, and provides RESTful APIs for user authentication, product management, and order processing.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)

## Features

- User authentication and authorization (Admin and User roles)
- Product management (CRUD operations)
- Order processing and management
- Secure API with JWT-based authentication
- Password hashing using bcrypt

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: JSON Web Token for secure authentication
- **Bcrypt**: Password hashing

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or on a cloud service like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Abhineetsahay/E-commerce-backend.git
   cd E-commerce-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory based on the provided `.env.sample`:

   ```bash
   cp .env.sample .env
   ```

4. Update the `.env` file with your configuration details (e.g., MongoDB URL, JWT secrets, etc.).

5. Start the development server:

   ```bash
   npm run dev
   ```

   The server should now be running on the port specified in your `.env` file (default is 4000).

### Environment Variables

The following environment variables are required to run this application:

```env
# Server configuration
PORT=4000

# Database configuration
MONGODB_URL=mongodb://localhost:27017/E-commerce

# JWT configuration
JWT_SECRET=your_jwt_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

# Admin account details
ADMIN_EMAIL=your_admin_email_here
ADMIN_PHONE_NUMBER=your_admin_phone_number_here
```

- **PORT**: Port number on which the server will run.
- **MONGODB_URL**: MongoDB connection string.
- **JWT_SECRET**: Secret key for signing JWTs.
- **REFRESH_TOKEN_SECRET**: Secret key for signing refresh tokens.
- **ADMIN_EMAIL**: Email for the default admin account.
- **ADMIN_PHONE_NUMBER**: Phone number for the default admin account.
