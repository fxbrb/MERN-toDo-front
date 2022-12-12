export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case "SET_COMPLETE_TASKS":
      return {
        ...state,
        completeTasks: action.payload,
      };

    case "SET_INCOMPLETE_TASKS":
      return {
        ...state,
        incompleteTasks: action.payload,
      };
    case "RESET_USER":
      return {
        ...state,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};
