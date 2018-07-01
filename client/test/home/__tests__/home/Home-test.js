import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../../../components/home/index';
import { props } from '../../homeMockData';

describe('Test Home Component', () => {
  it('renders correctly', () => {
    const tree = shallow(<Home {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('count the number of meal-day class rendered', () => {
    const tree = shallow(<Home {...props} />);
    expect(tree.find('.meal-day').length).toEqual(5);
  });
  it('should have two site container', () => {
    const tree = shallow(<Home {...props} />);
    expect(tree.find('.site-container').length).toEqual(2);
  });
  it('should have one carousel header', () => {
    const tree = shallow(<Home {...props} />);
    expect(tree.find('.carousel-header').length).toEqual(1);
  });
  it('should have caption header to be equal ', () => {
    const tree = shallow(<Home {...props} />);
    expect(tree.find('.caption').length).toEqual(1);
  });
  it('should have one user testimonial container', () => {
    const tree = shallow(<Home {...props} />);
    expect(tree.find('.user-testimonial').length).toEqual(1);
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
