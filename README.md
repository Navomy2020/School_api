# 📚 School Management API

A RESTful API built using **Node.js, Express.js, and MySQL** to manage
school data.\
It allows users to add schools and retrieve a list of schools sorted by
proximity to a given location.

------------------------------------------------------------------------

## 🚀 Features

-   ➕ Add new schools with validation
-   📍 List schools sorted by geographical distance
-   📄 Pagination support (LIMIT & OFFSET)
-   🚫 Duplicate entry prevention
-   ✅ Input validation (type + range checks)
-   ⚡ Optimized SQL-based distance calculation

------------------------------------------------------------------------

## 🛠️ Tech Stack

-   Node.js
-   Express.js
-   MySQL
-   dotenv

------------------------------------------------------------------------

## 📂 Project Structure

    school-api/
    │── index.js  
    │── db.js  
    │── package.json  
    │── package-lock.json  
    │── README.md  
    │── School-Management-API.postman_collection.json  

------------------------------------------------------------------------

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

    git clone https://github.com/your-username/school-management-api.git
    cd school-management-api

------------------------------------------------------------------------

### 2️⃣ Install dependencies

    npm install

------------------------------------------------------------------------

### 3️⃣ Create `.env` file

Create a `.env` file in the root directory:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=school_db
    DB_PORT=3306
    PORT=3000

------------------------------------------------------------------------

### 4️⃣ Setup Database

Run the following SQL:

``` sql
CREATE DATABASE school_db;

USE school_db;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    UNIQUE (name, address)
);
```

------------------------------------------------------------------------

### 5️⃣ Start the server

    node index.js

Server runs locally on:

    http://localhost:3000
[Live API](https://school-api-et5p.onrender.com)

------------------------------------------------------------------------

## 📡 API Endpoints

### ➕ Add School

**POST** `/addSchool`

#### Request Body:

``` json
{
  "name": "ABC School",
  "address": "Kochi",
  "latitude": 9.93,
  "longitude": 76.26
}
```

#### Response:

``` json
{
  "message": "School added successfully",
  "id": 1
}
```

------------------------------------------------------------------------

### 📍 List Schools

**GET** `/listSchools`

#### Query Parameters:

-   `latitude` (number)
-   `longitude` (number)
-   `page` (optional)
-   `limit` (optional)

#### Example:

    GET /listSchools?latitude=9.93&longitude=76.26&page=1&limit=5

#### Response:

``` json
{
  "page": 1,
  "limit": 5,
  "results": [
    {
      "id": 1,
      "name": "ABC School",
      "distance": 0.15
    }
  ]
}
```

------------------------------------------------------------------------

## 📦 Postman Collection

The Postman collection is included in this repository:

    School-Management-API.postman_collection.json

------------------------------------------------------------------------

## 🌍 Deployment

Live API:\
https://school-api-et5p.onrender.com

------------------------------------------------------------------------

## 🧠 Key Concepts Used

-   REST API Design
-   SQL Geospatial Query (Haversine formula)
-   Pagination using LIMIT & OFFSET
-   Input validation and sanitization
-   Error handling in Express

------------------------------------------------------------------------

## 👨‍💻 Author

Navomy Mariya Alex
