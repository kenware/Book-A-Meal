import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../components/footer/index';

describe('Test Login Component', () => {
  it('renders correctly', () => {
    const tree = shallow(<Footer />);
    expect(tree).toMatchSnapshot();
  });
});
