import React from "react";
import { v4 as uuidv4 } from 'uuid';
import '../../styles/components/forms/_signUp.scss';
import { connect } from 'react-redux';
import { addUser } from '../../actions/users';
import { useNavigate } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      errors: {
        name: "",
        lastName: "",
        phone: "",
        email: "",
        password: ""
      },
      isRegistered: false
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

    const { name, lastName, phone, email, password } = this.state;

    // Validation rules
    let errors = {};
    let isValid = true;

    if (!name) {
      isValid = false;
      errors.name = "Name is required.";
    }

    if (!lastName) {
      isValid = false;
      errors.lastName = "Last name is required.";
    }

    if (!phone) {
      isValid = false;
      errors.phone = "Phone number is required.";
    }

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
    } else if (password.length < 6) {
      isValid = false;
      errors.password = "Password must be at least 6 characters long.";
    }

    this.setState({ errors, isValid }); // Update the state according to the changes

    if (isValid) {
      // Generate unique ID
      const id = uuidv4();

      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

      // Check if user with the same email already exists
      const existingUser = registeredUsers.find(user => user.email === email);
      if (existingUser) {
        alert("User with this email already exists. Please use a different email.");
        return;
      }

      // Else, add new user to the registeredUsers array
      const newUser = { id, name, lastName, phone, email, password };
      const newUserArray = [...registeredUsers, newUser];

      // Save updated registered users array to localStorage
      localStorage.setItem("registeredUsers", JSON.stringify(newUserArray));

      // Update state to indicate successful registration
      this.setState({ isRegistered: true });

      this.props.addUser(newUser); // Add the user to the database
      alert("Registration successful!");

      // Use withRouter to access history and navigate to login
      this.props.navigate("/login");
    }
  };

  render() {
    const { name, lastName, phone, email, password, errors } = this.state;

    return (
      <div className="signup-container">
        <h1>Signup</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.onChange}
            placeholder="Name"
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
          <br />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.onChange}
            placeholder="Last Name"
            className={errors.lastName ? "error-input" : ""}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
          <br />
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={this.onChange}
            placeholder="Phone"
            className={errors.phone ? "error-input" : ""}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
          <br />
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
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
}

const WithNavigation = (props) => { // Wraps around the class component and injects the navigate function as a prop
  let navigate = useNavigate();
  return <Signup {...props} navigate={navigate} />;
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (newUser) => dispatch(addUser(newUser)),
});

// Connect the WithNavigate function instead of Signup
export default connect(null, mapDispatchToProps)(WithNavigation);