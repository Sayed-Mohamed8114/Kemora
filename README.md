# KEMORA 

### Project Overview

Kemora is a tourism platform designed to help travelers explore Egypt, discover destinations, and access tourism services through a user-friendly digital experience.

The platform connects customers with tourism services while providing tools for staff to manage tours, schedules, service requests, and customer inquiries. It also offers travel guides covering ancient Egyptian history, local culture, practical travel tips, and popular Egyptian cities.

Kemora features role-based access control with dedicated permissions for Super Admins, Staff, and Customers, ensuring that each user can access the features relevant to their role.



Kemora aims to simplify travel planning, improve tourism service management, and provide visitors with a convenient way to discover and experience Egypt.


## Main Features
- **Tour Management:** Create, update, publish, archive, and manage tours.
- **Tour Scheduling:** Manage tour dates, availability, capacity, and completion status.
- **Authentication & Authorization:** Secure JWT-based authentication and role-based access control.
- **Role-Based Dashboards:** Dedicated dashboards for Super Admins, Staff, and Customers.
- **Staff Management:** Manage staff members and their access permissions.
- **Service Management:** Create and manage tourism services, pricing, and availability.
- **Service Requests:** Submit, assign, and track service requests throughout their lifecycle.
- **Customer Inquiries:** Allow customers to submit travel inquiries and staff to manage them.
- **Tour Image Uploads:** Upload and display tour images with file type and size validation.
- **Profile Management:** Update personal information and change passwords.
- **Travel Guides:** Explore guides covering ancient Egyptian history, local culture, travel tips, and Egyptian cities.
- **Responsive Design:** Optimized user interface for desktop, tablet, and mobile devices.
- **Dark & Light Themes:** Switch between themes for a comfortable browsing experience.
- **Interactive UI:** Smooth animations, transitions, and toast notifications.
- **REST API Integration:** React frontend integrated with a FastAPI backend and PostgreSQL database.


## Technologies used
Built with a focus on a premium Egyptian-inspired visual identity, responsive design, and a seamless user experience. The project is being developed as a full-stack application using **React**, **javaScript**, **Tailwind CSS**, **FastAPI**, and **PostgreSQL**.

## Setup & Installation Instructions

### Prerequisites

Make sure the following tools are installed on your machine:

- **Node.js** (with npm)
- **Python** 3.12+ (use the version supported by your backend dependencies)
- **PostgreSQL**
- **Git**

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Kemora
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a Python virtual environment.

**Linux / macOS:**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

**Windows:**

```powershell
python -m venv .venv
.venv\Scripts\activate
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the backend directory and configure the required environment variables according to your backend configuration.

Example:

```env
DATABASE_URL=postgresql+psycopg://USERNAME:PASSWORD@localhost:5432/kemora
SECRET_KEY=your-secret-key
```

Replace the example values with your actual local database credentials and application settings. Do not commit your `.env` file.

### 3. Database Setup

Create a PostgreSQL database for Kemora.

For example, using PostgreSQL:

```sql
CREATE DATABASE kemora;
```

Make sure the database connection string in your backend `.env` file matches your local database configuration.

Apply database migrations:

```bash
alembic upgrade head
```

Run this command from the backend directory where your Alembic configuration is available.

### 4. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the frontend directory if your application uses environment variables.

Example:

```env
VITE_API_URL=http://localhost:8000
```

Use the variable name expected by your frontend API configuration. If the project already has a different API URL variable, keep the existing name.

## How to Run the Project

### 1. Start the Backend Server

From the backend directory, activate the virtual environment and run:

```bash
uvicorn main:app --reload
```

This command assumes your FastAPI application instance is named `app` in `main.py`. If your application entry point is different, adjust the command accordingly.

The backend will typically be available at:

- API: `http://localhost:8000`
- Swagger API Documentation: `http://localhost:8000/docs`

### 2. Start the Frontend Development Server

Open another terminal and navigate to the frontend directory:

```bash
npm run dev
```

Vite will display the local development URL in the terminal, typically:

`http://localhost:5173`

Open the displayed URL in your browser.

### 3. Verify the Application

Once both servers are running:

1. Open the frontend URL in your browser.
2. Confirm that the application loads correctly.
3. Verify that the frontend can communicate with the backend.
4. Check the API documentation at `/docs` if you encounter backend API issues.
5. Ensure that PostgreSQL is running and the database migrations have been applied.

### Troubleshooting

- **Database connection errors:** Verify PostgreSQL is running and the database credentials are correct.
- **Missing dependencies:** Reinstall the backend requirements or run `npm install` in the frontend directory.
- **CORS errors:** Ensure the frontend origin is included in the backend CORS configuration.
- **API connection errors:** Verify the backend is running and the frontend API URL points to the correct address.
- **Migration errors:** Confirm that the database exists and the Alembic configuration is correct.
- **Port already in use:** Stop the process using the port or configure the application to use another available port.

### Notes

- Keep environment variables and secrets out of version control.
- Do not commit virtual environments, `node_modules`, or local environment files.
- Use the project's existing dependency files and configuration when setting up a development environment.


---


**Explore Egypt. Your Way.**