import React, { useState } from "react";
import { api_signup } from "../../common/otb_apis";
import { OTB_LOGGING } from "../../common/globals";
import { OTB_ROLES, OTB_JOB_TITLES, OTB_COUNTRIES } from "../../common/otb_common_definitions";

// Modern style helpers
const inputStyle = {
  width: "100%",
  padding: "8px 12px", // Reduced vertical padding
  marginTop: 8,
  border: "1px solid #e0e0e0",
  borderRadius: 8,
  fontSize: 15,         // Slightly smaller font
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

const _sign_up = ({login_link_clicked_handler_func}) => {
  const [email, _set_email] = useState("");
  const [firstname, _set_firstname] = useState("");
  const [lastname, _set_lastname] = useState("");  
  const [username, _set_username] = useState("");
  const [password, _set_password] = useState("");
  const [confirm, _set_confirm] = useState("");
  const [error, _set_error] = useState("");
  const [success_msg, _set_success_msg] = useState("");
  const [role, _set_role] = useState(Object.keys(OTB_ROLES)[0] || "");
  const [jobTitle, setJobTitle] = useState(Object.keys(OTB_JOB_TITLES)[0] || "");
  const [customJobTitle, setCustomJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState(Object.keys(OTB_COUNTRIES)[0] || "");

  const _handle_submit = async (e) => {
    e.preventDefault();
    _set_error("");
    _set_success_msg("");

    // Basic validation
    if (!email || !firstname || !lastname || !username || !password || !confirm || !role
      || !jobTitle || (jobTitle === "other" && !customJobTitle) || !company || !country
    ) {
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
          email: email,
          role: OTB_ROLES[role],
          jobtitle: jobTitle === "other" ? customJobTitle : OTB_JOB_TITLES[jobTitle],
          company: company,
          country: OTB_COUNTRIES[country],
          joined: Date.now(),
        })
      };

      if(OTB_LOGGING)
      {
        // console.log("request: ");
        // console.log(request);
      }
      const response = await fetch(api_signup, request);

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
        setJobTitle(Object.keys(OTB_JOB_TITLES)[0] || "");
        setCustomJobTitle("");
        setCompany("");
        setCountry(Object.keys(OTB_COUNTRIES)[0] || "");
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
    <div style={cardStyle}>
      <h2 style={headingStyle}>OpenTaskBoard</h2>
      {!success_msg && (
        <>
          <div id="#signup-form">
            <p style={subheadingStyle}>
              Create your account
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
                <label style={labelStyle}>First Name</label>
                <input
                  type="text"
                  value={firstname}
                  required
                  onChange={e => _set_firstname(e.target.value)}
                  style={inputStyle}
                  autoComplete="given-name"
                  placeholder="First name"
                />
              </div>
              <div style={fieldContainer}>
                <label style={labelStyle}>Last Name</label>
                <input
                  type="text"
                  value={lastname}
                  required
                  onChange={e => _set_lastname(e.target.value)}
                  style={inputStyle}
                  autoComplete="family-name"
                  placeholder="Last name"
                />
              </div>
              <div style={fieldContainer}>
                <label style={labelStyle}>Username</label>
                <input
                  type="text"
                  value={username}
                  required
                  onChange={e => _set_username(e.target.value)}
                  style={inputStyle}
                  autoComplete="username"
                  placeholder="Choose a username"
                />
              </div>
              <div style={fieldContainer}>
                <label style={labelStyle}>Role</label>
                <select
                  value={role}
                  required
                  onChange={e => _set_role(e.target.value)}
                  style={inputStyle}
                >
                  {Object.entries(OTB_ROLES).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
              <div style={fieldContainer}>
                <label style={labelStyle}>Job Title</label>
                <select
                  value={jobTitle}
                  required
                  onChange={e => setJobTitle(e.target.value)}
                  style={inputStyle}
                >
                  {Object.entries(OTB_JOB_TITLES).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
                {jobTitle === "other" && (
                  <input
                    type="text"
                    value={customJobTitle}
                    required
                    placeholder="Please specify your job title"
                    onChange={e => setCustomJobTitle(e.target.value)}
                    style={{ ...inputStyle, marginTop: 10 }}
                  />
                )}
              </div>
              <div style={fieldContainer}>
                <label style={labelStyle}>Company</label>
                <input
                  type="text"
                  value={company}
                  required
                  onChange={e => setCompany(e.target.value)}
                  style={inputStyle}
                  autoComplete="organization"
                  placeholder="Company name"
                />
              </div>
              <div style={fieldContainer}>
                <label style={labelStyle}>Country</label>
                <select
                  value={country}
                  required
                  onChange={e => setCountry(e.target.value)}
                  style={inputStyle}
                >
                  {Object.entries(OTB_COUNTRIES).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
              <div style={fieldContainer}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={e => _set_password(e.target.value)}
                  style={inputStyle}
                  autoComplete="new-password"
                  placeholder="Password"
                />
              </div>
              <div style={fieldContainer}>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  type="password"
                  value={confirm}
                  required
                  onChange={e => _set_confirm(e.target.value)}
                  style={inputStyle}
                  autoComplete="new-password"
                  placeholder="Confirm password"
                />
              </div>
              {error && (
                <div style={errorStyle}>
                  {error}
                </div>
              )}
              {success_msg && (
                <div style={successStyle}>
                  {success_msg}
                </div>
              )}
              <button
                type="submit"
                style={buttonStyle}
              >
                Sign Up
              </button>
            </form>
          </div>
        </>
      )}
      {success_msg && (
        <>
          <div style={successStyle}>
            {success_msg}
          </div>
          <div style={{ color: "#1976d2", marginBottom: 16, textAlign: "center", fontWeight: 500 }}>
            Please check your email for a verification link.
          </div>
        </>
      )}

      <div style={{ marginTop: 28, textAlign: "center", fontSize: 15, color: "#555" }}>
        Already have an account?{" "}
        <a
          href=""
          onClick={e => _login_clicked(e)}
          style={linkStyle}
        >
          Log in
        </a>
      </div>
    </div>
  );
};

export default _sign_up;