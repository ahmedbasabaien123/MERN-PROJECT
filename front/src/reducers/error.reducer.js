import { GET_POST_ERRORS } from "../actions/post.actions";
import { GET_USER_ERRORS } from "../actions/user.actions";

const initialState = { userError: [], postError: [] };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postErrors: action.payload,
        userError: []
      };
    case GET_USER_ERRORS:
      return {
        userError: action.paylod,
        postError: []
      };
    default:
      return state;
  }
}
