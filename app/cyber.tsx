import React, { useState, FormEvent, CSSProperties } from 'react';

export default function DiagnosticPortal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid username or password');
    }
  };

  if (isAuthenticated) {
    return (
      <div style={styles.successContainer}>
        <h1>Success</h1>
      </div>
    );
  }

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Internal Portal</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Access System
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  body: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#2c3e50',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    color: '#ecf0f1',
  },
  container: {
    backgroundColor: '#34495e',
    padding: '30px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '350px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '13px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#e74c3c',
    border: 'none',
    color: 'white',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  successContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
  },
};
