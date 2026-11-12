
# URL Shortener

A backend URL Shortener application built using Node.js, Express.js, and MongoDB.

## Features
- Convert long URLs into short URLs.
- Generate random unique short codes.
- Store URL mappings in MongoDB.
- Redirect short URLs to original URLs.
- Validate submitted URLs.
- Handle invalid and non-existing URLs.

## Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Postman

## API Endpoints

### 1. Create Short URL
POST /api/shorten

Request Body:
{
  "originalUrl": "https://www.google.com"
}

### 2. Redirect to Original URL
GET /:shortCode

Example:
http://localhost:3000/a1b2c3

## Installation

1. Clone the repository.
2. Run npm install.
3. Create a .env file.
4. Add your MongoDB connection string:

MONGO_URI=your_mongodb_connection_string

5. Run the project:

npm run dev

## Author
Backend Development Internship Project - CodeAlpha
