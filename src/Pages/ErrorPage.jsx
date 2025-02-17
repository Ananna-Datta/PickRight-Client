const ErrorPage = () => {
    const handleGoHome = () => {
        // Redirect to the homepage or desired route
        window.location.href = "/";
      };
    
      return (
        <div style={styles.container}>
          <h1 style={styles.errorCode}>404</h1>
          <h2 style={styles.message}>Oops! Page Not Found</h2>
          <p style={styles.description}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <button style={styles.button} onClick={handleGoHome}>
            Go Back Home
          </button>
        </div>
      );
    };
    
    const styles = {
      container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        textAlign: "center",
        padding: "20px",
      },
      errorCode: {
        fontSize: "96px",
        fontWeight: "bold",
        color: "#ff4757",
        margin: "0",
      },
      message: {
        fontSize: "32px",
        color: "#2f3542",
        margin: "10px 0",
      },
      description: {
        fontSize: "16px",
        color: "#57606f",
        maxWidth: "400px",
        margin: "10px 0",
      },
      button: {
        padding: "10px 20px",
        fontSize: "16px",
        color: "#ffffff",
        backgroundColor: "#1e90ff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px",
        transition: "background-color 0.3s",
      },
    };

export default ErrorPage;