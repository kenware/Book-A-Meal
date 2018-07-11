export const props = {
  mostOrder: [
    {
      id: 1,
      Meal: {
        id: 1,
        name: 'rice',
        price: '400',
        description: 'good',
        image: 'image'
      }
    }
  ],
  allOrder: [
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
  notific: []
};

export const emptyProps = {
  mostOrder: [
  ],
  allOrder: [
  ],
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

  }
};
