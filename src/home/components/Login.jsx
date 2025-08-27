import React, { useContext, useState } from "react";
import { OTB_LOGGING } from "../../common/globals";
import { _global_state_context } from "../../common/global_state_context";
import { api_signin } from "../../common/otb_apis";

// Modern style helpers (match Signup)
const inputStyle = {
  width: "100%",
  padding: "8px 12px",
  marginTop: 8,
  border: "1px solid #e0e0e0",
  borderRadius: 8,
  fontSize: 15,
  background: "#f7f9fa",
  transition: "border 0.2s",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  fontWeight: 600,
  color: "#222",
  marginBottom: 6,
  display: "block",
  letterSpacing: 0.2,
};

const fieldContainer = {
  marginBottom: 22,
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(90deg, #1976d2 0%, #21a1ff 100%)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 700,
  fontSize: 17,
  cursor: "pointer",
  boxShadow: "0 2px 12px rgba(25, 118, 210, 0.10)",
  transition: "background 0.2s",
  marginTop: 10,
  letterSpacing: 0.5,
};

const cardStyle = {
  maxWidth: 420,
  margin: "48px auto",
  padding: 36,
  border: "none",
  borderRadius: 18,
  background: "#fff",
  boxShadow: "0 8px 32px rgba(25, 118, 210, 0.10), 0 1.5px 4px rgba(0,0,0,0.04)",
};

const headingStyle = {
  textAlign: "center",
  marginBottom: 10,
  color: "#1976d2",
  fontWeight: 800,
  fontSize: 32,
  letterSpacing: 1,
};

const subheadingStyle = {
  textAlign: "center",
  marginBottom: 28,
  color: "#555",
  fontSize: 17,
  fontWeight: 500,
  letterSpacing: 0.2,
};

const errorStyle = {
  color: "#d32f2f",
  marginBottom: 18,
  textAlign: "center",
  fontWeight: 600,
  background: "#fff0f0",
  borderRadius: 6,
  padding: "10px 0",
  fontSize: 15,
};

const successStyle = {
  color: "#388e3c",
  marginBottom: 18,
  textAlign: "center",
  fontWeight: 600,
  background: "#e8f5e9",
  borderRadius: 6,
  padding: "10px 0",
  fontSize: 15,
};

const linkStyle = {
  color: "#1976d2",
  textDecoration: "none",
  fontWeight: 600,
  marginLeft: 4,
  cursor: "pointer",
  transition: "color 0.2s",
};

const _login = ({signup_link_clicked_handler_func, login_success_func}) => {
  const [email, _set_email] = useState("");
  const [password, _set_password] = useState("");
  const [error, _set_error] = useState("");
  const [success, _set_success] = useState("");
  const { global_email, _set_global_email } = useContext(_global_state_context);
  const { global_access_token, _set_global_access_token } = useContext(_global_state_context);
  
  const _handle_submit = async (e) => {
    e.preventDefault();
    _set_error("");
    _set_success("");

    // Basic validation
    if (!email || !password) {
      _set_error("Both fields are required.");
      return;
    }

    if (email.length < 4 || email.length > 50) {
      _set_error("Email must be between 4 to 50 characters.");
      return;
    }

    if (password.length < 8 || password.length > 32) {
      _set_error("Invalid password, please review your login credentials.");
      return;
    }

    let otb_access_token = global_access_token;    
    let valid = false; 

    // send signin request
    try {
      let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          accessToken: otb_access_token
        })
      };

      if(OTB_LOGGING)
      {
        // console.log("request: ");
        // console.log(request);
      }

      const response = await fetch(api_signin, request);

      const data = await response.json();
      
      if(OTB_LOGGING)
      {
        // console.log("response: "); 
        // console.log(response);
      }
      
      if(response.status === 409)
      {
        _set_error("Incorrect login credentials.");
        return;
      }

      if(response.ok && response.status === 201) {
        valid = true;
      } 

      if(!valid){
        _set_error("Error signing in. Please try again.");
        return;
      }
    
      setTimeout(() => {
        if (data.accessToken) {
          _set_global_access_token(data.accessToken);
        } 
        _set_global_email(email);
        _set_success("Login Successful!");
        _set_email("");
        _set_password("");

        // call the success handler
        login_success_func();
      }, 1000);
    } catch (err) {
      _set_error("Network error. Please try again.");
      return;
    }
  };

  const _signup_link_clicked = (e) => {
    e.preventDefault();
    signup_link_clicked_handler_func();
  };

  return (
    <div style={cardStyle}>
      <h2 style={headingStyle}>OpenTaskBoard</h2>
      <p style={subheadingStyle}>
        Log in to your account
      </p>
      <form onSubmit={_handle_submit} autoComplete="off">
        <div style={fieldContainer}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={e => _set_email(e.target.value)}
            style={inputStyle}
            autoComplete="email"
            placeholder="you@email.com"
          />
        </div>
        <div style={fieldContainer}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={e => _set_password(e.target.value)}
            style={inputStyle}
            autoComplete="current-password"
            placeholder="Password"
          />
        </div>
        {error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}
        {success && (
          <div style={successStyle}>
            {success}
          </div>
        )}
        <button
          type="submit"
          style={buttonStyle}
        >
          Log In
        </button>
      </form>
      <div style={{ marginTop: 28, textAlign: "center", fontSize: 15, color: "#555" }}>
        Don't have an account?{" "}
        <a
          href=""
          onClick={e => _signup_link_clicked(e)}
          style={linkStyle}
        >
          Sign up
        </a>
      </div>
    </div>
  );
};

export default _login;