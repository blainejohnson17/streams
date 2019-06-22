import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  GET_STREAMS,
  GET_STREAM,
  UPDATE_STREAM,
  DELETE_STREAM
} from "./types";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: { userId: userId }
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = createParams => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post("/streams", {
      ...createParams,
      userId
    });

    dispatch({
      type: CREATE_STREAM,
      payload: response.data
    });
    history.push("/");
  };
};

export const getStreams = () => {
  return async dispatch => {
    const response = await streams.get("/streams");

    console.log(response);
    dispatch({
      type: GET_STREAMS,
      payload: response.data
    });
  };
};

export const getStream = id => {
  return async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({
      type: GET_STREAM,
      payload: response.data
    });
  };
};

export const updateStream = (id, updateParams) => {
  return async dispatch => {
    const response = await streams.patch(`/streams/${id}`, updateParams);

    dispatch({
      type: UPDATE_STREAM,
      payload: response.data
    });
    history.push("/");
  };
};

export const deleteStream = (id) => {
  return async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({
      type: DELETE_STREAM,
      payload: { id: id }
    });
    history.push("/");
  };
};
