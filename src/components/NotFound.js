import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div>
        <h1> 404 - Requested Page Not Found! </h1>

        <Link to ="/">Return To Home Page</Link>
    </div>

);

export default NotFound;