import React from 'react';
import { shallow } from 'enzyme';
import ParallaxScrol from '../../../../components/home/parallaxScroll';

describe('Test parallax components', () => {
  it('renders correctly', () => {
    const tree = shallow(<ParallaxScrol />);
    expect(tree).toMatchSnapshot();
  });

  it('should have one parallax container', () => {
    const tree = shallow(<ParallaxScrol />);
    expect(tree.find('.parallex')).toHaveLength(1);
  });

  it('should have three parallax-menu container', () => {
    const tree = shallow(<ParallaxScrol />);
    expect(tree.find('.parallex-menu').length).toEqual(3);
  });

  it('should have three parallex-img container', () => {
    const tree = shallow(<ParallaxScrol />);
    expect(tree.find('.parallex-img').length).toEqual(3);
  });

  it('should have 16 div', () => {
    const tree = shallow(<ParallaxScrol />);
    expect(tree.find('div').length).toEqual(16);
  });

  it('should have three link', () => {
    const tree = shallow(<ParallaxScrol />);
    expect(tree.find('Link').length).toEqual(3);
  });

  it('it should have three container class', () => {
    const tree = shallow(<ParallaxScrol />);
    expect(tree.find('.container')).toHaveLength(3);
  });
});
