const initialState = {
  passwordState: false,
  dialogState: false,
  iconState: "Dashboard",
  currentUrls: [],
  urlList:[],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PASS":
      console.log(action.payload);
      return {
        ...state,
        passwordState: action.payload,
      };

    case "SET_DIALOG":
      return {
        ...state,
        dialogState: action.payload,
      };

    case "SET_ICON":
      return {
        ...state,
        iconState: action.payload,
      };

    case "ADD_URLS": {
      return {
        ...state,
        currentUrls: [action.payload, ...state.currentUrls],
      };
    }

    case 'CREATED_URLS':{
      return {
        ...state,
        urlList: action.payload,
      };
    }

    default:
      return state;
  }
};

export default appReducer;
