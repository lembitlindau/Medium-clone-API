# Medium clone API

A RESTful API implementation inspired by Medium.com, built with Express.js and documented with Swagger/OpenAPI.

## Features

- User management (profiles, authentication)
- Article creation and management
- API documentation with Swagger UI
- JWT-based authentication

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Docker & Docker Compose
- Swagger/OpenAPI 3.0
- JSON Web Tokens (JWT)

## Prerequisites

- Docker and Docker Compose installed
- Node.js (v14 or higher)
- npm

## Environment Setup

1. **Create Environment File:**
   Copy the example environment file and configure it:
   ```bash
   cp .env.example .env
   ```
   
   The `.env` file should contain:
   ```
   PORT=9999
   MONGODB_URI=mongodb://localhost:27017/medium-clone
   JWT_SECRET=your-jwt-secret-key
   ME_CONFIG_BASICAUTH_USERNAME=admin
   ME_CONFIG_BASICAUTH_PASSWORD=pass
   ```

## Getting Started

1. **Start MongoDB and Mongo Express:**
   ```bash
   docker-compose up -d
   ```
   This will start:
   - MongoDB on port 27017
   - Mongo Express (MongoDB admin interface) on port 8081

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Application:**
   ```bash
   npm start
   ```
   The server will start on the port specified in your .env file (default: 9999)

4. **Access the Services:**
   - API Documentation (Swagger UI): http://localhost:9999/api-docs
   - MongoDB Admin Interface: http://localhost:8081
