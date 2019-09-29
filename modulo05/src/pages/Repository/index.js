import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FaDoorClosed,
  FaDoorOpen,
  FaDungeon,
  FaFastBackward,
  FaFastForward,
} from 'react-icons/fa';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, Icons, Buttons } from './styles';

import api from '../../services/api';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: {},
      issues: [],
      loading: true,
      page: 1,
      filter: 'all',
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  async handleSubmitFilter(filter) {
    this.setState({
      loading: true,
      filter,
    });
    const { page } = this.state;
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
        page,
      },
    });
    this.setState({
      issues: issues.data,
      loading: false,
    });
  }

  async handleSubmitPage(page) {
    this.setState({
      loading: true,
      page,
    });
    const { filter } = this.state;
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
        page,
      },
    });
    if (issues.data.length === 0) {
      this.setState({
        page: page - 1,
      });
    }
    this.setState({
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading, page } = this.state;
    if (loading) return <Loading>Carregando</Loading>;
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos respositórios</Link>
          <img src={repository.owner.avatar_url} alt="Repository owner login" />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
          <Icons>
            <span>
              <FaDoorClosed
                color="#7159c1"
                size={25}
                onClick={() => this.handleSubmitFilter('closed')}
              />
            </span>
            <span>
              <FaDoorOpen
                color="#7159c1"
                size={25}
                onClick={() => this.handleSubmitFilter('open')}
              />
            </span>
            <span>
              <FaDungeon
                color="#7159c1"
                size={22}
                onClick={() => this.handleSubmitFilter('all')}
              />
            </span>
          </Icons>
        </Owner>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          <Buttons>
            {page > 1 ? (
              <span>
                <FaFastBackward
                  color="#7159c1"
                  onClick={() => this.handleSubmitPage(page - 1)}
                />
              </span>
            ) : (
              <></>
            )}
            <div>{page}</div>
            {page >= 1 ? (
              <span>
                <FaFastForward
                  color="#7159c1"
                  onClick={() => this.handleSubmitPage(page + 1)}
                />
              </span>
            ) : (
              <></>
            )}
          </Buttons>
        </IssueList>
      </Container>
    );
  }
}

Repository.propTypes = propTypes;
