import React from 'react';
import { shallow } from 'enzyme';
import Testimonial from '../../../../components/home/userTestimonial';

describe('Test user testimonial components', () => {
  it('renders correctly', () => {
    const tree = shallow(<Testimonial />);
    expect(tree).toMatchSnapshot();
  });

  it('should have one testimonial-wrap class as a container', () => {
    const tree = shallow(<Testimonial />);
    expect(tree.find('.testimonial-wrap')).toHaveLength(1);
  });

  it('should have two user-testimonial-menu class container', () => {
    const tree = shallow(<Testimonial />);
    expect(tree.find('.user-testimonial-menu').length).toEqual(2);
  });
  it('should have two img tag', () => {
    const tree = shallow(<Testimonial />);
    expect(tree.find('img').length).toEqual(2);
  });
  it('should have two img container class', () => {
    const tree = shallow(<Testimonial />);
    expect(tree.find('.container').length).toEqual(2);
  });
  it('should have 4 p tag', () => {
    const tree = shallow(<Testimonial />);
    expect(tree.find('p').length).toEqual(4);
  });
  it('should have 9 div', () => {
    const tree = shallow(<Testimonial />);
    expect(tree.find('div').length).toEqual(9);
  });
  it('should have three h', () => {
    const tree = shallow(<Testimonial />);
    expect(tree.find('h2').length).toEqual(2);
  });
  it('it should have two container class', () => {
    const tree = shallow(<Testimonial />);
    expect(tree.find('.container')).toHaveLength(2);
  });
});
