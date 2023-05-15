import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from './../services/api.js'
export default function Teste() {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    api.get("listAll").then(({ data }) => {
      setUsers(data.user);
    })
    console.log(user);
    // const fetchData = async () => {
    //   const res = await fetch('/api/users');
    //   const data = await res.json();
    //   setUsers(data);
    // };
    // fetchData();
  }, []);

  return (
    <div>
      <h1>Listagem de Usuários</h1>
      <ul>
        {/* {users.map((user) => (
          <li key={user._id}>
            <Link href={`/users/${user._id}`}>
              <p>{user.name}</p>
            </Link>
          </li>
        ))} */}
      </ul>
      <a href="/register">
        <p>Criar Usuário</p>
      </a>
    </div>
  );
}
