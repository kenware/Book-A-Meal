import React from 'react';
import { shallow } from 'enzyme';
import IndexNav from '../../../../components/header/index';

describe('Testing of sidebar component', () => {
  it('should render properly', () => {
    const tree = shallow(<IndexNav />);
    expect(tree).toMatchSnapshot();
  });
  it('should render properly with user info in the nav bar', () => {
    window.localStorage = {
      getItem() {
        return 'user';
      }
    };
    const tree = shallow(<IndexNav />);
    expect(tree).toMatchSnapshot();
  });
  it('should render properly with user info in the nav bar', () => {
    window.localStorage = {
      getItem() {
        return 'admin';
      }
    };
    const tree = shallow(<IndexNav />);
    expect(tree).toMatchSnapshot();
  });
  it('should render properly with user info in the nav bar', () => {
    window.localStorage = {
      getItem() {
        return 'user';
      }
    };
    const tree = shallow(<IndexNav />);
    expect(tree).toMatchSnapshot();
  });
  it('should respond to click method', () => {
    const tree = shallow(<IndexNav />);
    const wrapper = tree.instance();
    wrapper.onClick();
    tree.setState({ responsive: 'responsive' });
    wrapper.onClick();
    expect(tree).toMatchSnapshot();
  });
  it('should respond to logout method', () => {
    const tree = shallow(<IndexNav />);
    window.localStorage = {
      removeItem() {
      },
      getItem() {
        return 'user';
      }

    };
    global.history.pushState = jest.fn();
    const wrapper = tree.instance();
    wrapper.logout();
    expect(tree).toMatchSnapshot();
  });
});
