import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { searchRepositories } from './state-redux/store';
import { BiGitRepoForked, BiSearchAlt } from 'react-icons/bi';
import { PacmanLoader } from 'react-spinners';
import './App.css';

const Repositories: React.FC = () => {
  // Then in your component where you use dispatch, you can use AppDispatch
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState('');

  const { data, loading, error } = useAppSelector(
    (state) => state.repositories
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(searchRepositories(term));
  };

  const renderedData = data.map((item: any) => {
    return (
      <div className="card renderIcon" key={item.package.name}>
        <div className="innerIconParent">
          <BiGitRepoForked className="innerIcon" aria-hidden="true" />
        </div>
        <div className="card-content">
          <a
            href={item.package.links.homepage}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="subtitle is-4">{item.package.name}</h3>
          </a>
          <div className="content">
            <p>{item.package.description}</p>
            <p>Current Version: {item.package.version}</p>
          </div>
        </div>
      </div>
    );
  });

  const loader = loading && (
    <div className="custom-loader">
      <PacmanLoader loading={loading} color="#36d7b7" size={50} />
    </div>
  );

  return (
    <div className="panel">
      {/* <form onSubmit={handleSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button className="button is-primary">Search</button>
      </form>
      {loader}
      {renderedData} */}
      <p className="panel-heading title is-2">Repositories</p>
      <form onSubmit={handleSubmit}>
        <div className="panel-block">
          <p className="control has-icons-left center">
            <input
              className="input is-medium"
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search"
            />
            <span className="icon is-left">
              <BiSearchAlt
                className="fas fa-search"
                aria-hidden="true"
                size={30}
              />
            </span>
          </p>
        </div>
      </form>
      {loader}
      <div className="rendered">{error || renderedData}</div>
    </div>
  );
};

export default Repositories;
