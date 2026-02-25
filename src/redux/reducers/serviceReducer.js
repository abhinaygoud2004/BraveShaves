// redux/services/serviceReducer.js

import {ServiceTypes} from "../types";

const initialState = {
  services: [],
  loading: false,
  error: null,
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {

    // ==============================
    // CREATE
    // ==============================
    case ServiceTypes.ACTION.CREATE_SERVICE_REQUEST:
    case ServiceTypes.ACTION.GET_SERVICES_BY_BARBER_REQUEST:
    case ServiceTypes.ACTION.UPDATE_SERVICE_REQUEST:
    case ServiceTypes.ACTION.DELETE_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ServiceTypes.ACTION.CREATE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        services: [...state.services, action.payload],
      };

    case ServiceTypes.ACTION.GET_SERVICES_BY_BARBER_SUCCESS:
      return {
        ...state,
        loading: false,
        services: action.payload,
      };

    case ServiceTypes.ACTION.UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        services: state.services.map((service) =>
          service._id === action.payload._id
            ? action.payload
            : service
        ),
      };

    case ServiceTypes.ACTION.DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        services: state.services.filter(
          (service) => service._id !== action.payload
        ),
      };

    // ==============================
    // FAILURES
    // ==============================
    case ServiceTypes.ACTION.CREATE_SERVICE_FAILURE:
    case ServiceTypes.ACTION.GET_SERVICES_BY_BARBER_FAILURE:
    case ServiceTypes.ACTION.UPDATE_SERVICE_FAILURE:
    case ServiceTypes.ACTION.DELETE_SERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default serviceReducer;