import React from 'react';
import moment from 'moment';

export default ({user}) => user ? (
  <div className="panel panel-default" key={user.id}>
    <div className="panel-heading">User: {user.login}</div>
    <div className="panel-body">
      Registration date: {moment(user.registrationDate).toString()}
    </div>
  </div>
) : null;
