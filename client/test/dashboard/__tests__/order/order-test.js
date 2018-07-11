import React from 'react';
import { shallow } from 'enzyme';
import { Orders, mapDispatchToProps, mapStateToProps } from '../../../../components/dashboard/order';
import { props, emptyProps } from '../../dashboardMockData';

describe('Test order component of dashboard', () => {
  it('renders correctly', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should have one dasboard container class', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('.order-container')).toHaveLength(1);
  });

  it('should have two modal with className modal-order ', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('.modal-order')).toHaveLength(2);
  });

  it('should have 4 modal-order-conten', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('.modal-order-content')).toHaveLength(4);
  });

  it('should have justify-overide class', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('.justify-overide')).toHaveLength(4);
  });
  it('should have 12  dive', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('div')).toHaveLength(12);
  });
  it('should have 1 table ', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('table')).toHaveLength(1);
    expect(tree.find('tr')).toHaveLength(2);
    expect(tree.find('th')).toHaveLength(5);
    expect(tree.find('td')).toHaveLength(13);
  });

  it('testing initial state of the components', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.state('modal', 'address', 'quantity', 'orderPrice', 'price', 'modifyError', 'confirmButton'))
      .toEqual('modal', '', '', '', '', '');
  });

  it('should respond to a click event and dislay a modal', () => {
    const tree = shallow(<Orders {...props} />);
    tree.find('.confirm-btn').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(tree.state('statusModal')).toEqual('');
  });
  it('should respond to a mouse hover event and dislay a poppover', () => {
    const tree = shallow(<Orders {...props} />);
    tree.find('.confirm-btn').simulate('mouseEnter');
    expect(tree).toMatchSnapshot();
    expect(tree.state('open')).toEqual(true);
    tree.find('.confirm-btn').simulate('mouseLeave');
    expect(tree).toMatchSnapshot();
    expect(tree.state('open')).toEqual(false);
  });

  it('should respond to a click event and dislay a modal', () => {
    const tree = shallow(<Orders {...props} />);
    tree.find('.modify-btn').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(tree.state('statusModal')).toEqual('modal');
  });

  it('should respond to modify functions', () => {
    const tree = shallow(<Orders {...props} />);
    const wrapper = tree.instance();
    wrapper.modify();
    expect(tree).toMatchSnapshot();
  });
  it('should respond to modify functions', () => {
    const tree = shallow(<Orders {...props} />);
    const wrapper = tree.instance();
    wrapper.componentDidMount();
    expect(wrapper).toMatchSnapshot();
  });
  it('should respond to cancelOrder functions', () => {
    const tree = shallow(<Orders {...props} />);
    const wrapper = tree.instance();
    wrapper.cancelOrder();
    expect(wrapper).toMatchSnapshot();
  });
  it('should respond to cancelOrder functions', () => {
    const tree = shallow(<Orders {...props} />);
    const wrapper = tree.instance();
    wrapper.confirmStatus();
    expect(wrapper).toMatchSnapshot();
  });

  it('should change state when component receive new props', () => {
    const tree = shallow(<Orders {...emptyProps} />);
    expect(tree).toMatchSnapshot();
    const wrapper = tree.instance();
    wrapper.constructor.getDerivedStateFromProps({ errorMessage: { updateError: 'erro message' }, actions: { clearMessages: jest.fn() } });
    expect(wrapper).toMatchSnapshot();
  });
  it('should change state when component receive new props', () => {
    const tree = shallow(<Orders {...emptyProps} />);
    expect(tree).toMatchSnapshot();
    const wrapper = tree.instance();
    wrapper.constructor.getDerivedStateFromProps({ successMessage: { updateSuccess: 'erro message' }, errorMessage: '', actions: { clearMessages: jest.fn() } });
    expect(wrapper).toMatchSnapshot();
  });
  it('should change state when component receive new props', () => {
    const tree = shallow(<Orders {...emptyProps} />);
    const wrapper = tree.instance();
    wrapper.constructor.getDerivedStateFromProps({ errorMessage: '', successMessage: '', actions: { clearMessages: jest.fn() } });
    expect(wrapper).toMatchSnapshot();
  });

  it('should modifyError when quantity is undefined', () => {
    const tree = shallow(<Orders {...emptyProps} />);
    tree.find('.modify-btn').simulate('click');
    // onChange event
    tree.find('#quantity').simulate('change', { target: { name: 'quantity', value: '' } });
    // onclick submit event
    tree.find('.modify').simulate('click');
    expect(tree.state('modifyError')).toEqual('All the field is required');
  });

  it('should modifyError when address is undefined', () => {
    const tree = shallow(<Orders {...emptyProps} />);
    tree.find('.modify-btn').simulate('click');
    // onChange event
    tree.find('#address').simulate('change', { target: { name: 'address', value: '' } });
    // onclick submit event
    tree.find('.modify').simulate('click');
    expect(tree.state('modifyError')).toEqual('All the field is required');
  });
  it('should modify an order', () => {
    const tree = shallow(<Orders {...emptyProps} />);
    tree.find('.modify-btn').simulate('click');
    // onclick submit event
    tree.find('.modify').simulate('click');
    expect(tree).toMatchSnapshot();
  });
  it('should close modify modal', () => {
    const tree = shallow(<Orders {...props} />);
    tree.find('.modify-btn').simulate('click');
    // onclick submit event
    tree.find('.cancel').simulate('click');
    expect(tree).toMatchSnapshot();
  });
  it('should display confirm-order modal', () => {
    const tree = shallow(<Orders {...props} />);
    tree.find('.confirm-btn').simulate('click');
    expect(tree).toMatchSnapshot();
    // onclick submit event
    tree.find('.confirmStatus').simulate('click');
    expect(tree).toMatchSnapshot();
  });
  it('should display close confirm-order modal', () => {
    const tree = shallow(<Orders {...props} />);
    tree.find('.confirm-btn').simulate('click');
    expect(tree).toMatchSnapshot();
    // onclick submit event
    tree.find('.cancel').simulate('click');
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
