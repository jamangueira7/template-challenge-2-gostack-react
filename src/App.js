import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio Node.js',
      url: 'http://github.com/...',
      techs: ["Node.js", "..."]
    });
    const repository = response.data;
    setRepositories([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`repositories/${id}`);

    const respositoryIndex = repositories.findIndex(respository => respository.id === id);

    repositories.splice(respositoryIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>

      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
        </li>
        )}

      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
