import React from 'react';
import { Link } from 'react-router-dom';

const StyledLink = props => (
    <Link style={{ textDecoration: 'none' }} {...props} />
);

export default StyledLink;
