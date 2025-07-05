import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../allPages/Home";
import CreateBookPage from "../allPages/AddBook";
import AllBooksPage from "../allPages/AllBooks";
import BookDetailsPage from "../allPages/BookDetails";
import EditBook from "../allPages/EditBook";
import BorrowBook from "../allPages/BorrowBook";
import BorrowSummary from "../allPages/BorrowSummary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-book",
        element: <CreateBookPage />,
      },
      {
        path: "/create-book",
        element: <CreateBookPage />,
      },
      {
        path: "/books",
        element: <AllBooksPage />,
      },
      {
        path: "/books/:id",
        element: <BookDetailsPage />,
      },
      {
        path: "/edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "/borrow/:id",
        element: <BorrowBook />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);

export default router;
