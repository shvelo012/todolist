import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { SIGNUP_REQUEST } from "./constants";
import "./Signup.scss";

const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (props._id) {
      redirectToLoginPage();
    }
  }, [props._id]);

  const redirectToLoginPage = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    props.history.push(
      "/login?message=Registration was successful! Please login!"
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.isLoading) {
      return;
    }

    props.dispatch({
      type: SIGNUP_REQUEST,
      payload: { firstName, lastName, email, password },
    });
  };

  const { error } = props;

  return (
    <div className="mt-signup mt-auth">
      <div className="mt-auth__form-container">
        {error && <div className="mt-info mt-info--error">{error.message}</div>}
        <h2 className="mt-auth__title">Sign up</h2>
        <form className="mt-auth__form" onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            type="text"
            name="firstName"
            margin="normal"
            variant="outlined"
            required={true}
            fullWidth={true}
            value={firstName}
            error={error && error.field === "firstName"}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            type="text"
            name="lastName"
            margin="normal"
            variant="outlined"
            required={true}
            fullWidth={true}
            value={lastName}
            error={error && error.field === "lastName"}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            required={true}
            fullWidth={true}
            value={email}
            error={error && error.field === "email"}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            margin="normal"
            variant="outlined"
            required={true}
            fullWidth={true}
            value={password}
            error={error && error.field === "password"}
            onChange={handleChange}
          />
          <div className="mt-auth__actions">
            {/* <p className="mt-signup__privacy">
              By clicking "Create new account" below, you agree to our&nbsp;
              <Link to="/terms" className="mt-auth__action-link">
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link to="/privacy" className="mt-auth__action-link">
                Privacy Policy
              </Link>
            </p> */}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              fullWidth={true}
              style={{
                paddingTop: 12,
                paddingBottom: 12,
              }}
            >
              Create New Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { _id, isLoading, error } = state.signup;

  return {
    _id,
    isLoading,
    error,
  };
};

export default withRouter(connect(mapStateToProps, null)(Signup));
