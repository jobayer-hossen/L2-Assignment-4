import { BookOpen, View } from "lucide-react";
import { Link, useNavigate } from "react-router";
import type { IBook } from "../types/types";

interface BookCardProps {
  book: IBook;
}

export default function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-4 text-sm sm:text-base relative">
        <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p>
          <span className="font-semibold">ISBN:</span> {book.isbn}
        </p>
        <p>
          <span className="font-semibold">Author:</span> {book.author}
        </p>
        <p>
          <span className="font-semibold">Genre:</span> {book.genre}
        </p>
        <p>
          <span className="font-semibold">Copies:</span> {book.copies}
        </p>
        <p>
          <span className="font-semibold">Available:</span>{" "}
          {book.available === true && book.copies > 0 ? (
            <span className="text-green-600">Yes</span>
          ) : (
            <span className="text-red-600">No</span>
          )}
        </p>

        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <Link
            to={`/books/${book._id}`}
            className="inline-flex items-center gap-1 text-xs sm:text-sm px-2.5 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
          >
            <View className="w-4 h-4" />
            <span>View</span>
          </Link>

          <button
            onClick={() =>
              book.copies > 0 &&
              book.available &&
              navigate(`/borrow/${book._id}`)
            }
            disabled={!(book.copies > 0 && book.available)}
            className={`inline-flex items-center gap-1 text-xs sm:text-sm px-2.5 py-1.5 border rounded-md transition
    ${
      book.copies > 0 && book.available
        ? " border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
        : " border-gray-200 text-gray-400 cursor-not-allowed"
    }
  `}
          >
            <BookOpen className="w-4 h-4" />
            <span>Borrow</span>
          </button>
        </div>
      </div>
    </div>
  );
}
