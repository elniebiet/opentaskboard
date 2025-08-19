import React, { useState } from "react";
import { URL_MAIN_BACKEND } from "../../common/globals";
import { OTB_LOGGING } from "../../common/globals";

const _sign_up = ({login_link_clicked_handler_func}) => {
  const [email, _set_email] = useState("");
  const [firstname, _set_firstname] = useState("");
  const [lastname, _set_lastname] = useState("");  
  const [username, _set_username] = useState("");
  const [password, _set_password] = useState("");
  const [confirm, _set_confirm] = useState("");
  const [error, _set_error] = useState("");
  const [success_msg, _set_success_msg] = useState("");

  const _handle_submit = async (e) => {
    e.preventDefault();
    _set_error("");
    _set_success_msg("");

    // Basic validation
    if (!email || !firstname || !lastname || !username || !password || !confirm) {
      _set_error("All fields are required.");
      return;
    }

    if (email.length < 4 || email.length > 50) {
      _set_error("Email must be between 4 to 50 characters.");
      return;
    }

    if (firstname.length < 1 || firstname.length > 30) {
      _set_error("First name must be between 1 and 30 characters.");
      return;
    }

    if (lastname.length < 1 || lastname.length > 30) {
      _set_error("Last name must be between 1 and 30 characters.");
      return;
    }
    
    if (username.length < 4 || username.length > 20) {
      _set_error("Username must be between 4 to 20 characters.");
      return;
    }

    if (password.length < 8 || password.length > 32) {
      _set_error("Password must be between 8 to 32 characters, Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    // Check for alphanumeric, at least one lowercase and one uppercase character
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$/.test(password)) {
      _set_error("Password must be alphanumeric and contain at least one lowercase, one uppercase letter, and one number.");
      return;
    }

    if (password !== confirm) {
      _set_error("Passwords do not match.");
      return;
    }

    let valid = false; 

    // send signup request
    try {
      let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          username: username,
          password: password,
          email: email
        })
      };

      if(OTB_LOGGING)
      {
        // console.log("request: ");
        // console.log(request);
      }
      const response = await fetch(`${URL_MAIN_BACKEND}auth/signup`, request);

      const data = await response.json();
      
      if(OTB_LOGGING)
      {
        // console.log("response: "); 
        // console.log(response);
      }
      
      if(response.status === 409)
      {
        _set_error("Username or Email is already registered.");
        return;
      }

      if(response.ok && response.status === 201) {
        valid = true;
      } 

      if(!valid){
        _set_error("Error creating account. Please try again.");
        return;
      }
    
      setTimeout(() => {
        _set_success_msg("Verification needed!");
        _set_email("");
        _set_firstname("");
        _set_lastname(""); 
        _set_username("");
        _set_password("");
        _set_confirm("");
      }, 1000);
    } catch (err) {
      _set_error("Network error. Please try again.");
      return;
    }
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
      {!success_msg && (
        <>
          <div id="#signup-form">
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
                <label style={{ fontWeight: 500, color: "#333" }}>First Name</label>
                <input
                  type="text"
                  value={firstname}
                  required
                  onChange={e => _set_firstname(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    marginTop: 6,
                    border: "1px solid #ccc",
                    borderRadius: 6,
                    fontSize: 16,
                    background: "#fff",
                  }}
                  autoComplete="given-name"
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontWeight: 500, color: "#333" }}>Last Name</label>
                <input
                  type="text"
                  value={lastname}
                  required
                  onChange={e => _set_lastname(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    marginTop: 6,
                    border: "1px solid #ccc",
                    borderRadius: 6,
                    fontSize: 16,
                    background: "#fff",
                  }}
                  autoComplete="family-name"
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
              {success_msg && (
                <div style={{ color: "#d32f2f", marginBottom: 16, textAlign: "center", fontWeight: 500 }}>
                  {success_msg}
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
          </div>
        </>
      )}
      {success_msg && (
        <>
          <div style={{ color: "#d32f2f", marginBottom: 16, textAlign: "center", fontWeight: 500 }}>
            {success_msg}
          </div>
          <div style={{ color: "#1976d2", marginBottom: 16, textAlign: "center", fontWeight: 500 }}>
            Please check your email for a verification link.
          </div>
        </>
      )}

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
