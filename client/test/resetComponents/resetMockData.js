export const props = {
  onModal: jest.fn(),
  match: {
    params: {
      token: '3838bhjw747yb'
    }
  },
  errorMessage: {
    resetError: 'Error sending link'
  },
  successMessage: {
    resetSuccess: 'Link sent to user email'
  },
  actions: {
    changePassword: jest.fn(),
    resetLink: jest.fn()
  },
};

export const emptyProps = {
  onModal: jest.fn(),
  errorMessage: {
    resetError: ''
  },
  successMessage: {
    resetSuccess: ''
  },
  actions: {
    resetLink: jest.fn()
  },
  match: {
    params: {
      token: '3838bhjw747yb'
    }
  },
};
