Here's a comprehensive `README.md` file in English for your NestJS e-commerce backend project:

````markdown
# NestJS E-Commerce Backend API

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

A robust e-commerce backend API built with NestJS, MongoDB, and JWT authentication, featuring role-based access control and comprehensive validation.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **JWT Authentication**: Secure signup/login with token-based authentication
- **Role-Based Access Control**:
  - Admin: Full access
  - Manager: Read access to users
  - User: Limited access
- **CRUD Operations**: Complete user management system
- **Data Validation**: Comprehensive request validation using class-validator
- **MongoDB Integration**: Mongoose for data modeling and operations
- **Environment Configuration**: Easy setup with environment variables

## Technologies

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JWT](https://jwt.io/) with `@nestjs/jwt`
- **Password Hashing**: [Bcrypt](https://www.npmjs.com/package/bcrypt)
- **Validation**: [class-validator](https://github.com/typestack/class-validator)
- **API Documentation**: Auto-generated from decorators

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/e-commerce-backend.git
   cd e-commerce-backend
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see [Configuration](#configuration))

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=mongodb://your-mongo-connection-string
JWT_SECRET=your-secret-key-for-jwt
PORT=3000
```

## Running the Application

- Development mode (with hot-reload):

  ```bash
  npm run start:dev
  ```

- Production build:
  ```bash
  npm run build
  npm run start:prod
  ```

## API Documentation

### Authentication

| Endpoint        | Method | Description         | Access |
| --------------- | ------ | ------------------- | ------ |
| `/auth/sign-up` | POST   | Register a new user | Public |
| `/auth/sign-in` | POST   | Login existing user | Public |

### User Management

| Endpoint       | Method | Description                     | Access         |
| -------------- | ------ | ------------------------------- | -------------- |
| `/v1/user`     | POST   | Create a new user               | Admin only     |
| `/v1/user`     | GET    | Get all users (with pagination) | Admin, Manager |
| `/v1/user/:id` | GET    | Get specific user by ID         | Admin, Manager |
| `/v1/user/:id` | PATCH  | Update user information         | Admin only     |
| `/v1/user/:id` | DELETE | Delete a user                   | Admin only     |

## Project Structure

```
src/
├── app.module.ts          # Root application module
├── main.ts                # Application entry point
│
├── auth/                  # Authentication module
│   ├── auth.controller.ts # Auth endpoints
│   ├── auth.module.ts     # Auth module definition
│   ├── auth.service.ts    # Auth business logic
│   └── dto/              # Data transfer objects
│       ├── auth.dto.ts    # Auth request schemas
│       └── update.auth.dto.ts
│
├── user/                  # User management module
│   ├── user.controller.ts # User endpoints
│   ├── user.module.ts     # User module definition
│   ├── user.service.ts    # User business logic
│   ├── dto/              # Data transfer objects
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── Guard/            # Authentication guards
│   │   └── Auth.Guard.ts # Role-based access control
│   ├── decorator/        # Custom decorators
│   │   └── user.decorator.ts
│   └── schemas/          # Database schemas
│       └── user.schema.ts # User model definition
│
test/                     # Test files
├── app.e2e-spec.ts       # End-to-end tests
└── jest-e2e.json         # E2E test configuration
```

## Testing

Run the following commands:

- Unit tests:

  ```bash
  npm run test
  ```

- End-to-end tests:

  ```bash
  npm run test:e2e
  ```

- Test coverage:
  ```bash
  npm run test:cov
  ```

## Deployment

The application is ready for deployment to various platforms. For easy deployment to AWS, consider using [NestJS Mau](https://mau.nestjs.com):

```bash
npm install -g mau
mau deploy
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is [UNLICENSED](UNLICENSED). See the [LICENSE](LICENSE) file for details.

```

This README includes:
1. Badges for key technologies
2. Table of contents for easy navigation
3. Detailed feature list
4. Complete technology stack
5. Step-by-step installation guide
6. API documentation with access levels
7. Visual project structure
8. Testing instructions
9. Deployment options
10. Contribution guidelines
11. License information

You can customize any section to better fit your project's specific requirements.
```
