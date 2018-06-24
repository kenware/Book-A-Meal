import React from 'react';
import { mount } from 'enzyme';
import MealGuide from '../../../../components/dashboard/mealGuide';

describe('Test MealGuide component', () => {
  it('renders correctly', () => {
    const tree = mount(<MealGuide />);
    expect(tree).toMatchSnapshot();
  });

  it('should have one Profile container class', () => {
    const tree = mount(<MealGuide />);
    expect(tree.find('.all-meal-step')).toHaveLength(1);
  });

  it('should have 4 meal-day class', () => {
    const tree = mount(<MealGuide />);
    expect(tree.find('.meal-day')).toHaveLength(5);
  });

  it('should have four 8 divs', () => {
    const tree = mount(<MealGuide />);
    expect(tree.find('div')).toHaveLength(13);
  });
  it('should have 1 img className', () => {
    const tree = mount(<MealGuide />);
    expect(tree.find('img')).toHaveLength(1);
  });

  it('should have 4 span tag', () => {
    const tree = mount(<MealGuide />);
    expect(tree.find('span')).toHaveLength(6);
  });

  it('should have 1 h2 tag', () => {
    const tree = mount(<MealGuide />);
    expect(tree.find('h2')).toHaveLength(1);
  });
  it('should have 1 h4 tag', () => {
    const tree = mount(<MealGuide />);
    expect(tree.find('h4')).toHaveLength(1);
  });
});
