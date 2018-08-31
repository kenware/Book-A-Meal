import React from 'react';
import { shallow } from 'enzyme';
import { Register, mapDispatchToProps, mapStateToProps } from '../../../components/register/index';
import { props, emptyProps } from '../registerMock';

describe('Test Register Component', () => {
  it('should render correctly', () => {
    const tree = shallow(<Register {...emptyProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should respond to change event of email input and change the state of the register Component', () => {
    const tree = shallow(<Register {...emptyProps} />);
    tree.find('#email').simulate('change', { target: { name: 'email', value: 'kevin@gmail.com' } });
    expect(tree.state('email')).toEqual('kevin@gmail.com');
  });

  it('should register user onsubmit events event', () => {
    const register = jest.spyOn(Register.prototype, 'register');
    const tree = shallow(<Register {...emptyProps} />);
    tree.find('#password').simulate('change', { target: { name: 'password', value: '12345' } });
    tree.find('#vpassword').simulate('change', { target: { name: 'vpassword', value: '12345' } });
    tree.find('#email').simulate('change', { target: { name: 'email', value: 'kevin@gmail.com' } });
    tree.find('#username').simulate('change', { target: { name: 'username', value: 'kevin' } });
    const wrapper = tree.instance();
    wrapper.register({ preventDefault: jest.fn() });
    expect(register).toHaveBeenCalled();
  });

  it('should respond to lifecycle method', () => {
    const componentWillUnmount = jest.spyOn(Register.prototype, 'componentWillUnmount');
    const componentWillReceiveProps = jest.spyOn(Register.prototype, 'componentWillReceiveProps');
    const tree = shallow(<Register {...emptyProps} />);
    const wrapper = tree.instance();
    wrapper.componentWillUnmount();
    wrapper.componentWillReceiveProps({ errorMessage: { registerError: 'error' } });
    expect(componentWillReceiveProps).toHaveBeenCalled();
    expect(componentWillUnmount).toHaveBeenCalled();
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
