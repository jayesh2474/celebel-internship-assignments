export const formStyles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 100%)",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    maxWidth: "1000px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    overflow: "hidden",
  },
  header: {
    background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
    padding: "32px",
    color: "white",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
  },
  subtitle: {
    fontSize: "16px",
    opacity: 0.9,
    margin: 0,
  },
  formContainer: {
    padding: "32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "32px",
  },
  submitButton: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#3f51b5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    marginTop: "32px",
  },
  submitButtonDisabled: {
    backgroundColor: "#d1d5db",
    color: "#6b7280",
    cursor: "not-allowed",
  },
};
