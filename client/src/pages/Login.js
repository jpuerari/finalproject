//imports
import React, { Component } from "react";

//regex to help with form validation
const Regex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValidation = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });


  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Login extends Component {

  state = {
    usr: null,
    password: null,
    formErrors: {
      usr: "",
      password: ""
    }
  };

  submitHandle = e => {
    e.preventDefault();

    if (formValidation(this.state)) {
      console.log(`
        usr: ${this.state.usr}
        Password: ${this.state.password}
      `);
    } else {
      console.error("error");
    }
  };

  changeHandle = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "usr":
        // formErrors.usr = Regex.test(value)
        formErrors.usr = value.length > 10
          ? ""
          // : "Please enter a valid username";
          : "minimum of 8 characaters required";
        break;
      case "password":
        formErrors.password =
          value.length < 8 ? "minimum of 8 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    this.setState({ [name]: value });
  };


  //form below

  render() {
    const { formErrors } = this.state;

    return (
      <div className="d-flex container align-items-center justify-items-center" style={{height: "100vh"}}>
        <div className="form-check text-center mx-auto">
          <div className="wrapper">
            <div className="form-wrapper">
              <h1>Login</h1>
              <form onSubmit={this.submitHandle} noValidate>
                <div className="usr">
                  <label htmlFor="usr">Username: </label>
                  <input
                    className={formErrors.usr.length > 0 ? "error" : null}
                    placeholder="Username"
                    type="usr"
                    name="usr"
                    noValidate
                    onChange={this.changeHandle}
                  />
                  {formErrors.usr.length > 0 && (
                    <span className="errorMessage">{formErrors.usr}</span>
                  )}
                </div>
                <div className="form-group">
                  <div className="password">
                    <label htmlFor="password">Password: </label>
                    <input
                      className={formErrors.password.length > 0 ? "error" : null}
                      placeholder="Password"
                      type="password"
                      name="password"
                      noValidate
                      onChange={this.changeHandle}
                    />
                    {formErrors.password.length > 0 && (
                      <span className="errorMessage">{formErrors.password}</span>
                    )}
                  </div>
                  <div className="login">
                    <button type="submit" className="btn btn-primary" >Login</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    )

  }
}



export default Login;