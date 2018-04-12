import React from 'react';

import Technologies from '../../lib/Technologies';

const SearchFilter = ({ handleSearchInput, handleCheck }) => {
  return (
    <form>
      <div className="field">
        <h2 className="subtitle"><strong>Refine your search..</strong></h2>
      </div>

      <div className="columns is-multiline">
        {/* JOB DEETS */}
        <div className="column is-one-third-desktop is-half-tablet is-full-mobile">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                name="searchEmployerName"
                placeholder="By employer.."
                onChange={(e) => handleSearchInput(e, 'searchEmployerName')}
              />
              <span className="icon is-small is-left"><i className="fas fa-building"></i></span>
            </div>
          </div>
        </div>

        <div className="column is-one-third-desktop is-half-tablet is-full-mobile">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                name="searchTitle"
                placeholder="By job title.."
                onChange={(e) => handleSearchInput(e, 'searchTitle')}
              />
              <span className="icon is-small is-left"><i className="fas fa-id-badge"></i></span>
            </div>
          </div>
        </div>

        <div className="column is-one-third-desktop is-half-tablet is-full-mobile">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                name="searchLocation"
                placeholder="By location.."
                onChange={(e) => handleSearchInput(e, 'searchLocation')}
              />
              <span className="icon is-small is-left"><i className="fas fa-map-marker"></i></span>
            </div>
          </div>
        </div>

        {/* MORE ABOUT THE ROLE */}
        <div className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
          <div className="field">
            <div className="control">
              <div className="select max-width">
                <select className="max-width" onChange={(e) => handleSearchInput(e, 'searchType')}>
                  <option disabled selected>Contract type</option>
                  <option value="permanent">Permanent</option>
                  <option value="contract">Contract</option>
                  <option value="">Both</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="number"
                name="searchMinSalary"
                placeholder="Minimum salary"
                onChange={(e) => handleSearchInput(e, 'searchMinSalary')}
              />
              <span className="icon is-small is-left"><i className="fas fa-money-bill-alt"></i></span>
            </div>
          </div>
        </div>

        <div className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="number"
                name="searchMaxSalary"
                placeholder="Maximum salary"
                onChange={(e) => handleSearchInput(e, 'searchMaxSalary')}
              />
              <span className="icon is-small is-left"><i className="fas fa-money-bill-alt"></i></span>
            </div>
          </div>
        </div>

        <div className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
          <div className="field">
            {/* <label htmlFor="type">Sort Salary</label> */}
            <div className="control">
              <div className="select max-width">
                <select className="max-width" onChange={(e) => handleSearchInput(e, 'orderBy')}>
                  <option disabled selected>Sort salary</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="field columns is-multiline is-mobile">
        {Technologies.frontend.map((technology) =>
          <div key={technology.name} className="column is-one-fifth-mobile">
            <label className="checkbox text-center">
              <i className={technology.icon}></i><br/> {technology.print}<br/>
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
      <div className="field columns is-multiline is-mobile">
        {Technologies.backend.map((technology) =>
          <div key={technology.name} className="column is-one-fifth-mobile">
            <label className="checkbox text-center">
              <i className={technology.icon}></i><br/> {technology.print}<br/>
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
