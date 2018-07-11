import React from 'react';
import { shallow } from 'enzyme';
import { SetMenu, mapStateToProps, mapDispatchToProps } from '../../../../components/admin/setMenu';
import { props, emptyProps } from '../../adminMockData';

describe('Test Component of SETMENU component', () => {
  it('renders correctly', () => {
    const tree = shallow(<SetMenu {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should have one order-container class', () => {
    const tree = shallow(<SetMenu {...props} />);
    expect(tree.find('.order-container')).toHaveLength(1);
  });

  it('should display one order-wrapper', () => {
    const tree = shallow(<SetMenu {...props} />);
    expect(tree.find('.order-wrapper')).toHaveLength(1);
  });
  it('should have form-fields', () => {
    const tree = shallow(<SetMenu {...props} />);
    expect(tree.find('.form-field')).toHaveLength(2);
  });

  it('should have one table', () => {
    const tree = shallow(<SetMenu {...props} />);
    expect(tree.find('table')).toHaveLength(1);
  });

  it('should have only 3 tr on the table', () => {
    const tree = shallow(<SetMenu {...props} />);
    expect(tree.find('tr')).toHaveLength(3);
  });

  it('should have only 4 td on the table', () => {
    const tree = shallow(<SetMenu {...props} />);
    expect(tree.find('td')).toHaveLength(6);
  });

  it('should have only 4 th on the table', () => {
    const tree = shallow(<SetMenu {...props} />);
    expect(tree.find('th')).toHaveLength(3);
  });

  it('should display two menu meals', () => {
    const tree = shallow(<SetMenu {...props} />);
    expect(tree.find('.tr')).toHaveLength(2);
  });

  it('should display no menu meals with empty meal props', () => {
    const tree = shallow(<SetMenu {...emptyProps} />);
    expect(tree.find('.tr')).toHaveLength(0);
  });

  it('should respond to change event and change the state of the title input and expire time and add meal to the menu', () => {
    const tree = shallow(<SetMenu {...props} />);
    // onChange event
    tree.find('#title').simulate('change', { target: { name: 'title', value: 'Today menu' } });
    expect(tree.state('title')).toEqual('Today menu');
    // onChange event
    tree.find('#expire').simulate('change', { target: { name: 'orderBefore', value: '10' } });
    expect(tree.state('orderBefore')).toEqual('10');
    tree.find('#rice').simulate('click');
    const wrapper = tree.instance();
    wrapper.addMenu();
    expect(tree).toMatchSnapshot();
  });
  it('should respond to change event and change the state of the title input and return error while addMeal method when orderBefore field is not supplied', () => {
    const tree = shallow(<SetMenu {...props} />);
    // onChange event
    tree.find('#title').simulate('change', { target: { name: 'title', value: 'Today menu' } });
    expect(tree.state('title')).toEqual('Today menu');
    tree.find('#rice').simulate('click');
    const wrapper = tree.instance();
    wrapper.addMenu();
    expect(tree).toMatchSnapshot();
  });

  it('should respond to a click event by dispalying a modal when caterer want to set menu by selecting a meal', () => {
    const tree = shallow(<SetMenu {...props} />);
    // onClick event
    tree.find('#rice').simulate('click');
    expect(tree).toMatchSnapshot();
  });

  it('should call addMenu method onclick event', () => {
    const addmenu = jest.spyOn(SetMenu.prototype, 'addMenu');
    const tree = shallow(<SetMenu {...props} />);
    // onClick event
    tree.find('#rice').simulate('click');
    tree.find('#addMenu').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(addmenu).toHaveBeenCalled();
  });

  it('should cancel addMenu modal cancelAdd method onclick event', () => {
    const removeMenu = jest.spyOn(SetMenu.prototype, 'cancelAdd');
    const tree = shallow(<SetMenu {...props} />);
    // onClick event
    tree.find('#rice').simulate('click');
    tree.find('#removeMenu').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(removeMenu).toHaveBeenCalled();
  });
  it('should should respond to cancelAdd method that close modal', () => {
    const tree = shallow(<SetMenu {...props} />);
    // onClick event
    const wrapper = tree.instance();
    wrapper.cancelAdd();
    expect(tree).toMatchSnapshot();
  });
  it('should should respond to lifeCycle Methods', () => {
    const tree = shallow(<SetMenu {...props} />);
    // onClick event
    tree.instance().constructor.getDerivedStateFromProps({ errorMessage: { setMenuError: '' }, successMessage: { setMenuSuccess: '' }, actions: { clearMessages: jest.fn() } });
    expect(tree).toMatchSnapshot();
    tree.instance().constructor.getDerivedStateFromProps({ errorMessage: { setMenuError: 'error' }, successMessage: { setMenuSuccess: 'success' }, actions: { clearMessages: jest.fn() } });
    expect(tree).toMatchSnapshot();
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
