import { BookOpen } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import type { IApiError, IBorrowBookData } from "../types/types";
import {
  useBookBorrowMutation,
  useGetSingleBookQuery,
} from "../redux/api/baseApi";
import toast from "react-hot-toast";
import { useScrollToTop } from "../components/helper/helper";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import Loading from "../components/shared/Loading";

export default function BorrowBook() {
  useScrollToTop();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: bookData,
    isLoading,
    error,
  } = useGetSingleBookQuery(id as string);
  const [bookBorrow] = useBookBorrowMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IBorrowBookData>();

  useEffect(() => {
    if (error) {
      const errorMs =
        (error as IApiError)?.data?.message || "Failed to fetch books";
      toast.error(errorMs);
    }
  }, [error]);

  if (isLoading) return <Loading />;

  const onSubmit = async (data: IBorrowBookData) => {
    try {
      const dataForBorrow = {
        ...data,
        book: bookData?.data?._id,
      };
      await bookBorrow(dataForBorrow).unwrap();
      reset();
      toast.success("Book borrowed successfully");
      confetti({
        spread: 200,
        particleCount: 150,
        origin: { y: -0.1 },
        startVelocity: -35,
      });
      navigate("/borrow-summary");
    } catch (error) {
      toast.error("Failed to borrow book");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Borrow Book</h1>
        <p className="text-gray-600 mt-1">Complete the borrowing process</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 ">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <BookOpen className="w-12 h-12 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {bookData?.data?.title}
              </h2>
              <p>
                <span className="font-semibold">Author:</span>{" "}
                {bookData?.data?.author}
              </p>
              <div className="mt-2 space-y-1 text-sm text-gray-800">
                <p>
                  <span className="font-semibold">Genre:</span>{" "}
                  {bookData?.data?.genre}
                </p>
                <p>
                  <span className="font-medium">ISBN:</span>{" "}
                  {bookData?.data?.isbn}
                </p>
                <p>
                  <span className="font-medium">Available Copies:</span>{" "}
                  {bookData?.data?.copies}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              {bookData?.data?.description}
            </p>
          </div>
        </div>

        {/* form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quantity *
              </label>
              <input
                type="number"
                id="quantity"
                defaultValue={1}
                max={bookData?.data?.copies}
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 1, message: "Must borrow at least 1 copy" },
                  max: {
                    value: bookData?.data?.copies,
                    message: `Only ${bookData?.data?.copies} copies available`,
                  },
                })}
                className={`w-full px-3 py-2 border rounded-lg outline-none ${
                  errors.quantity ? "border-red-300" : "border-gray-300"
                }`}
              />
              <p className="mt-1 text-start text-gray-800">
                <span className="text-red-500 font-medium">Available:</span>{" "}
                {bookData?.data?.copies} copies.
              </p>
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Due Date *
              </label>
              <input
                type="date"
                id="dueDate"
                {...register("dueDate", {
                  required: "Due date is required",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return (
                      selectedDate > today || "Due date must be in the future"
                    );
                  },
                })}
                className={`w-full px-3 py-2 border rounded-lg outline-none ${
                  errors.dueDate ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dueDate.message}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Select a return date for the borrowed book(s)
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting && bookData?.data?.copies > 0}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Processing..." : "Borrow Book"}
              </button>
              <Link
                to="/books"
                className="px-4 py-2 text-gray-700 border border-gray-300 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
