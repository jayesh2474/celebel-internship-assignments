import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { countries } from "../data/locationData";
import { successStyles as styles } from "../styles/successStyles";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const savedData = sessionStorage.getItem("registrationData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      // Redirect to form if no data found
      navigate("/");
    }
  }, [navigate]);

  const handleNewRegistration = () => {
    sessionStorage.removeItem("registrationData");
    navigate("/");
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.successIcon}>✅</div>
          <h1 style={styles.successTitle}>Registration Successful!</h1>
          <p style={styles.successSubtitle}>
            Your account has been created successfully.
          </p>
        </div>

        <div style={styles.successContainer}>
          <h2
            style={{
              ...styles.sectionTitle,
              textAlign: "left",
              marginBottom: "24px",
            }}
          >
            Submitted Details
          </h2>

          <div style={styles.detailsGrid}>
            <div>
              <div style={styles.detailItem}>
                <p style={styles.detailLabel}>Full Name</p>
                <p style={styles.detailValue}>
                  {formData.firstName} {formData.lastName}
                </p>
              </div>

              <div style={styles.detailItem}>
                <p style={styles.detailLabel}>Username</p>
                <p style={styles.detailValue}>{formData.username}</p>
              </div>

              <div style={styles.detailItem}>
                <p style={styles.detailLabel}>Email</p>
                <p style={styles.detailValue}>{formData.email}</p>
              </div>

              <div style={styles.detailItem}>
                <p style={styles.detailLabel}>Phone Number</p>
                <p style={styles.detailValue}>
                  {formData.countryCode} {formData.phoneNumber}
                </p>
              </div>

              <div style={styles.detailItem}>
                <p style={styles.detailLabel}>Location</p>
                <p style={styles.detailValue}>
                  {formData.city},{" "}
                  {countries.find((c) => c.code === formData.country)?.name}
                </p>
              </div>
            </div>

            <div>
              <div style={styles.detailItem}>
                <p style={styles.detailLabel}>PAN Number</p>
                <p style={styles.detailValue}>
                  {formData.panNumber.toUpperCase()}
                </p>
              </div>

              <div style={styles.detailItem}>
                <p style={styles.detailLabel}>Aadhar Number</p>
                <p style={styles.detailValue}>
                  {formData.aadharNumber.replace(
                    /(\d{4})(\d{4})(\d{4})/,
                    "$1 $2 $3"
                  )}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleNewRegistration}
            style={styles.backButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#303f9f")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#3f51b5")}
          >
            Register Another User
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
