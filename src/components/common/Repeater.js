import React from 'react';

const Repeater = ({ handleRepeaterChange, addRepeaterInput, removeRepeaterInput, array, property, placeholderText, icon }) => {

  return (
    <div>
      {array.map((item, i) =>
        <div key={i}>
          <div className="control has-icons-left">
            <div className="cta-caddy">
              <input
                className="input cta-partner"
                placeholder={`${placeholderText}`}
                name={property}
                value={item}
                onChange={(e) => handleRepeaterChange(property, array, i, e)}
              />
              <span className="icon is-small is-left"><i className={`fas fa-${icon}`}></i></span>
              <p className="button cta" onClick={() => removeRepeaterInput(property, array, i)}>Remove</p>
            </div>
          </div>
        </div>
      )}
      <div className="cta-caddy">
        <p className="button cta" onClick={() => addRepeaterInput(property, array)}>{`Add ${property}`}</p>
      </div>
    </div>
  );
};

export default Repeater;
