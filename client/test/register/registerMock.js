export const props = {
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
export const emptyProps = {
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
