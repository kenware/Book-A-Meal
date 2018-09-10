import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard, mapStateToProps, mapDispatchToProps } from '../../../../components/dashboard/index';
import { props, emptyProps } from '../../dashboardMockData';

describe('Test index Component of Dashboard pages', () => {
  it('renders correctly', () => {
    global.localStorage = {
      getItem() {
        return 'user';
      }
    };
    const tree = shallow(<Dashboard {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should have one dasboard container class', () => {
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('.admin-container')).toHaveLength(1);
  });

  it('should have two nav tag', () => {
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('nav')).toHaveLength(2);
  });

  it('should have two ul tag', () => {
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('ul')).toHaveLength(2);
  });

  it('should have 10 li tag', () => {
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('li')).toHaveLength(11);
  });

  it('should have one main tag', () => {
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('main')).toHaveLength(1);
  });

  it('should have one header tag', () => {
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('header')).toHaveLength(1);
  });

  it('should have three label', () => {
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('label')).toHaveLength(1);
  });

  it('should have img tag', () => {
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('img')).toHaveLength(1);
  });

  it('should have 3 nested Route components', () => {
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('Route')).toHaveLength(3);
  });

  it('should have 13 divs', () => {
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('div')).toHaveLength(13);
  });


  it('should respond to change event of a click on a sidebar', () => {
    const tree = shallow(<Dashboard {...props} />);
    expect(tree).toMatchSnapshot();
    tree.find('.toggle1').simulate('click');
    expect(tree).toMatchSnapshot();
  });

  it('should upgrade a user to caterer', () => {
    const tree = shallow(<Dashboard {...props} />);
    tree.find('#upgrade').simulate('click');
    expect(tree).toMatchSnapshot();
  });

  it('should logOut ', () => {
    global.localStorage = {
      removeItem() {
      },
      getItem() {
      }
    };
    global.history.pushState = jest.fn();
    const tree = shallow(<Dashboard {...props} />);
    const wrapper = tree.instance();
    wrapper.logOut();
    expect(tree).toMatchSnapshot();
  });

  it('should accept new props from componentWillReceiveProps ', () => {
    const tree = shallow(<Dashboard {...props} />);
    const componentWillReceiveProps = jest.spyOn(Dashboard.prototype, 'componentWillReceiveProps');
    tree.instance().componentWillReceiveProps({
      successMessage: { upgradeSuccess: 'success' },
      errorMessage: { orderError: 'error ordering a meal' }
    });
    expect(tree).toMatchSnapshot();
    tree.instance().componentWillReceiveProps({ successMessage: '', errorMessage: '' });
    expect(tree).toMatchSnapshot();
    expect(componentWillReceiveProps).toHaveBeenCalled();
  });

  it('should toggle sidebar', () => {
    const tree = shallow(<Dashboard {...props} />);
    tree.find('.toggle1').simulate('click');
    expect(tree).toMatchSnapshot();
    tree.find('.bar2').simulate('click');
    expect(tree).toMatchSnapshot();
  });

  it('should popover on mousenter and remove popover onmouseleave events on sidebar dashoard link', () => {
    global.localStorage = {
      getItem() {
        return 'admin';
      }
    };
    const tree = shallow(<Dashboard {...props} />);
    tree.find('.toggle1').simulate('click');
    expect(tree).toMatchSnapshot();
    tree.find('.dashboard-link').simulate('mouseEnter');
    expect(tree).toMatchSnapshot();
    expect(tree.state('dash')).toEqual('');
    tree.find('.dashboard-link').simulate('mouseLeave');
    expect(tree).toMatchSnapshot();
    expect(tree.state('dash')).toEqual('dash');
  });

  it('should popover on mousenter and remove popover on mouseleave events on sidebar order link', () => {
    global.localStorage = {
      getItem() {
        return 'user';
      }
    };
    const tree = shallow(<Dashboard {...props} />);
    // toggle side bar first
    tree.find('.toggle1').simulate('click');
    expect(tree).toMatchSnapshot();
    // mouse focus sidebar all meals link
    tree.find('.order-link').simulate('mouseEnter');
    expect(tree).toMatchSnapshot();
    expect(tree.state('order')).toEqual('');
    // remove mouse on sidebar link
    tree.find('.order-link').simulate('mouseLeave');
    expect(tree).toMatchSnapshot();
    expect(tree.state('order')).toEqual('order');
  });

  it('should popover on mousenter and remove popover on mouseleave events on sidebar notification link', () => {
    global.localStorage = {
      getItem() {
        return 'admin';
      }
    };
    const tree = shallow(<Dashboard {...props} />);
    // toggle side bar first
    tree.find('.toggle1').simulate('click');
    expect(tree).toMatchSnapshot();
    // mouse focus sidebar addmeals link
    tree.find('.notific-link').simulate('mouseEnter');
    expect(tree).toMatchSnapshot();
    expect(tree.state('notific')).toEqual('');
    // remove mouse on sidebar link
    tree.find('.notific-link').simulate('mouseLeave');
    expect(tree).toMatchSnapshot();
    expect(tree.state('notific')).toEqual('notific');
  });

  it('should popover on mousenter and remove popover on mouseleave events on profile link', () => {
    global.localStorage = {
      getItem() {
        return 'admin';
      }
    };
    const tree = shallow(<Dashboard {...props} />);
    // toggle side bar first
    tree.find('.toggle1').simulate('click');
    expect(tree).toMatchSnapshot();
    // mouse focus sidebar profile link
    tree.find('.profile-link').simulate('mouseEnter');
    expect(tree).toMatchSnapshot();
    expect(tree.state('profile')).toEqual('');
    // remove mouse on sidebar link
    tree.find('.profile-link').simulate('mouseLeave');
    expect(tree).toMatchSnapshot();
    expect(tree.state('profile')).toEqual('profile');
  });

  it('should popover on mousenter and remove popover on mouseleave events on logOut link', () => {
    global.localStorage = {
      getItem() {
        return 'admin';
      }
    };
    const tree = shallow(<Dashboard {...props} />);
    // toggle side bar first
    tree.find('.toggle1').simulate('click');
    expect(tree).toMatchSnapshot();
    // mouse focus sidebar logout link
    tree.find('.logout-link').simulate('mouseEnter');
    expect(tree).toMatchSnapshot();
    expect(tree.state('logOut')).toEqual('');
    // remove mouse on logOut link
    tree.find('.logout-link').simulate('mouseLeave');
    expect(tree).toMatchSnapshot();
    expect(tree.state('logOut')).toEqual('logOut');
  });

  it('should respond to mapStateToProps methods', () => {
    const ownProps = { match: { params: { mealId: 1 } } };
    const tree = mapStateToProps(props, ownProps);
    expect(tree).toMatchSnapshot();
  });

  it('should respond to mapDispatchToProps methods', () => {
    const tree = mapDispatchToProps(emptyProps);
    expect(tree).toMatchSnapshot();
  });
});
