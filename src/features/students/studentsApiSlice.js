import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// RTK Query handles all the async logic for us: loading states, caching,
// re-fetching after mutations, etc. This is the "async programming" piece
// done the modern Redux way (no manual useEffect + fetch + useState juggling).

export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
  }),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    // GET /api/students
    getStudents: builder.query({
      query: () => '/students',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Student', id })),
              { type: 'Student', id: 'LIST' },
            ]
          : [{ type: 'Student', id: 'LIST' }],
    }),

    // GET /api/students/:id
    getStudentById: builder.query({
      query: (id) => `/students/${id}`,
      providesTags: (result, error, id) => [{ type: 'Student', id }],
    }),

    // POST /api/students
    createStudent: builder.mutation({
      query: (newStudent) => ({
        url: '/students',
        method: 'POST',
        body: newStudent,
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),

    // PUT /api/students/:id
    updateStudent: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/students/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Student', id }],
    }),

    // DELETE /api/students/:id
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),
  }),
})

// Auto-generated hooks — this is the payoff of RTK Query.
// Each hook gives you { data, isLoading, isError, error } for free.
export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi
