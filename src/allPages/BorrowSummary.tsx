import { Book, BookOpen, Calendar, Hash } from "lucide-react";
import { useGetBorrowSummaryQuery } from "../redux/api/baseApi";
import moment from "moment";
import type { IApiError, IBorrowRecord } from "../types/types";
import { useScrollToTop } from "../components/helper/helper";
import { Link } from "react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../components/shared/Loading";

export default function BorrowSummary() {
  useScrollToTop();
  const {
    data: borrowedBooks,
    isLoading,
    error,
  } = useGetBorrowSummaryQuery(undefined);

  useEffect(() => {
    if (error) {
      const errorMs =
        (error as IApiError)?.data?.message || "Failed to fetch books";
      toast.error(errorMs);
    }
  }, [error]);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto px-4 pb-5">
      <div className="text-center mb-3">
        <h1 className="text-3xl font-bold text-gray-900">Borrow Summary</h1>
        <p className="text-gray-600 mt-1">Track your borrowed books</p>
      </div>

      {borrowedBooks?.data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No books borrowed yet
          </h3>
          <p className="text-gray-600">
            Start borrowing books to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {borrowedBooks.data.map((borrowedBook: IBorrowRecord, i: number) => (
            <div
              key={i}
              className="bg-white rounded-l shadow-sm border border-gray-100 p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">
                    {borrowedBook.book.title}
                  </h4>
                  <p className="text-gray-600 mb-2">
                    ISBN: {borrowedBook.book.isbn}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Hash className="w-4 h-4" />
                      <span>Quantity: {borrowedBook.totalQuantity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-red-600">
                        Borrowed:{" "}
                        {moment(borrowedBook.createdAt).format("M/D/YYYY")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-green-600">
                        Due: {moment(borrowedBook.dueDate).format("M/D/YYYY")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-2">
                  <BookOpen className="w-12 h-12 text-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
