import React from 'react';

import { Register } from '../../../components/register/index';

describe('Test Register Component', () => {
  const props = {
    errorMessage: {
      registerError: 'Wrong credentials'
    },
    actions: {
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

  it('it should render all input field', () => {
    const tree = shallow(<Register {...emptyProps} />);
    expect(tree.find('.form-field').length).toEqual(7);
  });

  it('should render without throwing an error', () => {
    expect(shallow(<Register {...emptyProps} />).exists(<form className="register" />)).toBe(true);
  });

  it('should respond to change event and change the state of the Register Component', () => {

    const tree = shallow(<Register {...emptyProps} />);
    tree.find('#username').simulate('change', { target: { name: 'username', value: 'kevin' } });

    expect(tree.state('username')).toEqual('kevin');
  });

  it('should respond to change event of password input and change the state of the register Component', () => {

    const tree = shallow(<Register {...emptyProps} />);
    tree.find('#password').simulate('change', { target: { name: 'password', value: 'cats' } });

    expect(tree.state('password')).toEqual('cats');
  });

  it('should respond to change event of name and change the state of the register Component', () => {

    const tree = shallow(<Register {...emptyProps} />);
    tree.find('#name').simulate('change', { target: { name: 'name', value: 'kevin' } });

    expect(tree.state('name')).toEqual('kevin');
  });

  it('should respond to change eventof email input and change the state of the register Component', () => {

    const tree = shallow(<Register {...emptyProps} />);
    tree.find('#email').simulate('change', { target: { name: 'email', value: 'kevin@gmail.com' } });

    expect(tree.state('email')).toEqual('kevin@gmail.com');
  });

  it('should respond to change event of email input return error in invalid email input', () => {
    const tree = shallow(<Register {...emptyProps} />);
    tree.find('#email').simulate('change', { target: { name: 'email', value: 'kevin@' } });
    expect(tree.state('validEmail')).toEqual('Invalid Email Address');
  });
  it('should respond to change event of confirm password invalid email input', () => {
    const tree = shallow(<Register {...emptyProps} />);
    tree.find('#vpassword').simulate('change', { target: { name: 'vpassword', value: '12345' } });
    expect(tree.state('vpassword')).toEqual('12345');
  });
  it('should return password and confirm password match on change event', () => {
    const tree = shallow(<Register {...emptyProps} />);
    tree.find('#password').simulate('change', { target: { name: 'password', value: '12345' } });
    tree.find('#vpassword').simulate('change', { target: { name: 'vpassword', value: '12345' } });
    expect(tree.state('passwordmatch')).toEqual('Password Match');
  });
  it('should return password and confirm password mismatch on change event', () => {
    const tree = shallow(<Register {...emptyProps} />);
    tree.find('#password').simulate('change', { target: { name: 'password', value: '1234' } });
    tree.find('#vpassword').simulate('change', { target: { name: 'vpassword', value: '12345' } });
    expect(tree.state('passwordmatch')).toEqual('');
    expect(tree.state('passwordmismatch')).toEqual('Password do not Match');
    
});

  it('should recieve error message props with wrong user input', () => {
    let tree = shallow(<Register {...emptyProps} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<Register {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
