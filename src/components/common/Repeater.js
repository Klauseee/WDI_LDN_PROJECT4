import React from 'react';

const Repeater = ({ handleRepeaterChange, addRepeaterInput, removeRepeaterInput, array, property }) => {

  return (
    <div>
      {array.map((item, i) =>
        <div key={i}>
          <input
            className="input"
            placeholder={`Add ${property}`}
            name={property}
            value={item}
            onChange={(e) => handleRepeaterChange(property, array, i, e)}
          />
          <p onClick={() => removeRepeaterInput(property, array, i)}>- remove</p>
        </div>
      )}
      <p onClick={() => addRepeaterInput(property, array)}>{`+ add ${property}`}</p>
    </div>
  );
};

export default Repeater;
