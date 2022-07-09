import {
  USER_LOADED,
  ADD_EMPLOYEE,
  ADD_DEPARTMENT,
  ADD_POSITION,
  ADD_SHIFT,
  UPDATE_EMPLOYEE,
  LOGIN_SUCCESS,
  SEND_INVITE,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  PUBLISHED_SHIFTS,
} from "../actions/types";

const initialState = {
  items: [
    {
      name: "Create an account",
      codename: "has_created_account",
      active: true,
      link: false,
    },
    {
      name: "Create an employee",
      codename: "has_created_employee",
      active: false,
      link: "/employees",
    },

    {
      name: "Create a shift",
      codename: "has_created_shift",
      active: false,
      link: "/rota",
    },

    {
      name: "Create a department",
      codename: "has_created_department",
      active: false,
      link: "/departments",
    },

    {
      name: "Create a position",
      codename: "has_created_position",
      active: false,
      link: "/positions",
    },

    {
      name: "Invite an employee",
      codename: "has_invited_employee",
      active: false,
      link: "/employees",
    },

    {
      name: "Publish a shift",
      codename: "has_published_shift",
      active: false,
      link: "/rota",
    },
  ],
};

const activateItem = (codename) => {
  let newState = { ...initialState };
  let idx = newState.items.findIndex((item) => item.codename == codename);
  console.log(idx);

  newState.items[idx].active = true;
  return [...newState.items];
};

const setInitialChecklist = (items) => {
  let newState = { ...initialState };

  Object.entries(items).forEach(([key, value]) => {
    let idx = newState.items.findIndex((item) => item.codename == key);
    newState.items[idx].active = value;
  });

  return [...newState.items];
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return action.payload.user.business
        ? {
            ...state,
            items: setInitialChecklist(action.payload.user.business.checklist),
          }
        : { ...state };

    case LOGIN_SUCCESS:
      return action.payload.user.business
        ? {
            ...state,
            items: setInitialChecklist(action.payload.user.business.checklist),
          }
        : { ...state };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        items: [],
      };
    case USER_LOADED:
      return action.payload.business
        ? {
            ...state,
            items: setInitialChecklist(action.payload.business.checklist),
          }
        : { ...state };
    case ADD_EMPLOYEE:
      return { ...state, items: activateItem("has_created_employee") };

    case ADD_POSITION:
      return { ...state, items: activateItem("has_created_position") };

    case ADD_DEPARTMENT:
      return { ...state, items: activateItem("has_created_department") };

    case ADD_SHIFT:
      return { ...state, items: activateItem("has_created_shift") };

    case SEND_INVITE:
      return { ...state, items: activateItem("has_invited_employee") };

    case PUBLISHED_SHIFTS:
      return { ...state, items: activateItem("has_published_shift") };

    default:
      return state;
  }
}
