export const props = {
  menu: [{
    id: 1,
    User: {
      name: 'ken',
      usrername: 'ken',
      email: 'ken@gmail.com'
    },
    Meals: [
      {
        id: 1,
        price: 100,
        desctription: 'good',
        name: 'jollof'
      }
    ]
  }
  ],
  menuMeals: {
    count: 2,
    meals: [{
      id: 1,
      price: 100,
      desctription: 'good',
      name: 'jollof'
    }]
  },
  state: { accordion: { } },
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
  myOrder: [
    {
      id: 1,
      createdAt: '2018-05-4',
      updatedAt: '2018-05-4',
      address: 'Reverend Street',
      status: 'pending',
      quantity: 3,
      Meal: {
        id: 1,
        name: 'rice',
        price: '200',
        descrption: 'Very delicious'
      }
    }
  ],
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
    updateError: 'error on update'
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
  activePage: 1
};

export const emptyProps = {
  menu: [],
  user: {
  },
  notifics: [
    {

    }
  ],
  mostOrder: [
    {
      id: '',
      Meal: {
        id: 1,
        name: '',
        price: '',
        descrption: ''
      }
    }
  ],
  menuMeals: {
    count: 0,
    meals: []
  },
  myOrder: [
    {
      id: 1,
      status: 'confirmed',
      createdAt: '2018-05-4',
      updatedAt: '2018-05-4',
      address: 'Reverend Street',
      quantity: 3,
      Meal: {
        id: 1,
        name: 'rice',
        price: '200',
        descrption: 'Very delicious'
      }
    }
  ],
  meals: [
  ],
  successMessage: {
    createMealSuccess: ''
  },
  errorMessage: {
    createMealError: ''
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
  }
};

