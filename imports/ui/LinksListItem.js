import React from 'react';
import PropTypes from 'prop-types';


const LinksListItem = (props) => {
  const url = props.url;
  const shortUrl = props.shortUrl;
  
  return (
    <div>
      <p>Url: {url}</p>
      <p>Short Url: {shortUrl}</p>
    </div>
  );
};

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired
};

export default LinksListItem;
