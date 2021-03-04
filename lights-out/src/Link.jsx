import React from 'react';

const Link = (props) => {
  const { link } = props;
  return (
    <div>
      <div>
        {link.Name} ({link.Wins})
      </div>
    </div>
  );
};

export default Link;