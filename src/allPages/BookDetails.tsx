import { Link, useNavigate, useParams } from "react-router";
import { useGetSingleBookQuery } from "../redux/api/baseApi";
import type { IApiError } from "../types/types";
import { BookOpen, CalendarDays } from "lucide-react";
import moment from "moment";
import { useScrollToTop } from "../components/helper/helper";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../components/shared/Loading";

export default function BookDetailsPage() {
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: bookData,
    isLoading,
    error,
  } = useGetSingleBookQuery(id as string);

  useEffect(() => {
    if (error) {
      const errorMs =
        (error as IApiError)?.data?.message || "Failed to fetch books";
      toast.error(errorMs);
    }
  }, [error]);
  
  if (isLoading) return <Loading />;

  const book = bookData.data;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div className="text-center mb-3">
        <h1 className="text-3xl font-bold text-gray-900">Book Details</h1>
        <p className="text-gray-600 mt-1">View book information</p>
      </div>

      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-14 h-14 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
        </div>

        <div className="text-sm text-gray-700 space-y-2 ">
          <p className="flex items-center gap-2">
            <span className="font-medium">Author:</span> {book.author}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium">Genre:</span> {book.genre}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium">ISBN:</span> {book.isbn}
          </p>
          <p>
            <span className="font-medium">Copies Available:</span> {book.copies}
          </p>
          <p>
            <span className="font-semibold">Available:</span>{" "}
            {book.available === true && book.copies > 0 ? (
              <span className="text-green-600">Yes</span>
            ) : (
              <span className="text-red-600">No</span>
            )}
          </p>
          <p>
            <span className="font-medium">Description:</span> {book.description}
          </p>
        </div>
        <div className="flex justify-between items-center ">
          <div className="text-xs text-gray-500 flex gap-4 ">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>Added: {moment(book.createdAt).format("M/D/YYYY")}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>Updated: {moment(book.updatedAt).format("M/D/YYYY")}</span>
            </div>
          </div>

          <button
            onClick={() =>
              book.copies > 0 &&
              book.available &&
              navigate(`/borrow/${book._id}`)
            }
            disabled={!(book.copies > 0 && book.available)}
            className={`inline-flex items-center gap-1 text-xs sm:text-sm px-2.5 py-1.5 border rounded transition
    ${
      book.copies > 0 && book.available
        ? "bg-gray-200 border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
        : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
    }
  `}
          >
            <BookOpen className="w-4 h-4" />
            <span>Borrow</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Back to Books
        </Link>
      </div>
    </div>
  );
}
