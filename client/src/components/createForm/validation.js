const validate = (state) => {
  const errors = {};

  if (state.name === "") {
    errors.name = "*El campo name no puede estar vacío";
  } else if (state.name.length > 20) {
    errors.name = "*name no puede superar los 20 caracteres";
  } else if (state.name.split("").some((char) => !isNaN(Number(char)))) {
    errors.name = "*name no puede contener números";
  }

  if (state.heightMin === "") {
    errors.heightMin = "*El campo Height min no puede estar vacío";
  } else if (!/^\d+$/.test(state.heightMin)) {
    errors.heightMin = "*Height min debe ser un número entero positivo";
  }

  if (state.heightMax === "") {
    errors.heightMax = "*El campo Height max no puede estar vacío";
  } else if (!/^\d+$/.test(state.heightMax)) {
    errors.heightMax = "*Height max debe ser un número entero positivo";
  } else if (parseInt(state.heightMin) > parseInt(state.heightMax)) {
    errors.heightMax = "*Height max debe ser mayor que Height min";
  }

  if (state.weightMin === "") {
    errors.weightMin = "*El campo Weight min no puede estar vacío";
  } else if (!/^\d+$/.test(state.weightMin)) {
    errors.weightMin = "*Weight min debe ser un número entero positivo";
  }

  if (state.weightMax === "") {
    errors.weightMax = "*El campo Weight max no puede estar vacío";
  } else if (!/^\d+$/.test(state.weightMax)) {
    errors.weightMax = "*Weight max debe ser un número entero positivo";
  } else if (parseInt(state.weightMin) > parseInt(state.weightMax)) {
    errors.weightMax = "*Weight max debe ser mayor que Weight min";
  }

  if (state.life_span === "") {
    errors.life_span = "*El campo Life span no puede estar vacío";
  } else if (!/^\d+$/.test(state.life_span)) {
    errors.life_span = "*Life span debe ser un número entero positivo";
  }

  if (!state.temperaments) {
    errors.temperaments = "*Debes seleccionar al menos un temperamento";
  }  

  if (state.image === "") {
    errors.image = "*El campo Reference Image Id no puede estar vacío";
  }

  return errors;
};

export default validate;
