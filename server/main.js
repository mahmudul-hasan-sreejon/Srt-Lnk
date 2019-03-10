import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import SimpleSchema from 'simpl-schema';

Meteor.startup(() => {
  // validate new user email
  Accounts.validateNewUser(user => {
    // get email address
    const email = user.emails[0].address;

    try {
      // validate email address
      new SimpleSchema({
        email: {
          type: String,
          regEx: SimpleSchema.RegEx.Email,
        }
      }).validate({ email });
    } catch (err) { // if not valid throw an meteor error
      throw new Meteor.Error(400, err.message);
    }

    return true;
  });
});
