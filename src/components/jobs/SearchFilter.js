import React from 'react';

import Technologies from '../../lib/Technologies';

const SearchFilter = ({ handleSearchInput, handleCheck }) => {
  return (
    <form>
      <div className="field">
        <h2 className="subtitle"><strong>Refine your search..</strong></h2>
      </div>

      {/* JOB DEETS */}
      <div className="field">
        <input
          className="input"
          type="text"
          name="searchEmployerName"
          placeholder="By employer.."
          onChange={(e) => handleSearchInput(e, 'searchEmployerName')}
        />
      </div>

      <div className="field">
        <input
          className="input"
          type="text"
          name="searchTitle"
          placeholder="By job title.."
          onChange={(e) => handleSearchInput(e, 'searchTitle')}
        />
      </div>

      <div className="field">
        <input
          className="input"
          type="text"
          name="searchLocation"
          placeholder="By location.."
          onChange={(e) => handleSearchInput(e, 'searchLocation')}
        />
      </div>

      {/* MORE ABOUT THE ROLE */}
      <div className="field">
        <label htmlFor="type">Type</label><br />
        <label className="radio">
          <input
            type="radio"
            name="searchType"
            value="permanent"
            onChange={(e) => handleSearchInput(e, 'searchType')}
          />
          &nbsp; Permanent
        </label>
        <label className="radio">
          <input
            type="radio"
            name="searchType"
            value="contract"
            onChange={(e) => handleSearchInput(e, 'searchType')}
          />
          &nbsp; Contract
        </label>
        <label className="radio">
          <input
            type="radio"
            name="searchType"
            value=""
            onChange={(e) => handleSearchInput(e, 'searchType')}
          />
          &nbsp; Both
        </label>
      </div>

      <div className="field">
        <label htmlFor="type">Sort Salary</label>
        <div className="control">
          <div className="select is-info">
            <select onChange={(e) => handleSearchInput(e, 'orderBy')}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <input
          className="input"
          type="number"
          name="searchMinSalary"
          placeholder="Minimum salary"
          onChange={(e) => handleSearchInput(e, 'searchMinSalary')}
        />
      </div>

      <div className="field">
        <input
          className="input"
          type="number"
          name="searchMaxSalary"
          placeholder="Maximum salary"
          onChange={(e) => handleSearchInput(e, 'searchMaxSalary')}
        />
      </div>

      <div className="field columns is-multiline is-mobile">
        {Technologies.frontend.map((technology) =>
          <div key={technology.name} className="column is-one-fifth-mobile">
            <label className="checkbox">
              <i className={technology.icon}></i>
              <input
                className="techBox"
                type="checkbox"
                onChange={handleCheck}
                name={technology.name}
              />
            </label>
          </div>
        )}
        {Technologies.backend.map((technology) =>
          <div key={technology.name} className="column is-one-fifth-mobile">
            <label className="checkbox">
              <i className={technology.icon}></i>
              <input
                className="techBox"
                type="checkbox"
                onChange={handleCheck}
                name={technology.name}
              />
            </label>
          </div>
        )}
      </div>

    </form>
  );
};

export default SearchFilter;
