import React from 'react';
import { shallow, mount } from 'enzyme';
import { Add, mapDispatchToProps, mapStateToProps } from '../../../../components/admin/addMeal';
import { props, emptyProps } from '../../adminMockData';

describe('Test index Component of addmeal component', () => {
  it('renders correctly', () => {
    const tree = mount(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should have one addmeal container class', () => {
    const tree = mount(<Add {...emptyProps} />);
    expect(tree.find('.register-container')).toHaveLength(1);
  });

  it('should have one form tag class', () => {
    const tree = mount(<Add {...emptyProps} />);
    expect(tree.find('form')).toHaveLength(1);
  });

  it('should have four form-field class', () => {
    const tree = mount(<Add {...emptyProps} />);
    expect(tree.find('.form-field')).toHaveLength(6);
  });

  it('should have one addmeal-wrapper', () => {
    const tree = shallow(<Add{...emptyProps} />);
    expect(tree.find('.register-wrapper')).toHaveLength(1);
  });

  it('should have three label', () => {
    const tree = shallow(<Add {...emptyProps} />);
    expect(tree.find('label')).toHaveLength(4);
  });

  it('testing initial states', () => {
    const tree = shallow(<Add {...emptyProps} />);
    expect(tree.state('name')).toEqual('');
    expect(tree.state('price')).toEqual('');
    expect(tree.state('description')).toEqual('');
    expect(tree.state('addMeal')).toEqual('Add Meal');
    expect(tree.state('file')).toEqual([]);
    expect(tree.state('image')).toEqual('');
  });

  it('it should rerender component on new props receipt', () => {
    let tree = shallow(<Add {...emptyProps} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should respond to change event and change the state of the name input', () => {
    const tree = shallow(<Add {...emptyProps} />);
    tree.find('#name').simulate('change', { target: { name: 'name', value: 'rice' } });
    expect(tree.state('name')).toEqual('rice');
  });

  it('should respond to change event and change the state of the price input', () => {
    const tree = shallow(<Add {...emptyProps} />);
    tree.find('#price').simulate('change', { target: { name: 'price', value: '100' } });
    expect(tree.state('price')).toEqual('100');
  });

  it('should respond to change event and change the state of the description input', () => {
    const tree = shallow(<Add {...emptyProps} />);
    tree.find('.descriptions').simulate('change', { target: { name: 'description', value: 'very delicious' } });
    expect(tree.state('description')).toEqual('very delicious');
  });

  it('should respond to addMeal onClick method ', () => {
    const addMeal = jest.spyOn(Add.prototype, 'addMeal');
    const tree = shallow(<Add {...emptyProps} />);
    tree.find('.submit').simulate('click', { target: { name: 'submit' }, preventDefault: jest.fn() });
    expect(addMeal).toHaveBeenCalled();
  });

  it('should respond to addMeal onClick method and return error when name input is not supplied', () => {
    const tree = shallow(<Add {...emptyProps} />);
    tree.find('.submit').simulate('click', { target: { name: 'submit' }, preventDefault: jest.fn() });
    expect(tree.state('validName')).toEqual('Name is required');
  });

  it('should respond addMeal method onClick event and return error when price input is empty', () => {
    const tree = shallow(<Add {...emptyProps} />);
    tree.find('#name').simulate('change', { target: { name: 'name', value: 'rice' } });
    tree.find('.submit').simulate('click', { target: { name: 'submit' }, preventDefault: jest.fn() });
    expect(tree.state('validPrice')).toEqual('Price is required');
  });

  it('should respond addMeal method onClick event and return error when description input is empty', () => {
    const tree = shallow(<Add {...emptyProps} />);
    tree.find('#name').simulate('change', { target: { name: 'name', value: 'rice' } });
    tree.find('#price').simulate('change', { target: { name: 'price', value: '100' } });
    tree.find('.submit').simulate('click', { target: { name: 'submit' }, preventDefault: jest.fn() });
    expect(tree.state('validDescription')).toEqual('Description is required');
    tree.find('#description').simulate('change', { target: { name: 'description', value: 'good' } });
    tree.find('.submit').simulate('click', { target: { name: 'submit' }, preventDefault: jest.fn() });
    expect(tree).toMatchSnapshot();
  });

  it('should should respond to lifeCycle Methods', () => {
    const tree = shallow(<Add {...props} />);
    const componentWillReceiveProps = jest.spyOn(Add.prototype, 'componentWillReceiveProps');
    const componentWillUnmount = jest.spyOn(Add.prototype, 'componentWillUnmount');

    const wrapper = tree.instance();
    wrapper.componentWillReceiveProps({
      errorMessage: { createMealError: '' },
      successMessage: { createMealSuccess: '' }
    });
    wrapper.componentWillUnmount();
    expect(tree).toMatchSnapshot();
    tree.instance().componentWillReceiveProps({
      errorMessage: { createMealError: 'error' },
      successMessage: { createMealSuccess: 'success' }
    });
    expect(tree).toMatchSnapshot();
    expect(componentWillReceiveProps).toHaveBeenCalled();
    expect(componentWillUnmount).toMatchSnapshot();
  });

  it('should should respond to dropBox onDRop Methods', () => {
    const tree = shallow(<Add {...props} />);
    const wrapper = tree.instance();
    wrapper.onDrop([{ preview: 'image/l.jpg' }]);
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
