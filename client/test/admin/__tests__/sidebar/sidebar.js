import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '../../../../components/admin/sidebar';

const props = {
  handleClick: jest.fn(),
  handleClose: jest.fn(),
  toggle: jest.fn(),
  logOut: jest.fn(),
  setmeal: 'setmaeal',
  nav1: 'nav1',
  nav2: 'nav2',
  dash: 'dash',
  cPassword: '12345',
  profile: 'profile',
  notific: '',
  logout: 'logout',
  order: 'order',
};
describe('Testing of sidebar component', () => {
  it('should render properly', () => {
    const tree = shallow(<Sidebar {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should respond to dashbord mouseenter events', () => {
    const tree = shallow(<Sidebar {...props} />);
    // toggle side bar first
    tree.find('.toggle1').simulate('click');
    tree.find('.logOut').simulate('click');
    expect(tree).toMatchSnapshot();
    // mouse focus sidebar all meals link
    tree.find('.dashboard-link').simulate('mouseEnter');
    expect(tree).toMatchSnapshot();
    // remove mouse on sidebar link
    tree.find('.dashboard-link').simulate('mouseLeave');
    expect(tree).toMatchSnapshot();
  });

  it('should respond to handleClick and handleClose events on allmeals mouseEnter', () => {
    const tree = shallow(<Sidebar {...props} />);
    // toggle side bar
    tree.find('.bar2').simulate('click');
    expect(tree).toMatchSnapshot();
    // mouse focus sidebar all meals link
    tree.find('.allMeal-link').simulate('mouseEnter');
    expect(tree).toMatchSnapshot();
    // remove mouse on sidebar link
    tree.find('.allMeal-link').simulate('mouseLeave');
    expect(tree).toMatchSnapshot();
  });

  it('should respond to handleClick and handleClose events of setmeal mouseEnter', () => {
    const tree = shallow(<Sidebar {...props} />);
    // mouse focus sidebar all meals link
    tree.find('.setmeal-link').simulate('mouseEnter');
    expect(tree).toMatchSnapshot();
    // remove mouse on sidebar link
    tree.find('.setmeal-link').simulate('mouseLeave');
    expect(tree).toMatchSnapshot();
  });

  it('should respond to handleClick and handleClose events of addMeal mouseEnter', () => {
    const tree = shallow(<Sidebar {...props} />);
    // mouse focus sidebar all meals link
    tree.find('.addmeal-link').simulate('mouseEnter');
    expect(tree).toMatchSnapshot();
    // remove mouse on sidebar link
    tree.find('.addmeal-link').simulate('mouseLeave');
    expect(tree).toMatchSnapshot();
  });

  it('should respond to handleClick and handleClose events of notification,', () => {
    const tree = shallow(<Sidebar {...props} />);
    // mouse focus sidebar all meals link
    tree.find('.profile-link').simulate('mouseEnter');
    expect(tree).toMatchSnapshot();
    // remove mouse on sidebar link
    tree.find('.profile-link').simulate('mouseLeave');
    expect(tree).toMatchSnapshot();
  });

  it('should respond to handleClick and handleClose of Change Password events,', () => {
    const tree = shallow(<Sidebar {...props} />);
    // mouse focus sidebar all meals link
    tree.find('.cpassword-link').simulate('mouseEnter');
    // remove mouse on sidebar link
    tree.find('.cpassword-link').simulate('mouseLeave');
    expect(tree).toMatchSnapshot();
  });

  it('should respond to handleClick and handleClose of logout,', () => {
    const tree = shallow(<Sidebar {...props} />);
    // mouse focus sidebar all meals link
    tree.find('.logout-link').simulate('mouseEnter');
    tree.find('.logout-link').simulate('click');
    // remove mouse on sidebar link
    tree.find('.logout-link').simulate('mouseLeave');
    expect(tree).toMatchSnapshot();
  });
});
