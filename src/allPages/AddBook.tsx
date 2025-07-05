import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { ICreateBookData } from "../types/types";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { useCreateBookMutation } from "../redux/api/baseApi";
import { useScrollToTop } from "../components/helper/helper";

export default function CreateBookPage() {
  useScrollToTop();

  const navigate = useNavigate();
  const [addBook] = useCreateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ICreateBookData>();

  const onSubmit = async (data: ICreateBookData) => {
    try {
      addBook(data).unwrap();
      toast.success("Book added successfully");
      confetti({
        spread: 200,
        particleCount: 150,
        origin: { y: -0.1 },
        startVelocity: -35,
      });
      reset();
      navigate("/books");
    } catch (error) {
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="mb-5 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
        <p className="text-gray-600 mt-1">
          Add a new book to your library collection
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className={`w-full px-3 py-2 border rounded-lg outline-none ${
                errors.title ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter book title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Author *
            </label>
            <input
              type="text"
              id="author"
              {...register("author", { required: "Author is required" })}
              className={`w-full px-3 py-2 border rounded-lg outline-none ${
                errors.author ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Genre *
            </label>
            <select
              id="genre"
              {...register("genre", { required: "Genre is required" })}
              className={`w-full px-3 py-2 border rounded-lg outline-none ${
                errors.genre ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value="">Select a genre</option>
              <option value="FICTION">FICTION</option>
              <option value="NON_FICTION">NON_FICTION</option>
              <option value="SCIENCE">SCIENCE</option>
              <option value="HISTORY">HISTORY</option>
              <option value="BIOGRAPHY">BIOGRAPHY</option>
              <option value="FANTASY">FANTASY</option>
            </select>
            {errors.genre && (
              <p className="mt-1 text-sm text-red-600">
                {errors.genre.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="isbn"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ISBN *
            </label>
            <input
              type="text"
              id="isbn"
              {...register("isbn", {
                required: "ISBN is required",
                pattern: {
                  value: /^[a-zA-Z0-9\s-]+$/,
                  message: "Please enter a valid ISBN",
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg outline-none ${
                errors.isbn ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter ISBN (e.g., 978-0-123456-78-9)"
            />
            {errors.isbn && (
              <p className="mt-1 text-sm text-red-600">{errors.isbn.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              {...register("description")}
              className={`w-full px-3 py-2 border rounded-lg outline-none ${
                errors.description ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter book description (optional)"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="copies"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Number of Copies *
            </label>
            <input
              type="number"
              id="copies"
              min="1"
              {...register("copies", {
                required: "Number of copies is required",
                min: { value: 1, message: "Must have at least 1 copy" },
              })}
              className={`w-full px-3 py-2 border rounded-lg outline-none ${
                errors.copies ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter number of copies"
            />
            {errors.copies && (
              <p className="mt-1 text-sm text-red-600">
                {errors.copies.message}
              </p>
            )}
          </div>

          <div className="col-span-0 md:col-span-2 w-full flex justify-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className=" bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Adding Book..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
