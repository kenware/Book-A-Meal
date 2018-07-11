import React from 'react';
import { shallow } from 'enzyme';
import Header1 from '../../../../components/header/header2';

describe('Testing of sidebar component', () => {
  it('should render properly', () => {
    const tree = shallow(<Header1 />);
    expect(tree).toMatchSnapshot();
  });

  it('should respond to click method', () => {
    const tree = shallow(<Header1 />);
    const wrapper = tree.instance();
    wrapper.onClick();
    tree.setState({ responsive: 'responsive' });
    wrapper.onClick();
    expect(tree).toMatchSnapshot();
  });

  it('should respond to logout method', () => {
    const tree = shallow(<Header1 />);
    global.history.pushState = jest.fn();
    const wrapper = tree.instance();
    wrapper.logout();
    expect(tree).toMatchSnapshot();
  });
});
