# Course Management Project

A full-stack web application for managing courses, user authentication, and engagements (likes and comments). This project features a **Node.js/Express** backend with **MongoDB Atlas** for data storage, deployed on an **AWS EC2** instance (running Amazon Linux), and a **React** frontend hosted on **AWS S3** with static website hosting.

## Table of Contents

1. [Overview](#overview)  
2. [Backend](#backend)  
   - [Technologies](#technologies)  
   - [Local Setup](#local-setup)  
   - [Environment Variables](#environment-variables)  
   - [Running the Backend Locally](#running-the-backend-locally)  
3. [AWS Deployment (Amazon Linux)](#aws-deployment-amazon-linux)  
   - [Launch an EC2 Instance](#launch-an-ec2-instance)  
   - [SSH and Server Setup](#ssh-and-server-setup)  
   - [Process Management with PM2](#process-management-with-pm2)  
4. [Frontend](#frontend)  
   - [Technologies](#technologies-1)  
   - [Local Setup](#local-setup-1)  
   - [Building for Production](#building-for-production)  
   - [Deploying to AWS S3](#deploying-to-aws-s3)  
5. [Project Structure](#project-structure)  
6. [Engagement Feature (Likes/Comments)](#engagement-feature-likescomments)  
7. [Testing the Application](#testing-the-application)  
8. [Contribution Guidelines](#contribution-guidelines)  
9. [License](#license)  

---

## Overview

This project provides a complete course management solution:
- **User Registration and Login**
- **Course Creation and Listing**
- **Engagement** through likes and comments on courses

The **backend** is built using **Node.js/Express** with **MongoDB Atlas** (via Mongoose), while the **frontend** is built using **React**. The backend is deployed on an AWS EC2 instance running Amazon Linux, and the frontend is hosted as a static site on AWS S3.

**GitHub Repository:**  
[https://github.com/astikraj171/auroedu](https://github.com/astikraj171/auroedu)

**Deployed Links:**  
Backend: [http://ec2-13-51-72-206.eu-north-1.compute.amazonaws.com:5000/](http://ec2-13-51-72-206.eu-north-1.compute.amazonaws.com:5000/)  
Frontend: [http://auroedutask.s3-website.eu-north-1.amazonaws.com/](http://auroedutask.s3-website.eu-north-1.amazonaws.com/)

---

## Backend

### Technologies

- Node.js (v18+)
- Express.js
- Mongoose (MongoDB Atlas ODM)
- PM2 for process management

### Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/astikraj171/auroedu.git
   cd auroedu/backend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory with the following content (adjust values as needed):

```ini
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/mydatabase
JWT_SECRET=someSuperSecretKey
```

- **PORT**: The port your server listens on (default is 5000).
- **MONGO_URI**: Your MongoDB Atlas connection string.
- **JWT_SECRET**: A secret key for JWT-based authentication.

### Running the Backend Locally

```bash
# In development mode (with nodemon)
npm run dev

# Or standard Node.js run
node server.js
```

Your backend will be available at [http://localhost:5000](http://localhost:5000).

---

## AWS Deployment (Amazon Linux)

### Launch an EC2 Instance

1. Create an AWS Account and navigate to the EC2 console.
2. Launch a new instance using:
   - **Amazon Linux AMI** (e.g., t2.micro or t3.micro for free tier)
   - Security Group rules allowing inbound traffic on:
     - **Port 22 (SSH)**
     - **Port 5000 (for your backend)**
   - Assign a Key Pair for SSH access.

### SSH and Server Setup

SSH into your EC2 instance:
```bash
chmod 400 project.pem
ssh -i "project.pem" ec2-user@<EC2-Public-IP>
```

Install Node.js and Git:
```bash
sudo dnf install -y nodejs git
```

Clone your repository and set up the backend:
```bash
git clone https://github.com/astikraj171/auroedu.git
cd auroedu/backend
npm install
nano .env  # Add PORT, MONGO_URI, JWT_SECRET, etc.
```

### Process Management with PM2

Install PM2 globally:
```bash
sudo npm install -g pm2
```

Start your server:
```bash
pm2 start server.js --name "server"
pm2 save
pm2 startup
```

Restart after changes:
```bash
pm2 restart server
```

---

## Frontend

### Technologies

- React (v18+)
- Axios for HTTP requests
- React Router (v6) for navigation

### Local Setup

Navigate to the frontend folder:
```bash
cd ../frontend
npm install
```

Configure the API base URL in `src/api.js`:
```js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://ec2-13-51-72-206.eu-north-1.compute.amazonaws.com:5000/api'
});

export default API;
```

### Building for Production
```bash
npm run build
```

---

## Contribution Guidelines

Contributions are welcome! Please follow these steps:

1. **Fork the repository**.
2. **Create a new branch** (`feature-xyz` or `bugfix-xyz`).
3. **Commit your changes**.
4. **Submit a pull request (PR)**.

---

## License
This project is licensed under the ISC License.
