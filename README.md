# Contact Management System

A full-stack application for managing personal contacts, featuring a robust **ASP.NET Core Web API** backend and a reactive **Vue.js 3** frontend.

## 🚀 Overview

This project provides a comprehensive solution for CRUD (Create, Read, Update, Delete) operations on contact records. It is designed with a clear separation of concerns, utilizing modern patterns like CQRS on the backend and the Composition API on the frontend.

## 🛠 Tech Stack

### Backend
- **Framework**: .NET 6.0+ / ASP.NET Core
- **Pattern**: CQRS (Command Query Responsibility Segregation)
- **Library**: MediatR (for decoupled messaging)
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: Vue.js 3 (Composition API)
- **HTTP Client**: Axios
- **Validation**: Custom JavaScript/TypeScript validation logic
- **Styling**: Scoped CSS with responsive table layouts

## 📋 Features & Requirements

As per the technical specifications, the application implements:

1.  **Contact Entity**: Includes `Name`, `MobilePhone`, `JobTitle`, `BirthDate`, and `Email`.
2.  **CRUD Operations**:
    *   **Read**: Displays a formatted list of contacts in a responsive table.
    *   **Create**: (Backend ready) Endpoint for adding new entries.
    *   **Update**: Allows inline editing of `MobilePhone` and `JobTitle`.
    *   **Delete**: Confirmation-based removal of records.
3.  **Client-Side Validation**: Integrated JavaScript validation (via `ContactValidator`) to ensure data integrity before API calls.
4.  **Notifications**: A custom toast system to provide real-time feedback for success and error states.

## 📡 API Architecture (Backend)

The backend follows the CQRS pattern to separate read and write logic:

- **GET `/api/contacts`**: Fetches all contacts via `GetAllContactsQuery`.
- **POST `/api/contacts`**: Creates contacts via `CreateContactCommand`.
- **PUT `/api/contacts/{id}`**: Updates specific fields via `UpdateContactCommand`.
- **DELETE `/api/contacts/{id}`**: Removes a record via `DeleteContactCommand`.

## 💻 Frontend Implementation (Vue.js)

The UI is built with a focus on user experience and real-time interaction:

*   **Reactive State**: Uses `ref` for managing contact data, loading states, and error handling.
*   **Inline Editing**: While the UI supports inline updates for efficiency, it is designed to be easily extended into modal/popup windows as per requirements.
*   **Validation**: Every update is passed through `validateContact()` to ensure the phone number and job title meet the required formats.
*   **Feedback**: A `transition-group` based notification system displays messages for 4 seconds before fading out.

## ⚙️ Setup and Installation

### Backend Setup
1. Navigate to the server project folder.
2. Restore NuGet packages:
   ```bash
   dotnet restore
