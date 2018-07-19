import React from 'react';
import { shallow } from 'enzyme';
import { ResetLink, mapStateToProps, mapDispatchToProps } from '../../../components/reset/resetLink';
import { props, emptyProps } from '../resetMockData';

describe('Test ResetLink component', () => {
  it('renders correctly', () => {
    const tree = shallow(<ResetLink {...emptyProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render messages from props', () => {
    const tree = shallow(<ResetLink {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should respond to change event and change the state of the resetLink Component', () => {
    const tree = shallow(<ResetLink {...props} />);
    const wrapper = tree.instance();
    wrapper.resetLink({ preventDefault: jest.fn() });
    tree.find('#username').simulate('change', { target: { name: 'emailOrUsername', value: 'kevin' } });
    wrapper.resetLink({ preventDefault: jest.fn() });
    expect(tree).toMatchSnapshot();
  });

  it('should respond to componentWillRecievProps methods', () => {
    const tree = shallow(<ResetLink {...props} />);
    const wrapper = tree.instance();
    wrapper.componentWillReceiveProps();
    wrapper.componentWillReceiveProps({ name: 'kevin' });
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
