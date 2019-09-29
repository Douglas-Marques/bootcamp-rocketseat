import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner, FaRegTrashAlt } from 'react-icons/fa';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRepo: '',
      repositories: [],
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) this.setState({ repositories: JSON.parse(repositories) });
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState !== repositories)
      localStorage.setItem('repositories', JSON.stringify(repositories));
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    try {
      e.preventDefault();
      this.setState({ loading: true });
      const { newRepo, repositories } = this.state;
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };
      repositories.forEach(repository => {
        if (repository.name === data.name) {
          throw new Error('Repositório duplicado');
        }
      });
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        error: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  };

  handleDelete(repositoryName) {
    this.setState({ loading: true });
    const { repositories } = this.state;
    const repos = repositories.filter(
      repository => repository.name !== repositoryName
    );
    this.setState({
      repositories: [...repos],
      loading: false,
    });
  }

  render() {
    const { newRepo, repositories, loading, error } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt color="#7159c1" />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
            className={error ? 'error' : ''}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <div>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
                <FaRegTrashAlt
                  color="#7159c1"
                  size={14}
                  onClick={() => this.handleDelete(repository.name)}
                />
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
