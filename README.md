Here's an enhanced README.md that better reflects your current project structure and capabilities:

````markdown
# NestJS E-Commerce Backend API

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

A full-featured e-commerce backend API built with NestJS, MongoDB, and JWT authentication, featuring comprehensive product management and role-based access control.

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

- **JWT Authentication** with email verification
- **Role-Based Access Control** (Admin, Manager, User)
- **Password Reset** via email verification codes
- **Product Management** with categories, subcategories, and brands
- **CRUD Operations** for all entities
- **Data Validation** with class-validator
- **MongoDB Integration** using Mongoose
- **Email Notifications** for password reset
- **Pagination & Filtering** for product listings
- **Environment Configuration** with dotenv

## Technologies

- **Framework**: NestJS
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT
- **Email**: Nodemailer
- **Validation**: class-validator
- **Testing**: Jest
- **API Documentation**: Built-in Swagger (via decorators)

## Installation

1. Clone repository:

```bash
git clone https://github.com/your-repo/e-commerce-backend.git
cd e-commerce-backend
```
````

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (create `.env` file):

```env
DATABASE_URL=mongodb://your-mongodb-connection
JWT_SECRET=your-secret-key
PORT = process.env.PORT
EMAIL_USER=your-email@service.com
EMAIL_PASS=your-email-password
EMAIL_FROM="E-Commerce Team <noreply@ecommerce.com>"
```

## Running the Application

- Development mode:

```bash
npm run start:dev
```

- Production build:

```bash
npm run build
npm run start:prod
```

## API Documentation

All endpoints are prefixed with `/api`

### Authentication

| Endpoint                | Method | Description             | Access |
| ----------------------- | ------ | ----------------------- | ------ |
| `/auth/sign-up`         | POST   | Register new user       | Public |
| `/auth/sign-in`         | POST   | User login              | Public |
| `/auth/reset-password`  | POST   | Initiate password reset | Public |
| `/auth/verify-code`     | POST   | Verify reset code       | Public |
| `/auth/change-password` | POST   | Set new password        | Public |

### User Management

| Endpoint       | Method | Description              | Access         |
| -------------- | ------ | ------------------------ | -------------- |
| `/v1/user`     | POST   | Create user (Admin only) | Admin          |
| `/v1/user`     | GET    | List users               | Admin, Manager |
| `/v1/user/:id` | GET    | Get user by ID           | Admin, Manager |
| `/v1/user/:id` | PATCH  | Update user              | Admin          |
| `/v1/user/:id` | DELETE | Delete user              | Admin          |

### Product Management

| Endpoint          | Method | Description         | Access |
| ----------------- | ------ | ------------------- | ------ |
| `/v1/product`     | POST   | Create product      | Admin  |
| `/v1/product`     | GET    | List products       | Public |
| `/v1/product/:id` | GET    | Get product details | Public |
| `/v1/product/:id` | PATCH  | Update product      | Admin  |
| `/v1/product/:id` | DELETE | Delete product      | Admin  |

### Category System

| Endpoint           | Method | Description        | Access |
| ------------------ | ------ | ------------------ | ------ |
| `/v1/category`     | POST   | Create category    | Admin  |
| `/v1/category`     | GET    | List categories    | Public |
| `/v1/category/:id` | GET    | Get category       | Public |
| `/v1/sub-category` | POST   | Create subcategory | Admin  |
| `/v1/sub-category` | GET    | List subcategories | Public |
| `/v1/brand`        | POST   | Create brand       | Admin  |
| `/v1/brand`        | GET    | List brands        | Public |

## Project Structure

```
src/
├── app.module.ts
├── main.ts
│
├── auth/               # Authentication module
├── user/               # User management
├── product/            # Product management
├── category/           # Category system
├── sub-category/       # Subcategory management
├── brand/              # Brand management
│
└── shared/             # Common utilities
    ├── decorators/
    ├── guards/
    └── schemas/
```

## Testing

Run tests with:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:cov
```

## Deployment

The application is ready for deployment to various platforms. Recommended options:

1. **Heroku**:

```bash
heroku container:push web -a your-app-name
heroku container:release web -a your-app-name
```

2. **Docker**:

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
```

3. **AWS Elastic Beanstalk**:

```bash
eb init
eb deploy
```

## Contributing

Contributions are welcome! Please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is [MIT licensed](LICENSE).

```

Key improvements made:
1. Added complete API documentation for all modules
2. Updated environment variables section with email credentials
3. Improved project structure overview
4. Added deployment instructions for multiple platforms
5. Enhanced features list with actual implemented features
6. Added proper API endpoint prefixes (/api)
7. Included all entity management endpoints
8. Added testing and contribution guidelines
9. Improved technology stack description
10. Added license information

```
