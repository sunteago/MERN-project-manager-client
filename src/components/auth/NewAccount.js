import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';

const NewAccount = (props) => {

    //extract vals of context
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, authenticated, registerUser } = authContext;

     //in case that the user would authenticated or registered or duplicated register
    useEffect( () => {
        if (authenticated) {
            props.history.push('/projects');
        }
        if(message) {
            showAlert(message.msg, message.category)
        }
                //eslint-disable-next-line
    }, [message, authenticated, props.history])

    //state for log in
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirm: ""
    });

    const { username, email, password, confirm } = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    const onSubmit = e => {
        e.preventDefault();

        if (username.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirm.trim() === '') {
            showAlert("All fields are required ", "alerta-error");
            return;
        }
        if (password.length < 6) {
            showAlert('The password must be at least 6 characters long', "alerta-error")
            return;
        }
        if (password !== confirm) {
            showAlert('Password and confirm password don\'t match', 'alerta-error')
            return;
        }

        //pasarlo al action

        registerUser({
            username,
            email,
            password
        })
    };
    return (
        <div className="form-usuario">
            {alert ? <div className={`alerta ${alert.category}`}> {alert.msg} </div> : null}
            <div className="contenedor-form sombra-dark">
                <h1>Get your free account</h1>

                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            name="username"
                            placeholder="Enter your Username"
                            onChange={onChange}
                        />
                    </div>
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
                        <label htmlFor="confirm">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm"
                            value={confirm}
                            name="confirm"
                            placeholder="Confirm your password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Sign up"
                        />
                    </div>
                </form>
                <Link to={"/"} className="enlace-cuenta">
                    Go back to log in
        </Link>
            </div>
        </div>
    );
};

export default NewAccount;
