<<<<<<< HEAD
# 🧪 Chemical Equipment Parameter Visualizer

### Hybrid Web + Desktop Application
**Intern Screening Task Submission**
=======
# Chemical Equipment Parameter Visualizer

> **Hybrid Web + Desktop Application**  
> *Intern Screening Task – FOSSEE*
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

---

## 📑 Table of Contents

<<<<<<< HEAD
1. [Introduction](#-introduction)
2. [Task Description](#-task-description)
3. [Objective of the Project](#-objective-of-the-project)
4. [Project Scope](#-project-scope)
5. [System Architecture](#-system-architecture)
6. [Technology Stack](#-technology-stack)
7. [Features Implemented](#-features-implemented)
8. [Backend Functionality (Django + DRF)](#-backend-functionality-django--drf)
9. [Web Application (React.js)](#-web-application-reactjs)
10. [Desktop Application (PyQt5)](#-desktop-application-pyqt5)
11. [Authentication System](#-authentication-system)
12. [Data Analysis & Visualization](#-data-analysis--visualization)
13. [Upload History Management](#-upload-history-management)
14. [PDF Report Generation](#-pdf-report-generation)
15. [Sample Dataset Usage](#-sample-dataset-usage)
16. [Project Structure](#-project-structure)
17. [Setup Instructions](#-setup-instructions)
18. [Running the Application](#-running-the-application)
19. [Demo & Screenshots](#-demo--screenshots)
20. [Evaluation Criteria Mapping](#-evaluation-criteria-mapping)
21. [Challenges Faced & Solutions](#-challenges-faced--solutions)
22. [Learning Outcomes](#-learning-outcomes)
23. [Conclusion](#-conclusion)

---

## 🚀 Introduction
=======
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
19. [Demo & Screenshots](#19-demo--screenshots)
20. [Evaluation Criteria Mapping](#20-evaluation-criteria-mapping)
21. [Challenges Faced & Solutions](#21-challenges-faced--solutions)
22. [Learning Outcomes](#22-learning-outcomes)
23. [Conclusion](#23-conclusion)

---

## 1. Introduction
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

The **Chemical Equipment Parameter Visualizer** is a hybrid application developed as part of the **Intern Screening Task – Hybrid Web + Desktop Application**.

The objective of this project is to design and implement a **single analytics backend** that can be consumed by both:

- **Web Application** (React.js)
- **Desktop Application** (PyQt5)

The system allows users to upload chemical equipment datasets in CSV format, perform automated data analysis using Python, and visualize the results through interactive charts and tables.

<<<<<<< HEAD
### What This Project Demonstrates
=======
### This project demonstrates practical understanding of:
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

- Full-stack development
- API-driven architecture
- Data analytics using Pandas
- Consistent visualization across platforms

---

<<<<<<< HEAD
## 📋 Task Description

As per the screening task instructions, the application was required to:

- Run as both a **Web application** and a **Desktop application**
- Use a common **Django backend API**
- Analyze chemical equipment data from CSV files
- Provide meaningful summaries and visualizations
- Store and manage recent datasets
- Include authentication and PDF reporting

### Dataset Format

The dataset format specified in the task includes the following columns:

| Column | Description |
|--------|-------------|
| **Equipment Name** | Name of the equipment |
| **Type** | Equipment category |
| **Flowrate** | Flow rate value (m³/h) |
| **Pressure** | Operating pressure (bar) |
| **Temperature** | Operating temperature (°C) |
=======
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
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

All development decisions in this project strictly follow the requirements mentioned in the task document.

---

<<<<<<< HEAD
## 🎯 Objective of the Project

The main objectives of this project are:

- To design a **single-source backend** capable of serving multiple frontends
- To perform **server-side data analytics** instead of frontend computation
- To ensure **UI and functional consistency** between web and desktop platforms
- To demonstrate real-world **API integration** and data visualization workflows
=======
## 3. Objective of the Project

### The main objectives of this project are:

1. **To design a single-source backend** capable of serving multiple frontends
2. **To perform server-side data analytics** instead of frontend computation
3. **To ensure UI and functional consistency** between web and desktop platforms
4. **To demonstrate real-world API integration** and data visualization workflows
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

By implementing the same analytical logic for both applications, the project reflects how industrial systems often support multiple clients using a shared backend.

---

<<<<<<< HEAD
## 🔍 Project Scope

The scope of this project includes:

### Data Management
- Uploading and validating CSV datasets containing chemical equipment parameters
- Performing statistical analysis using Pandas on the backend
- Generating summarized insights such as:
  - Total equipment count
  - Average flowrate
  - Average pressure
  - Average temperature
  - Equipment type distribution

### Visualization
- Visualizing analytical results in both:
  - Web interface (React + Chart.js)
  - Desktop interface (PyQt5 + Matplotlib)

### Additional Features
- Maintaining upload history of the last 5 datasets
- Generating downloadable PDF analytical reports
- Securing all API access using token-based authentication

> **Note:** The project does not focus on chemical simulation itself; instead, it focuses on data analysis and visualization workflows, which aligns with real industrial monitoring dashboards.

---

## 🏗️ System Architecture

The application follows a **centralized backend architecture**.

```
         ┌─────────────────────────┐
         │   Django Backend        │
         │  (REST API + Pandas)    │
         └───────────┬─────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
┌────────────────────┐  ┌────────────────────┐
│  Web Application   │  │ Desktop Application│
│ React + Chart.js   │  │  PyQt5 + Matplotlib│
└────────────────────┘  └────────────────────┘
```

### Architectural Highlights

- A **single Django REST API** powers both frontends
- All analytics are computed **server-side**
- Frontends only consume processed data
- Both clients remain **thin and maintainable**
- Authentication is handled centrally
- PDF generation occurs entirely on the backend
=======
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
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

This design ensures **scalability** and **consistency** across platforms.

---

<<<<<<< HEAD
## 🛠️ Technology Stack

### Backend
- **Django** – Core backend framework
- **Django REST Framework** – API layer
- **Pandas** – CSV parsing and data analytics
- **SQLite** – Lightweight database for dataset history
- **ReportLab** – Server-side PDF generation

### Web Frontend
- **React.js (Vite)** – Web application framework
- **Chart.js** – Interactive charts
- **Axios** – API communication
- **Tailwind CSS** – UI styling

### Desktop Frontend
- **PyQt5** – Desktop application framework
- **Matplotlib** – Chart visualization
- **Requests** – API communication

### Version Control
- **Git & GitHub** – Source code management and submission

---

## ✨ Features Implemented

### 1. CSV Upload (Web + Desktop)
- Users can upload CSV files containing chemical equipment data
- Upload supported from:
  - Web interface (React)
  - Desktop interface (PyQt5)
- Files are sent to the same backend API

### 2. Automatic Data Validation
=======
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

---

## 7. Features Implemented

### 1. CSV Upload (Web + Desktop)

- Users can upload CSV files containing chemical equipment data
- Upload supported from:
  - **Web interface** (React)
  - **Desktop interface** (PyQt5)
- Files are sent to the same backend API

### 2. Automatic Data Validation

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Backend verifies required columns:
  - Equipment Name
  - Type
  - Flowrate
  - Pressure
  - Temperature
- Invalid or malformed files are rejected with proper error messages

### 3. Data Analytics Engine
<<<<<<< HEAD
Using **Pandas**, the backend computes:
=======

Using **Pandas**, the backend computes:

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Total number of equipment entries
- Average flowrate
- Average pressure
- Average temperature
- Distribution of equipment types

<<<<<<< HEAD
All calculations are **centralized** and **consistent** across both frontends.

### 4. Interactive Visualization

**Web App:**
=======
All calculations are centralized and consistent across both frontends.

### 4. Interactive Visualization

#### Web App
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Bar charts
- Pie charts
- Responsive layouts

<<<<<<< HEAD
**Desktop App:**
=======
#### Desktop App
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Matplotlib-based charts
- Embedded graphs inside PyQt windows

Both interfaces display **identical analytical insights**.

### 5. Dataset History Management
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Backend stores only the **last 5 uploaded datasets**
- History includes:
  - File name
  - Upload timestamp
  - Summary statistics
- Older datasets are automatically removed

### 6. PDF Report Generation
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Backend generates professional analytical reports
- Includes:
  - Summary statistics
  - Equipment type distribution
  - Complete equipment table
- Downloadable directly from the web interface

### 7. Authentication System
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
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
<<<<<<< HEAD
| Equipment Name | Name of chemical equipment |
| Type | Equipment category |
| Flowrate | Flow rate value |
| Pressure | Pressure value |
| Temperature | Temperature value |

**Example:**
=======
| **Equipment Name** | Name of chemical equipment |
| **Type** | Equipment category |
| **Flowrate** | Flow rate value |
| **Pressure** | Pressure value |
| **Temperature** | Temperature value |

#### Example

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
```csv
Equipment Name,Type,Flowrate,Pressure,Temperature
Pump A,Pump,120,5.6,80
Valve B,Valve,60,3.2,45
Reactor C,Reactor,200,9.1,120
```

The provided sample file `sample_equipment_data.csv` was used for testing and demonstration.

---

<<<<<<< HEAD
## 🔌 Backend Functionality (Django + DRF)
=======
## 8. Backend Functionality (Django + DRF)
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

The Django backend serves as the **core processing engine**.

### Key Responsibilities
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
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

<<<<<<< HEAD
## 🌐 Web Application (React.js)
=======
## 9. Web Application (React.js)
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

The web application is developed using **React.js** and serves as the primary user-facing interface of the system.

### Key Capabilities
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
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
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Clean dashboard-style layout
- Smooth transitions using Framer Motion
- Reusable component-based architecture
- Consistent design across pages

The web application communicates with the backend **exclusively via REST APIs**.

---

<<<<<<< HEAD
## 🖥️ Desktop Application (PyQt5)
=======
## 10. Desktop Application (PyQt5)
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

The desktop version of the application is built using **PyQt5** to provide an offline-style interface while still consuming the same backend APIs.

### Purpose
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Demonstrate hybrid architecture (Web + Desktop)
- Provide identical analytical functionality on desktop
- Ensure consistency across platforms

### Features Implemented
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
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
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
Both web and desktop applications:
- Use the **same backend**
- Follow the **same API contracts**
- Produce **identical analytical results**

This ensures **true hybrid system consistency**.

---

<<<<<<< HEAD
## 🔐 Authentication System
=======
## 11. Authentication System
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

A basic **token-based authentication system** is implemented to secure the application.

### Authentication Flow

<<<<<<< HEAD
1. User registers or logs in
2. Backend generates an authentication token
3. Token is returned to the client
4. Token is stored locally
5. Token is attached to all protected API requests

### Protected Features
=======
<p align="center">
  <img width="400" height="600" alt="image" src="https://github.com/user-attachments/assets/b971f4b8-a7a7-4f80-8401-f90ab3d48ef3"" />
</p>

### Protected Features

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- CSV upload
- Dataset history access
- PDF report generation

### Supported Clients
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- React web application
- PyQt5 desktop application

Both clients authenticate using the **same backend endpoints**.

### Benefits
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Prevents unauthorized access
- Ensures dataset privacy
- Demonstrates real-world backend security practice

---

<<<<<<< HEAD
## 📊 Data Analysis & Visualization
=======
## 12. Data Analysis & Visualization
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

Data analysis is performed **entirely on the backend** using Pandas, ensuring accuracy and consistency for both web and desktop applications.

### Data Processing Steps

After uploading the CSV file:

1. File is read using Pandas
2. Required columns are validated
3. Numerical values are cleaned and converted
4. Invalid rows are removed
5. Statistical analysis is performed

### Metrics Calculated
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Total number of equipment
- Average flowrate
- Average pressure
- Average temperature
- Equipment type distribution

### Visualization Techniques

<<<<<<< HEAD
**Web Application:**
- Chart.js used for interactive charts
- Bar and distribution charts displayed dynamically

**Desktop Application:**
- Matplotlib used for plotting graphs
=======
#### Web Application
- **Chart.js** used for interactive charts
- Bar and distribution charts displayed dynamically

#### Desktop Application
- **Matplotlib** used for plotting graphs
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Charts rendered inside PyQt5 interface

All visualizations are generated from **backend-calculated data**, ensuring **identical results** across platforms.

---

<<<<<<< HEAD
## 📜 Upload History Management
=======
## 13. Upload History Management
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

The system maintains a history of uploaded datasets to support comparison and traceability.

### Backend Logic
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Each upload is stored in SQLite database
- Only the **last five datasets** are preserved
- Older datasets are automatically deleted

### Stored Information
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Original file name
- Upload timestamp
- Summary statistics
- Equipment type distribution
- Parsed CSV data

### Frontend Representation
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- History panel lists recent uploads
- Selecting a dataset reloads its analytics
- Provides quick access without re-uploading files

This feature demonstrates **persistent data handling** and **backend-controlled state management**.

---

<<<<<<< HEAD
## 📄 PDF Report Generation
=======
## 14. PDF Report Generation
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

The application supports **automatic PDF report generation** from analyzed datasets.

### Implementation
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Implemented fully on the backend using **ReportLab**
- PDF is generated dynamically per dataset
- Accessible via a dedicated API endpoint

### Report Contents
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Report title and metadata
- File name and upload date
- Summary statistics table
- Equipment type distribution table
- Full equipment data table

### Usage
<<<<<<< HEAD
- Web frontend provides a "Download PDF Report" button
=======

- Web frontend provides a **"Download PDF Report"** button
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Clicking the button opens or downloads the generated report
- Desktop application can access the same endpoint

This feature converts analytical results into a **professional, shareable document** suitable for real-world reporting.

---

<<<<<<< HEAD
## 📁 Sample Dataset Usage
=======
## 15. Sample Dataset Usage
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

To demonstrate and validate the functionality of the application, a sample dataset was used throughout development and testing.

### Sample File
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
`sample_equipment_data.csv`

### Dataset Structure

The sample CSV file follows the required format defined in the task description:

| Column Name | Description |
|-------------|-------------|
<<<<<<< HEAD
| Equipment Name | Unique name of the equipment |
| Type | Equipment category (Pump, Valve, Reactor, etc.) |
| Flowrate | Flow rate value (m³/h) |
| Pressure | Operating pressure (bar) |
| Temperature | Operating temperature (°C) |
=======
| **Equipment Name** | Unique name of the equipment |
| **Type** | Equipment category (Pump, Valve, Reactor, etc.) |
| **Flowrate** | Flow rate value (m³/h) |
| **Pressure** | Operating pressure (bar) |
| **Temperature** | Operating temperature (°C) |
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

This structure ensures compatibility with both the backend analytics engine and frontend visualization components.

### Purpose of Using Sample Dataset
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Validate backend CSV parsing
- Verify statistical calculations
- Demonstrate charts and tables
- Record screenshots and demo video
- Ensure consistent testing across web and desktop versions

---

<<<<<<< HEAD
## 📂 Project Structure

```
chemical-equipment-visualizer/
├── backend/                    # Django backend
│   ├── api/                   # REST API endpoints
│   ├── analytics/             # Pandas data processing
│   ├── authentication/        # Auth logic
│   └── manage.py
├── frontend-web/              # React web application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   └── lib/              # API utilities
│   └── package.json
├── frontend-desktop/          # PyQt5 desktop application
│   ├── dashboard.py          # Main dashboard
│   ├── login.py              # Login window
│   └── styles.py             # UI styling
├── sample_equipment_data.csv  # Sample dataset
└── README.md                  # This file
=======
## 16. Project Structure

```
chemical-equipment-visualizer/
│
├── backend/                          # Django REST API Backend
│   ├── api/
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── models.py
│   │   └── urls.py
│   ├── authentication/
│   │   ├── views.py
│   │   └── urls.py
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
│   │   │   ├── Index.tsx
│   │   │   └── Home.tsx
│   │   ├── lib/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── frontend-desktop/                 # PyQt5 Desktop Application
│   ├── main.py
│   ├── login.py
│   ├── dashboard.py
│   ├── styles.py
│   └── requirements.txt
│
├── sample-data/
│   └── sample_equipment_data.csv
│
└── README.md
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
```

---

<<<<<<< HEAD
## ⚙️ Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- Git

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/avantika1036/chemical-equipment-visualizer.git
cd chemical-equipment-visualizer/backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Start the server:
```bash
python manage.py runserver
```

Backend will run on `http://localhost:8000`

### Web Frontend Setup

1. Navigate to web frontend:
```bash
cd frontend-web
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Web app will run on `http://localhost:5173`

### Desktop Application Setup

1. Navigate to desktop frontend:
```bash
cd frontend-desktop
```

2. Install dependencies:
```bash
pip install PyQt5 matplotlib requests pandas
```

3. Run the application:
```bash
=======
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
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
python main.py
```

---

<<<<<<< HEAD
## 🎮 Running the Application

### Starting the Backend
```bash
cd backend
python manage.py runserver
```

### Starting the Web Application
=======
## 18. Running the Application

### Web Application

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 - Web Frontend:**
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
```bash
cd frontend-web
npm run dev
```

<<<<<<< HEAD
### Starting the Desktop Application
```bash
cd frontend-desktop
python main.py
```

### Default Credentials
For testing purposes, you can create a user via the signup page or use the Django admin panel.

---

## 🎬 Demo & Screenshots
=======
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
python main.py
```

---

## 19. Demo & Screenshots
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

The project includes both **Web** and **Desktop** implementations connected to the same backend.

### Web Application Demo
<<<<<<< HEAD
=======

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Landing page explaining product features and workflow
- Authentication system (login/signup)
- CSV upload interface with drag-and-drop
- Summary statistics dashboard
- Interactive charts and analytics
- Upload history with dataset switching
- Equipment data table with sorting and search
- PDF report generation

<<<<<<< HEAD
### Desktop Application Demo
=======

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

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- Native PyQt5 login screen
- Dashboard layout matching the web version
- CSV upload via file dialog
- Matplotlib-based visualizations
- Summary statistics panel
- Upload history viewer
- PDF report download

<<<<<<< HEAD
📸 **Screenshots included in repository** clearly demonstrate:
=======
<p align="center">
  <img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/627d0573-f840-4f50-be23-2b149e483f06" />
</p>
<p align="center">
  <img width="45%" alt="image" src="https://github.com/user-attachments/assets/9a86031d-8a54-45ca-802c-a20589838034" />
  <img width="45%" alt="image" src="https://github.com/user-attachments/assets/e139ee5a-1931-4c4e-bd88-679f1600028c" />
</p>


Screenshots included in repository clearly demonstrate:

>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
- UI consistency between Web and Desktop
- Identical analytics results from the shared backend
- Complete task workflow from upload → analysis → report

<<<<<<< HEAD
🎥 A short **2–3 minute demo video** is also provided as part of the submission.

---

## ✅ Evaluation Criteria Mapping

The following table maps internship task requirements to implemented features:

| Task Requirement | Implementation |
|------------------|----------------|
| Hybrid Web + Desktop App | React Web + PyQt5 Desktop |
| Common Backend API | Django + Django REST Framework |
| CSV Upload | Implemented in both Web & Desktop |
| Data Analytics | Pandas-based backend processing |
| Summary Statistics | Total count, averages, type distribution |
| Data Visualization | Chart.js (Web), Matplotlib (Desktop) |
| Upload History | SQLite storing last 5 datasets |
| PDF Report Generation | Backend-driven PDF generation |
| Authentication | Token-based authentication |
| Sample Dataset Support | Fully compatible with provided CSV |
| UI/UX Consistency | Matching layouts and workflow |
| GitHub Source Code | Structured and documented |

✅ This confirms **100% task completion** as per screening instructions.

---

## 🚧 Challenges Faced & Solutions

### 1. Maintaining Consistency Across Platforms

**Challenge:**
Ensuring identical analytics results across React and PyQt5.

**Solution:**
All calculations were centralized in the Django backend. Both frontends only consume APIs — no duplicated business logic.

### 2. Handling CSV Variations

**Challenge:**
CSV files may vary in size and structure.

**Solution:**
Used Pandas with strict column validation and error handling to ensure reliable parsing.

### 3. Upload History Management

**Challenge:**
Limiting dataset history to the last 5 uploads.

**Solution:**
Implemented database cleanup logic that automatically removes older datasets after the fifth upload.

### 4. PDF Generation Compatibility

**Challenge:**
Generating consistent PDF reports usable by both platforms.

**Solution:**
PDF generation was moved entirely to the backend, allowing both Web and Desktop to download identical reports.

### 5. Desktop UI Design Complexity

**Challenge:**
Creating a modern UI using PyQt5.

**Solution:**
Used centralized styling (`styles.py`) and modular layouts to achieve a clean, professional dashboard appearance.

---

## 🎓 Learning Outcomes

This project provided strong hands-on experience in:

- Building **full-stack hybrid applications**
- Designing **REST-based architecture**
- Implementing **shared backend logic**
- Integrating **multiple frontends with one API**
- Working with **Pandas for real data analytics**
- Handling **file uploads and storage**
- Creating **professional dashboards**
- Implementing **authentication workflows**
- Managing **project structure and documentation**
- Writing **production-quality README documentation**
=======
A **short 2–3 minute demo video** is also provided as part of the submission.

---

## 20. Evaluation Criteria Mapping

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

This confirms **100% task completion** as per screening instructions.

---

## 21. Learning Outcomes

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
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

It closely simulates **real-world software engineering workflows**.

---

<<<<<<< HEAD
## 🎉 Conclusion
=======
## 22. Conclusion
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44

The **Chemical Equipment Parameter Visualizer** successfully fulfills all requirements of the **Intern Screening Task**.

The project demonstrates:

<<<<<<< HEAD
- ✅ Proper backend–frontend separation
- ✅ Clean architecture
- ✅ Strong API integration
- ✅ Consistent analytics across platforms
- ✅ Professional UI/UX design
- ✅ Real-world data handling
- ✅ Scalable system design

By implementing both a **Web Application** and a **Desktop Application** using a shared Django backend, the project showcases practical engineering skills expected in real industry environments.

This submission reflects not only **functional correctness**, but also attention to **structure**, **usability**, **maintainability**, and **presentation**.

---

## 📞 Contact

For any questions or clarifications regarding this project, please reach out through the GitHub repository or contact me directly.

---

## 📄 License

This project was developed as part of an internship screening task and is intended for evaluation purposes.

---

**Made with ❤️ for the Intern Screening Task**
=======
- Proper backend–frontend separation
- Clean architecture
- Strong API integration
- Consistent analytics across platforms
- Professional UI/UX design
- Real-world data handling
- Scalable system design

By implementing both a **Web Application** and a **Desktop Application** using a shared Django backend, the project showcases practical engineering skills expected in real industry environments.

This submission reflects not only **functional correctness**, but also attention to **structure, usability, maintainability, and presentation**.

---

<div align="center">

**Built with ❤️ for FOSSEE Internship Program**

*Repository:* [github.com/avantika1036/chemical-equipment-visualizer](https://github.com/avantika1036/chemical-equipment-visualizer)

</div>
>>>>>>> bc32141502d49d81f43f8eeb73ef7a6dc7c4ae44
