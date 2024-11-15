import React from 'react';

const WrongLetters = ({ wrongLetters }) => {
  return (
    <div className="wrong-letters-container">
      <div>
        {wrongLetters.length > 0 && <p>Wrong</p>}
        <span>
          {wrongLetters.join(', ')}
        </span>
      </div>
    </div>
  );
};

export default WrongLetters;
