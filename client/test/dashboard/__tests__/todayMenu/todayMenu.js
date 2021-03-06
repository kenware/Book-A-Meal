import React from 'react';
import { shallow } from 'enzyme';
import TodayMenu from '../../../../components/dashboard/todayMenu';
import { props } from '../../dashboardMockData';

describe('Test Today menu component of menu', () => {
  it('renders correctly', () => {
    const tree = shallow(<TodayMenu {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
