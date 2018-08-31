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

  it('should have 22  dive', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('div')).toHaveLength(22);
  });

  it('should have 1 table ', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('table')).toHaveLength(1);
    expect(tree.find('tr')).toHaveLength(2);
    expect(tree.find('th')).toHaveLength(6);
    expect(tree.find('td')).toHaveLength(6);
  });


  it('should respond to a click event and dislay a modal', () => {
    const tree = shallow(<Orders {...props} />);
    tree.find('.confirm-btn').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(tree.state('statusModal')).toEqual('');
  });

  it('should respond to lifCycle method', () => {
    const componentDidMount = jest.spyOn(Orders.prototype, 'componentDidMount');
    const tree = shallow(<Orders {...props} />);
    const wrapper = tree.instance();
    wrapper.componentDidMount();
    expect(wrapper).toMatchSnapshot();
    expect(componentDidMount).toHaveBeenCalled();
  });

  it('should respond to cancelOrder functions', () => {
    const confirmStatus = jest.spyOn(Orders.prototype, 'confirmStatus');
    const tree = shallow(<Orders {...props} />);
    const wrapper = tree.instance();
    wrapper.confirmStatus();
    expect(wrapper).toMatchSnapshot();
    expect(confirmStatus).toHaveBeenCalled();
  });

  it('should change state when component receive new error props', () => {
    const tree = shallow(<Orders {...emptyProps} />);
    expect(tree).toMatchSnapshot();
    const wrapper = tree.instance();
    wrapper.constructor.getDerivedStateFromProps({ errorMessage: { updateError: 'erro message' }, actions: { clearMessages: jest.fn() } });
    expect(wrapper).toMatchSnapshot();
  });

  it('should change state when component receive new success props', () => {
    const tree = shallow(<Orders {...emptyProps} />);
    expect(tree).toMatchSnapshot();
    const wrapper = tree.instance();
    wrapper.constructor.getDerivedStateFromProps({ successMessage: { updateSuccess: 'success' }, errorMessage: '', actions: { clearMessages: jest.fn() } });
    expect(wrapper).toMatchSnapshot();
  });

  it('should change state when component receive new props', () => {
    const tree = shallow(<Orders {...emptyProps} />);
    const wrapper = tree.instance();
    wrapper.constructor.getDerivedStateFromProps({ errorMessage: '', successMessage: '', actions: { clearMessages: jest.fn() } });
    expect(wrapper).toMatchSnapshot();
  });

  it('should respond to mapStateToProps methods', () => {
    const ownProps = { match: { params: { mealId: 1 } } };
    const tree = mapStateToProps(props, ownProps);
    expect(tree).toMatchSnapshot();
  });

  it('should respond to onChange and oncloseModal method', () => {
    const onChange = jest.spyOn(Orders.prototype, 'onChange');
    const tree = shallow(<Orders {...props} />);
    const wrapper = tree.instance();
    wrapper.onChange({ target: { name: 'ken' } });
    wrapper.onCloseModal();
    expect(onChange).toHaveBeenCalled();
  });

  it('should call class methods', () => {
    const onOpenModal = jest.spyOn(Orders.prototype, 'onOpenModal');
    const modify = jest.spyOn(Orders.prototype, 'modify');
    const handlePageChange = jest.spyOn(Orders.prototype, 'handlePageChange');
    const tree = shallow(<Orders {...props} />);
    const wrapper = tree.instance();
    wrapper.onOpenModal(props.myOrder.orders[0].meals[0], props.myOrder.orders[0]);
    wrapper.modify();
    wrapper.handlePageChange();
    expect(onOpenModal).toHaveBeenCalled();
    expect(modify).toHaveBeenCalled();
    expect(handlePageChange).toHaveBeenCalled();
  });
});
