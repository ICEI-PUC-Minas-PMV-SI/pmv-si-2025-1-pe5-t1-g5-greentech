import React, { useState, useContext } from 'react';
import { AuthContext } from './App';

export default function LoginPage() {
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/v1/greentech/crud-func/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ credentials: { email, password } })
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const { token } = await res.json();
      setToken(token);
    } catch (err) {
      console.error(err);
      setError('Login falhou');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login Greentech</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              style={styles.input}
            />
          </div>
          {error && (
            <div style={styles.error}>{error}</div>
          )}
          <button type="submit" style={styles.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  card: {
    backgroundColor: '#f4fefb',
    padding: '30px 40px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth: 350
  },
  title: {
    marginBottom: 20,
    color: '#2e8b57',
    textAlign: 'center',
    fontSize: 24
  },
  inputGroup: {
    marginBottom: 15
  },
  label: {
    display: 'block',
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: 14
  },
  error: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center'
  },
  button: {
    width: '100%',
    marginTop: 10,
    padding: '10px',
    backgroundColor: '#0077b6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 16,
    transition: 'background 0.3s ease'
  }
};
