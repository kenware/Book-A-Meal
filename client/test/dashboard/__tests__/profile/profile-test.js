import React from 'react';
import { mount } from 'enzyme';
import { Profile, mapStateToProps, mapDispatchToProps } from '../../../../components/dashboard/profile';
import { props, emptyProps } from '../../dashboardMockData';

describe('Test Profile component', () => {
  it('renders correctly', () => {
    const tree = mount(<Profile {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should display error messages from redux error props', () => {
    const tree = mount(<Profile {...emptyProps} />);
    expect(tree.state('name')).toEqual('');
    expect(tree).toMatchSnapshot();
  });


  it('should have one Profile container class', () => {
    const tree = mount(<Profile {...emptyProps} />);
    expect(tree.find('.order-container')).toHaveLength(1);
  });

  it('should have one form tag class', () => {
    const tree = mount(<Profile {...emptyProps} />);
    expect(tree.find('form')).toHaveLength(1);
  });

  it('should have four profile-field className', () => {
    const tree = mount(<Profile {...emptyProps} />);
    expect(tree.find('.profile-field')).toHaveLength(4);
  });
  it('should have 2 form-field className', () => {
    const tree = mount(<Profile {...emptyProps} />);
    expect(tree.find('.form-field')).toHaveLength(2);
  });

  it('should have 4 input tag', () => {
    const tree = mount(<Profile {...emptyProps} />);
    expect(tree.find('input')).toHaveLength(4);
  });

  it('should have three label', () => {
    const tree = mount(<Profile {...emptyProps} />);
    expect(tree.find('label')).toHaveLength(4);
  });
  it('testing initial states', () => {
    const tree = mount(<Profile {...emptyProps} />);
    expect(tree.state('name')).toEqual('');
    expect(tree.state('updateProfile')).toEqual('Update');
    expect(tree.state('file')).toEqual([]);
    expect(tree.state('image')).toEqual('');
  });

  it('form-label class should be equall to 2', () => {
    const tree = mount(<Profile {...emptyProps} />);
    expect(tree.find('.form-label').length).toEqual(2);
  });
  it('the value of name input must be equall to enter value', () => {
    const tree = mount(<Profile {...emptyProps} />);
    tree.find('#name').simulate('change', { target: { name: 'name', value: 'ken' } });
    expect(tree.find('#name').prop('value')).toEqual('ken');
  });
  it('the value of username and email input must be from props', () => {
    const tree = mount(<Profile {...props} />);
    expect(tree.find('.username').prop('value')).toEqual('ken');
    expect(tree.find('#email').prop('value')).toEqual('ken@gmaoil.com');
  });

  it('should respond to dropbox ondrop method', () => {
    const tree = mount(<Profile {...emptyProps} />);
    const wrapper = tree.instance();
    wrapper.onDrop([{ preview: 'image/l.jpg' }]);
    expect(tree).toMatchSnapshot();
  });
  it('should respond to componentWillMount lifeCycle method', () => {
    const tree = mount(<Profile {...emptyProps} />);
    const wrapper = tree.instance();
    wrapper.componentWillUnmount();
    expect(tree).toMatchSnapshot();
  });
  it('should respond to componentWillProps method', () => {
    const tree = mount(<Profile {...emptyProps} />);
    const wrapper = tree.instance();
    wrapper.constructor.getDerivedStateFromProps({
      user: { }
    });
    expect(tree).toMatchSnapshot();
    wrapper.constructor.getDerivedStateFromProps({
      user: {
        name: 'ken',
        image: 'image_url',
      }
    });
    expect(tree).toMatchSnapshot();
  });
  it('should respond to onChange event', () => {
    const tree = mount(<Profile {...props} />);
    const wrapper = tree.instance();
    wrapper.onChange({ target: { name: 'ken' } });
    expect(tree).toMatchSnapshot();
    tree.find('.submit').simulate('click');
  });
  it('should update user profile', () => {
    const tree = mount(<Profile {...emptyProps} />);
    // onChange event
    tree.find('#name').simulate('change', { target: { name: 'name', value: '' } });
    // submit updateProfile
    tree.find('.submit').simulate('click');
    expect(tree.state('validName')).toEqual('Name is required');
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