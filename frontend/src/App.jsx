import { useState, useEffect, useCallback } from "react";
import StudentTable from "./components/StudentTable.jsx";
import StudentFormPanel from "./components/StudentFormPanel.jsx";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./api/studentApi.js";

const LIMIT = 8;

export default function App() {
  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [panelOpen, setPanelOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetchStudents({ search, course, page, limit: LIMIT });
      setStudents(res.data || []);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, course, page]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 3000);
    return () => clearTimeout(t);
  }, [notice]);

  function openAddPanel() {
    setEditingStudent(null);
    setPanelOpen(true);
  }

  function openEditPanel(student) {
    setEditingStudent(student);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
    setEditingStudent(null);
  }

  async function handleSave(payload) {
    if (editingStudent) {
      await updateStudent(editingStudent._id, payload);
      setNotice("Entry updated");
    } else {
      await createStudent(payload);
      setNotice("Student added to register");
    }
    closePanel();
    await load();
  }

  async function handleDelete(student) {
    const confirmed = window.confirm(`Remove ${student.name} from the register?`);
    if (!confirmed) return;
    try {
      await deleteStudent(student._id);
      setNotice("Entry removed");
      if (students.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        await load();
      }
    } catch (err) {
      setLoadError(err.message);
    }
  }

  return (
    <div className="app">
      <header className="masthead">
        <h1 className="masthead-title">Student Register</h1>
        <div className="masthead-meta">
          <strong>{total}</strong> {total === 1 ? "record" : "records"} on file
        </div>
      </header>

      {notice && <div className="banner banner-success">{notice}</div>}
      {loadError && <div className="banner banner-error">{loadError}</div>}

      <div className="toolbar">
        <div className="toolbar-filters">
          <input
            className="input"
            placeholder="Search name, email, or roll no."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
          <input
            className="input"
            style={{ minWidth: 160 }}
            placeholder="Filter by course"
            value={course}
            onChange={(e) => {
              setPage(1);
              setCourse(e.target.value);
            }}
          />
        </div>
        <button className="btn" onClick={openAddPanel}>
          + Add student
        </button>
      </div>

      {loading ? (
        <p style={{ color: "var(--ink-soft)" }}>Loading register…</p>
      ) : (
        <StudentTable
          students={students}
          onEdit={openEditPanel}
          onDelete={handleDelete}
          onAddFirst={openAddPanel}
        />
      )}

      {students.length > 0 && (
        <div className="pagination">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="pagination-controls">
            <button
              className="btn btn-ghost btn-small"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ← Previous
            </button>
            <button
              className="btn btn-ghost btn-small"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {panelOpen && (
        <StudentFormPanel
          student={editingStudent}
          onClose={closePanel}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
