# 📌 CSV File Processor Frontend

## 🚀 Overview

This is the **React frontend** for the CSV processing application. It provides an **intuitive and responsive UI** for uploading CSV files, tracking progress, and browsing the processed product data with exchange rate conversions.

## 🛠️ Tech Stack

- **React (Vite) ⚡** - Fast and optimized front-end framework
- **TypeScript** - Strict typing for maintainability
- **TailwindCSS** - Modern styling with utility classes
- **Axios** - API requests for seamless data fetching
- **Context API** - Lightweight global state management

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/             # UI components (FileUpload, ProductTable)
│   ├── contexts/               # Global state (FileUploadContext)
│   ├── App.tsx                 # Main application entry
│   ├── index.css               # Global styles (Tailwind)
│   ├── main.tsx                # React DOM rendering
├── public/                     # Static assets
├── .eslintrc                   # Linting configuration
├── .prettierrc                 # Code formatting rules
├── package.json                # Dependencies
```

---

## 📦 Features

### ✅ **1. File Upload & Processing**

- CSV upload
- **Shows real-time progress** while processing
- Triggers **automatic table update** upon completion

### ✅ **2. Product Table & Filtering**

- Displays **all uploaded products**
- **Search functionality** (filters products by name dynamically)
- **Sorting & pagination** (name, price, expiration)
- **Exchange rate conversions** displayed per product

### ✅ **3. Performance Optimizations**

- Implements **useCallback & useMemo** for **optimized rendering**
- Lightweight state management with **React Context API**

### ✅ **4. Security & Data Validation**

- **Prevents malicious file uploads** (validates CSV format)
- Handles **edge cases like duplicate uploads**
- **Graceful error handling** with informative UI messages

---

## 📌 Application Flow

1️⃣ **User uploads a CSV file**  
2️⃣ **File is validated and processed asynchronously**  
3️⃣ **Products are saved with exchange rate conversions**  
4️⃣ **Product table updates automatically**  
5️⃣ **User can filter, sort, and browse paginated results**

---

## 📌 Setup & Installation

### **1. Clone the repository**

```bash
git clone https://github.com/flatironsdevelopment/rails_node_test_arthursvpb.git
cd frontend
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Run the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📌 Checklist

### **Infrastructure & Setup**

✅ Vite + React project initialized  
✅ TypeScript configured  
✅ ESLint + Prettier integration

### **File Upload & Processing**

✅ CSV upload with progress tracking  
✅ Auto-refresh product table on completion

### **Product Table & API Integration**

✅ Fetch products from backend  
✅ Sorting, filtering, and pagination  
✅ Displays converted **exchange rates**

### **Optimizations & Performance**

✅ **useMemo & useCallback** to optimize rendering  
✅ **Minimal re-renders** with Context API

### **Security & Error Handling**

✅ Prevents invalid CSV uploads  
✅ **Handles backend errors gracefully**  
✅ Prevents unnecessary API calls

---

## 🚀 Next Steps

- 🔹 **Improve UI/UX** – Add better loading indicators & animations
- 🔹 **Add Unit & E2E Tests** – Jest for unit tests, Cypress for integration tests
- 🔹 **Infinite Scroll for Large Datasets** – Better pagination experience
- 🔹 **Improve Accessibility** – Make app keyboard & screen-reader friendly
- 🔹 **Integrate React Query for API Requests** – Improve server state management and caching
