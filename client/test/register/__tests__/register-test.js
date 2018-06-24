import React from 'react';
import { shallow } from 'enzyme';
import { Register, mapDispatchToProps, mapStateToProps } from '../../../components/register/index';

describe('Test Register Component', () => {
  const props = {
    errorMessage: {
      registerError: 'Wrong credentials'
    },
    actions: {
      register: jest.fn(),
      errorMessage: {
        registerError: 'Wrong credentials',
        authError: 'Wrong credentials'
      },
      clearMessages: jest.fn()
    },

  };
  const emptyProps = {
    errorMessage: {
      loginError: ''
    },
    actions: {
      register: jest.fn(),
      errorMessage: {
        registerError: '',
        authError: ''
      },
      clearMessages: jest.fn()
    },

  };
  it('should render correctly', () => {
    const tree = shallow(<Register {...emptyProps} />);
    expect(tree).toMatchSnapshot();
  });
  it('should respond to change eventof email input and change the state of the register Component', () => {
    const tree = shallow(<Register {...emptyProps} />);
    tree.find('#email').simulate('change', { target: { name: 'email', value: 'kevin@gmail.com' } });
    expect(tree.state('email')).toEqual('kevin@gmail.com');
  });
  it('should register user onsubmit events event', () => {
    const tree = shallow(<Register {...emptyProps} />);
    tree.find('#password').simulate('change', { target: { name: 'password', value: '12345' } });
    tree.find('#vpassword').simulate('change', { target: { name: 'vpassword', value: '12345' } });
    tree.find('#email').simulate('change', { target: { name: 'email', value: 'kevin@gmail.com' } });
    tree.find('#username').simulate('change', { target: { name: 'username', value: 'kevin' } });
    const wrapper = tree.instance();
    wrapper.register({ preventDefault: jest.fn() });
  });
  it('should register user onsubmit events event and return error on empty password, email or username', () => {
    const tree = shallow(<Register {...emptyProps} />);
    const wrapper = tree.instance();
    wrapper.register({ preventDefault: jest.fn() });
  });
  it('should respond to lifecycle method', () => {
    const tree = shallow(<Register {...emptyProps} />);
    const wrapper = tree.instance();
    wrapper.componentWillUnmount();
    wrapper.constructor.getDerivedStateFromProps({ errorMessage: { registerError: 'error' } });
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
