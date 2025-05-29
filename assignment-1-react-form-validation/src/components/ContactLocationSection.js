import React from "react";
import { inputStyles as styles } from "../styles/inputStyles";
import { countries, countryCodes } from "../data/locationData";

const ContactLocationSection = ({
  formData,
  errors,
  handleChange,
  handleBlur,
}) => {
  const getCitiesForCountry = () => {
    const country = countries.find((c) => c.code === formData.country);
    return country ? country.cities : [];
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>📍 Contact & Location</h2>

      {/* Phone Number */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>📞 Phone Number *</label>
        <div style={styles.phoneContainer}>
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            style={styles.countryCodeSelect}
          >
            {countryCodes.map((cc) => (
              <option key={cc.code} value={cc.code}>
                {cc.code} ({cc.country})
              </option>
            ))}
          </select>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              ...styles.input,
              flex: 1,
              ...(errors.phoneNumber ? styles.inputError : {}),
            }}
            placeholder="Enter phone number"
          />
        </div>
        {errors.phoneNumber && <p style={styles.error}>{errors.phoneNumber}</p>}
      </div>

      {/* Country */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>🌍 Country *</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            ...styles.select,
            ...(errors.country ? styles.inputError : {}),
          }}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && <p style={styles.error}>{errors.country}</p>}
      </div>

      {/* City */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>City *</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={!formData.country}
          style={{
            ...styles.select,
            ...(errors.city ? styles.inputError : {}),
            ...(!formData.country ? styles.selectDisabled : {}),
          }}
        >
          <option value="">Select a city</option>
          {getCitiesForCountry().map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <p style={styles.error}>{errors.city}</p>}
      </div>

      {/* PAN Number */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>💳 PAN Number *</label>
        <input
          type="text"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            ...styles.input,
            ...(errors.panNumber ? styles.inputError : {}),
          }}
          placeholder="e.g., ABCDE1234F"
          maxLength="10"
        />
        {errors.panNumber && <p style={styles.error}>{errors.panNumber}</p>}
      </div>

      {/* Aadhar Number */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>📄 Aadhar Number *</label>
        <input
          type="text"
          name="aadharNumber"
          value={formData.aadharNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            ...styles.input,
            ...(errors.aadharNumber ? styles.inputError : {}),
          }}
          placeholder="Enter 12-digit Aadhar number"
          maxLength="12"
        />
        {errors.aadharNumber && (
          <p style={styles.error}>{errors.aadharNumber}</p>
        )}
      </div>
    </div>
  );
};

export default ContactLocationSection;
