import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import axiosClient from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

import {
  REGISTER_SUCCEED,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCEED,
  LOGIN_ERROR,
  LOG_OUT
} from "../../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
    message: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //functions

  const registerUser = async data => {
    try {
      const response = await axiosClient.post("/api/users", data);

      dispatch({
        type: REGISTER_SUCCEED,
        payload: response.data
      });

      authenticatedUser();
    } catch (error) {
      //console.log(error.response.data.msg);
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error"
      };
      dispatch({
        type: REGISTER_ERROR,
        payload: alert
      });
    }
  };
  //returns the authenticated user

  const authenticatedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      // TODO: Function for sending the token by headers
      tokenAuth(token);
    }
    try {
      const response = await axiosClient.get("/api/auth");
      // console.log(response);
      dispatch({
        type: GET_USER,
        payload: response.data.user
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_ERROR
      });
    }
  };

  //user logs in
  const logIn = async data => {
    try {
        const response = await axiosClient.post('/api/auth', data);
        dispatch({
            type: LOGIN_SUCCEED,
            payload: response.data
        });

        //get user
        authenticatedUser();
    } catch (error) {
        // console.log(error.response.data.msg);
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error"
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alert
      });
    }
  };

  //log out
  const logOut = () => {
    dispatch({
      type: LOG_OUT
    })
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        loading: state.loading,
        registerUser,
        logIn,
        authenticatedUser,
        logOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
