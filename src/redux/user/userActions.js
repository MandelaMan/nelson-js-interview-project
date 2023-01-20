import axios from "axios";
import {
  SET_LOADING,
  CLEAR_STATE,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "./userTypes";

const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

const clearState = () => {
  return {
    type: CLEAR_STATE,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: GET_USERS_FAILURE,
    payload: error,
  };
};

const fetchUserSuccess = (user) => {
  return {
    type: GET_USER_SUCCESS,
    payload: user,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: GET_USER_FAILURE,
    payload: error,
  };
};

export const updateUser = (inputs) => {
  const { id } = inputs;

  return (dispatch) => {
    // set loading to true
    dispatch(setLoading(true));

    axios
      .patch(
        `https://us-central1-ti-reactjs-test.cloudfunctions.net/app/api/user/${id}`,
        inputs
      )
      .then((response) => {
        if (response.status === 200) {
          // if we update is success get user
          dispatch(fetchUser(id));

          window.location.reload();
        }
      })
      .catch((error) => {
        const err = error.message;

        // if we get an error occurs updating user
        dispatch(fetchUserFailure(err));
      });
  };
};

export const fetchUser = (id) => {
  return (dispatch) => {
    dispatch(clearState());

    // set loading to true
    dispatch(setLoading(true));

    axios
      .get(
        `https://us-central1-ti-reactjs-test.cloudfunctions.net/app/api/user/${id}`
      )
      .then((response) => {
        const user = response.data;

        // if we get users
        dispatch(fetchUserSuccess(user));
      })
      .catch((error) => {
        const err = error.message;

        // if we get an error occurs getting user
        dispatch(fetchUserFailure(err));
      });
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    // set loading to true
    dispatch(setLoading(true));

    axios
      .get(
        "https://us-central1-ti-reactjs-test.cloudfunctions.net/app/api/users"
      )
      .then((response) => {
        const users = response.data;

        // if we get users
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        const err = error.message;

        // if we get an error occurs getting users
        dispatch(fetchUsersFailure(err));
      });
  };
};
