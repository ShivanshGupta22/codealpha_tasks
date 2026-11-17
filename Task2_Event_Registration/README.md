# Event Registration System

A backend application developed as part of the CodeAlpha Backend Development Internship.

## Project Description

The Event Registration System allows users to create and manage events and register participants. It provides RESTful APIs using Node.js, Express.js and MongoDB.

## Features

- Create new events
- View all events
- View event details by ID
- Update event details
- Delete events
- Register participants for events
- View event registrations
- Prevent duplicate registrations
- Prevent registration when event capacity is full
- Validate event details and participant information

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman
- dotenv

## Installation and Setup

1. Clone the repository.
2. Navigate to the project folder.
3. Install dependencies:

   `npm install`

4. Create a `.env` file in the project root:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3001
   ```

5. Start the development server:

   `npm run dev`

The server runs at `http://localhost:3001`.

## API Endpoints

### Events

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/events` | Create an event |
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get event by ID |
| PUT | `/api/events/:id` | Update an event |
| DELETE | `/api/events/:id` | Delete an event |

### Registrations

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/registrations/:eventId` | Register a participant |
| GET | `/api/registrations/:eventId` | Get event registrations |

## Validation and Error Handling

- Event title must contain at least 3 characters.
- Event date must be in the future.
- Event capacity must be a positive whole number.
- Participant name must contain at least 3 characters.
- Email must have a valid format.
- Duplicate registrations are not allowed.
- Registration closes when event capacity is reached.
- Invalid event IDs are handled with appropriate error responses.

## Internship

Developed as part of the **CodeAlpha Backend Development Internship**.
