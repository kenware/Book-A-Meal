import React from 'react';
import { shallow } from 'enzyme';
import OrderModal from '../../../../components/dashboard/modals/orderModal';
import { props, emptyProps } from '../../dashboardMockData';

describe('Test menu component of dashboard', () => {
  it('renders correctly with empty props', () => {
    const tree = shallow(<OrderModal {...emptyProps} onChange={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render with props', () => {
    const tree = shallow(<OrderModal {...props} onChange={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });
});
