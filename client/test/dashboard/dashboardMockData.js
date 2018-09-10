export const props = {
  cart: {
    cart: []
  },
  mostOrder: [
    {
      name: 'rice',
      price: 300,
      description: 'very good'
    }
  ],
  upGrade: jest.fn(),
  cartModal: jest.fn(),
  menu: {
    count: 4,
    rows: [{
      id: 1,
      user: {
        name: 'ken',
        usrername: 'ken',
        email: 'ken@gmail.com'
      },
      meals: [
        {
          id: 1,
          price: 100,
          desctription: 'good',
          name: 'jollof'
        }
      ]
    }]
  },
  menuMeals: {
    count: 2,
    meals: {
      id: 1,
      price: 100,
      desctription: 'good',
      name: 'jollof'
    }
  },
  showMenu: jest.fn(),
  confirmOrder: jest.fn(),
  user: {
    username: 'ken',
    id: 1,
    email: 'ken@gmaoil.com',
    name: 'kenny',
    image: 'image_url'

  },
  notifics: [
    {
      id: 1,
      message: 'here i come',
      createdAt: '2018-06-10',
      updatedAt: '2018-06-10'
    }
  ],
  myOrder: {
    orders: [
      {
        id: 1,
        createdAt: '2018-05-4',
        updatedAt: '2018-05-4',
        address: 'Reverend Street',
        status: 'pending',
        quantity: 3,
        meals: [{
          id: 1,
          name: 'rice',
          price: '200',
          descrption: 'Very delicious',
          orderMealItems: {
            quantity: 3,
            totalPrice: 4
          }

        }],
      }
    ]
  },
  meals: [
    {
      id: 1,
      name: 'rice',
      price: '200',
      descrption: 'Very delicious'
    },
    {
      id: 2,
      name: 'beans',
      price: '200',
      descrption: 'Very delicious'
    }
  ],
  errorMessage: {
    createMealError: 'Wrong credentials',
    updateError: 'error on update',
    orderError: 'error ordering meals'
  },
  successMessage: {
    upgradeSuccess: ' good',
    createMealSuccess: 'meal created',
    updateProfileSuccess: 'updated'
  },
  actions: {
    upgrade: jest.fn(),
    getNotifications: jest.fn(),
    refreshToken: jest.fn(),
    clearMessages: jest.fn(),
    getUser: jest.fn(),
    updateProfile: jest.fn()
  },
  mealActions: {
    loadMostOrderedMeal: jest.fn(),
    getAllMeals: jest.fn()
  },
  orderActions: {
    getMyOrder: jest.fn(),
    confirmStatus: jest.fn(),
    updateOrder: jest.fn(),
    orderMeal: jest.fn()
  },
  menuActions: {
    getAllOrders: jest.fn(),
    getMenu: jest.fn()
  },
  handleMealPageChange: jest.fn(),
  activePage: 1,
  carts: [{
    id: 1,
    name: 'rice',
    quantity: 3
  }],
  state: {
    cart: {
      id: 2,
      mealName: 'rice'
    },
    accordion: { },
    orderError: 'error occure',
    errorMessage: 'error occure',
    address: 'Reveend street'
  },
  onChange: jest.fn(),
  removeFromeCart: jest.fn(),
  addToCart: jest.fn(),
  modify: jest.fn()
};

export const emptyProps = {
  cart: {
    cart: jest.fn()
  },
  menu: {
    count: 3,
    rows: []
  },
  user: {
  },
  notifics: [
    {

    }
  ],
  mostOrder: [
    {

      id: 1,
      name: '',
      price: '',
      descrption: ''
    }
  ],
  menuMeals: {
    count: 0,
    meals: []
  },
  myOrder: {
    orders: [
      {
        id: 1,
        status: 'confirmed',
        createdAt: '2018-05-4',
        updatedAt: '2018-05-4',
        address: 'Reverend Street',
        quantity: 3,
        meals: [{
          id: 1,
          name: 'rice',
          price: '200',
          descrption: 'Very delicious',
          orderMealItems: {
            quantity: 3,
            totalPrice: 4
          }
        }]
      }
    ]
  },
  meals: [
  ],
  successMessage: {
    createMealSuccess: ''
  },
  errorMessage: {
    createMealError: '',
    orderError: ''
  },
  actions: {
    clearMessages: jest.fn(),
    getUser: jest.fn()
  },
  orderActions: {
    getMyOrder: jest.fn(),
    orderMeal: jest.fn(),
    updateOrder: jest.fn()
  },
  mealActions: {
    createMeal: jest.fn(),
    getAllMeals: jest.fn()
  },
  menuActions: {
    getMenu: jest.fn()
  },
  handleMealPageChange: jest.fn(),
  activePage: 1,
  carts: [],
  state: {
    cart: {
      mealName: ''
    },
    orderError: '',
    errorMessage: '',
    address: ''
  },
  onChange: jest.fn(),
  removeFromeCart: jest.fn(),
  addToCart: jest.fn(),
  modify: jest.fn()
};

