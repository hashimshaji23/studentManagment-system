import { useState, useEffect } from "react";

const emptyForm = {
  name: "",
  email: "",
  rollNumber: "",
  age: "",
  gender: "",
  course: "",
  department: "",
  year: "",
  phone: "",
  address: "",
};

export default function StudentFormPanel({ student, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState("");

  const isEditing = Boolean(student);

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name || "",
        email: student.email || "",
        rollNumber: student.rollNumber || "",
        age: student.age ?? "",
        gender: student.gender || "",
        course: student.course || "",
        department: student.department || "",
        year: student.year ?? "",
        phone: student.phone || "",
        address: student.address || "",
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
    setApiError("");
  }, [student]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.rollNumber.trim()) next.rollNumber = "Roll number is required";
    if (!form.course.trim()) next.course = "Course is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;

    setSaving(true);
    try {
      const payload = {
        ...form,
        age: form.age === "" ? undefined : Number(form.age),
        year: form.year === "" ? undefined : Number(form.year),
      };
      await onSave(payload);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="panel" role="dialog" aria-modal="true" aria-label={isEditing ? "Edit student" : "Add student"}>
        <div className="panel-header">
          <h2 className="panel-title">{isEditing ? "Edit entry" : "New entry"}</h2>
          <button className="panel-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {apiError && <div className="banner banner-error">{apiError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field span-2">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                className="input"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="field span-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="input"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="field">
              <label htmlFor="rollNumber">Roll number</label>
              <input
                id="rollNumber"
                className="input"
                value={form.rollNumber}
                onChange={(e) => updateField("rollNumber", e.target.value)}
              />
              {errors.rollNumber && <span className="error-text">{errors.rollNumber}</span>}
            </div>

            <div className="field">
              <label htmlFor="course">Course</label>
              <input
                id="course"
                className="input"
                value={form.course}
                onChange={(e) => updateField("course", e.target.value)}
              />
              {errors.course && <span className="error-text">{errors.course}</span>}
            </div>

            <div className="field">
              <label htmlFor="department">Department</label>
              <input
                id="department"
                className="input"
                value={form.department}
                onChange={(e) => updateField("department", e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="year">Year</label>
              <select
                id="year"
                className="select"
                value={form.year}
                onChange={(e) => updateField("year", e.target.value)}
              >
                <option value="">—</option>
                {[1, 2, 3, 4, 5, 6].map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                className="input"
                value={form.age}
                onChange={(e) => updateField("age", e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="select"
                value={form.gender}
                onChange={(e) => updateField("gender", e.target.value)}
              >
                <option value="">—</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                className="input"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>

            <div className="field span-2">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                className="input"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn" disabled={saving}>
              {saving ? "Saving…" : isEditing ? "Save changes" : "Add student"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
