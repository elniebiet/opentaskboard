import React, { useState } from "react";

const _login = ({signup_link_clicked_handler_func}) => {
  const [username, _set_username] = useState("");
  const [password, _set_password] = useState("");
  const [error, _set_error] = useState("");
  const [success, _set_success] = useState("");

  const _handle_submit = (e) => {
    e.preventDefault();
    _set_error("");
    _set_success("");

    // Basic validation
    if (!username || !password) {
      _set_error("Both fields are required.");
      return;
    }
    if (password.length < 6) {
      _set_error("Password must be at least 6 characters.");
      return;
    }

    // TODO: Replace with actual login API call
    setTimeout(() => {
      _set_success("Login successful! Welcome back.");
      _set_username("");
      _set_password("");
    }, 1000);
  };

  const _signup_link_clicked = (e) => {
    e.preventDefault();
    signup_link_clicked_handler_func();
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 32,
        border: "1px solid #e0e0e0",
        borderRadius: 16,
        background: "#fafbfc",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 8, color: "#1976d2", fontWeight: 700 }}>
        OpenTaskBoard
      </h2>
      <p style={{ textAlign: "center", marginBottom: 24, color: "#555" }}>
        Log in to your account
      </p>
      <form onSubmit={_handle_submit}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 500, color: "#333" }}>Username</label>
          <input
            type="text"
            value={username}
            required
            onChange={e => _set_username(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              marginTop: 6,
              border: "1px solid #ccc",
              borderRadius: 6,
              fontSize: 16,
              background: "#fff",
            }}
            autoComplete="username"
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 500, color: "#333" }}>Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={e => _set_password(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              marginTop: 6,
              border: "1px solid #ccc",
              borderRadius: 6,
              fontSize: 16,
              background: "#fff",
            }}
            autoComplete="current-password"
          />
        </div>
        {error && (
          <div style={{ color: "#d32f2f", marginBottom: 16, textAlign: "center", fontWeight: 500 }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ color: "#388e3c", marginBottom: 16, textAlign: "center", fontWeight: 500 }}>
            {success}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
            transition: "background 0.2s",
          }}
        >
          Log In
        </button>
      </form>
      <div style={{ marginTop: 24, textAlign: "center", fontSize: 15, color: "#555" }}>
        Don't have an account?{" "}
        <a
          href=""
          onClick={e => _signup_link_clicked(e)}
          style={{
            color: "#1976d2",
            textDecoration: "none",
            fontWeight: 500,
            marginLeft: 4,
            cursor: "pointer",
          }}
        >
          Sign up
        </a>
      </div>
    </div>
  );
};

export default _login;