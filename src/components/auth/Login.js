import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/authentication/authContext";

const Login = props => {
  //extract vals of context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { message, authenticated, logIn } = authContext;

  //in case of password incorrect or user doest exists
  useEffect(() => {
    if (authenticated) {
      props.history.push("/projects");
    }
    if (message) {
      showAlert(message.msg, message.category);
    }
    console.log("papas")
            //eslint-disable-next-line
  }, [message, authenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  //validate that there are no empty fields
  const onSubmit = e => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      showAlert("All fields are required", "alerta-error");
    }
    logIn({ email, password });
  };

  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}> {alert.msg} </div>
      ) : null}

      <div className="contenedor-form sombra-dark">
        <h1>Log in</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Log in"
            />
          </div>
        </form>
        <Link to={"/new-account"} className="enlace-cuenta">
          Sign up now!
        </Link>
      </div>
    </div>
  );
};

export default Login;
