import React from 'react';
import { shallow } from 'enzyme';
import Video from '../../../../components/dashboard/video';

describe('Test Video component of dashboard', () => {
  it('renders correctly', () => {
    const tree = shallow(<Video />);
    expect(tree).toMatchSnapshot();
  });
  it('should have 1 video Class', () => {
    const tree = shallow(<Video />);
    expect(tree.find('.video')).toHaveLength(1);
  });
});
