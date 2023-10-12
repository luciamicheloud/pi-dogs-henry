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
  } from "../actions/types";
  
  const initialState = {
    filters: false,
    allDogs: [],
    copyAllDogs: [],
    dog: [],
    temperaments: [],
    filtered: [],
  };
  
  // const pesoPromedio = (pesoString) => {
  //   const numeros = pesoString.split(/ - | – /).map(Number);
  //     if (numeros.length === 1) {
  //     // si solo hay un numero, retorna ese numero porque es el weight unico
  //     return numeros[0];
  //   } else if (numeros.length === 2) {
  //     // si hay dos numeros ,calcula el promedio
  //     return (numeros[0] + numeros[1]) / 2;
  //   }
  // };


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
          let temp = [];
          // if (state.filters) {
          //   console.log("if")
          //   temp = [...state.allDogs].filter(
          //     (dog) =>
          //       dog.temperaments &&
          //       payload &&
          //       dog.temperaments.includes(payload)
                
          //   );
          //   return {
          //     ...state,
          //     allDogs: [...temp],
          //     filtered: temp,
          //     filters: true
          //   };
          // } else {
            console.log("else")
            temp = [...state.copyAllDogs].filter(
              (dog) =>
                dog.temperaments &&
                payload &&
                dog.temperaments.includes(payload)
            );
            return {
              ...state,
              allDogs: [...temp],
              filtered: temp,
              filters: true
            };
        //  }
        
  
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
  
      case ORDER_BY_NAME:
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
        switch (payload) {
          case "pesoMayor":
              let may = [];
              if (state.filters) {
                  may = [...state.filtered].sort((prev, next) => {
                      if ((prev.weight) > (next.weight)) return -1;
                      if ((prev.weight) < (next.weight)) return 1;
                      return 0;
                  });
                  return {
                      ...state,
                      allDogs: [...may],
                      filtered: may,
                      currentPage: 0,
                      filters: true
                  };
              } else {
                  may = [...state.copyAllDogs].sort((prev, next) => {
                      if ((prev.weight) > (next.weight)) return -1;
                      if ((prev.weight) < (next.weight)) return 1;
                      return 0;
                  });
                  return {
                      ...state,
                      allDogs: [...may],
                      filtered: may,
                      currentPage: 0,
                      filters: true
                  };
              }
          case "pesoMenor":
              let men = [];
              if (state.filters) {
                  men = [...state.filtered].sort((prev, next) => {
                      if (pesoPromedio(prev.weight) > pesoPromedio(next.weight)) return 1;
                      if (pesoPromedio(prev.weight) < pesoPromedio(next.weight)) return -1;
                      return 0;
                  });
                  return {
                      ...state,
                      allDogs: [...men].splice(0, 8),
                      filtered: men,
                      currentPage: 0,
                      filters: true
                  };
              } else {
                  men = [...state.copyAllDogs].sort((prev, next) => {
                      if (pesoPromedio(prev.weight) > pesoPromedio(next.weight)) return 1;
                      if (pesoPromedio(prev.weight) < pesoPromedio(next.weight)) return -1;
                      return 0;
                  });
                  return {
                      ...state,
                      allDogs: [...men].splice(0, 8),
                      filtered: men,
                      currentPage: 0,
                      filters: true
                  };
              }
          default:
              return state;
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