import React, { useState } from "react";

const _sign_up = () => {
  const [email, _set_email] = useState("");
  const [username, _set_username] = useState("");
  const [password, _set_password] = useState("");
  const [confirm, _set_confirm] = useState("");
  const [error, _set_error] = useState("");
  const [success, _set_success] = useState("");

  const _handle_submit = (e) => {
    e.preventDefault();
    _set_error("");
    _set_success("");

    // Basic validation
    if (!email || !username || !password || !confirm) {
      _set_error("All fields are required.");
      return;
    }
    if (password.length < 6) {
      _set_error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      _set_error("Passwords do not match.");
      return;
    }

    // TODO: Replace with actual signup API call
    setTimeout(() => {
      _set_success("Signup successful! You can now log in.");
      _set_email("");
      _set_username("");
      _set_password("");
      _set_confirm("");
    }, 1000);
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: "40px auto",
      padding: 24,
      border: "1px solid #ddd",
      borderRadius: 8,
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>OpenTaskBoard</h2>
      <form onSubmit={_handle_submit}>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={e => _set_email(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            autoComplete="email"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            required
            onChange={e => _set_username(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            autoComplete="username"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={e => _set_password(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            autoComplete="new-password"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirm}
            required
            onChange={e => _set_confirm(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            autoComplete="new-password"
          />
        </div>
        {error && (
          <div style={{ color: "red", marginBottom: 16, textAlign: "center" }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ color: "green", marginBottom: 16, textAlign: "center" }}>
            {success}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Sign Up
        </button>
      </form>
      <div style={{ marginTop: 16, textAlign: "center", fontSize: 14 }}>
        Already have an account? <a href="/login">Log in</a>
      </div>
    </div>
  );
};

export default _sign_up;
