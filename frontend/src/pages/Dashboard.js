import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { notesAPI } from "../services/api";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, [search]);

  const fetchNotes = async () => {
    try {
      const response = await notesAPI.getNotes(search);
      setNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await notesAPI.deleteNote(id);
        setNotes(notes.filter((note) => note._id !== id));
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="header-content">
            <div>
              <h1 className="header-title">My Notes</h1>
              <p className="header-subtitle">Welcome back, {user?.name}! 👋</p>
            </div>
            <div className="header-actions">
              <Link to="/add-note" className="btn btn-primary">
                ✨ Add Note
              </Link>
              <button onClick={logout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Search */}
        <div className="search-input">
          <input
            type="text"
            placeholder="Search your notes..."
            className="form-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h3 className="empty-state-title">
              {search ? "No notes found" : "No notes yet"}
            </h3>
            <p className="empty-state-description">
              {search
                ? `No notes match "${search}". Try a different search term.`
                : "Start creating your first note to organize your thoughts and ideas."}
            </p>
            {!search && (
              <Link to="/add-note" className="btn btn-primary btn-lg">
                Create Your First Note
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note, index) => (
              <div
                key={note._id}
                className="card slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-header">
                  <h3 className="card-title">{note.title}</h3>
                </div>
                <div className="card-content">
                  <p className="line-clamp-3">{note.content}</p>
                </div>
                <div className="card-footer">
                  <span className="text-sm text-gray-500">
                    {formatDate(note.createdAt)}
                  </span>
                  <div className="flex space-x-4">
                    <Link
                      to={`/edit-note/${note._id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="text-danger-500 hover:text-danger-700 text-sm font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
