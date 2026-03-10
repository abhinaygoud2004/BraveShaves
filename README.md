# 💈 Brave Shaves – Barber Appointment Booking Platform

Brave Shaves is a scalable barber appointment booking platform built using a microservices architecture. The platform allows customers to discover barber shops, book appointments, and manage bookings while enabling shop owners to manage services, shops, and schedules.

The system is designed with secure authentication, role-based access control, and independently deployable services to support scalable real-world applications.

---

# 🚀 Features

### User Features
- Browse barber shops and available services
- Book appointments with time slot selection
- Prevent double bookings using slot validation
- View and manage upcoming bookings
- Secure login and authentication

### Barber Shop Features
- Manage barber profiles
- Manage services and pricing
- Manage shop details
- View and manage customer appointments

### Security
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Secure API Gateway routing
- Middleware-based authorization

---

# 🏗 System Architecture

The platform follows a **microservices architecture** where each service runs independently and communicates through **REST APIs, gRPC, and asynchronous messaging**.

### Core Services

- **API Gateway** – Central entry point that routes client requests to appropriate backend services.
- **User Service** – Manages user accounts and profiles.
- **Appointment Service** – Handles appointment scheduling, booking validation, and booking management.
- **Barber Service** – Manages barber profiles.
- **Service Service** – Handles available services (haircut, beard trim, etc.).
- **Shop Service** – Manages barber shop details.

Services communicate using:

- **REST APIs** for external client communication
- **gRPC** for efficient internal service-to-service communication
- **RabbitMQ** for asynchronous event-driven messaging

Each service can be deployed and scaled independently.

---

# ⚙️ Tech Stack

### Backend
- Node.js
- Express.js
- REST APIs
- gRPC (service-to-service communication)
- RabbitMQ (asynchronous messaging)
- JWT Authentication

### Architecture
- Microservices
- API Gateway
- Layered Architecture
- Event-driven communication

### Database
- Databases per microservice

### Performance
- Redis caching

### DevOps
- Docker
- Docker Compose

### Frontend
- React.js
- Redux
- CSS

---

# 📂 Project Structure

```
brave-shaves/
│
├── backend-microservices/
│   │
│   ├── api-gateway/
│   │
│   ├── appointment-service/
│   │
│   ├── user-service/
│   │
│   └── short-service/
│        ├── barber-service/
│        ├── service-service/
│        └── shop-service/
│
│   └── docker-compose.yml
│
├── frontend/
│
└── README.md
```

### Backend Microservices

- **API Gateway** – Routes requests from the frontend to the appropriate backend services.
- **User Service** – Handles user accounts and profile management.
- **Appointment Service** – Manages appointment creation, validation, and tracking.
- **Domain Services** – Business-specific services:
  - **Barber Service** – Manages barber information.
  - **Service Service** – Manages available services.
  - **Shop Service** – Manages barber shop information.

Each microservice runs independently and communicates through **REST, gRPC, and RabbitMQ messaging**.

---

# 🧱 Service Architecture

Each microservice follows a layered architecture:

```
controllers
services
repositories
middlewares
config
```

This separation ensures maintainability, scalability, and clean code organization.

---

# 🔄 Booking Workflow

1. User registers or logs in.
2. User browses available barber shops.
3. User selects a service and available time slot.
4. Appointment service validates slot availability.
5. Booking is created and stored in the database.
6. User can view and manage upcoming appointments.

This ensures consistent scheduling and prevents double bookings.

---

# 📦 Installation & Running the Project

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/abhinaygoud2004/brave-shaves.git
cd brave-shaves
```

---

## 2️⃣ Start Backend Microservices

Navigate to the backend microservices folder and run Docker:

```bash
cd backend-microservices
docker-compose up --build
```

This will start all backend services and dependencies.

---

## 3️⃣ Start the Frontend

Open another terminal and run:

```bash
cd frontend
npm install
npm start
```

The React development server will start locally.

---

# 🔐 Authentication Flow

1. User logs in with credentials.
2. JWT token is generated after successful authentication.
3. Client sends the token with API requests.
4. API Gateway validates the token.
5. Services enforce role-based authorization.

---

# 📈 Scalability Design

- Independent microservices deployment
- Stateless authentication using JWT
- Redis caching for faster responses
- Containerized services using Docker
- API Gateway for centralized routing
- gRPC for efficient internal service communication
- RabbitMQ for asynchronous event processing

---

# 📌 Future Improvements

- Payment gateway integration
- Real-time notifications
- Barber shop recommendation system
- Kubernetes deployment
- CI/CD pipeline

---

# 👨‍💻 Author

**Maturi Abhinay Goud**

GitHub:  
https://github.com/abhinaygoud2004  

LinkedIn:  
https://linkedin.com/in/maturi-abhinay-goud-86b599231