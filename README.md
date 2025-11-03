# 🚀 SkillMatch: Remote Job and Skill Matching Platform (Full Stack)

SkillMatch is a modern full-stack web application designed to help users browse **remote job listings** and view potential matches based on their personal skill set using a **percentage-based score**. The project aims to enhance efficiency for both job seekers and administrators.
<img src="https://github.com/user-attachments/assets/504f7af0-710b-444c-9038-0af3d8dd9d4a" alt="image" style="width:90%; max-width:1200px; display:block; margin:auto;" />


## ✨ Key Features

### User-Centric Features (Frontend)

  * **Job Listing:** Clean, card-based interface for displaying remote job openings.

  * **Intelligent Matching:** The **"% Matched"** score is calculated instantly on each listing, comparing the user's profile skills against the job's required skills.

  * **Profile and Skill Management:** Users can easily add and remove skills from their profile, which powers the matching scores.

  * **Job Application:** Simple application form available directly from the job details card.

### Administration and Backend Functionalities

  * **Data Integration:** The Spring Boot `DataInitializer` class automatically fetches and saves current remote job listings from the **Remotive API** upon startup.

  * **Skill Extraction:** Required technical skills are automatically detected and tagged from job description texts using the backend's `SkillExtractorUtil`.

  * **JWT Security:** Secure authentication using JWT (JSON Web Token) via Spring Security and an Angular Interceptor.

  * **Role-Based Authorization:**

      * Users with the **Admin** role have **CRUD** (Create, Read, Update, Delete) privileges for job listings.

      * Admins can also list and review all submitted job applications (`/admin/applications`).

  * **Backend Data Store:** Skills are efficiently stored in the database using a custom converter to handle `List<String>` as a JSON field.
<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
  <img src="https://github.com/user-attachments/assets/99d26722-6cde-48ac-8db7-144679399fa1" alt="image1" style="width:48%; max-width:600px;" />
  <img src="https://github.com/user-attachments/assets/a4d8a29a-4aa3-4c4c-960b-0595a8c610de" alt="image2" style="width:48%; max-width:600px;" />
  <img src="https://github.com/user-attachments/assets/9c67bf23-12e7-443f-87ef-1df2c427a5a7" alt="image3" style="width:48%; max-width:600px;" />
  <img src="https://github.com/user-attachments/assets/96b06161-e643-4a46-bf94-f34c90c4f635" alt="image4" style="width:48%; max-width:600px;" />
</div>

## ⚙️ Technologies

SkillMatch is built using a robust selection of modern technologies for both the client and server sides.

### 💻 Backend

| Category | Technology | Notes |
|---|---|---|
| **Language/Framework** | **Java** / **Spring Boot 3** | Secure and scalable RESTful API. |
| **Database** | **MySQL** | Relational data store. |
| **Security** | **Spring Security & JWT** | Token-based Admin/User authorization. |
| **Data Integration** | Remotive API, `RestTemplate` | External API connectivity for job listings. |
| **Persistence** | JPA & `StringListConverter` | Stores skill lists as JSON strings in the DB. |

### 🖼️ Frontend

| Category | Technology | Notes |
|---|---|---|
| **Framework** | **Angular (Standalone Components)** | Modern, component-based Single Page Application (SPA) structure. |
| **State Management** | **RxJS (`BehaviorSubject`)** | Reactive state management for session (Admin status) and user skills. |
| **Security** | **Auth Guard & Interceptor** | Protects routes and automatically attaches JWT to authorized requests. |
| **Styling** | Custom CSS & Google Fonts | Clean, modern, and responsive design. |

## 🛠️ Setup and Running

### 1\. Prerequisites

  * **Java 17+**

  * **Maven**

  * **MySQL Server**

  * **Node.js (LTS)**

  * **Angular CLI**

### 2\. Backend Setup

1.  **Database Creation:** Create a database named `skillMatch` on your MySQL server:

    ```
    CREATE DATABASE skillMatch;
    ```

2.  **Configuration:** Update the database connection details in `backend/src/main/resources/application.properties` to match your environment:

    ```
    spring.datasource.url=jdbc:mysql://localhost:3306/skillMatch
    spring.datasource.username=root
    spring.datasource.password=1234
    # ... (other settings)
    ```

3.  **Start Backend:** Navigate to the backend directory and run the application:

    ```
    ./mvnw spring-boot:run
    ```

    *(The application will start on `http://localhost:8080`. Job listings and the Admin user will be created automatically.)*

### 3\. Frontend Setup

1.  **Dependencies:** Navigate to the frontend directory and install packages:

    ```
    cd frontend
    npm install
    ```

2.  **Start Frontend:** Start the Angular development server:

    ```
    ng serve --open
    ```

    *(The application will open in your browser at `http://localhost:4200`.)*

## 🔑 Default Users (For Development Purposes)

To fully test the application's features, use the following default account created by the `DataInitializer`:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@skillmatch.com` | `admin123` |

### Usage Scenarios

1.  **Profile Management:** Log into the application and go to the **"My Profile"** page. Add your technical skills here (e.g., `Java`, `Spring Boot`, `Angular`).

2.  **Matching:** Navigate back to the home page (`/`). You will see the **% Matched** scores on job cards, calculated based on the skills you added.

3.  **Admin Operations:** Log in with the Admin account. The **Update/Delete** buttons will appear on the job cards on the home page. You can also access the **"Applications"** page via the navigation menu to review all job submissions.

## 🤝 Contributing

Bug reports, suggestions, or contributions for new features are always welcome. Please feel free to open an "Issue" or submit a "Pull Request."
