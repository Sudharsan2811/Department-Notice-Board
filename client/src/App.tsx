import { useEffect, useState } from "react";
import NoticeCard from "./components/NoticeCard";
import "./App.css";

interface Notice {
  _id?: string;
  title: string;
  message: string;
}

function App() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/notices")
      .then((response) => response.json())
      .then((data) => {
        setNotices(data);
      })
      .catch(() => {
        setError("Failed to load notices");
      });
  }, []);

  const addNotice = async () => {
    setError("");

    if (!title.trim() || !message.trim()) {
      setError("Title and message are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          message
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to add notice");
        return;
      }

      setNotices([...notices, data]);

      setTitle("");
      setMessage("");
    } catch {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="app">
      <h1>Department Notice Board</h1>

      <div className="form-container">
        <h2>Add New Notice</h2>

        <input
          type="text"
          placeholder="Notice title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          placeholder="Notice message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />

        <button onClick={addNotice}>Add</button>

        {error && <p className="error">{error}</p>}
      </div>

      <div className="notice-list">
        <h2>Notices</h2>

        {notices.length === 0 ? (
          <p>No notices available.</p>
        ) : (
          notices.map((notice) => (
            <NoticeCard
              key={notice._id || notice.title}
              notice={notice}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;