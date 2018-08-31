import React from 'react';
import { shallow } from 'enzyme';
import TodayMenu from '../../../../components/dashboard/todayMenu';
import { props, emptyProps } from '../../dashboardMockData';

describe('Test Today menu component of menu', () => {
  it('renders correctly', () => {
    const tree = shallow(<TodayMenu {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('It should call toggle accordion function', () => {
    const tree = shallow(<TodayMenu {...props} />);
    tree.find('.menuAccordion').simulate('click');
    tree.find('.order1').simulate('click');
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with empty props', () => {
    const tree = shallow(<TodayMenu {...emptyProps} />);
    // tree.instance().setState({ 1: 1 });
    expect(tree).toMatchSnapshot();
  });
});
