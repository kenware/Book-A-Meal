export const actionMock = {
  notifics: {
    error: { message: 'Unauthorized Access' },
    success: { message: ['Today menu is set'] }
  },
  user: {
    id: 2,
    name: 'kevin',
    username: 'kevin',
    image: 'image_url',
    role: 'user'
  },
  adminUser: {
    id: 2,
    name: 'kevin',
    username: 'kevin',
    image: 'image_url',
    role: 'admin'
  },
  token: { token: '1234gdjjj4jjiu98u' },
  errorMessage: { message: 'error registering user' },
  loginUser: { username: 'ken', password: 'ken@gmail.com' },
  loginerror: { message: 'Wrong details' },
  loginAdmin: { username: 'ken', password: 'ken@gmail.com', role: 'admin' },
  userUpgrade: { setAdmin: { token: 'token', username: 'username' } },
};

export const mealActionMock = {
  meal: {
    name: 'rice',
    price: 300,
    description: 'very delicious',
    image: 'image_url'
  },
  meals: [
    {
      name: 'rice',
      price: 300,
      description: 'very delicious',
      image: 'image_url'
    }
  ],
  response: {
    errorMessage: { message: 'unauthorized' },
    success: { message: 'success' }
  }
};

export const menuActionMock = {
  message: { message: 'unauthorized' },
  menu: {
    message: 'success',
    menu: {
      address: 'reverend street',
      title: 'todays menu',
      orderBefore: 24,
      meals: [1, 2]
    }
  },
  getMenu: {
    address: 'reverend street',
    title: 'todays menu',
    orderBefore: 24,
    meals: [
      {
        name: 'rice',
        price: 300,
        description: 'very delicious',
        image: 'image_url'
      },
      {
        name: 'beans',
        price: 300,
        description: 'very delicious',
        image: 'image_url'
      }
    ]
  }
};

export const orderActionMock = {
  message: { message: 'order failed' },
  orderData: {
    address: 'Reverend street',
    meals: [
      {
        mealId: 1,
        menuId: 2,
        quantity: 3
      }
    ]

  },
  orderResponse: {
    address: 'Reverend street',
    status: 'pending',
    totalPrice: 400,
    meals: [
      {
        name: 'beans',
        price: 400,
        description: 'very delicious',
        image: 'image_url'
      }
    ]
  },
  confirmStatusSuccess: {
    address: 'Reverend street',
    status: 'confirmed',
    totalPrice: 400,
    meals: [
      {
        name: 'beans',
        price: 400,
        description: 'very delicious',
        image: 'image_url'
      }
    ]
  },
  updateError: { message: 'update failed' },
  confirmStatusError: { message: 'confirm status failed' }
};

