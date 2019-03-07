import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';

import Signup from './../imports/ui/Signup';
import Link from './../imports/ui/Link';


Meteor.startup(() => {
  const app = (
    <div>
      <Signup/>
      <Link/>
    </div>
  );

  ReactDOM.render(app, document.getElementById('app'));
});
