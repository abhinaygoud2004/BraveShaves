import {ServiceTypes} from "../types";
import api from "../../api/axios";


// ==============================
// 🔹 CREATE SERVICE
// ==============================
export const createService = (data) => async (dispatch) => {
  try {
    dispatch({ type: ServiceTypes.ACTION.CREATE_SERVICE_REQUEST });

    const response = await api.post("/services/", data);

    dispatch({
      type: ServiceTypes.ACTION.CREATE_SERVICE_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: ServiceTypes.ACTION.CREATE_SERVICE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// ==============================
// 🔹 GET SERVICES BY BARBER
// ==============================
export const getServicesByBarber = (barberId) => async (dispatch) => {
  try {
    dispatch({ type: ServiceTypes.ACTION.GET_SERVICES_BY_BARBER_REQUEST });

    const response = await api.get(`/services/barber/${barberId}`);

    dispatch({
      type: ServiceTypes.ACTION.GET_SERVICES_BY_BARBER_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: ServiceTypes.ACTION.GET_SERVICES_BY_BARBER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// ==============================
// 🔹 UPDATE SERVICE
// ==============================
export const updateService = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: ServiceTypes.ACTION.UPDATE_SERVICE_REQUEST });

    const response = await api.put(`/services/${id}`, data);

    dispatch({
      type: ServiceTypes.ACTION.UPDATE_SERVICE_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: ServiceTypes.ACTION.UPDATE_SERVICE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// ==============================
// 🔹 DELETE SERVICE
// ==============================
export const deleteService = (id) => async (dispatch) => {
  try {
    dispatch({ type: ServiceTypes.ACTION.DELETE_SERVICE_REQUEST });

    await api.delete(`/services/${id}`);

    dispatch({
      type: ServiceTypes.ACTION.DELETE_SERVICE_SUCCESS,
      payload: id,
    });

  } catch (error) {
    dispatch({
      type: ServiceTypes.ACTION.DELETE_SERVICE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};