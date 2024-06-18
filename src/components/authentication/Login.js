import React from "react";
import '../../styles/components/forms/_logIn.scss'; // Import the SCSS file
import { connect } from 'react-redux';
import { login } from '../../actions/auth'; // Import the login action creator

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: ""
      },
      isValid: false
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: "" // Clear error message when user starts typing
      }
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    // Validation rules
    let errors = {};
    let isValid = true;

    if (!email) {
      isValid = false;
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      errors.email = "Invalid email address.";
    }

    if (!password) {
      isValid = false;
      errors.password = "Password is required.";
    }
    else if (password.length < 6) {
      isValid = false;
      errors.password = "Password must be at least 6 characters long.";
    }

    this.setState({ errors, isValid }); // Update the state according to the changes

    if (isValid) {
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      
      // Find user with matching email and password
      const loggedInUser = registeredUsers.find(user => user.email === email && user.password === password);

      if (loggedInUser) {
        // User is logged in successfully
        // Perform further actions like setting user state or redirecting
        alert("Login successful!");
        this.props.login(); // Dispatch the login action
        this.props.history.push("/secure");
      } 
      else {
        alert("Invalid email or password.");
      }
    }
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.onChange}
            placeholder="Email"
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.onChange}
            placeholder="Password"
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

// Map dispatch functions to props
const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
});

export default connect(null, mapDispatchToProps)(Login); // Connect component to Redux store and map login action
