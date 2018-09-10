import React from 'react';
import { shallow } from 'enzyme';
import IndexNav from '../../../../components/header/index';

describe('Testing of sidebar component', () => {
  it('should render properly', () => {
    const tree = shallow(<IndexNav onModal={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render properly with user role', () => {
    window.localStorage = {
      getItem() {
        return 'user';
      }
    };
    const tree = shallow(<IndexNav onModal={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render properly with admin role', () => {
    window.localStorage = {
      getItem() {
        return 'admin';
      }
    };
    const tree = shallow(<IndexNav onModal={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });

  it('should respond to click method', () => {
    const onClick = jest.spyOn(IndexNav.prototype, 'onClick');
    const tree = shallow(<IndexNav onModal={jest.fn()} />);
    const wrapper = tree.instance();
    wrapper.onClick();
    tree.setState({ responsive: 'responsive' });
    wrapper.onClick();
    expect(tree).toMatchSnapshot();
    expect(onClick).toHaveBeenCalled();
  });

  it('should respond to logout method', () => {
    const tree = shallow(<IndexNav onModal={jest.fn()} />);
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
