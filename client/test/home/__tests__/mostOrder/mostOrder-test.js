import React from 'react';
import { shallow } from 'enzyme';
import MostOrder from '../../../../components/home/mostOrder';
import { props, emptyProps } from '../../homeMockData';

describe('Test mostOder components', () => {
  it('renders correctly', () => {
    const tree = shallow(<MostOrder {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should have one meal-menu-row', () => {
    const tree = shallow(<MostOrder {...props} />);
    expect(tree.find('.meal-menu')).toHaveLength(1);
  });

  it('should have one meal-menu', () => {
    const tree = shallow(<MostOrder {...props} />);
    expect(tree.find('.meal-menu').length).toEqual(1);
  });

  it('should have no meal-menu with empty props', () => {
    const tree = shallow(<MostOrder {...emptyProps} />);
    expect(tree.find('.meal-menu').length).toEqual(0);
  });

  it('should have none div', () => {
    const tree = shallow(<MostOrder {...props} />);
    expect(tree.find('div').length).toEqual(6);
  });

  it('should have none link', () => {
    const tree = shallow(<MostOrder {...props} />);
    expect(tree.find('Link').length).toEqual(1);
  });

  it('it should flip card on mouseEnter event', () => {
    let tree = shallow(<MostOrder {...props} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<MostOrder {...emptyProps} />);
    expect(tree).toMatchSnapshot();
  });
});
