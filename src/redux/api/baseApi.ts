import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://l2-assignment-3-psi.vercel.app/api",
  }),
  tagTypes: ["Book","Borrow"],
  endpoints: (builder) => ({
    // getBooksAll
    getBooksAll: builder.query({
      query: () => `/books`,
      providesTags: ["Book"],
    }),

    // getSingleBook
    getSingleBook: builder.query({
      query: (id: string) => `/books/${id}`,
      providesTags: ["Book"],
    }),

    // createBook
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),

    // updateBook
    updateBook: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Book"],
    }),

    // deleteBook
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),

    // bookBorrow
    bookBorrow: builder.mutation({
      query: (bookBorrowData) => ({
        url: "/borrow",
        method: "POST",
        body: bookBorrowData,
      }),
      invalidatesTags: ["Borrow"],
    }),

    // getBorrowSummary
    getBorrowSummary: builder.query({
      query: () => `/borrow`,
      providesTags: ["Borrow"],
    }),
  }),
});

export const {
  useGetBooksAllQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBookBorrowMutation,
  useGetBorrowSummaryQuery,
} = baseApi;
