# GPA Calculator API

A RESTful API built with Node.js, Express.js, and TypeScript for managing student subjects, calculating academic performance based on average scores, and determining degree classifications.

## Data Storage

This project uses an Object-Oriented service architecture with an in-memory `Map` inside the `GPACalculator` class to manage subject data.

```typescript
private subjects: Map<number, Subject> = new Map();

```typescript
const subjects: Subject[] = [];
```

Data is not persisted and will be lost whenever the server restarts.

## Features

- Add subjects and scores
- View all subjects
- Update subject scores
- Delete subjects
- Calculate GPA
- Determine degree classification

## Technologies Used

- Node.js
- Express.js
- TypeScript

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Cornel102/project-gpa-calculator.git
cd project-gpa-calculator
npm install
```

## Running the Project

Start the development server:

```bash
npm run dev
```

Server runs on:

```text
http://localhost:3000
```

## API Endpoints

### GET /

Returns the API status and confirms that the server is running.

**Status Code:** `200 OK`

**Response**

GPA Calculator API is running

### POST /subjects

Adds a new subject.

**Request**

```json
{
  "subject": "Mathematics",
  "score": 85,
}
```

**Status Code:** `201 Created`

**Response**

```json
{
  "id": 1,
  "subject": "Mathematics",
  "score": 85,
}
```
**Validation Error**

**Status Code:** `400 Bad Request`
```json
{
  "message": "Subject must be a string and score must be between 0 and 100"
}
```

### GET /subjects

Retrieve all subjects.

**Status Code:** `200 OK`

**Response**
```json
[
  {
    "id": 1,
    "subject": "Mathematics",
    "score": 85,
  }
]
```

### PUT /subjects/:id

Update a subject score.

**Request**

```json
{
  "score": 90
}
```

**Status Code:** `200 OK`

**Response**

```json
{
  "id": 1,
  "subject": "Mathematics",
  "score": 90
}
```
**Validation Error**

**Status Code:** `400 Bad Request`
```json
{
  "message": "Score must be between 0 and 100"
}
```
**Not Found**

**Status Code:** `404 Not Found`
```json
{
  "message": "Subject not found"
}
```

### DELETE /subjects/:id

Delete a subject.

**Status Code:** `200 OK`

**Response**
```json
{
  "message": "Subject deleted",
  "deletedSubject": {
    "id": 1,
    "subject": "Mathematics",
    "score": 85
  }
}
```
**Not Found**

**Status Code:** `404 Not Found`
```json
{
  "message": "Subject not found"
}
```

### GET /gpa

Calculates the average score (GPA) of all subjects.

**Status Code:** `200 OK`

**Response**
```json
{
  "totalSubjects": 3,
  "gpa": 78.33
}
```
When No Subjects Exist
```json
{
  "gpa": 0,
  "message": "No subjects added yet"
}
```

### GET /degree-band

Returns the degree classification based on the average score of all subjects.

**Status Code:** `200 OK`

**Response**
```json
{
  "average": 78.33,
  "degreeBand": "First Class"
}
```
When No Subjects Exist
```json
{
  "degreeBand": "No subjects available"
}
```

## Degree Classification

| Average Score | Degree Classification |
| --- | --- |
| 70 - 100 | First Class |
| 60 - 69 | Second Class Upper |
| 50 - 59 | Second Class Lower |
| 45 - 49 | Third Class |
| Below 45 | Fail |

## Author

Cornel

GitHub: https://github.com/Cornel102
