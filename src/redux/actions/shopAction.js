import { ShopTypes } from "../types";
import api from '../../api/axios'

// ==============================
// 🔹 GET ALL SHOPS
// ==============================
export const getShops = () => async (dispatch) => {
  try {
    dispatch({
      type: ShopTypes.ACTION.GET_SHOPS_REQUEST,
    });

    const response = await api.get('/shops/');

    dispatch({
      type: ShopTypes.ACTION.GET_SHOPS_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: ShopTypes.ACTION.GET_SHOPS_FAILURE,
      payload:
        error.response?.data?.message || error.message,
    });
  }
};



// ==============================
// 🔹 GET SHOP BY ID
// ==============================
export const getShopById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ShopTypes.ACTION.GET_SHOP_BY_ID_REQUEST,
    });

    const response = await api.get(`/barbers/${id}`);

    dispatch({
      type: ShopTypes.ACTION.GET_SHOP_BY_ID_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: ShopTypes.ACTION.GET_SHOP_BY_ID_FAILURE,
      payload:
        error.response?.data?.message || error.message,
    });
  }
};



// ==============================
// 🔹 CREATE SHOP
// ==============================
export const createShop = (shopData) => async (dispatch) => {
  try {
    dispatch({
      type: ShopTypes.ACTION.CREATE_SHOP_REQUEST,
    });

    const response = await api.post('/shops/', shopData);

    dispatch({
      type: ShopTypes.ACTION.CREATE_SHOP_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: ShopTypes.ACTION.CREATE_SHOP_FAILURE,
      payload:
        error.response?.data?.message || error.message,
    });
  }
};