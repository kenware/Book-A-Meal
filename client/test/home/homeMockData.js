export const props = {
  loadMostOrderedMeal: jest.fn(),
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
  mealFlip: [
    {
      id: 2,
      Meal: {
        id: 2,
        name: 'rice',
        price: '400',
        description: 'good',
        image: 'image'
      }
    }
  ]
};
export const emptyProps = {
  loadMostOrderedMeal: jest.fn(),
  mostOrder: [
  ],
  mealFlip: [
    {
      id: 2,
      Meal: {
        id: 2,
        name: 'rice',
        price: '400',
        description: 'good',
        image: 'image'
      }
    }
  ]
};

