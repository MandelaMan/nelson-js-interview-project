import {
  SET_LOADING,
  CLEAR_STATE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "./userTypes";

const initialState = {
  loading: false,
  users: [],
  user: {},
  error: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CLEAR_STATE:
      return {
        ...state,
        loading: false,
        users: [],
        user: {},
        error: false,
      };
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: true,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: true,
      };

    default:
      return state;
  }
};

export default userReducer;
