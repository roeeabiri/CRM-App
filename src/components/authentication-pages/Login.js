import React from "react";
import axios from 'axios';
import '../../styles/components/forms/_logIn.scss';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "bernhard@kaligon.com",
      password: "112112!!",
      error: null,
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

  handleLogin = async () => {
    const { email, password } = this.state;
  
    const query = `
      mutation Login($emailAddress: String!, $password: String!) {
        login(emailAddress: $emailAddress, password: $password) {
          message
          token
          profile {
            lookupId
            firstName
            lastName
            roleId
            isDeleted
            isActive
            lastLoginTime
            avatarUrl
            selectedAccount {
              lookupId
              companyName
              entityId
            }
          }
        }
      }
    `;
  
    const variables = {
      emailAddress: email,
      password: password,
    };
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await axios.post(
        'https://core.roadwarez.net:44401/api/graphql',
        JSON.stringify({ query, variables }),
        config
      );
  
      if (response.data.errors) {
        this.setState({ error: response.data.errors[0].message });
      } else {
        const token = response.data.data.login.token; // Correct way to access the token
        console.log(token);
        console.log(response.data);
        this.props.login(token); // Dispatch the login action with token
        this.props.navigate("/secure"); // Navigate to secure page after successful login
      }
    } catch (err) {
      this.setState({ error: err.message });
    }
  };  
  
  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

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
    } else if (password.length < 6) {
      isValid = false;
      errors.password = "Password must be at least 6 characters long.";
    }

    this.setState({ errors, isValid });

    if (isValid) {
      this.handleLogin();
    }
  };

  render() {
    const { email, password, errors, error } = this.state;

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
        {error && (
          <div>
            <h3>Error</h3>
            <pre>{error}</pre>
          </div>
        )}
      </div>
    );
  }
}

const WithNavigation = (props) => { 
  let navigate = useNavigate();
  return <Login navigate={navigate} {...props} />;
}

const mapDispatchToProps = (dispatch) => ({
  login: (token) => dispatch(login(token)),
});

export default connect(null, mapDispatchToProps)(WithNavigation);
