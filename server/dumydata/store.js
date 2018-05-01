const store = {
 meals:[
  {
    id: 1,
    name: 'Rice and beans',
    price: 500,
    description: 'very delicious'
  },
  {
    id: 2,
    name: 'Abacha and Fish',
    price: 1000,
    description: 'very Sumptious'
  },
  {
    id: 3,
    name: 'Amala and Ewedu',
    price: 500,
    description: 'very delicious'
  }
],
orders:  [
  {
    id: 1,
    userId: 4,
    status: 'pending',
    quantity: 2,
    totalPrice: 1000,
    meal: {
      id: 1,
      name: 'Rice and beans',
      price: 500,
      description: 'very delicious'
    }
  }
 ],
 menus:[
  {
    id: 1,
    title: 'today menu',
    menuDate: '2018-04-23',
    meals: [{
      id: 1,
      name: 'Rice and beans',
      price: 500,
      description: 'very delicious'
    }]    
  }
]


};
export default store;
