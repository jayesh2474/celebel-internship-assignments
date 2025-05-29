export const validateField = (name, value) => {
  let error = "";

  switch (name) {
    case "firstName":
    case "lastName":
      if (!value.trim())
        error = `${name === "firstName" ? "First" : "Last"} name is required`;
      else if (value.length < 2) error = "Must be at least 2 characters";
      else if (!/^[a-zA-Z\s]+$/.test(value))
        error = "Only letters and spaces allowed";
      break;

    case "username":
      if (!value.trim()) error = "Username is required";
      else if (value.length < 3)
        error = "Username must be at least 3 characters";
      else if (!/^[a-zA-Z0-9_]+$/.test(value))
        error = "Only letters, numbers, and underscores allowed";
      break;

    case "email":
      if (!value.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Invalid email format";
      break;

    case "password":
      if (!value) error = "Password is required";
      else if (value.length < 8)
        error = "Password must be at least 8 characters";
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
        error = "Password must contain uppercase, lowercase, and number";
      break;

    case "phoneNumber":
      if (!value.trim()) error = "Phone number is required";
      else if (!/^\d{10}$/.test(value.replace(/\s/g, "")))
        error = "Phone number must be 10 digits";
      break;

    case "country":
      if (!value) error = "Country is required";
      break;

    case "city":
      if (!value) error = "City is required";
      break;

    case "panNumber":
      if (!value.trim()) error = "PAN number is required";
      else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase()))
        error = "Invalid PAN format (e.g., ABCDE1234F)";
      break;

    case "aadharNumber":
      if (!value.trim()) error = "Aadhar number is required";
      else if (!/^\d{12}$/.test(value.replace(/\s/g, "")))
        error = "Aadhar number must be 12 digits";
      break;

    default:
      break;
  }

  return error;
};

export const isFormValid = (formData) => {
  const requiredFields = Object.keys(formData);
  return requiredFields.every((field) => {
    const error = validateField(field, formData[field]);
    return !error && formData[field].toString().trim() !== "";
  });
};
