const initialState = {
  passwordState: false,
  dialogState: false,
  iconState: 'Dashboard',
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PASS':
      console.log(action.payload);
      return {
        ...state,
        passwordState: action.payload,
      }

    case 'SET_DIALOG':
      return {
        ...state,
        dialogState: action.payload,
      }

    case 'SET_ICON':
      return {
        ...state,
        iconState: action.payload,
      }

    default:
      return state
  }
}

export default appReducer
