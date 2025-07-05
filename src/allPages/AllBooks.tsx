import { useEffect } from "react";
import {
  useDeleteBookMutation,
  useGetBooksAllQuery,
} from "../redux/api/baseApi";
import type { IApiError, IBook } from "../types/types";
import toast from "react-hot-toast";
import { useScrollToTop } from "../components/helper/helper";
import { Book, BookOpen, Edit, Trash2, View } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import Loading from "../components/shared/Loading";

export default function AllBooksPage() {
  useScrollToTop();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetBooksAllQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteBook] = useDeleteBookMutation();

  useEffect(() => {
    if (error) {
      const errorMs =
        (error as IApiError)?.data?.message || "Failed to fetch books";
      toast.error(errorMs);
    }
  }, [error]);

  if (isLoading) return <Loading />;

  const handleDelete = async (bookId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(bookId).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "Book has been deleted.",
          timer: 2500,
          icon: "success",
        });
        confetti({
          spread: 200,
          particleCount: 150,
          origin: { y: -0.1 },
          startVelocity: -35,
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="text-center mb-3">
        <h1 className="text-3xl font-bold text-gray-900">All Books</h1>
        <p className="text-gray-600 mt-1">
          Browse and manage all books in the library
        </p>
      </div>

      {/* Books Table */}

      {data?.data?.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No books added yet
          </h3>
          <p className="text-gray-600">Start adding books to see them here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Book Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    ISBN
                  </th>
                  <th className="text-center px-6 py-4 text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Copies
                  </th>
                  <th className="text-center px-6 py-4 text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-center px-6 py-4 text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.data?.map((book: IBook) => (
                  <tr key={book._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-bold text-gray-800 line-clamp-1">
                          {book.title}
                        </div>
                        <div className="text-sm text-gray-800 line-clamp-1">
                          Author:{" "}
                          <span className="font-medium ">{book.author}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {book.genre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                      {book.isbn}
                    </td>
                    <td className="text-center px-6 py-4 text-sm text-gray-900">
                      <div>
                        <span className="font-medium"> {book.copies}</span>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          book.available === true && book.copies > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {book.available === true && book.copies > 0
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </td>

                    <td className="pe-2.5 py-4 ">
                      <div className="flex flex-wrap gap-1 justify-center items-center">
                        <Link
                          to={`/books/${book._id}`}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-1 border border-gray-300 rounded text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                        >
                          <View className="w-3.5 h-3.5" />
                          View
                        </Link>

                        <button
                          onClick={() =>
                            book.copies > 0 &&
                            book.available &&
                            navigate(`/borrow/${book._id}`)
                          }
                          disabled={!(book.copies > 0 && book.available)}
                          className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 border rounded transition
        ${
          book.copies > 0 && book.available
            ? "border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
            : "border-gray-200 text-gray-400 cursor-not-allowed"
        }`}
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          Borrow
                        </button>

                        <Link
                          to={`/edit-book/${book._id}`}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-1 border border-gray-300 rounded text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(book._id)}
                          className="inline-flex items-center cursor-pointer gap-1 text-[11px] px-2 py-1 border border-gray-300 rounded text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
