import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/register",
        form
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Account</h2>
        <p style={styles.subheading}>
          Simple MERN Registration Demo
        </p>

        <form onSubmit={handleSubmit}>
          <input
            data-cy="name-input"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            data-cy="email-input"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            data-cy="password-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
          />

          <button
            data-cy="submit-btn"
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && (
          <p
            data-cy="success-msg"
            style={{
              marginTop: "15px",
              color: message === "User registered" ? "green" : "red",
              textAlign: "center"
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  card: {
    width: "360px",
    padding: "30px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
  },
  heading: {
    marginBottom: "5px",
    textAlign: "center"
  },
  subheading: {
    marginBottom: "20px",
    fontSize: "14px",
    color: "#555",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "15px",
    cursor: "pointer"
  }
};

export default App;
