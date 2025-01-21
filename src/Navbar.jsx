import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.title}>NOTED FOR YOU - A REACT APP</div>
      <div style={styles.dateTime}>{dateTime.toLocaleString()}</div>
    </nav>
  );
}
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    boxShadow: '0px 2px 4px rgba(200, 200, 200, 0.5)',
  },
  title: {
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: '14px',
  },
};
export default Navbar;
