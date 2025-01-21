import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        username: email, // Replace with `email` if backend supports it
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          console.error("Error:", res.statusText);
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          console.log("Received token:", data.token);
          localStorage.setItem("token", data.token);
        }
      })
      .catch((error) => console.error("Fetch Error:", error));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h5" style={{ marginTop: "150px", marginBottom: "15px", paddingTop: "20px" }}>
        Welcome Back User, Log in to Your Account to access your saved notes !!
      </Typography>
      <Card variant="outlined" style={{
        backgroundColor: "gray",
        width: "400px",
        border: "1px solid gray",
        padding: "20px",
        marginBottom: "20px"
      }}>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          label="Email"
          variant="outlined"
          placeholder="ex:- johnsmith@gmail.com"
        />
        <br /><br />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          placeholder="Enter your password"
        />
        <br /><br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button size="large" variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Signin;
