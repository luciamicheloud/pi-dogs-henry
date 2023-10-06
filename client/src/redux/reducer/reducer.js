import {
    GET_DOGS,
    GET_DOG_BY_ID,
    GET_DOG_BY_name,
    GET_TEMPERAMENTS,
    FILTERED_BY_TEMPERAMENTS,
    ORDER_BY_name,
    ORDER_BY_WEIGHT,
    POST_DOG,
    FILTERED_BY_HOSTED,
  } from "../actions/types";
  
  const initialState = {
    allDogs: [],
    copyAllDogs: [],
    dog: {},
    temperaments: [],
    filtered: [],
  };
  
  const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_DOGS:
        return { ...state, allDogs: payload, copyAllDogs: payload, filtered: [] };
  
      case GET_DOG_BY_name:
        return { ...state, allDogs: payload, filtered: payload };
  
      case GET_DOG_BY_ID:
        return { ...state, dog: payload };
  
      case GET_TEMPERAMENTS:
        return { ...state, temperaments: payload };
  
      case FILTERED_BY_TEMPERAMENTS:
        let filtered = "";
  
        state.filtered.length
          ? (filtered = state.filtered.filter(
              (dog) => dog.temperament && dog.temperament.includes(payload)
            ))
          : (filtered = state.copyAllDogs);
  
        if (payload === "Temperaments") {
          filtered = state.copyAllDogs;
          return { ...state, allDogs: [...filtered], filtered: [...filtered] };
        } else {
          filtered = filtered.filter(
            (dog) => dog.temperament && dog.temperament.includes(payload)
          );
        }
  
        return {
          ...state,
          allDogs: [...filtered],
        };
  
      case FILTERED_BY_HOSTED:
        let filterHosted = "";
  
        state.filtered.length
          ? (filterHosted = state.filtered)
          : (filterHosted = state.copyAllDogs);
  
        let filteredHosted = "";
  
        if (payload === "API") {
          filteredHosted = filterHosted.filter(
            (dog) => typeof dog.id === "number"
          );
        } else {
          filteredHosted = filterHosted.filter(
            (dog) => typeof dog.id !== "number"
          );
        }
        return {
          ...state,
          allDogs: [...filteredHosted],
        };
  
      case ORDER_BY_name:
        let ordername = "";
  
        state.filtered.length
          ? (ordername = state.filtered)
          : (ordername = state.copyAllDogs);
        let orderedname =
          payload === "D"
            ? ordername.sort(
                (a, b) =>
                  b.name?.toLowerCase().charCodeAt(0) -
                  a.name?.toLowerCase().charCodeAt(0)
              )
            : ordername.sort(
                (b, a) => b.name?.charCodeAt(0) - a.name?.charCodeAt(0)
              );
        return {
          ...state,
          allDogs: [...orderedname],
        };
  
      case ORDER_BY_WEIGHT:
        let orderWeight = "";
  
        state.filtered.length
          ? (orderWeight = state.filtered)
          : (orderWeight = state.copyAllDogs);
  
        let orderedWeight =
          payload === "D"
            ? orderWeight.sort(
                (a, b) =>
                  b.weight.metric?.split(" ")[0] - a.weight.metric?.split(" ")[0]
              )
            : orderWeight.sort(
                (b, a) =>
                  b.weight.metric?.split(" ")[0] - a.weight.metric?.split(" ")[0]
              );
        return {
          ...state,
          allDogs: [...orderedWeight],
        };
  
      case POST_DOG:
        return {
          ...state,
          dogPost: payload,
        };
  
      default:
        return { ...state };
    }
  };
  
  export default rootReducer;