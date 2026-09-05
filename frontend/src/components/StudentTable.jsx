export default function StudentTable({ students, onEdit, onDelete, onAddFirst }) {
  if (students.length === 0) { 
    return (
      <table className="register">
        <tbody>
          <tr>
            <td>
              <div className="empty-state">
                <h3>No entries yet</h3>
                <p>Add your first student to start the register.</p>
                <button className="btn" onClick={onAddFirst}>
                  + Add student
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="register">
      <thead>
        <tr>
          <th>Roll no.</th>
          <th>Name</th>
          <th>Course</th>
          <th>Year</th>
          <th>Email</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s._id}>
            <td className="roll">{s.rollNumber}</td>
            <td className="name">{s.name}</td>
            <td>{s.course}</td>
            <td>{s.year || "—"}</td>
            <td className="email">{s.email}</td>
            <td>
              <span
                className={`status-dot ${s.isActive ? "status-active" : "status-inactive"}`}
              />
              {s.isActive ? "Active" : "Inactive"}
            </td>
            <td>
              <div className="row-actions">
                <button className="btn btn-ghost btn-small" onClick={() => onEdit(s)}>
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-small"
                  onClick={() => onDelete(s)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
