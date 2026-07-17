import { useEffect, useState } from 'react'

const emptyForm = { name: '', email: '', grade: '' }

// Controlled form used for both "create" and "edit".
// If `editingStudent` is passed in, the form pre-fills and switches to update mode.
export default function StudentForm({ editingStudent, onSubmit, onCancel, isSubmitting }) {
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name,
        email: editingStudent.email,
        grade: editingStudent.grade,
      })
    } else {
      setForm(emptyForm)
    }
  }, [editingStudent])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...form, grade: Number(form.grade) })
    if (!editingStudent) setForm(emptyForm)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Jane Doe"
        />
      </div>

      <div className="flex-1">
        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="jane@school.com"
        />
      </div>

      <div className="w-full sm:w-24">
        <label className="mb-1 block text-sm font-medium text-slate-700">Grade</label>
        <input
          name="grade"
          type="number"
          min={1}
          max={12}
          value={form.grade}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving…' : editingStudent ? 'Update' : 'Add Student'}
        </button>
        {editingStudent && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
