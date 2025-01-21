import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';

function Signup({ onSignup }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // To track the signup request status
  const [message, setMessage] = useState(""); // To display success or error messages

  const handleSignup = () => {
    if (!username || !email || !password) {
      setMessage("All fields are required!");
      return;
    }

    setLoading(true);
    setMessage(""); // Clear previous messages

    fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: Unable to sign up`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Received Token:", data.token);
        localStorage.setItem("token", data.token);
        setMessage("Signup successful! Redirecting...");
        setLoading(false);
        if (onSignup) {
          onSignup(); // Notify parent about successful signup
        }
      })
      .catch((error) => {
        console.error("Signup Error:", error);
        setMessage("Signup failed. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography
        variant="h5"
        style={{
          marginTop: "150px",
          marginBottom: "15px",
          paddingTop: "20px",
          color: "pink",
        }}
      >
        Welcome to Noted For You, A Dynamic Notes Website that stores your Notes
        for you!!
      </Typography>
      <Card
        variant="outlined"
        style={{
          backgroundColor: "gray",
          width: "400px",
          border: "1px solid gray",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <TextField
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          fullWidth={true}
          label="Username"
          placeholder="Anything Unique, you know"
          variant="outlined"
          value={username}
        />
        <br /> <br />
        <TextField
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          fullWidth={true}
          label="Email"
          placeholder="ex:- johnsmith@gmail.com"
          variant="outlined"
          value={email}
        />
        <br />
        <br />
        <TextField
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          fullWidth={true}
          label="Password"
          variant="outlined"
          type="password"
          placeholder="Choose a secure password"
          value={password}
        />
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            size="large"
            variant="contained"
            onClick={handleSignup}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </div>
        {message && (
          <Typography
            variant="body2"
            style={{
              marginTop: "10px",
              color: message.includes("successful")
                ? "green"
                : "red",
              textAlign: "center",
            }}
          >
            {message}
          </Typography>
        )}
      </Card>
    </div>
  );
}

// PropTypes validation for the onSignup prop
Signup.propTypes = {
  onSignup: PropTypes.func.isRequired, // onSignup is required and must be a function
};

export default Signup;
