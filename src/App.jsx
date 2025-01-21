import { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Notess from './cards_notes';
import Signin from './components/Login';
import Signup from './components/SignUp.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isSignedUp, setIsSignedUp] = useState(false); 

  const handleSignup = () => {
    setIsSignedUp(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Log in the user
  };

  return (
    <div className="App">
      {!isSignedUp ? (
        <Signup onSignup={handleSignup} />
      ) : !isLoggedIn ? (
        <Signin onLogin={handleLogin} />
      ) : (
        <>
          <Navbar />
          <Notess />
        </>
      )}
    </div>
  );
}

export default App;
