import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import webpack from '../../shared/img/webpack_logo.png';
import react from '../../shared/img/react_logo.png';
import express from '../../shared/img/express_logo.png';
import js from '../../shared/img/js_logo.png';
import mongodb from '../../shared/img/mongodb_logo.png';
import node from '../../shared/img/node_logo.png';
import sass from '../../shared/img/sass_logo.png';
import travis from '../../shared/img/travis_logo.png';
import docker from '../../shared/img/docker_logo.png';

const images = {
    webpack,
    react,
    travis,
    docker,
    express,
    js,
    mongodb,
    node,
    sass
};

const Technology = ({name}) => (
    <div className={`${styles.Technology} ${styles[name]}`}>
        {images[name] && <img alt={name} src={images[name]} />}
    </div>
);
Technology.propTypes = {
    name: PropTypes.string.isRequired
};

export default Technology;