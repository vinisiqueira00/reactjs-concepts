import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const repositoryTitle = `Novo repositório ${Date.now()}`;
    const repositoryUrl = `https://github.com/vinisiqueira00/novo-repositorio-${Date.now()}`;
    const repositoryTechs = ['NodeJS', 'ReactJS', 'ReactNative'];

    const response = await api.post('/repositories', {
      title: repositoryTitle,
      url: repositoryUrl,
      techs: repositoryTechs,
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('/repositories/' + id);

    const currentRepositories = [...repositories];
    const repositoryIndex = currentRepositories.findIndex(repository => repository.id == id);

    currentRepositories.splice(repositoryIndex, 1);

    setRepositories(currentRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <p>{repository.title}</p>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;