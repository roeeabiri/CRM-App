

import React from 'react';
import '../../styles/components/users array/_user.scss';

const User = ({ id, name, lastName, phone, email, password }) => (
  <div>
    {/* <Link to={"/edit/" + id}>
      {description}
    </Link> */}

    <div className="user">
      <h3>Name: {name} {lastName}.</h3>
      <p><strong>E-mail:</strong> {email} <strong>||</strong> <strong>Password:</strong> {password}</p>
      <p><strong>Phone Number::</strong> {phone}</p>
    </div>
  </div>
);

export default User;
