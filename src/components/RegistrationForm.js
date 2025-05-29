import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoSection from "./PersonalInfoSection";
import ContactLocationSection from "./ContactLocationSection";
import { validateField, isFormValid } from "../utils/validation";
import { formStyles as styles } from "../styles/formStyles";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    countryCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    panNumber: "",
    aadharNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }

    // Reset city when country changes
    if (name === "country") {
      setFormData((prev) => ({ ...prev, city: "" }));
      if (touched.city) {
        setErrors((prev) => ({ ...prev, city: "City is required" }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    const newTouched = {};

    Object.keys(formData).forEach((field) => {
      newTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Store form data in sessionStorage to pass to success page
      sessionStorage.setItem("registrationData", JSON.stringify(formData));
      navigate("/success");
    }
  };

  const formValid = isFormValid(formData);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Create Your Account</h1>
          <p style={styles.subtitle}>Fill in your details to get started</p>
        </div>

        <div style={styles.formContainer}>
          <div style={styles.grid}>
            <PersonalInfoSection
              formData={formData}
              errors={errors}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />

            <ContactLocationSection
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!formValid}
            style={{
              ...styles.submitButton,
              ...(!formValid ? styles.submitButtonDisabled : {}),
            }}
            onMouseOver={(e) => {
              if (formValid) {
                e.target.style.backgroundColor = "#303f9f";
              }
            }}
            onMouseOut={(e) => {
              if (formValid) {
                e.target.style.backgroundColor = "#3f51b5";
              }
            }}
          >
            {formValid ? "Create Account" : "Please fill all required fields"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
