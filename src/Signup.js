import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  // Load data
  useEffect(() => {
    const status = localStorage.getItem("loggedIn");
    setIsLoggedIn(status === "true");

    try {
      const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      setPosts(savedPosts);
    } catch {
      setPosts([]);
    }
  }, []);

  // Save posts
  const savePosts = (data) => {
    localStorage.setItem("posts", JSON.stringify(data));
  };

  // Add / Update post
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    let updated;

    if (editId) {
      updated = posts.map((p) =>
        p.id === editId ? { ...p, title, content } : p
      );
      setEditId(null);
    } else {
      updated = [{ id: Date.now(), title, content }, ...posts];
    }

    setPosts(updated);
    savePosts(updated);
    setTitle("");
    setContent("");
  };

  // Delete
  const deletePost = (id) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    savePosts(updated);
  };

  // Edit
  const editPost = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditId(post.id);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
  };

  // 🔐 Login / Signup
  if (!isLoggedIn) {
    return isLoginPage ? (
      <Login
        setIsLoggedIn={setIsLoggedIn}
        setIsLoginPage={setIsLoginPage}
      />
    ) : (
      <Signup setIsLoginPage={setIsLoginPage} />
    );
  }

  // 📝 Blog UI
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>💜 My Blog</h1>

      <button onClick={logout} style={styles.logout}>
        Logout
      </button>

      {/* FORM */}
      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button style={styles.button} onClick={handleSubmit}>
          {editId ? "Update Post" : "Add Post"}
        </button>
      </div>

      {/* POSTS */}
      <div style={styles.grid}>
        {posts.map((post) => (
          <div key={post.id} style={styles.card}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            <div>
              <button
                style={styles.edit}
                onClick={() => editPost(post)}
              >
                Edit
              </button>

              <button
                style={styles.delete}
                onClick={() => deletePost(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Segoe UI",
    background: "#f5f3ff",
    minHeight: "100vh"
  },

  heading: {
    textAlign: "center",
    color: "#6c5ce7",
    marginBottom: "20px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    marginBottom: "30px"
  },

  input: {
    width: "100%",
    maxWidth: "400px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none"
  },

  textarea: {
    width: "100%",
    maxWidth: "400px",
    height: "100px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none"
  },

  button: {
    padding: "10px 20px",
    background: "#7c3aed",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  logout: {
    display: "block",
    margin: "0 auto 20px",
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    textAlign: "left"
  },

  edit: {
    marginRight: "10px",
    background: "#f59e0b",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "white"
  },

  delete: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default App;