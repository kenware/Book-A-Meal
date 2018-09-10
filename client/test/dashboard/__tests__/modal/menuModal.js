import React from 'react';
import { shallow } from 'enzyme';
import MenuModal from '../../../../components/dashboard/modals/menuModal';
import { props, emptyProps } from '../../dashboardMockData';

describe('Test menu component of dashboard', () => {
  it('renders correctly with empty props', () => {
    const tree = shallow(<MenuModal {...emptyProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render with props', () => {
    const tree = shallow(<MenuModal {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
