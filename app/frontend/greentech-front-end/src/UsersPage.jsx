import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './App';

export default function UsersPage() {
  const { token, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', name: '', password: '', permission: 'Colaborador' });
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/v1/greentech/crud-func/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      setUsers(await res.json());
    } catch {
      setError('Failed to fetch users');
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
      setError('Failed to create');
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
      setError('Delete failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={logout} style={{ float: 'right' }}>Sair</button>
      <h2>Colaboradores</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <table border="1" cellPadding="6">
        <thead>
          <tr><th>ID</th><th>Nome</th><th>Email</th><th>Permissões</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.permission}</td>
              <td>
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: 20 }}>Cadastrar novo colaborador</h3>
      <div>
        <input
          placeholder="Name"
          value={newUser.name}
          onChange={e => setNewUser(n => ({ ...n, name: e.target.value }))}
        />
        <input
          placeholder="Email"
          type="email"
          value={newUser.email}
          onChange={e => setNewUser(n => ({ ...n, email: e.target.value }))}
        />
        <input
          placeholder="Password"
          type="password"
          minLength={8}
          value={newUser.password}
          onChange={e => setNewUser(n => ({ ...n, password: e.target.value }))}
        />
        <select
          value={newUser.permission}
          onChange={e => setNewUser(n => ({ ...n, permission: e.target.value }))}
        >
          <option>RH</option>
          <option>Colaborador</option>
        </select>
        <button onClick={createUser}>Create</button>
      </div>
    </div>
);
}
