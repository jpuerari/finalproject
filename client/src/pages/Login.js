//imports
import React, { Component } from "react";
import {login, test} from "../utils/API";

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

    // if (formValidation(this.state)) {
    //   console.log(`
    //     usr: ${this.state.usr}
    //     Password: ${this.state.password}
    //   `);

    //   //api call


    // } else {
    //   console.error("error");
    // }
    login({username: this.state.usr, password: this.state.password})
    .then(res=>{
      //if everything works and you're logged in now
      //res will be the jwt token
      //save user info somewhere
      console.log(res)
      this.props.history.push("/places")
    })
    .catch(err=>{
      console.log(err.message);
      //let user know somehow they did bad
      alert("you entered wrong info")
    })

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
      <div className='login-page'> 
      <div className="row justify-content-center align-items-center" style={{height: "100vh"}}>
        <div className='col-md-6 col-12'>
        <div className="form-check text-center mx-auto form-box">
          <div className="wrapper">
            <div className="form-wrapper">
              <h1>Login</h1>
              <form onSubmit={this.submitHandle} noValidate>
                <div className="usr">
               
                  <input
                    className={formErrors.usr.length > 0 ? "error world" : 'world'}
                    placeholder="Username"
                    type="usr"
                    name="usr"
                    noValidate
                    onChange={this.changeHandle}
                  />
                  {/* {formErrors.usr.length > 0 && (
                    <span className="errorMessage">{formErrors.usr}</span>
                  )} */}
                </div>
                <div className="form-group">
                  <div className="password">
                   
                    <input
                      className={formErrors.password.length > 0 ? "error world mt-2" : 'world mt-2'}
                      placeholder="Password"
                      type="password"
                      name="password"
                      noValidate
                      onChange={this.changeHandle}
                    />
                    {/* {formErrors.password.length > 0 && (
                      <span className="errorMessage">{formErrors.password}</span>
                    )} */}
                  </div>
                  <div className="login mt-2">
                    <button type="submit" className="btn btn-primary" >Login</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    )

  }
}



export default Login;