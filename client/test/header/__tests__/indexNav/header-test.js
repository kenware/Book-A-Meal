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
<<<<<<< HEAD
    expect(tree).toMatchSnapshot();
  });

  it('should render properly with user info in the nav bar', () => {
    window.localStorage = {
      getItem() {
        return 'user';
      }
    };
    const tree = shallow(<IndexNav onModal={jest.fn()} />);
=======
>>>>>>> bg(fix): Fixed my test and modified my controller
    expect(tree).toMatchSnapshot();
  });

  it('should respond to click method', () => {
<<<<<<< HEAD
=======
    const onClick = jest.spyOn(IndexNav.prototype, 'onClick');
>>>>>>> bg(fix): Fixed my test and modified my controller
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
