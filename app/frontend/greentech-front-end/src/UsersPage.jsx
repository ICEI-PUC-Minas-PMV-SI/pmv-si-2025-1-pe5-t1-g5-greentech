import React, { useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from './App';

export default function UsersPage() {
  const { token, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', name: '', password: '', permission: 'Colaborador' });
  const [error, setError] = useState('');
  const [userPermission, setUserPermission] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserPermission(decoded.permission);
      } catch {
        setError('Token inválido');
      }
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/v1/greentech/crud-func/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      setUsers(await res.json());
    } catch {
      setError('Falha ao buscar colaboradores');
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const createUser = async () => {
    try {
      const res = await fetch('/api/v1/greentech/crud-func/user', {
        method: 'POST',
        headers: {'Content-Type':'application/json', Authorization:`Bearer ${token}`},
        body: JSON.stringify({ user: newUser })
      });
      if (!res.ok) throw new Error();
      setNewUser({ email:'', name:'', password:'', permission:'Colaborador' });
      fetchUsers();
    } catch {
      setError('Falha ao criar colaborador');
    }
  };

  const deleteUser = async id => {
    try {
      const res = await fetch(`/api/v1/greentech/crud-func/user/${id}`, {
        method: 'DELETE',
        headers: { Authorization:`Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      fetchUsers();
    } catch {
      setError('Falha ao excluir colaborador');
    }
  };

  const updateUser = async () => {
    try {
      const res = await fetch(`/api/v1/greentech/crud-func/user/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user: {
            name: editingUser.name,
            email: editingUser.email,
            permission: editingUser.permission
          }
        })
      });
  
      if (!res.ok) throw new Error();
      setEditingUser(null);
      fetchUsers();
    } catch {
      setError('Falha ao atualizar colaborador');
    }
  };  

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button onClick={logout} style={styles.logoutButton}>Sair</button>
        {userPermission === 'Admin' || userPermission === 'RH' ? (
          <>
            <h2 style={styles.title}>Gestão de Colaboradores</h2>
            {error && <div style={styles.error}>{error}</div>}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th><th>Nome</th><th>Email</th><th>Permissão</th><th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter(u => u.permission !== 'Admin')
                  .map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>
                        {editingUser?.id === u.id ? (
                          <input
                            style={styles.input}
                            value={editingUser.name}
                            onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                          />
                        ) : (
                          u.name
                        )}
                      </td>
                      <td>
                        {editingUser?.id === u.id ? (
                          <input
                            style={styles.input}
                            value={editingUser.email}
                            onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                          />
                        ) : (
                          u.email
                        )}
                      </td>
                      <td>
                        {editingUser?.id === u.id ? (
                          <select
                            style={styles.input}
                            value={editingUser.permission}
                            onChange={e => setEditingUser({ ...editingUser, permission: e.target.value })}
                          >
                            <option value="RH">RH</option>
                            <option value="Colaborador">Colaborador</option>
                          </select>
                        ) : (
                          u.permission
                        )}
                      </td>
                      <td>
                        {editingUser?.id === u.id ? (
                          <>
                            <button style={styles.button} onClick={updateUser}>Salvar</button>
                            <button
                              style={{ ...styles.deleteButton, marginLeft: 8 }}
                              onClick={() => setEditingUser(null)}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              style={{ ...styles.button, marginRight: 8 }}
                              onClick={() => setEditingUser(u)}
                            >
                              Editar
                            </button>
                            <button style={styles.deleteButton} onClick={() => deleteUser(u.id)}>Excluir</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
  
            <h3 style={styles.subtitle}>Cadastrar Novo Colaborador</h3>
            <div style={styles.formGroup}>
              <input
                placeholder="Nome"
                value={newUser.name}
                onChange={e => setNewUser(n => ({ ...n, name: e.target.value }))}
                style={styles.input}
              />
              <input
                placeholder="Email"
                type="email"
                value={newUser.email}
                onChange={e => setNewUser(n => ({ ...n, email: e.target.value }))}
                style={styles.input}
              />
              <input
                placeholder="Senha"
                type="password"
                minLength={8}
                value={newUser.password}
                onChange={e => setNewUser(n => ({ ...n, password: e.target.value }))}
                style={styles.input}
              />
              <select
                value={newUser.permission}
                onChange={e => setNewUser(n => ({ ...n, permission: e.target.value }))}
                style={styles.input}
              >
                <option>RH</option>
                <option>Colaborador</option>
              </select>
              <button style={styles.button} onClick={createUser}>Criar</button>
            </div>
          </>
        ) : (
          <p style={{ textAlign: 'center', fontSize: 18, color: '#555' }}>
            Você está logado como colaborador e não possui permissões para gerenciar usuários.
          </p>
        )}
      </div>
    </div>
  );  
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  card: {
    backgroundColor: '#f4fefb',
    padding: '30px 40px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    maxWidth: 900,
    width: '100%',
    position: 'relative'
  },
  title: {
    marginBottom: 20,
    color: '#2e8b57',
    textAlign: 'center',
    fontSize: 24
  },
  subtitle: {
    marginTop: 30,
    marginBottom: 10,
    color: '#2e8b57',
    fontSize: 20
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 20
  },
  formGroup: {
    display: 'grid',
    gap: 10,
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    marginBottom: 20
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: 14
  },
  button: {
    padding: '10px',
    backgroundColor: '#0077b6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 16,
    transition: 'background 0.3s ease'
  },
  deleteButton: {
    padding: '10px',
    backgroundColor: '#e63946',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 16,
    transition: 'background 0.3s ease'
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#ffb703',
    color: '#333',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center'
  }
};
