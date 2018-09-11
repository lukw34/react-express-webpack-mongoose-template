import React from 'react';
import PropTypes from 'prop-types';

import Technology from '../Technology';

import styles from './styles.scss';

const App = ({technologies = []}) => (
    <div className={styles.App}>
        {
            technologies.map(technology => <Technology key={technology} name={technology} />)
        }
    </div>
);

App.propTypes = {
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;