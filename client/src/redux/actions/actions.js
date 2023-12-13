import {
    GET_DOGS,
    GET_DOG_BY_ID,
    GET_DOG_BY_name,
    GET_TEMPERAMENTS,
    FILTERED_BY_TEMPERAMENTS,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    POST_DOG,
    FILTERED_BY_HOSTED,
  } from "./types";
  
  import axios from "axios";
  
  export const getDogs = () => {
    const endpoint = "/dogs";
  
    return async (dispatch) => {
      try {
        const { data } = await axios(endpoint);
  
        if (!data.length) throw Error("No hay perros");
  
        return dispatch({
          type: GET_DOGS,
          payload: data,
        });
      } catch (error) {
        console.log("error:", error.message);
      }
    };
  };
  
  export const getDogByname = (name) => {
    const endpoint = `/dogs/name/?name=${name}`;
  
    return async (dispatch) => {
      try {
        const { data } = await axios(endpoint);
  
        if (!data.length) throw Error("No existe perro con ese name");
  
        return dispatch({
          type: GET_DOG_BY_name,
          payload: data,
        });
      } catch (error) {
        alert(`Error:${error.message}, empty search or no dogs exist`);
      }
    };
  };
  
  export const getDogById = (id) => {
    const endpoint = `/dogs/${id}`;
  
    return async (dispatch) => {
      try {
        const { data } = await axios(endpoint);
  
        if (!Object.keys(data).length)
          throw Error("No existe perro con ese name");
  
        return dispatch({
          type: GET_DOG_BY_ID,
          payload: data,
        });
      } catch (error) {
        console.log("error:", error.message);
      }
    };
  };
  
  export const getTemperament = () => {
    const endpoint = `/temperaments`;
  
    return async (dispatch) => {
      try {
        const { data } = await axios(endpoint);
  
        if (!Object.keys(data).length) throw Error("No existen temperaments");
        return dispatch({
          type: GET_TEMPERAMENTS,
          payload: data,
        });
      } catch (error) {
        console.log("error:", error.message);
      }
    };
  };
  
  export const filterCards = (temperament) => {
    return async (dispatch) => {
      try {
        return dispatch({
          type: FILTERED_BY_TEMPERAMENTS,
          payload: temperament,
        });
      } catch (error) {
        console.log("error:", error.message);
      }
    };
  };
  
  export const filterByHosted = (hosted) => {
    return async (dispatch) => {
      try {
        return dispatch({
          type: FILTERED_BY_HOSTED,
          payload: hosted,
        });
      } catch (error) {
        console.log("error:", error.message);
      }
    };
  };
  
  export const ordernameCards = (order) => {
    return async (dispatch) => {
      try {
        return dispatch({ type: ORDER_BY_NAME, payload: order });
      } catch (error) {
        console.log("error:", error.message);
      }
    };
  };
  

  export const orderWeightCards = (order) => {
    return async function (dispatch){
        try{
            return dispatch({type: ORDER_BY_WEIGHT, payload: { order }});
        } catch (error){
            console.log(error.message)
        }
    };
};

  
  export const postDogs = (dogCreate) => {
    const endpoint = `/dogs`;
  
    const { name, height, weight, life_span, image, temperaments } = dogCreate;
  
    const dog = {
      name,
      height,
      weight,
      life_span,
      image,
      temperaments: temperaments.split(" "),
    };
  
    return async (dispatch) => {
      try {
        const response = await axios.post(endpoint, dog);
        if (!dog.temperaments || dog.temperaments.length === 0) {
          throw new Error("No existen temperaments");
        }
  
        return dispatch({
          type: POST_DOG,
          payload: response,
        });
      } catch (error) {
        throw error;
      }
    };
  };