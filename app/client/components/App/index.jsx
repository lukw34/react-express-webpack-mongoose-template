import React from 'react';

import styles from './styles.scss';
import webpack from '../../shared/img/webpack_logo.png';
import react from '../../shared/img/react_logo.png';

const App = () => (
    <div className={styles.title}>
        <div className={styles.titleText}>react-expres-webpack-mongoose-template</div>
        <div className={styles.imageContainer}>
            {
                [react, webpack].map((src, i) => (
                    <img
                        className={styles[`image-${i + 1}`]}
                        key={src}
                        src={src}
                        alt={src}
                    />))
            }
        </div>
    </div>
);

export default App;