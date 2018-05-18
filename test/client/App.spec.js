import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import App from '../../app/client/components/App';

describe('Example <App /> test.', () => {

    it('Should render component.', () => {
        const component = shallow(<App/>);
        expect(component.length).to.be.equal(1);
    });
});