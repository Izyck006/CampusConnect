# Campus Connect: API Specification
**Version:** v3
**Base URL:** `http://<SERVER_IP>:5000/api/v3/sa`

## Authentication API (`/auth`)

### 1. User Login
* **Endpoint:** `/auth/login`
* **Method:** `POST`
* **Description:** Authenticates a student and returns a JWT.
* **Payload:**
  ```json
  {
    "studentId": "BUK/SE/2026/001",
    "password": "securepassword123"
  }