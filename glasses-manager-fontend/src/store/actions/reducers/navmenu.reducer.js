import * as Types from "../../../common/constants";


const INITIAL_STATE = {
  navmenu: [],
  navmenuSidebar: [],
  navmenuCount: 0,
};

function navmenuReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_NAVMENU_TYPE_SUCCESS:
      return {
        ...state,
        navmenu: action.data,
        navmenuCount: action.count,
      };

    case Types.GET_NAVMENU_SIDEBAR_TYPE_SUCCESS:
      console.log("Reducer received sidebar data:", action.data);
        return {
        ...state,
        navmenuSidebar: action.data,
      };

    case Types.DELETE_NAVMENU_TYPE_SUCCESS:
      return {
        ...state,
        navmenu: action.data,
      };

    case Types.UPDATE_NAVMENU_TYPE_SUCCESS:
      return {
        ...state,
        navmenu: action.data,
      };

    default:
      return state;
  }
}

export default navmenuReducer;