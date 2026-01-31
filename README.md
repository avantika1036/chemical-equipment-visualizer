# 🧪 Chemical Equipment Parameter Visualizer

### Hybrid Web + Desktop Application
**Intern Screening Task Submission**

---

## 📑 Table of Contents

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

The **Chemical Equipment Parameter Visualizer** is a hybrid application developed as part of the **Intern Screening Task – Hybrid Web + Desktop Application**.

The objective of this project is to design and implement a **single analytics backend** that can be consumed by both:

- **Web Application** (React.js)
- **Desktop Application** (PyQt5)

The system allows users to upload chemical equipment datasets in CSV format, perform automated data analysis using Python, and visualize the results through interactive charts and tables.

### What This Project Demonstrates

- Full-stack development
- API-driven architecture
- Data analytics using Pandas
- Consistent visualization across platforms

---

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

All development decisions in this project strictly follow the requirements mentioned in the task document.

---

## 🎯 Objective of the Project

The main objectives of this project are:

- To design a **single-source backend** capable of serving multiple frontends
- To perform **server-side data analytics** instead of frontend computation
- To ensure **UI and functional consistency** between web and desktop platforms
- To demonstrate real-world **API integration** and data visualization workflows

By implementing the same analytical logic for both applications, the project reflects how industrial systems often support multiple clients using a shared backend.

---

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

This design ensures **scalability** and **consistency** across platforms.

---

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

All calculations are **centralized** and **consistent** across both frontends.

### 4. Interactive Visualization

**Web App:**
- Bar charts
- Pie charts
- Responsive layouts

**Desktop App:**
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
| Equipment Name | Name of chemical equipment |
| Type | Equipment category |
| Flowrate | Flow rate value |
| Pressure | Pressure value |
| Temperature | Temperature value |

**Example:**
```csv
Equipment Name,Type,Flowrate,Pressure,Temperature
Pump A,Pump,120,5.6,80
Valve B,Valve,60,3.2,45
Reactor C,Reactor,200,9.1,120
```

The provided sample file `sample_equipment_data.csv` was used for testing and demonstration.

---

## 🔌 Backend Functionality (Django + DRF)

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

## 🌐 Web Application (React.js)

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

## 🖥️ Desktop Application (PyQt5)

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

## 🔐 Authentication System

A basic **token-based authentication system** is implemented to secure the application.

### Authentication Flow

1. User registers or logs in
2. Backend generates an authentication token
3. Token is returned to the client
4. Token is stored locally
5. Token is attached to all protected API requests

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

## 📊 Data Analysis & Visualization

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

**Web Application:**
- Chart.js used for interactive charts
- Bar and distribution charts displayed dynamically

**Desktop Application:**
- Matplotlib used for plotting graphs
- Charts rendered inside PyQt5 interface

All visualizations are generated from **backend-calculated data**, ensuring **identical results** across platforms.

---

## 📜 Upload History Management

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

## 📄 PDF Report Generation

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
- Web frontend provides a "Download PDF Report" button
- Clicking the button opens or downloads the generated report
- Desktop application can access the same endpoint

This feature converts analytical results into a **professional, shareable document** suitable for real-world reporting.

---

## 📁 Sample Dataset Usage

To demonstrate and validate the functionality of the application, a sample dataset was used throughout development and testing.

### Sample File
`sample_equipment_data.csv`

### Dataset Structure

The sample CSV file follows the required format defined in the task description:

| Column Name | Description |
|-------------|-------------|
| Equipment Name | Unique name of the equipment |
| Type | Equipment category (Pump, Valve, Reactor, etc.) |
| Flowrate | Flow rate value (m³/h) |
| Pressure | Operating pressure (bar) |
| Temperature | Operating temperature (°C) |

This structure ensures compatibility with both the backend analytics engine and frontend visualization components.

### Purpose of Using Sample Dataset
- Validate backend CSV parsing
- Verify statistical calculations
- Demonstrate charts and tables
- Record screenshots and demo video
- Ensure consistent testing across web and desktop versions

---

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
```

---

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
python main.py
```

---

## 🎮 Running the Application

### Starting the Backend
```bash
cd backend
python manage.py runserver
```

### Starting the Web Application
```bash
cd frontend-web
npm run dev
```

### Starting the Desktop Application
```bash
cd frontend-desktop
python main.py
```

### Default Credentials
For testing purposes, you can create a user via the signup page or use the Django admin panel.

---

## 🎬 Demo & Screenshots

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

### Desktop Application Demo
- Native PyQt5 login screen
- Dashboard layout matching the web version
- CSV upload via file dialog
- Matplotlib-based visualizations
- Summary statistics panel
- Upload history viewer
- PDF report download

📸 **Screenshots included in repository** clearly demonstrate:
- UI consistency between Web and Desktop
- Identical analytics results from the shared backend
- Complete task workflow from upload → analysis → report

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

It closely simulates **real-world software engineering workflows**.

---

## 🎉 Conclusion

The **Chemical Equipment Parameter Visualizer** successfully fulfills all requirements of the **Intern Screening Task**.

The project demonstrates:

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