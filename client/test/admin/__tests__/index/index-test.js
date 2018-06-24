import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { Admin, mapStateToProps, mapDispatchToProps } from '../../../../components/admin/index';
import { props, emptyProps } from '../../adminMockData';

describe('Test index Component of admin pages', () => {
  it('renders correctly', () => {
    const tree = shallow(<Admin {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should have 4 nested Route components', () => {
    const tree = mount(<MemoryRouter initialEntries={['/admin']}><Admin {...props} /></MemoryRouter>);
    expect(tree.find('Route')).toHaveLength(5);
  });

  it('should have respond handle click and close method', () => {
    const tree = shallow(<Admin {...props} />);
    const wrapper = tree.instance();
    wrapper.toggle();
    expect(tree).toMatchSnapshot();
    wrapper.handleClose('nav1');
    wrapper.toggle();
    expect(tree).toMatchSnapshot();
    wrapper.handleClick();
    expect(tree).toMatchSnapshot();
  });
  it('should have respond to logOut method', () => {
    global.history.pushState = jest.fn();
    const tree = shallow(<Admin {...props} />);
    const wrapper = tree.instance();
    wrapper.logOut();
    expect(tree).toMatchSnapshot();
  });
  it('should respond to mapStateToProps methods', () => {
    const ownProps = { match: { params: { mealId: 1 } } };
    const tree = mapStateToProps(props, ownProps);
    expect(tree).toMatchSnapshot();
  });
  it('should respond to mapDispatchToProps methods', () => {
    const tree = mapDispatchToProps(emptyProps);
    expect(tree).toMatchSnapshot();
  });
});
