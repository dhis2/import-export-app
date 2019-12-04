import React from 'react';
import { Link } from 'react-router-dom';

const UnstyledLink = props => (
    <Link style={{ textDecoration: 'none' }} {...props} />
);

export default UnstyledLink;
