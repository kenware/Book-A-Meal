import React from 'react';

import { Login } from '../../../components/login/index';
import renderer from 'react-test-renderer';


describe('Test Login Component', () => {
  const props = {
    errorMessage: {
      loginError: 'Wrong credentials'
    },
    actions: {
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

  it('it should render all input fieldd', () => {
    const tree = shallow(<Login {...emptyProps} />);
    expect(tree.find('.form-field').length).toEqual(4);
  });
  it('should render without throwing an error', () => {
    expect(shallow(<Login {...emptyProps} />).exists(<form className="login" />)).toBe(true);
  });

  it('should respond to change event and change the state of the Login Component', () => {

    const tree = shallow(<Login {...emptyProps} />);
    tree.find('#username').simulate('change', { target: { name: 'username', value: 'kevin' } });

    expect(tree.state('username')).toEqual('kevin');
  });

  it('should respond to change event and change the state of the Login Component', () => {

    const tree = shallow(<Login {...emptyProps} />);
    tree.find('#password').simulate('change', { target: { name: 'password', value: 'cats' } });

    expect(tree.state('password')).toEqual('cats');
  });

  it('should recieve error message props with wrong credentials', () => {
    let tree = shallow(<Login {...emptyProps} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<Login {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
