import React from 'react';
import { shallow } from 'enzyme';
import Header2 from '../../../../components/header/header3';

describe('Testing of sidebar component', () => {
  it('should render properly', () => {
    const tree = shallow(<Header2 />);
    expect(tree).toMatchSnapshot();
  });

  it('should render properly', () => {
    const tree = shallow(<Header2 />).setState({ role: 'admin' });
    expect(tree).toMatchSnapshot();
  });

  it('should respond to click method', () => {
    const tree = shallow(<Header2 />);
    const wrapper = tree.instance();
    wrapper.onClick();
    tree.setState({ responsive: 'responsive' });
    wrapper.onClick();
    expect(tree).toMatchSnapshot();
  });

  it('should respond to logout method', () => {
    const tree = shallow(<Header2 />);
    global.history.pushState = jest.fn();
    const wrapper = tree.instance();
    wrapper.logout();
    expect(tree).toMatchSnapshot();
  });
});
