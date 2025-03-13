# CSV File Processor

## 🌟 Overview

A modern, full-stack application for processing CSV product data with real-time currency exchange rate conversions. This project provides a seamless workflow for uploading CSV files, asynchronously processing large datasets, and displaying results with powerful filtering and sorting capabilities.

## ✨ Key Features

- **CSV Upload & Processing** - Upload CSV files and track processing progress in real-time
- **Async Processing** - Handle large datasets (200K+ rows) efficiently
- **Currency Conversion** - Automatic conversion to multiple currencies (BRL, EUR, GBP, JPY, CAD) using real-time exchange rates
- **Product Management** - Search, filter, sort, and paginate processed products
- **Performance Optimized** - Redis caching, bulk database operations, and frontend optimizations

## 🛠️ Tech Stack

### Frontend
- **React (Vite)** - Fast and optimized UI framework
- **TypeScript** - Type-safe code
- **TailwindCSS** - Utility-first CSS framework
- **Context API** - Lightweight state management
- **Axios** - API requests

### Backend
- **NestJS** - Scalable Node.js framework
- **TypeORM** - Database ORM
- **PostgreSQL** - Relational database
- **Redis** - Caching and processing status tracking
- **Fast-CSV** - Efficient CSV parsing

### Infrastructure
- **Docker** - Containerization for consistent development and deployment
- **Docker Compose** - Multi-container orchestration

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/arthursvpb/csv-file-processor.git
   cd csv-file-processor
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📂 Project Structure

```
.
├── frontend/           # React frontend application
├── backend/            # NestJS backend application
├── docker-compose.yml  # Docker configuration
└── data.csv            # Sample data for testing
```

## 📚 Documentation

For more detailed information about each component:

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

## 🔄 Application Flow

1. User uploads a CSV file through the React frontend
2. NestJS backend validates and processes the file asynchronously
3. Products are stored in PostgreSQL with currency conversions
4. Processing status is tracked with Redis
5. Frontend displays processed products with filtering and sorting options

## 🚢 Deployment

The application is containerized using Docker, allowing for easy deployment to any environment that supports Docker containers.

## 🔒 Security Features

- Data validation and sanitization
- Protection against XSS and SQL injection
- Rate limiting to prevent API abuse
- Proper error handling and logging

## 🔜 Future Enhancements

- Swagger API documentation
- Advanced analytics and reporting
- Improved UI/UX with animations
- Enhanced testing coverage
- Performance optimizations for bulk operations

## 📝 License

[MIT License](LICENSE)
