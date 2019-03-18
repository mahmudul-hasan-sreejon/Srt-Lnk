import React from 'react';

import PrivateHeader from './PrivateHeader';
import LinksList from './LinksList';
import AddLink from './AddLink';


const Link = () => {
  return (
    <div>
      <PrivateHeader title="Your Links"/>

      <LinksList />

      <AddLink />
    </div>
  );
};

export default Link;
