import React, { useState } from "react";

const _sign_up = ({login_link_clicked_handler_func}) => {
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

  const _login_clicked = (e) => {
    e.preventDefault();
    login_link_clicked_handler_func();
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
        Create your account
      </p>
      <form onSubmit={_handle_submit}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 500, color: "#333" }}>Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={e => _set_email(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              marginTop: 6,
              border: "1px solid #ccc",
              borderRadius: 6,
              fontSize: 16,
              background: "#fff",
            }}
            autoComplete="email"
          />
        </div>
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
            autoComplete="new-password"
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 500, color: "#333" }}>Confirm Password</label>
          <input
            type="password"
            value={confirm}
            required
            onChange={e => _set_confirm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              marginTop: 6,
              border: "1px solid #ccc",
              borderRadius: 6,
              fontSize: 16,
              background: "#fff",
            }}
            autoComplete="new-password"
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
          Sign Up
        </button>
      </form>
      <div style={{ marginTop: 24, textAlign: "center", fontSize: 15, color: "#555" }}>
        Already have an account?{" "}
        <a
          href=""
          onClick={e => _login_clicked(e)}
          style={{
            color: "#1976d2",
            textDecoration: "none",
            fontWeight: 500,
            marginLeft: 4,
            cursor: "pointer",
          }}
        >
          Log in
        </a>
      </div>
    </div>
  );
};

export default _sign_up;
