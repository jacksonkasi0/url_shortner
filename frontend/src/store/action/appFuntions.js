export const setPass = (bool) => {
  return {
    type: "SET_PASS",
    payload: bool,
  };
};

export const setDialog = (bool) => {
  return {
    type: "SET_DIALOG",
    payload: bool,
  };
};

export const setIcon = (val) => {
  return {
    type: "SET_ICON",
    payload: val,
  };
};

export const addUrls = (val) => {
  return {
    type: "ADD_URLS",
    payload: val,
  };
};

export const userCreatedUrls = (val)=>{
  return {
    type: "CREATED_URLS",
    payload: val,
  };
}