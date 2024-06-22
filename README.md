# Rest API with Node.js, Express, Sequelize, and PostgreSQL

This project is a simple REST API built with Node.js, Express, Sequelize ORM, and PostgreSQL. The API allows for managing Users, Groups, and Tasks.

## Features

- **Users**
  - Create a User
  - Update User by ID
  - Delete User by ID
  - Get User data by ID (including groups the user belongs to and tasks handled by the user)
  - List all Users

- **Groups**
  - Create a Group
  - Update Group by ID
  - Delete Group by ID
  - Get Group data by ID (including users in the group)
  - List all Groups
  - Add User to Group

- **Tasks**
  - Create a Task
  - Update Task by ID (including updating the user handling the task)
  - Delete Task by ID
  - Get Task data by ID (including the user handling the task)
  - List all Tasks

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/axlrxlr/concise-rest-api.git
    cd concise-rest-api
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Configure the database

   Update `config/config.json` with your PostgreSQL database details.

4. Initialize Sequelize

    ```bash
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    ```

## Running the Application

Start the server
```bash
npm start
```
The server will start on `http://localhost:3000`.

### API Endpoints

#### Users

- **Create a User**
  - **POST** `/users`
  - Request Body:
    ```json
    {
      "name": "Udin Sedunia",
      "email": "udin@example.com",
      "phone": "1234567890",
      "address": "123 Street Name"
    }
    ```

- **Update User by ID**
  - **PUT** `/users/:id`
  - Request Body:
    ```json
    {
      "name": "Udin Sedunia",
      "email": "udin@example.com",
      "phone": "1234567890",
      "address": "123 Street Name"
    }
    ```

- **Delete User by ID**
  - **DELETE** `/users/:id`

- **Get User data by ID**
  - **GET** `/users/:id`

- **List all Users**
  - **GET** `/users`

#### Groups

- **Create a Group**
  - **POST** `/groups`
  - Request Body:
    ```json
    {
      "name": "Group Name",
      "description": "Group Description"
    }
    ```

- **Update Group by ID**
  - **PUT** `/groups/:id`
  - Request Body:
    ```json
    {
      "name": "Group Name",
      "description": "Group Description"
    }
    ```

- **Delete Group by ID**
  - **DELETE** `/groups/:id`

- **Get Group data by ID**
  - **GET** `/groups/:id`

- **List all Groups**
  - **GET** `/groups`

- **Add User to Group**
  - **POST** `/groups/:groupId/users/:userId`

#### Tasks

- **Create a Task**
  - **POST** `/tasks`
  - Request Body:
    ```json
    {
      "name": "Task Name",
      "deadline": "2024-07-01",
      "userId": 1
    }
    ```

- **Update Task by ID**
  - **PUT** `/tasks/:id`
  - Request Body:
    ```json
    {
      "name": "Task Name",
      "deadline": "2024-07-01",
      "userId": 1
    }
    ```

- **Delete Task by ID**
  - **DELETE** `/tasks/:id`

- **Get Task data by ID**
  - **GET** `/tasks/:id`

- **List all Tasks**
  - **GET** `/tasks`

- **Get User data by ID (with tasks)**
  - **GET** `/users/:id`

## Database Schema

### User

- `id` (Primary Key)
- `name`
- `email`
- `phone`
- `address`

### Group

- `id` (Primary Key)
- `name`
- `description`

### UserGroup (Join Table)

- `userId` (Foreign Key)
- `groupId` (Foreign Key)

### Task

- `id` (Primary Key)
- `name`
- `deadline`
- `userId` (Foreign Key)

## Testing with Postman

### Creating a Task

1. Open Postman
2. Set method to `POST`
3. URL: `http://localhost:3000/tasks`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
    ```json
    {
      "name": "Complete project documentation",
      "deadline": "2024-07-01",
      "userId": 1
    }
    ```
6. Click "Send"

### Example of a Successful Response

```json
{
  "id": 1,
  "name": "Complete project documentation",
  "deadline": "2024-07-01T00:00:00.000Z",
  "userId": 1,
  "updatedAt": "2024-06-21T00:00:00.000Z",
  "createdAt": "2024-06-21T00:00:00.000Z"
}
```
