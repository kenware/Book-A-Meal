export const props = {
  mostOrder: [
    {
      id: 1,
      name: 'rice',
      price: '400',
      description: 'good',
      image: 'image',
      orderCount: 4
    }
  ],
  allOrder: {
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
        }],
        user: {
          name: 'kevin',
          image: 'image',
          id: 1
        }
      }
    ]
  },
  meals: {
    rows: [
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
    ]
  },
  errorMessage: {
    createMealError: 'Wrong credentials'
  },
  successMessage: {
    createMealSuccess: 'meal created'
  },
  actions: {
    refreshToken: jest.fn(),
    clearMessages: jest.fn(),
    deleteMeal: jest.fn()
  },
  mealActions: {
    loadMostOrderedMeal: jest.fn(),
    getAllMeals: jest.fn(),
    deleteMeal: jest.fn()
  },
  orderActions: {
    getAllOrders: jest.fn()
  },
  menuActions: {
    getAllOrders: jest.fn(),
    setMenu: jest.fn()
  },
  notific: [],
  handlePageChange: jest.fn(),
  activePage: 1
};

export const emptyProps = {
  mostOrder: [
  ],
  allOrder: {
    orders: [

    ]
  },
  meals: {
    rows: [
    ]
  },
  successMessage: {
    createMealSuccess: ''
  },
  errorMessage: {
    createMealError: ''
  },
  actions: {
    clearMessages: jest.fn()
  },
  mealActions: {
    createMeal: jest.fn(),
    getAllMeals: jest.fn(),
    updateMeal: jest.fn()
  },
  menuActions: {
  },
  handlePageChange: jest.fn(),
  activePage: 1
};
