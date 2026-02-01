# Chemical Equipment Parameter Visualizer

> **Hybrid Web + Desktop Application**  
> *Intern Screening Task – FOSSEE*

---

## 📑 Table of Contents

1. [Introduction](#1-introduction)
2. [Task Description](#2-task-description)
3. [Objective of the Project](#3-objective-of-the-project)
4. [Project Scope](#4-project-scope)
5. [System Architecture](#5-system-architecture)
6. [Technology Stack](#6-technology-stack)
7. [Features Implemented](#7-features-implemented)
8. [Backend Functionality (Django + DRF)](#8-backend-functionality-django--drf)
9. [Web Application (React.js)](#9-web-application-reactjs)
10. [Desktop Application (PyQt5)](#10-desktop-application-pyqt5)
11. [Authentication System](#11-authentication-system)
12. [Data Analysis & Visualization](#12-data-analysis--visualization)
13. [Upload History Management](#13-upload-history-management)
14. [PDF Report Generation](#14-pdf-report-generation)
15. [Sample Dataset Usage](#15-sample-dataset-usage)
16. [Project Structure](#16-project-structure)
17. [Setup Instructions](#17-setup-instructions)
18. [Running the Application](#18-running-the-application)
19. [Environment-Based Backend Configuration](#19-environment-based-backend-configuration)
20. [Live Deployment](#20-live-deployment)
21. [Demo & Screenshots](#21-demo--screenshots)
22. [Evaluation Criteria Mapping](#22-evaluation-criteria-mapping)
23. [Learning Outcomes](#23-learning-outcomes)
24. [Conclusion](#24-conclusion)

---

## 1. Introduction

The **Chemical Equipment Parameter Visualizer** is a hybrid application developed as part of the **Intern Screening Task – Hybrid Web + Desktop Application**.

The objective of this project is to design and implement a **single analytics backend** that can be consumed by both:

- **Web Application** (React.js)
- **Desktop Application** (PyQt5)

The system allows users to upload chemical equipment datasets in CSV format, perform automated data analysis using Python, and visualize the results through interactive charts and tables.

### This project demonstrates practical understanding of:

- Full-stack development
- API-driven architecture
- Data analytics using Pandas
- Consistent visualization across platforms

---

## 2. Task Description

As per the screening task instructions, the application was required to:

- ✅ Run as both a **Web application** and a **Desktop application**
- ✅ Use a common **Django backend API**
- ✅ Analyze **chemical equipment data** from CSV files
- ✅ Provide **meaningful summaries and visualizations**
- ✅ Store and **manage recent datasets**
- ✅ Include **authentication** and **PDF reporting**

### Dataset Format Specified in the Task:

| Column Name | Description |
|-------------|-------------|
| **Equipment Name** | Name of the equipment |
| **Type** | Equipment category |
| **Flowrate** | Flow rate measurement |
| **Pressure** | Pressure measurement |
| **Temperature** | Temperature measurement |

All development decisions in this project strictly follow the requirements mentioned in the task document.

---

## 3. Objective of the Project

### The main objectives of this project are:

1. **To design a single-source backend** capable of serving multiple frontends
2. **To perform server-side data analytics** instead of frontend computation
3. **To ensure UI and functional consistency** between web and desktop platforms
4. **To demonstrate real-world API integration** and data visualization workflows

By implementing the same analytical logic for both applications, the project reflects how industrial systems often support multiple clients using a shared backend.

---

## 4. Project Scope

### The scope of this project includes:

#### Data Processing
- Uploading and validating CSV datasets containing chemical equipment parameters
- Performing statistical analysis using Pandas on the backend

#### Analytics Generated
- Total equipment count
- Average flowrate
- Average pressure
- Average temperature
- Equipment type distribution

#### Visualization Platforms
- **Web interface** (React + Chart.js)
- **Desktop interface** (PyQt5 + Matplotlib)

#### Additional Features
- Maintaining upload history of the **last 5 datasets**
- Generating **downloadable PDF analytical reports**
- Securing all API access using **token-based authentication**

> **Note:** The project does not focus on chemical simulation itself; instead, it focuses on **data analysis and visualization workflows**, which aligns with real industrial monitoring dashboards.

---

## 5. System Architecture

The application follows a **centralized backend architecture**.

<p align="center">
  <img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/824d3cb1-0257-413b-913f-1352f0c83e31" />
</p>

### Architectural Highlights

| Feature | Description |
|---------|-------------|
| **Single Django REST API** | Powers both frontends |
| **Server-side Analytics** | All analytics are computed server-side |
| **Thin Frontends** | Frontends only consume processed data |
| **Centralized Authentication** | Authentication is handled centrally |
| **Backend PDF Generation** | PDF generation occurs entirely on the backend |

This design ensures **scalability** and **consistency** across platforms.

---

## 6. Technology Stack

### Backend

| Technology | Purpose |
|------------|---------|
| **Django** | Core backend framework |
| **Django REST Framework** | API layer |
| **Pandas** | CSV parsing and data analytics |
| **SQLite** | Lightweight database for dataset history |
| **ReportLab** | Server-side PDF generation |

### Web Frontend

| Technology | Purpose |
|------------|---------|
| **React.js (Vite)** | Web application framework |
| **Chart.js** | Interactive charts |
| **Axios** | API communication |
| **Tailwind CSS** | UI styling |

### Desktop Frontend

| Technology | Purpose |
|------------|---------|
| **PyQt5** | Desktop application framework |
| **Matplotlib** | Chart visualization |
| **Requests** | API communication |

### Version Control

| Tool | Purpose |
|------|---------|
| **Git & GitHub** | Source code management and submission |

### Deployment

| Platform | Purpose |
|---------|---------|
| Firebase Hosting | Web application deployment |

---

## 7. Features Implemented

### 1. CSV Upload (Web + Desktop)

- Users can upload CSV files containing chemical equipment data
- Upload supported from:
  - **Web interface** (React)
  - **Desktop interface** (PyQt5)
- Files are sent to the same backend API

### 2. Automatic Data Validation

- Backend verifies required columns:
  - Equipment Name
  - Type
  - Flowrate
  - Pressure
  - Temperature
- Invalid or malformed files are rejected with proper error messages

### 3. Data Analytics Engine

Using **Pandas**, the backend computes:

- Total number of equipment entries
- Average flowrate
- Average pressure
- Average temperature
- Distribution of equipment types

All calculations are centralized and consistent across both frontends.

### 4. Interactive Visualization

#### Web App
- Bar charts
- Pie charts
- Responsive layouts

#### Desktop App
- Matplotlib-based charts
- Embedded graphs inside PyQt windows

Both interfaces display **identical analytical insights**.

### 5. Dataset History Management

- Backend stores only the **last 5 uploaded datasets**
- History includes:
  - File name
  - Upload timestamp
  - Summary statistics
- Older datasets are automatically removed

### 6. PDF Report Generation

- Backend generates professional analytical reports
- Includes:
  - Summary statistics
  - Equipment type distribution
  - Complete equipment table
- Downloadable directly from the web interface

### 7. Authentication System

- **Token-based authentication** implemented
- Users must log in to:
  - Upload CSV files
  - View history
  - Download PDF reports
- Same authentication works for both web and desktop clients

### 8. CSV Data Format

The application expects CSV files in the following format:

| Column Name | Description |
|-------------|-------------|
| **Equipment Name** | Name of chemical equipment |
| **Type** | Equipment category |
| **Flowrate** | Flow rate value |
| **Pressure** | Pressure value |
| **Temperature** | Temperature value |

#### Example

```csv
Equipment Name,Type,Flowrate,Pressure,Temperature
Pump A,Pump,120,5.6,80
Valve B,Valve,60,3.2,45
Reactor C,Reactor,200,9.1,120
```

The provided sample file `sample_equipment_data.csv` was used for testing and demonstration.

---

## 8. Backend Functionality (Django + DRF)

The Django backend serves as the **core processing engine**.

### Key Responsibilities

- CSV parsing using Pandas
- Data cleaning and numeric conversion
- Statistical analysis
- Dataset persistence
- History limitation (last 5 uploads)
- Authentication validation
- PDF report generation

### API Overview

| Endpoint | Purpose |
|----------|---------|
| `/api/auth/login/` | User login |
| `/api/auth/register/` | User registration |
| `/api/upload/` | Upload CSV |
| `/api/history/` | Fetch last 5 datasets |
| `/api/pdf/<id>/` | Generate PDF report |

All protected routes require **authentication tokens**.

---

## 9. Web Application (React.js)

The web application is developed using **React.js** and serves as the primary user-facing interface of the system.

### Key Capabilities

- User authentication (login and signup)
- CSV file upload to backend API
- Visualization of analytical results
- Dataset history viewing
- PDF report download
- Responsive and modern UI design

### Functional Components

#### CSV Upload Panel
Allows users to upload equipment datasets directly to the backend.

#### Statistics Panel
Displays calculated values such as:
- Total equipment count
- Average flowrate
- Average pressure
- Average temperature

#### Charts Panel
Uses **Chart.js** to render:
- Equipment type distribution
- Comparative analytics

#### Upload History Panel
Shows last uploaded datasets retrieved from backend.

### UI/UX Highlights

- Clean dashboard-style layout
- Smooth transitions using Framer Motion
- Reusable component-based architecture
- Consistent design across pages

The web application communicates with the backend **exclusively via REST APIs**.

---

## 10. Desktop Application (PyQt5)

The desktop version of the application is built using **PyQt5** to provide an offline-style interface while still consuming the same backend APIs.

### Purpose

- Demonstrate hybrid architecture (Web + Desktop)
- Provide identical analytical functionality on desktop
- Ensure consistency across platforms

### Features Implemented

- Login authentication window
- CSV upload from local system
- Dataset summary display
- Equipment table visualization
- Chart rendering using Matplotlib
- Shared backend communication

### Desktop UI Structure

#### Login Window
- Email and password authentication
- Token-based login validation

#### Dashboard Window
- File upload button
- Summary statistics cards
- Matplotlib charts
- Tabular data view

### Key Advantage

Both web and desktop applications:
- Use the **same backend**
- Follow the **same API contracts**
- Produce **identical analytical results**

This ensures **true hybrid system consistency**.

---

## 11. Authentication System

A basic **token-based authentication system** is implemented to secure the application.

### Authentication Flow

<p align="center">
  <img width="400" height="600" alt="image" src="https://github.com/user-attachments/assets/b971f4b8-a7a7-4f80-8401-f90ab3d48ef3"" />
</p>

### Protected Features

- CSV upload
- Dataset history access
- PDF report generation

### Supported Clients

- React web application
- PyQt5 desktop application

Both clients authenticate using the **same backend endpoints**.

### Benefits

- Prevents unauthorized access
- Ensures dataset privacy
- Demonstrates real-world backend security practice

---

## 12. Data Analysis & Visualization

Data analysis is performed **entirely on the backend** using Pandas, ensuring accuracy and consistency for both web and desktop applications.

### Data Processing Steps

After uploading the CSV file:

1. File is read using Pandas
2. Required columns are validated
3. Numerical values are cleaned and converted
4. Invalid rows are removed
5. Statistical analysis is performed

### Metrics Calculated

- Total number of equipment
- Average flowrate
- Average pressure
- Average temperature
- Equipment type distribution

### Visualization Techniques

#### Web Application
- **Chart.js** used for interactive charts
- Bar and distribution charts displayed dynamically

#### Desktop Application
- **Matplotlib** used for plotting graphs
- Charts rendered inside PyQt5 interface

All visualizations are generated from **backend-calculated data**, ensuring **identical results** across platforms.

---

## 13. Upload History Management

The system maintains a history of uploaded datasets to support comparison and traceability.

### Backend Logic

- Each upload is stored in SQLite database
- Only the **last five datasets** are preserved
- Older datasets are automatically deleted

### Stored Information

- Original file name
- Upload timestamp
- Summary statistics
- Equipment type distribution
- Parsed CSV data

### Frontend Representation

- History panel lists recent uploads
- Selecting a dataset reloads its analytics
- Provides quick access without re-uploading files

This feature demonstrates **persistent data handling** and **backend-controlled state management**.

---

## 14. PDF Report Generation

The application supports **automatic PDF report generation** from analyzed datasets.

### Implementation

- Implemented fully on the backend using **ReportLab**
- PDF is generated dynamically per dataset
- Accessible via a dedicated API endpoint

### Report Contents

- Report title and metadata
- File name and upload date
- Summary statistics table
- Equipment type distribution table
- Full equipment data table

### Usage

- Web frontend provides a **"Download PDF Report"** button
- Clicking the button opens or downloads the generated report
- Desktop application can access the same endpoint

This feature converts analytical results into a **professional, shareable document** suitable for real-world reporting.

---

## 15. Sample Dataset Usage

To demonstrate and validate the functionality of the application, a sample dataset was used throughout development and testing.

### Sample File

`sample_equipment_data.csv`

### Dataset Structure

The sample CSV file follows the required format defined in the task description:

| Column Name | Description |
|-------------|-------------|
| **Equipment Name** | Unique name of the equipment |
| **Type** | Equipment category (Pump, Valve, Reactor, etc.) |
| **Flowrate** | Flow rate value (m³/h) |
| **Pressure** | Operating pressure (bar) |
| **Temperature** | Operating temperature (°C) |

This structure ensures compatibility with both the backend analytics engine and frontend visualization components.

### Purpose of Using Sample Dataset

- Validate backend CSV parsing
- Verify statistical calculations
- Demonstrate charts and tables
- Record screenshots and demo video
- Ensure consistent testing across web and desktop versions

---

## 16. Project Structure

```
chemical-equipment-visualizer/
│
├── backend/                          # Django REST API Backend
│   ├── analytics/                    
│   │   ├── views_auth.py           
│   │   ├── views_pdf.py             
│   │   ├── views.py                
│   │   ├── models.py                
│   │   ├── serializers.py           
│   │   └── urls.py                  
│   ├── config/                       
│   │   ├── settings.py              
│   │   ├── urls.py                 
│   │   └── wsgi.py                  
│   ├── media/uploads/                
│   ├── manage.py                    
│   ├── requirements.txt              
│   └── db.sqlite3                   
│
├── frontend-web/                     # React Web Application
│   ├── src/
│   │   ├── components/              
│   │   │   ├── Header.tsx
│   │   │   ├── CSVUpload.tsx
│   │   │   ├── ChartsPanel.tsx
│   │   │   ├── DataTable.tsx
│   │   │   ├── StatsPanel.tsx
│   │   │   └── UploadHistory.tsx
│   │   ├── pages/                   
│   │   │   ├── Auth.tsx             
│   │   │   ├── Home.tsx            
│   │   │   └── Index.tsx            
│   │   ├── lib/                    
│   │   │   └── api.ts               
│   │   ├── App.tsx                 
│   │   └── main.tsx                 
│   ├── package.json                 
│   ├── tailwind.config.ts          
│   └── vite.config.ts                
│
├── frontend-desktop/                 # PyQt5 Desktop Application
│   ├── app.py                       
│   ├── login.py                    
│   ├── dashboard.py                 
│   ├── styles.py                  
│   ├── api.py                        
│   └── requirements.txt             
│
├── sample-data/
│   └── sample_equipment_data.csv     
│
└── README.md                         # Project documentation

```

---

## 17. Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm 8+
- Git

### Backend Setup (Django)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

Backend will run at: `http://localhost:8000`

### Web Frontend Setup (React)

```bash
# Navigate to web frontend directory
cd frontend-web

# Install dependencies
npm install

# Start development server
npm run dev
```

Web app will run at: `http://localhost:5173`

### Desktop Frontend Setup (PyQt5)

```bash
# Navigate to desktop frontend directory
cd frontend-desktop

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run desktop application
python app.py
```

---

## 18. Running the Application

### Web Application

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 - Web Frontend:**
```bash
cd frontend-web
npm run dev
```

**Access:** `http://localhost:5173`

### Desktop Application

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 - Desktop App:**
```bash
cd frontend-desktop
source venv/bin/activate
python app.py
```
---

## 19. Environment-Based Backend Configuration

The application **automatically detects the runtime environment** and selects the appropriate backend API without requiring any manual configuration.

---

### 🔧 How It Works

The frontend determines the backend URL using `apiConfig.ts` based on the current host.

```ts
// Local Development
if (localhost | 127.0.0.1 | 192.168.x.x | 172.x.x.x)
→ Backend: http://localhost:8000/api/

// Production (Firebase Hosting)
if (chemical-equipment-visua-79693.web.app)
→ Backend: https://chemical-equipment-visualizer-xtbs.onrender.com/api/
```

This enables seamless switching between development and production environments.


### 🔹 Running Scenarios

| Scenario | Frontend | Backend | Database |
|--------|----------|---------|----------|
| **Local Development** | http://localhost:5173 | http://localhost:8000 | Local SQLite |
| **Live Web** | https://chemical-equipment-visua-79693.web.app/ | https://chemical-equipment-visualizer-xtbs.onrender.com | Render SQLite |
| **Desktop App (Local)** | N/A | http://localhost:8000 | Local SQLite |
| **Desktop App (Production)** | N/A | https://chemical-equipment-visualizer-xtbs.onrender.com | Render SQLite |


### 📁 Implementation Files

- **apiConfig.ts** — Detects environment and assigns backend base URL  
- **api.ts** — Central API handler using BASE_URL  
- **authService.ts** — Authentication requests via environment config  
- **api.py** — Backend deployed on Render  
- **settings.py** — CORS configuration for local and production origins  


### ✅ Benefits

- Single codebase for local and production environments  
- Automatic backend selection without manual toggles  
- Seamless Firebase deployment  
- Desktop application supports both local and deployed backend  
- Clean and maintainable architecture  
---

```
## 20. Live Deployment

### 🌐 Web Application (Deployed on Firebase)

The web application is deployed on **Firebase Hosting**:
- **URL:** https://chemical-equipment-visua-79693.web.app/
- ✅ Fast global CDN delivery
- ✅ HTTPS security
- ✅ Automatic SSL certificates

**Backend API:** Automatically uses `https://chemical-equipment-visualizer-xtbs.onrender.com/api/`

### 🚀 Backend Deployment (Deployed on Render)

The Django backend is deployed on **Render**:
- **URL:** https://chemical-equipment-visualizer-xtbs.onrender.com/
- ✅ Automatic deployment from GitHub
- ✅ HTTPS security with SSL
- ✅ Environment variable management
- ✅ 0.1 CPU, 512MB RAM (Free tier)

**Deployment Configuration:**
- Build Command: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --no-input`
- Start Command: `gunicorn config.wsgi:application`
- Language: Python 3.11
- Auto-deploy: On every GitHub push to `main` branch

### 📱 Desktop Application

The desktop application connects to the deployed Render backend:
- **Backend URL:** `https://chemical-equipment-visualizer-xtbs.onrender.com/api/`
- Supports **Windows, macOS, and Linux**
- No additional backend setup needed for production use
- Can also connect to local backend for testing

### Health Check

Backend health check available at: https://chemical-equipment-visualizer-xtbs.onrender.com/api/

Returns
```
Returns: {"status": "ok"} (200 OK)
```

---

## 21. Demo & Screenshots

The project includes both **Web** and **Desktop** implementations connected to the same backend.

### Web Application Demo

- Landing page explaining product features and workflow
- Authentication system (login/signup)
- CSV upload interface with drag-and-drop
- Summary statistics dashboard
- Interactive charts and analytics
- Upload history with dataset switching
- Equipment data table with sorting and search
- PDF report generation


<p align="center">
  <img width="45%" alt="image" src="https://github.com/user-attachments/assets/c0c4fedc-7e00-4473-b853-6014b89c333c" /> 
  <img width="45%" alt="image" src="https://github.com/user-attachments/assets/89462b15-f475-4815-9942-f233f5beb4c3" /> 
</p>

<p align="center">
  <img width="45%" alt="image" src="https://github.com/user-attachments/assets/251f105e-6164-4c49-b63e-16e2d450d874"/> 
  <img width="45%" alt="image" src="https://github.com/user-attachments/assets/de29adcd-3019-4ea0-a635-cb46c01c5e2f" /> 
</p>

<p align="center">
  <img width="45%" src="https://github.com/user-attachments/assets/735535c3-7e29-4e4d-9156-68aa40d10e21" /> 
  <img width="45%" alt="image"src="https://github.com/user-attachments/assets/d7312cb9-d8fc-4d08-995c-3830fda529e4" /> 
</p>



### Desktop Application Demo

- Native PyQt5 login screen
- Dashboard layout matching the web version
- CSV upload via file dialog
- Matplotlib-based visualizations
- Summary statistics panel
- Upload history viewer
- PDF report download

<p align="center">
  <img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/627d0573-f840-4f50-be23-2b149e483f06" />
</p>
<p align="center">
  <img width="45%" alt="image" src="https://github.com/user-attachments/assets/9a86031d-8a54-45ca-802c-a20589838034" />
  <img width="45%" alt="image" src="https://github.com/user-attachments/assets/e139ee5a-1931-4c4e-bd88-679f1600028c" />
</p>


Screenshots included in repository clearly demonstrate:

- UI consistency between Web and Desktop
- Identical analytics results from the shared backend
- Complete task workflow from upload → analysis → report

### Demo video Link 

https://drive.google.com/file/d/14rGh_5tquR0ECx9F0zJqtWnTEFi0tWVQ/view?usp=drive_link

---

## 22. Evaluation Criteria Mapping

The following table maps internship task requirements to implemented features:

| Task Requirement | Implementation | Status |
|------------------|----------------|--------|
| Hybrid Web + Desktop App | React Web + PyQt5 Desktop | ✅ |
| Common Backend API | Django + Django REST Framework | ✅ |
| CSV Upload | Implemented in both Web & Desktop | ✅ |
| Data Analytics | Pandas-based backend processing | ✅ |
| Summary Statistics | Total count, averages, type distribution | ✅ |
| Data Visualization | Chart.js (Web), Matplotlib (Desktop) | ✅ |
| Upload History | SQLite storing last 5 datasets | ✅ |
| PDF Report Generation | Backend-driven PDF generation | ✅ |
| Authentication | Token-based authentication | ✅ |
| Sample Dataset Support | Fully compatible with provided CSV | ✅ |
| UI/UX Consistency | Matching layouts and workflow | ✅ |
| GitHub Source Code | Structured and documented | ✅ |
| Web Deployment | Firebase Hosting | ✅ |

This confirms **100% task completion** as per screening instructions.

---

## 23. Learning Outcomes

This project provided strong hands-on experience in:

- Building full-stack hybrid applications
- Designing REST-based architecture
- Implementing shared backend logic
- Integrating multiple frontends with one API
- Working with Pandas for real data analytics
- Handling file uploads and storage
- Creating professional dashboards
- Implementing authentication workflows
- Managing project structure and documentation
- Writing production-quality README documentation

It closely simulates **real-world software engineering workflows**.

---

## 24. Conclusion

The **Chemical Equipment Parameter Visualizer** successfully fulfills all requirements of the **Intern Screening Task – Hybrid Web + Desktop Application**.

The project demonstrates:

- Proper backend–frontend separation  
- Clean and modular system architecture  
- Strong REST API integration  
- Consistent analytics across web and desktop platforms  
- Secure token-based authentication  
- Backend-driven data processing and PDF report generation  
- Real-world deployment of the web application using **Firebase Hosting**

By implementing both a **Web Application (React.js)** and a **Desktop Application (PyQt5)** powered by a shared **Django REST backend**, the system reflects how real-world engineering platforms support multiple clients using a centralized processing layer.

Overall, this submission highlights practical understanding of **full-stack development, data analytics workflows, API-driven design, and production deployment**, while maintaining clarity, scalability, and maintainability throughout the application.

---


<div align="center">

<b>Built with ❤️ for FOSSEE Internship Program</b>

*Repository:*
<a href="https://github.com/avantika1036/chemical-equipment-visualizer">
github.com/avantika1036/chemical-equipment-visualizer
</a>

*Demo Video:*
<a href="https://drive.google.com/file/d/14rGh_5tquR0ECx9F0zJqtWnTEFi0tWVQ/view?usp=drive_link">
https://drive.google.com/file/d/14rGh_5tquR0ECx9F0zJqtWnTEFi0tWVQ/view?usp=drive_link
</a>

*Live Web Application:*
<a href="https://chemical-equipment-visua-79693.web.app/">
https://chemical-equipment-visua-79693.web.app/
</a>

</div>
