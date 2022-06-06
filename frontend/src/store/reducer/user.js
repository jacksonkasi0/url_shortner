const initialState = {
  // user: {
  //   _id: "629b1c71fb57b1440f8544e7",
  //   firstname: "jackson",
  //   lastname: "kasi",
  //   email: "slzdslibykoy@knowledgemd.com",
  // },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default userReducer;
