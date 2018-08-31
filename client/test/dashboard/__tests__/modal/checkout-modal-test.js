import React from 'react';
import { shallow } from 'enzyme';
import CheckOutModal from '../../../../components/dashboard/modals/checkOutModal';
import { props, emptyProps } from '../../dashboardMockData';

describe('Test checkout modal', () => {
  it('renders correctly with empty props', () => {
    const tree = shallow(<CheckOutModal {...emptyProps} onChange={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render with props', () => {
    const tree = shallow(<CheckOutModal {...props} onChange={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });
});
