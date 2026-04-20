import Api from '../../api'
import * as Types from '../../common/constants';

export const GET_INFORMATION = () => async (dispatch) => {
  try {
     const res = await Api.get('/information');
     console.log(res.data.data)
  dispatch({
    type: Types.GET_INFORMATION_TYPE_SUCCESS,
    payload: res.data.data,
  });
} catch (error) {
  dispatch({
    type: Types.GET_INFORMATION_TYPE_ERROR,
    payload: error,
  });
};
}

export const UPDATE_INFORMATION = (payload) => async (dispatch) => {
  try{
        const response =  await Api.put('/information', payload);
        dispatch({
            type: Types.UPDATE_INFORMATION_TYPE_SUCCESS,
            data: response.data && response.data.data,
        })
    }
    catch(error){
        dispatch({ type: Types.UPDATE_INFORMATION_TYPE_ERROR, data: error })
    }
}