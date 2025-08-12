import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notesAPI } from "../services/api";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await notesAPI.createNote({ title, content });
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="header-content">
            <h1 className="header-title">✨ Create New Note</h1>
            <Link to="/dashboard" className="btn btn-secondary">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 lg:px-8 py-8">
        <div className="card fade-in">
          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                📝 Note Title
              </label>
              <input
                type="text"
                id="title"
                required
                className="form-input"
                placeholder="Give your note a catchy title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">
                📄 Note Content
              </label>
              <textarea
                id="content"
                required
                rows={12}
                className="form-textarea"
                placeholder="Write your thoughts, ideas, or anything you want to remember..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Link to="/dashboard" className="btn btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="spinner mr-2"></div>
                    Creating...
                  </span>
                ) : (
                  "Create Note"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
