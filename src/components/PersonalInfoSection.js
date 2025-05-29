import React from "react";
import { inputStyles as styles } from "../styles/inputStyles";

const PersonalInfoSection = ({
  formData,
  errors,
  showPassword,
  setShowPassword,
  handleChange,
  handleBlur,
}) => {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>👤 Personal Information</h2>

      {/* First Name */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>First Name *</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            ...styles.input,
            ...(errors.firstName ? styles.inputError : {}),
          }}
          placeholder="Enter your first name"
        />
        {errors.firstName && <p style={styles.error}>{errors.firstName}</p>}
      </div>

      {/* Last Name */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Last Name *</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            ...styles.input,
            ...(errors.lastName ? styles.inputError : {}),
          }}
          placeholder="Enter your last name"
        />
        {errors.lastName && <p style={styles.error}>{errors.lastName}</p>}
      </div>

      {/* Username */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Username *</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            ...styles.input,
            ...(errors.username ? styles.inputError : {}),
          }}
          placeholder="Choose a username"
        />
        {errors.username && <p style={styles.error}>{errors.username}</p>}
      </div>

      {/* Email */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>📧 Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            ...styles.input,
            ...(errors.email ? styles.inputError : {}),
          }}
          placeholder="Enter your email"
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}
      </div>

      {/* Password */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Password *</label>
        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              ...styles.input,
              paddingRight: "50px",
              ...(errors.password ? styles.inputError : {}),
            }}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.passwordToggle}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {errors.password && <p style={styles.error}>{errors.password}</p>}
      </div>
    </div>
  );
};

export default PersonalInfoSection;
