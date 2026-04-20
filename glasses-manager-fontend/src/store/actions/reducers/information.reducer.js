import * as Types from "../../../common/constants";
const INITIAL_STATE = {
  data: null
};

function informationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_INFORMATION_TYPE_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case Types.UPDATE_INFORMATION_TYPE_SUCCESS:
      return {
        ...state,
        data: action.data
      };

    default:
      return state;
  }
}

export default informationReducer;