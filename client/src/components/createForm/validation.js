const validate = (state) => {
    const errors = {};
  
    if (state.name === "") {
      errors.name = "*El campo name no puede estar vacío";
    } else if (state.name.length > 20) {
      errors.name = "*name no puede superar los 20 caracteres";
    } else if (state.name.split("").filter((e) => Number(e) && e).length >= 1) {
      errors.name = "*name no puede tener número";
    }
  
    if (state.heightMin === "") {
      errors.heightMin = "*El campo Height no puede estar vació";
    } else if (state.heightMin.length > 3) {
      errors.heightMin = "*Height no puede superar 3 digitos";
    } else if (!Number(state.heightMin)) {
      errors.heightMin = "*Height tiene que ser un número";
    } else if (Number(state.heightMin) < 1) {
      errors.heightMin = "*Height tiene que ser mayor a 0";
    }
  
    if (state.heightMax === "") {
      errors.heightMax = "*El campo Height no puede estar vació";
    } else if (state.heightMaxlength > 3) {
      errors.heightMax = "*Height no puede superar 3 digitos";
    } else if (!Number(state.heightMax)) {
      errors.heightMax = "*Height tiene que ser un número";
    } else if (Number(state.heightMin) > Number(state.heightMax)) {
      errors.heightMax = "*HeightMax tiene que ser mayor a HeighMin";
    } else if (Number(state.heightMax) < 1) {
      errors.heightMax = "*Height tiene que ser mayor a 0";
    }
  
    if (state.weightMin === "") {
      errors.weightMin = "*El campo Weight no puede estar vació";
    } else if (state.weightMin.length > 2) {
      errors.weightMin = "*Weight no puede superar 2 digitos";
    } else if (!Number(state.weightMin)) {
      errors.weightMin = "*Weight tiene que ser un número";
    } else if (Number(state.weightMin) < 1) {
      errors.weightMin = "*Weight tiene que ser mayor a 0";
    }
  
    if (state.weightMax === "") {
      errors.weightMax = "*El campo Weight no puede estar vació";
    } else if (state.weightMax.length > 2) {
      errors.weightMax = "*Weight no puede superar 2 digitos";
    } else if (!Number(state.weightMax)) {
      errors.weightMax = "*Weight tiene que ser un número";
    } else if (Number(state.weightMin) > Number(state.weightMax)) {
      errors.weightMax = "*weightMax tiene que ser mayor a HeighMin";
    } else if (Number(state.weightMax) < 1) {
      errors.weightMax = "*Weight tiene que ser mayor a 0";
    }
  
    if (state.life_span === "") {
      errors.life_span = "*El campo Life span no puede estar vació";
    } else if (state.life_span.length > 2) {
      errors.life_span = "*Life span no puede superar 2 digitos";
    } else if (!Number(state.life_span)) {
      errors.life_span = "*Life span tiene que ser un número";
    } else if (Number(state.life_span) < 1) {
      errors.life_span = "*Life span tiene que ser mayor a 0";
    }
  
    if (state.temperaments === "") {
      errors.temperaments = "*El campo Temperaments no puede estar vació";
    } else if (state.temperaments.length > 15) {
      errors.temperaments =
        "*El campo Temperaments no puede superar los 15 caracteres";
    } else if (
      state.temperaments.split("").filter((e) => Number(e) && e).length >= 1
    ) {
      errors.temperaments = "*Temperaments no puede tener número";
    }
  
    if (state.image === "") {
      errors.image = "*El campo Reference Image Id no puede estar vació";
    }
  
    return errors;
  };
  
  export default validate;