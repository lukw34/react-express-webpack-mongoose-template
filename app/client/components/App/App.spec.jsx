import React from 'react';
import {shallow} from 'enzyme';

import App from './index';

describe('Example <App /> test.', () => {
    it(' render component.', () => {
        const component = shallow(<App technologies={['test']}/>);
        expect(component).toMatchSnapshot();
    });
});