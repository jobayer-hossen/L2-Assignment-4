import { Star, Zap } from "lucide-react";
import { useGetBooksAllQuery } from "../redux/api/baseApi";
import BookCard from "../components/BookCard";
import type { IBook } from "../types/types";
import { Link } from "react-router";
import { features, testimonials } from "../components/helper/helper";
import Loading from "../components/shared/Loading";

export default function Home() {
  const { data, error, isLoading } = useGetBooksAllQuery(undefined);

  if (error)
    return (
      <div>
        Error: {typeof error === "string" ? error : JSON.stringify(error)}
      </div>
    );

  return (
    <div>
      <section className="relative py-10 bg-gradient-to-br rounded-xl from-purple-200 via-white to-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Modern Library Solution
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Manage Your Library
                <span className="text-blue-600 block">Effortlessly</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Streamline your library operations with our comprehensive
                management system. Track books, manage borrowers, and maintain
                your collection with ease.
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <div className="w-12 h-16 bg-blue-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-300 rounded mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <div className="w-12 h-16 bg-green-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-300 rounded mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                    <div className="w-12 h-16 bg-purple-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-300 rounded mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* feature */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Library
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools makes library management simple,
              efficient, and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* some book Section */}
      <section className="py-20 bg-gradient-to-br rounded-lg from-green-100 via-white to-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Books from Our Collection 📚
            </h2>
            <p className="text-gray-600 text-base max-w-xl mx-auto">
              Explore some of the top picks from our growing library. Handpicked
              for curious minds and eager readers!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-1 md:col-span-3 flex justify-center">
                <Loading />
              </div>
            ) : (
              data?.data
                ?.slice(0, data.data.length < 6 ? 3 : 6)
                .map((book: IBook, i: number) => (
                  <BookCard key={i} book={book} />
                ))
            )}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/books"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Go to All Books
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Loved by Librarians Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what library professionals are saying about our system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
