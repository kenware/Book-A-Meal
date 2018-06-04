import React from 'react';

import { Home } from '../../../components/home/index';
import renderer from 'react-test-renderer';


describe('Test Home Component', () => {
  const props = {
    loadMostOrderedMeal: jest.fn(),
    mostOrder: [
      {
        Meal: {
          name: 'rice',
          price: '400',
          description: 'good',
          image: 'image'
        }
      }
    ],
    mealFlip: [
      {
        Meal: {
          name: 'rice',
          price: '400',
          description: 'good',
          image: 'image'
        }
      }
    ]
  };
  it('renders correctly', () => {
    const tree = shallow(<Home {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('it should display one meal from mosOrdered meal props', () => {
    const tree = shallow(<Home {...props} />);
    expect(tree.find('.meal-menu-card').length).toEqual(1);
  });
  it('it should display one meal from mealCardFlip props', () => {
    const tree = shallow(<Home {...props} />);
    expect(tree.find('.meal-menu-flip').length).toEqual(1);
  });
  it('it should flip card on mouseEnter event', () => {
    const tree = shallow(<Home {...props} />);
    expect(tree).toMatchSnapshot();
    tree.find('#flip-card').simulate('mouseEnter');
    expect(tree).toMatchSnapshot();
  });
});
