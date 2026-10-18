# GPA Calculator API

A RESTful API built with Node.js, Express.js, and TypeScript for managing student subjects, calculating GPA, and determining degree classifications.

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

**Response**

```json
{
  "status": "success",
  "message": "GPA Calculator API is running"
}

```
### POST /subjects

Adds a new subject.

**Request**

```json
{
  "name": "Mathematics",
  "score": 85,
  "unit": 3
}
```

**Status Code:** `201 Created`

**Response**

```json
{
  "id": 1,
  "name": "Mathematics",
  "score": 85,
  "unit": 3
}
```

### GET /subjects

Retrieve all subjects.

**Status Code:** `200 OK`

**Response**
```
[
  {
    "id": 1,
    "name": "Mathematics",
    "score": 85,
    "unit": 3
  }
]

### PUT /subjects/:id

Update a subject score.

### DELETE /subjects/:id

Delete a subject.

### GET /gpa

Calculate GPA.

### GET /degree-band

Returns degree classification.

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
