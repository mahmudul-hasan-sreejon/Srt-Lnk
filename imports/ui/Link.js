import React from 'react';

import PrivateHeader from './PrivateHeader';
import LinksList from './LinksList';
import AddLink from './AddLink';


export default class Link extends React.Component {
  render() {
    return (
      <div>
        <PrivateHeader title="Yours Links"/>

        <LinksList />

        <AddLink />
      </div>
    );
  }
}
