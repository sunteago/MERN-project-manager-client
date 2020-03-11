import {
  REGISTER_SUCCEED,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCEED,
  LOGIN_ERROR,
  LOG_OUT
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCEED:
    case REGISTER_SUCCEED:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        authenticated: true,
        message: null, //los messages son para por ej usuario ya registrado
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false
      };
    case LOG_OUT:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        authenticated: null,
        message: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
