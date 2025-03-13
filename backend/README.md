# 📌 CSV File Processor

## 🚀 Overview

This project is a high-performance, scalable back-end API built with **NestJS**. It enables CSV file uploads, processes large datasets efficiently, and stores product information with real-time currency exchange rates.

## 🛠️ Tech Stack

- **NestJS** - Scalable Node.js framework
- **TypeORM** - PostgreSQL ORM for database operations
- **PostgreSQL** - Relational database
- **Redis** - Caching and async processing tracking
- **Fast-CSV** - Efficient CSV parsing
- **Axios** - API requests for currency exchange rates
- **Throttler** - Rate limiting to prevent abuse
- **Class-Validator** - DTO validation and sanitization

---

## 📂 Project Structure

```
backend/
├── src/
│   ├── common/                # Shared utilities & validation
│   ├── config/                # Configuration module
│   ├── database/              # Database configuration
│   ├── exchange/              # Currency exchange module
│   ├── file-processor/        # CSV processing logic
│   ├── products/              # Product management
│   ├── redis/                 # Redis caching
│   ├── throttler/             # Rate limiting
│   ├── app.module.ts          # Main entry point
│   ├── main.ts                # App bootstrap
├── .env                       # Environment variables
├── package.json               # Dependencies
```

---

## 📦 Features

### ✅ **1. File Upload & Processing**

- Accepts **CSV file uploads** via `/file/upload`.
- Processes files **asynchronously** (supports large files ~200K+ rows).
- **Sanitizes and validates** each product entry.
- **Bulk inserts** using transactions for atomicity.
- **Tracks processing status** in Redis.

### ✅ **2. Product Management**

- **Filtering & sorting** by name, price, expiration.
- Fetches **stored exchange rates** alongside products.

### ✅ **3. Currency Exchange Integration**

- Fetches real-time exchange rates from [Exchange API](https://github.com/fawazahmed0/exchange-api).
- Stores **conversion rates for 5 currencies** (BRL, EUR, GBP, JPY, CAD).
- **Caches rates** using Redis for efficiency.

### ✅ **4. Caching & Performance**

- Redis used to **cache exchange rates** and processing status.
- Rate limiting to **prevent API abuse**.

### ✅ **5. Security & Validations**

- **SQL Injection & XSS protection** via data sanitization.
- **DTO validation** ensures correct product format.
- **Rate limiting** (Throttler) to prevent excessive requests.

### ✅ **6. Error Handling & Logging**

- **Centralized error handling** for better debugging.
- **Graceful duplicate handling** (prevents DB conflicts).
- Logs **validation errors and invalid rows**.

---

## 📌 API Endpoints

### **File Upload**

- `POST /file/upload` - Uploads a CSV file for processing

### **Products**

- `GET /products` - Fetches all products (supports filtering & sorting)
- `GET /products/:id` - Fetches a specific product

### **Exchange Rates**

- `GET /exchange/rates` - Fetches latest exchange rates from cache

---

## 🚀 Setup & Installation

### **1. Clone the repository**

```bash
git clone https://github.com/flatironsdevelopment/rails_node_test_arthursvpb.git
cd backend
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Configure environment variables (.env file)**

```env
DB_HOST=db
DB_PORT=5432
DB_USER=user
DB_PASS=password
DB_NAME=csv_db
REDIS_HOST=redis
REDIS_PORT=6379
```

### **4. Run the application**

```bash
npm run start
```

### **5. Run with Docker**

```bash
docker-compose up --build
```

---

## 📌 Checklist

### **Infrastructure & Setup**

✅ NestJS backend  
✅ PostgreSQL (TypeORM) database  
✅ Redis integration for caching & tracking  
✅ Environment variables configured

### **File Upload & Processing**

✅ CSV file upload endpoint  
✅ File processing with **fast-csv**  
✅ Validates & sanitizes data (XSS, SQL Injection)  
✅ Stores exchange rates along with products

### **Product API**

✅ Create and read operations  
✅ Sorting & filtering  
✅ Returns stored exchange rates per product

### **Currency Exchange**

✅ Fetches rates from **Exchange API**  
✅ Caches exchange rates  
✅ Supports **5 currencies**

### **Security & Error Handling**

✅ Sanitization against **XSS & SQL Injection**  
✅ Validates **product format**  
✅ Handles **duplicate products** gracefully  
✅ Rate limiting with **Throttler**  
✅ Centralized exception handling

---

## 🚀 Next Steps

1. **Integrate Swagger for API Documentation** 📖
2. **Optimize bulk inserts for even better performance** ⚡
3. **Enhance logging & monitoring** 📊
