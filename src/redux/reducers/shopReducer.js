// BarberReducer.js

import { ShopTypes } from "../types";


const initialState = {
  shops: [],        // for all shops
  shopData: null,   // for single shop
  loading: false,
  error: null,
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {

    // ========================
    // GET ALL SHOPS
    // ========================
    case ShopTypes.ACTION.GET_SHOPS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ShopTypes.ACTION.GET_SHOPS_SUCCESS:
      return {
        ...state,
        loading: false,
        shops: action.payload,
        error: null,
      };

    case ShopTypes.ACTION.GET_SHOPS_FAILURE:
      return {
        ...state,
        loading: false,
        shops: [],
        error: action.payload,
      };

    // ========================
    // GET SHOP BY ID
    // ========================
    case ShopTypes.ACTION.GET_SHOP_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ShopTypes.ACTION.GET_SHOP_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        shopData: action.payload,
        error: null,
      };

    case ShopTypes.ACTION.GET_SHOP_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        shopData: null,
        error: action.payload,
      };

    // ========================
    // CREATE SHOP
    // ========================
    case ShopTypes.ACTION.CREATE_SHOP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ShopTypes.ACTION.CREATE_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        shops: [...state.shops, action.payload],
        error: null,
      };

    case ShopTypes.ACTION.CREATE_SHOP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default shopReducer;