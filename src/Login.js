import React, { useState } from "react";

function Login({ setIsLoggedIn, setIsLoginPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      username === savedUser.username &&
      password === savedUser.password
    ) {
      localStorage.setItem("loggedIn", "true");
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>

      <p onClick={() => setIsLoginPage(false)} style={styles.link}>
        Don't have an account? Signup
      </p>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "100px" },
  input: { display: "block", margin: "10px auto", padding: "10px" },
  button: { padding: "10px", background: "purple", color: "white" },
  link: { color: "blue", cursor: "pointer" }
};

export default Login;