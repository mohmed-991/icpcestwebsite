# ICPC Training Platform API Documentation

## Base URL
```
http://127.0.0.1:8000/api
```

## Authentication
Most endpoints require authentication via Bearer token in the Authorization header:
```
Authorization: Bearer {token}
```

## Endpoints

### Training Platform

#### Get All Levels
```http
GET /api/levels
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Newcomers",
      "description": "مقدمة في البرمجة التنافسية",
      "min_rating": 0,
      "max_rating": 1199,
      "required_xp": 0,
      "order": 1,
      "lessons": [
        {
          "id": 1,
          "title": "مقدمة في C++",
          "description": "تعلم أساسيات لغة C++",
          "level_id": 1,
          "video_url": "https://youtube.com/watch?v=example1",
          "handout_url": "/handouts/cpp_intro.pdf",
          "order": 1,
          "xp_reward": 10,
          "problems": [
            {
              "id": 1,
              "codeforces_id": "1A",
              "name": "Theatre Square",
              "url": "https://codeforces.com/problemset/problem/1/A",
              "lesson_id": 1,
              "difficulty": 800,
              "xp_reward": 5
            }
          ]
        }
      ]
    }
  ],
  "message": "Levels retrieved successfully"
}
```

#### Get Level by ID
```http
GET /api/levels/{id}
```

#### Get All Lessons
```http
GET /api/lessons
```

**Query Parameters:**
- `level_id` - Filter by level ID

#### Get Lesson by ID
```http
GET /api/lessons/{id}
```

#### Get All Problems
```http
GET /api/problems
```

**Query Parameters:**
- `lesson_id` - Filter by lesson ID
- `level_id` - Filter by level ID
- `difficulty` - Filter by difficulty (800, 900, 1000, etc.)

#### Get Problem by ID
```http
GET /api/problems/{id}
```

### User Management

#### Register
```http
POST /api/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "01234567890",
  "college": "Egyptian University of Science and Technology",
  "department": "Computer Science",
  "codeforces_handle": "johndoe_cf",
  "password": "password123",
  "password_confirmation": "password123"
}
```

#### Login
```http
POST /api/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /api/user
```

**Headers:**
```
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /api/user/profile
```

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john_updated@example.com",
  "phone": "01234567890",
  "department": "Computer Science"
}
```

### OAuth (Codeforces)

#### Redirect to Codeforces
```http
GET /api/oauth/codeforces
```

#### Codeforces Callback
```http
GET /api/oauth/codeforces/callback
```

#### Get OAuth Data
```http
GET /api/oauth/data
```

### Training & Competition

#### Get Trainings
```http
GET /api/trainings
```

#### Create Training (Admin)
```http
POST /api/admin/training
```

#### Get Standings
```http
GET /api/standings
```

### Code Compilation

#### Compile Code
```http
POST /api/compile
```

**Request Body:**
```json
{
  "code": "#include <iostream>\nint main() { std::cout << \"Hello World\"; return 0; }",
  "language": "cpp",
  "input": ""
}
```

## Response Format

All API responses follow this format:
```json
{
  "success": boolean,
  "data": object|array|null,
  "message": string
}
```

## Error Responses

```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field": ["Error message"]
  }
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error