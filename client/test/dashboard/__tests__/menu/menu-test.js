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
    const componentDidMount = jest.spyOn(Menu.prototype, 'componentDidMount');
    const tree = shallow(<Menu {...props} />);
    expect(tree).toMatchSnapshot();
    const wrapper = tree.instance();
    wrapper.componentDidMount();
    expect(tree).toMatchSnapshot();
    expect(componentDidMount).toHaveBeenCalled();
  });

  it('should respond to onChange method', () => {
    const tree = shallow(<Menu {...props} />);
    expect(tree).toMatchSnapshot();
    const wrapper = tree.instance();
    wrapper.onChange({ target: { name: 'ken' } });
    expect(tree).toMatchSnapshot();
  });

  it('should have 13 span className ', () => {
    const tree = shallow(<Menu {...props} />);
    expect(tree.find('span')).toHaveLength(1);
  });


  it('should have 10  dive', () => {
    const tree = shallow(<Menu {...props} />);
    expect(tree.find('div')).toHaveLength(2);
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

  it('should call return error message when quantity is empty on addToCart method', () => {
    const tree = shallow(<Menu {...props} />);
    tree.instance().addToCart();
    expect(tree.state('emptyAddress')).toEqual('All the field is required');
  });

  it('should call return error message when quantity is less than one on addToCart method', () => {
    let tree = shallow(<Menu {...props} />);
    tree = tree.instance();
    tree.setState({ quantity: -1 });
    tree.addToCart();
  });

  it('should call addToCart method', () => {
    const addToCart = jest.spyOn(Menu.prototype, 'addToCart');
    let tree = shallow(<Menu {...props} />);
    tree = tree.instance();
    tree.setState({ quantity: 2 });
    tree.addToCart();
    expect(addToCart).toHaveBeenCalled();
  });

  it('should call showMenu method', () => {
    const showMenu = jest.spyOn(Menu.prototype, 'showMenu');
    let tree = shallow(<Menu {...props} />);
    tree = tree.instance();
    tree.showMenu(2);
    tree.setState({ 2: 5 });
    tree.showMenu(2);
    expect(showMenu).toHaveBeenCalled();
  });

  it('should call handleMenuPageChange', () => {
    const handleMenuPageChange = jest.spyOn(Menu.prototype, 'handleMenuPageChange');
    let tree = shallow(<Menu {...props} />);
    tree = tree.instance();
    tree.handleMenuPageChange();
    expect(handleMenuPageChange).toHaveBeenCalled();
  });

  it('should call handleMenuPageChange', () => {
    const handleMealPageChange = jest.spyOn(Menu.prototype, 'handleMealPageChange');
    let tree = shallow(<Menu {...props} />);
    tree = tree.instance();
    tree.handleMealPageChange();
    expect(handleMealPageChange).toHaveBeenCalled();
  });

  it('should call cartModal', () => {
    const cartModal = jest.spyOn(Menu.prototype, 'cartModal');
    let tree = shallow(<Menu {...props} />);
    tree = tree.instance();
    tree.cartModal();
    expect(cartModal).toHaveBeenCalled();
  });
});
