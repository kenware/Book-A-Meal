import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapDispatchToProps, mapStateToProps } from '../../../components/login/index';

describe('Test Login Component', () => {
  const props = {
    errorMessage: {
      loginError: 'Wrong credentials'
    },
    actions: {
      login: jest.fn(),
      errorMessage: {
        loginError: 'Wrong credentials',
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
      login: jest.fn(),
      errorMessage: {
        loginError: '',
        authError: ''
      },
      clearMessages: jest.fn()
    },

  };
  it('renders correctly', () => {
    const tree = shallow(<Login {...emptyProps} />);
    expect(tree).toMatchSnapshot();
  });
  it('should have one login container class', () => {
    const tree = shallow(<Login {...props} />);
    expect(tree.find('.register-container')).toHaveLength(1);
  });
  it('should have one login container class', () => {
    const tree = shallow(<Login {...props} />);
    const wrapper = tree.instance();
    wrapper.componentWillUnmount();
  });
  it('should respond to change event and change the state of the Login Component', () => {
    const tree = shallow(<Login {...props} />);
    const wrapper = tree.instance();
    wrapper.login({ preventDefault: jest.fn() });
    tree.find('#username').simulate('change', { target: { name: 'username', value: 'kevin' } });
    wrapper.login({ preventDefault: jest.fn() });
    tree.find('#password').simulate('change', { target: { name: 'password', value: 'cats' } });
    wrapper.login({ preventDefault: jest.fn() });
    expect(tree).toMatchSnapshot();
  });
  it('should recieve error message props with wrong credentials', () => {
    let tree = shallow(<Login {...emptyProps} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<Login {...props} />);
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
