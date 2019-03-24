import React from 'react';

import PrivateHeader from './PrivateHeader';
import LinksListFilters from './LinksListFilters';
import AddLink from './AddLink';
import LinksList from './LinksList';


const Link = () => {
  return (
    <div>
      <PrivateHeader title="Srt-Lnk"/>

      <div className='page-content'>
        <LinksListFilters />

        <AddLink />

        <LinksList />
      </div>
    </div>
  );
};

export default Link;
