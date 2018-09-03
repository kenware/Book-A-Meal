import React from 'react';
import { shallow } from 'enzyme';
import Orders from '../../../../components/admin/order';
import { props, emptyProps } from '../../adminMockData';


describe('Test Admin Order component', () => {
  it('renders correctly', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should have one order-container class', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('.order-container')).toHaveLength(1);
  });

  it('should display one order-wrapper', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('.order-wrapper')).toHaveLength(2);
  });

  it('should have only one table', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('table')).toHaveLength(1);
  });

  it('should have only two tr on the table', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('tr')).toHaveLength(2);
  });

  it('should have only 5 td on the table', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('td')).toHaveLength(5);
  });

  it('should have only 5 th on the table', () => {
    const tree = shallow(<Orders {...props} />);
    expect(tree.find('th')).toHaveLength(5);
  });

  it('should display no meals with empty meal props', () => {
    const tree = shallow(<Orders {...emptyProps} />);
    expect(tree.find('.order-contents')).toHaveLength(0);
  });
});
