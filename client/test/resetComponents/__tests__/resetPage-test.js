import React from 'react';
import { shallow } from 'enzyme';
import { ResetPage, mapStateToProps, mapDispatchToProps } from '../../../components/reset/resetPage';
import { props, emptyProps } from '../resetMockData';

describe('Test ResetLink component', () => {
  it('renders correctly', () => {
    const tree = shallow(<ResetPage {...emptyProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render messages from props', () => {
    const tree = shallow(<ResetPage {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should respond to change event and change the state of the resetLink Component', () => {
    const tree = shallow(<ResetPage {...props} />);
    const wrapper = tree.instance();
    wrapper.newPassword({ preventDefault: jest.fn() });
    tree.find('#password').simulate('change', { target: { name: 'password', value: 'kevin234355' } });
    wrapper.newPassword({ preventDefault: jest.fn() });
    expect(tree).toMatchSnapshot();
  });

  it('should respond to componentWillRecievProps methods', () => {
    const tree = shallow(<ResetPage {...props} />);
    const wrapper = tree.instance();
    wrapper.componentWillReceiveProps();
    wrapper.componentWillReceiveProps({ successMessage: 'Password changed' });
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
