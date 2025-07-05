# Minimal Library Management System -Frontend

A fully functional, minimalistic library management system built with **React**, **Redux Toolkit Query (RTK Query)**, **TypeScript**, and **Tailwind CSS** on the frontend, and **Express.js**, **MongoDB**, and **Mongoose** on the backend.

This system allows users to manage books, handle borrow requests, and track borrowing summaries—all with clean design, responsive layout, and smooth user experience.


---

##  All Link

#### Frontend Live Link :  https://l2-assignment-4-iota.vercel.app/
#### Backend Live API Link :  https://l2-assignment-3-psi.vercel.app/
#### Backend Repository Link : https://github.com/jobayer-hossen/L2-Assignment-3

---

##  Features Overview

### Book Management
- List books in a responsive table.
- Add, edit, and delete books with validation.
- Unavailable when copies reach 0.
- Mainly useing Redux RTK Query to hande this project.

### All Books Page
- Displays all books in a table.
- Each book includes action buttons:
  - Borrow Book : Navigate borrow page.
  - Edit Book : Navigate edit page for updating book information.
  - Delete Book : Opens delete confirmation toast.
  - View Details : Navigates to the book's detailed view.
- Automatically reflects available/unavailable status based on `copies` count and `available` status.

### Add Book Page
- Form validations:
  - All fields are required except.
  - Must have minimum 1 copy to add.
- On success:
  - Shows success toast.
  - Redirects to All Books page.

### Borrow Book page
- Triggered by Borrow button than navigate borrow page.
- Contains:
  - A field to enter number of copies to borrow.
  - A date picker for return date.
- Validations:
  - Cannot borrow more copies than available.
- On success:
  - Shows success toast.

### Borrow Summary
- Aggregated view showing:
  - Book Title
  - ISBN
  - Total Quantity Borrowed
  - Deu date
  - Borrowed date

---

## Pages/Routes

| Route              | Description                             |
|-------------------|-----------------------------------------|
| `/books`          | List all books                          |
| `/create-book`    | Create a new book                       |
| `/books/:id`      | View book details                       |
| `/edit-book/:id`  | Edit existing book                      |
| `/borrow/:bookId` | Borrow a specific book                  |
| `/borrow-summary` | View all borrow summary         |

---

##  Tech Stack
###  Frontend
- **React 19**
- **React Router 7**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React (Icons)**
- **Lottie React** (Animations)
- **Canvas Confetti** (Celebration effects)

###  State Management
- **Redux Toolkit**
- **RTK Query**

### Utilities
- **React Hook Form** – Form handling
- **React Hot Toast** – Notifications
- **SweetAlert2** – Confirmation alerts
- **Moment.js** – Date handling

## Installation & Setup

### Prerequisites

- Node.js 
- npm 

### 1. Clone the Frontend Repository

```bash
git clone https://github.lol
```

### 2. Go Inside The File 

```bash
cd B5-A4-Frontend
```

### 3. Install The Dependencies 

```bash
npm install 
```
### 4. Run The Project

```bash
npm run dev  
```

## License

This project is licensed under the [MIT License](LICENSE).
