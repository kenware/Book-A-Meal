import React from 'react';
import { shallow } from 'enzyme';
import { Menu, mapStateToProps, mapDispatchToProps } from '../../../../components/dashboard/menu';
import { props, emptyProps } from '../../dashboardMockData';

describe('Test menu component of dashboard', () => {
  it('renders correctly', () => {
    let tree = shallow(<Menu {...props} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<Menu {...emptyProps} />);
    expect(tree).toMatchSnapshot();
  });
  it('should have three modal-order-content class', () => {
    const tree = shallow(<Menu {...props} />);
    expect(tree.find('.modal-order-content')).toHaveLength(3);
  });
  it('should respond to confirmOrder method', () => {
    const tree = shallow(<Menu {...props} />);
    const wrapper = tree.instance();
    wrapper.confirmOrder('mealId', 'menuId', 'mealName', 'image', 'price', 'mealDescription');
    expect(tree).toMatchSnapshot();
  });
  it('should clear redux store on unmount method', () => {
    const tree = shallow(<Menu {...props} />);
    const wrapper = tree.instance();
    wrapper.componentWillUnmount();
    expect(tree).toMatchSnapshot();
  });
  it('should respond to canceOrder method', () => {
    const tree = shallow(<Menu {...props} />);
    expect(tree).toMatchSnapshot();
    const wrapper = tree.instance();
    wrapper.cancelOrder();
    expect(tree).toMatchSnapshot();
  });
  it('should respond lifeCyle method component did mount', () => {
    const tree = shallow(<Menu {...props} />);
    expect(tree).toMatchSnapshot();
    const wrapper = tree.instance();
    wrapper.componentDidMount();
    expect(tree).toMatchSnapshot();
  });
  it('should respond to onChange method', () => {
    const tree = shallow(<Menu {...props} />);
    expect(tree).toMatchSnapshot();
    const wrapper = tree.instance();
    wrapper.onChange({ target: { name: 'ken' } });
    expect(tree).toMatchSnapshot();
  });
  it('should respond to orderMeal method', () => {
    const tree = shallow(<Menu {...props} />);
    expect(tree).toMatchSnapshot();
    const wrapper = tree.instance();
    wrapper.orderMeal();
    expect(tree).toMatchSnapshot();
  });
  it('should have two modal with className modal-order ', () => {
    const tree = shallow(<Menu {...props} />);
    expect(tree.find('.modal-order')).toHaveLength(1);
  });
  it('should have 13 span className ', () => {
    const tree = shallow(<Menu {...props} />);
    expect(tree.find('span')).toHaveLength(13);
  });
  it('should have justify-overide class', () => {
    const tree = shallow(<Menu {...props} />);
    expect(tree.find('.justify-overide')).toHaveLength(4);
  });
  it('should have 12  dive', () => {
    const tree = shallow(<Menu {...props} />);
    expect(tree.find('div')).toHaveLength(13);
  });

  it('testing initial state of the components', () => {
    const tree = shallow(<Menu {...props} />);
    expect(tree.state('modal', 'address', 'quantity', 'name', 'price', 'menuId', 'mealId'))
      .toEqual('modal', '', '', '', '', '');
  });

  it('should respond to a click event of order button and dislay a modal and show Address is required on empty address field on submit', () => {
    const tree = shallow(<Menu {...props} />);
    const wrapper = tree.instance();
    wrapper.confirmOrder('mealId', 'menuId', 'mealName', 'image', 'price', 'mealDescription');
    expect(tree.state('modal')).toEqual('');
    tree.find('.order-meal').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(tree.state('addressError')).toEqual('Your address is required');
  });

  it('should respond to a click event order button and dislay a modal and show Quantity is required on empty Quantity field on submit', () => {
    const tree = shallow(<Menu {...props} />);
    const wrapper = tree.instance();
    wrapper.confirmOrder('mealId', 'menuId', 'mealName', 'image', 'price', 'mealDescription');
    expect(tree.state('modal')).toEqual('');
    tree.find('#address').simulate('change', { target: { name: 'address', value: 'my address' } });
    tree.find('.order-meal').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(tree.state('addressError')).toEqual('');
    expect(tree.state('quantityError')).toEqual('Quantity is required');
  });

  it('should respond to a click event and dislay a modal and order a meal', () => {
    const tree = shallow(<Menu {...emptyProps} />);
    const wrapper = tree.instance();
    wrapper.confirmOrder('mealId', 'menuId', 'mealName', 'image', 'price', 'mealDescription');
    tree.find('#address').simulate('change', { target: { name: 'address', value: 'my address' } });
    tree.find('#quantity').simulate('change', { target: { name: 'quantity', value: '300' } });
    tree.find('.order-meal').simulate('click');
    wrapper.constructor.getDerivedStateFromProps({ errorMessage: 'invalid meal name', successMessage: '' });
    expect(tree).toMatchSnapshot();
    wrapper.constructor.getDerivedStateFromProps({ errorMessage: '', successMessage: '' });
  });
  it('should respond to a click event and dislay a modal and close modal on cancel order method', () => {
    const tree = shallow(<Menu {...emptyProps} />);
    const wrapper = tree.instance();
    wrapper.confirmOrder('mealId', 'menuId', 'mealName', 'image', 'price', 'mealDescription');
    expect(tree).toMatchSnapshot();
    tree.find('.close-modal').simulate('click');
    expect(tree).toMatchSnapshot();
  });
  it('should respond to a click event and dislay a modal and close modal on cancel order method', () => {
    const tree = shallow(<Menu {...emptyProps} />);
    const wrapper = tree.instance();
    wrapper.confirmOrder('mealId', 'menuId', 'mealName', 'image', 'price', 'mealDescription');
    expect(tree).toMatchSnapshot();
    tree.find('.top-close').simulate('click');
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
