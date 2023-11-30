const validate = (state) => {
  const errors = {};

  if (state.name === "") {
    errors.name = "*The name field cannot be empty";
  } else if (state.name.length > 20) {
    errors.name = "*Name cannot exceed 20 characters";
  } else if (state.name.split("").some((char) => !isNaN(Number(char)))) {
    errors.name = "*Name cannot contain numbers";
  }

  if (state.heightMin === "") {
    errors.heightMin = "*The Height min field cannot be empty";
  } else if (!/^\d+$/.test(state.heightMin)) {
    errors.heightMin = "*Height min must be a positive integer";
  }

  if (state.heightMax === "") {
    errors.heightMax = "*The Height max field cannot be empty";
  } else if (!/^\d+$/.test(state.heightMax)) {
    errors.heightMax = "*Height max must be a positive integer";
  } else if (parseInt(state.heightMin) > parseInt(state.heightMax)) {
    errors.heightMax = "*Height max must be greater than Height min";
  }

  if (state.weightMin === "") {
    errors.weightMin = "*The Weight min field cannot be empty";
  } else if (!/^\d+$/.test(state.weightMin)) {
    errors.weightMin = "*Weight min must be a positive integer";
  }

  if (state.weightMax === "") {
    errors.weightMax = "*The Weight max field cannot be empty";
  } else if (!/^\d+$/.test(state.weightMax)) {
    errors.weightMax = "*Weight max must be a positive integer";
  } else if (parseInt(state.weightMin) > parseInt(state.weightMax)) {
    errors.weightMax = "*Weight max must be greater than Weight min";
  }

  if (state.life_span === "") {
    errors.life_span = "*The Life span field cannot be empty";
  } else if (!/^\d+$/.test(state.life_span)) {
    errors.life_span = "*Life span must be a positive integer";
  }

  if (!state.temperaments) {
    errors.temperaments = "*You must select at least one temperament";
  }  

  if (state.image === "") {
    errors.image = "*The Reference Image Id field cannot be empty";
  }

  return errors;
};

export default validate;
