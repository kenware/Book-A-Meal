export const props = {
  onModal: jest.fn(),
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
export const emptyProps = {
  onModal: jest.fn(),
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
