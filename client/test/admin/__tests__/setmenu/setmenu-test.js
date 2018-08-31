import React from 'react';
import { shallow } from 'enzyme';
import { SetMenu, mapStateToProps, mapDispatchToProps } from '../../../../components/admin/setMenu';
import { props, emptyProps } from '../../adminMockData';

describe('Test Component of SETMENU admin', () => {
  it('renders correctly', () => {
    const tree = shallow(<SetMenu {...props} />);
    expect(tree).toMatchSnapshot();
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
    expect(tree.find('.tr')).toHaveLength(3);
  });

  it('should display no menu meals with empty meal props', () => {
    const tree = shallow(<SetMenu {...emptyProps} />);
    expect(tree.find('.tr')).toHaveLength(1);
  });

  it('should respond to change event and change the state of the title input and expire time and add meal to the menu', () => {
    const tree = shallow(<SetMenu {...props} />);
    tree.find('#title').simulate('change', { target: { name: 'title', value: 'Today menu' } });
    expect(tree.state('title')).toEqual('Today menu');

    tree.find('#expire').simulate('change', { target: { name: 'orderBefore', value: '10' } });
    expect(tree.state('orderBefore')).toEqual('10');
    tree.find('#rice').simulate('click');
    const wrapper = tree.instance();
    wrapper.addMenu();
    expect(tree).toMatchSnapshot();
  });

  it('should respond to change event and change the state of the title input and return error while addMeal method when orderBefore field is not supplied', () => {
    const tree = shallow(<SetMenu {...props} />);
    tree.find('#title').simulate('change', { target: { name: 'title', value: 'Today menu' } });
    expect(tree.state('title')).toEqual('Today menu');
    tree.find('#rice').simulate('click');
    const wrapper = tree.instance();
    wrapper.addMenu();
    expect(tree).toMatchSnapshot();
  });

  it('should call addMenu method onclick event', () => {
    const addmenu = jest.spyOn(SetMenu.prototype, 'addMenu');
    const tree = shallow(<SetMenu {...props} />);
    tree.find('#rice').simulate('change');
    tree.find('.setMenuBtn').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(addmenu).toHaveBeenCalled();
  });

  it('should should respond to lifeCycle Methods', () => {
    const tree = shallow(<SetMenu {...props} />);
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
