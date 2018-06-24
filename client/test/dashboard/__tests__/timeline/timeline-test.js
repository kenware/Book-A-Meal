import React from 'react';
import { shallow } from 'enzyme';
import Timeline from '../../../../components/dashboard/timeline';
import { props } from '../../dashboardMockData';

describe('Test Timeline component of dashboard', () => {
  it('renders correctly', () => {
    const tree = shallow(<Timeline {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should have three modal-order-content class', () => {
    global.localStorage = {
      getItem() {
        return 'user';
      }
    };
    const tree = shallow(<Timeline {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
