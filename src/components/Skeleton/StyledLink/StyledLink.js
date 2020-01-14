import React from 'react';
import { Link } from 'react-router-dom';

import s from './StyledLink.module.css';

const StyledLink = props => <Link className={s.link} {...props} />;

export { StyledLink };
