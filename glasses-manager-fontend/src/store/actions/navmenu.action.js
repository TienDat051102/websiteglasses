import Api from '../../api'
import * as Types from '../../common/constants';



export const GET_NAVMENU_SIDEBAR = () => async (dispatch) => {
  try {
    const response = await Api.get(`/navmenu/listnavmenu`);
    dispatch({
      type: Types.GET_NAVMENU_SIDEBAR_TYPE_SUCCESS,
      data: response.data.adminData ,
    });
  } catch (error) {
    dispatch({
      type: Types.GET_NAVMENU_SIDEBAR_TYPE_ERROR,
      data: error,
    });
  }
};

export const GET_NAVMENU = (payload) => async (dispatch) => {
  try {
    const response = await Api.get(`${Types.NAVMENU}/list`, {
      params: payload,
    });

    const data = response?.data?.data || [];
    const count = response?.data?.count || 0;

    dispatch({
      type: Types.GET_NAVMENU_TYPE_SUCCESS,
      data,
      count,
    });
  } catch (error) {
    dispatch({
      type: Types.GET_NAVMENU_TYPE_ERROR,
      data: error,
    });
  }
}

export const DELETE_NAVMENU = (payload) => async (dispatch) => {
  try {
    const response = await Api.delete(`${Types.NAVMENU}/${payload.id}`);

    dispatch({
      type: Types.DELETE_NAVMENU_TYPE_SUCCESS,
      data: response.data && response.data.message,
    });
  } catch (error) {
    dispatch({
      type: Types.DELETE_NAVMENU_TYPE_ERROR,
      data: error,
    });
  }
};


export const UPDATE_NAVMENU = (payload) => async (dispatch) => {
  try {
    const response = await Api.post(`${Types.NAVMENU}/save`, payload);

    dispatch({
      type: Types.UPDATE_NAVMENU_TYPE_SUCCESS,
      data: response.data && response.data.message,
    });
  } catch (error) {
    dispatch({
      type: Types.UPDATE_NAVMENU_TYPE_ERROR,
      data: error,
    });
  }
};