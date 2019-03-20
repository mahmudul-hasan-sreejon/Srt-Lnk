import React from 'react';

import PrivateHeader from './PrivateHeader';
import LinksListFilters from './LinksListFilters';
import AddLink from './AddLink';
import LinksList from './LinksList';


const Link = () => {
  return (
    <div>
      <PrivateHeader title="Your Links"/>

      <LinksListFilters />

      <AddLink />

      <LinksList />
    </div>
  );
};

export default Link;
