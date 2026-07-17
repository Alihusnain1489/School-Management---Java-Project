import { useState } from 'react'
import {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} from './studentsApiSlice'
import StudentForm from './StudentForm'

export default function StudentList() {
  const [editingStudent, setEditingStudent] = useState(null)

  // --- Async data fetching via RTK Query ---
  // No useEffect, no manual loading/error state — it's all handled for us.
  const { data: students, isLoading, isError, error } = useGetStudentsQuery()

  const [createStudent, { isLoading: isCreating }] = useCreateStudentMutation()
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation()
  const [deleteStudent] = useDeleteStudentMutation()

  const handleSubmit = async (formData) => {
    try {
      if (editingStudent) {
        await updateStudent({ id: editingStudent.id, ...formData }).unwrap()
        setEditingStudent(null)
      } else {
        await createStudent(formData).unwrap()
      }
    } catch (err) {
      // .unwrap() re-throws so we can handle validation errors from the backend here
      console.error('Failed to save student:', err)
      alert(err?.data ? JSON.stringify(err.data) : 'Something went wrong')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this student?')) return
    try {
      await deleteStudent(id).unwrap()
    } catch (err) {
      console.error('Failed to delete student:', err)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">School Management System</h1>

      <StudentForm
        editingStudent={editingStudent}
        onSubmit={handleSubmit}
        onCancel={() => setEditingStudent(null)}
        isSubmitting={isCreating || isUpdating}
      />

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        {isLoading && (
          <p className="p-6 text-center text-sm text-slate-500">Loading students…</p>
        )}

        {isError && (
          <p className="p-6 text-center text-sm text-red-600">
            Failed to load students: {error?.status ? `Error ${error.status}` : 'Network error'}.
            Is the backend running on port 8080?
          </p>
        )}

        {students && students.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-500">No students yet — add one above.</p>
        )}

        {students && students.length > 0 && (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{student.name}</td>
                  <td className="px-4 py-3 text-slate-600">{student.email}</td>
                  <td className="px-4 py-3 text-slate-600">{student.grade}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setEditingStudent(student)}
                      className="mr-3 font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="font-medium text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
