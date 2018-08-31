import React from 'react';
import { shallow } from 'enzyme';
import { Edit, mapStateToProps, mapDispatchToProps } from '../../../../components/admin/edit';
import { props, emptyProps } from '../../adminMockData';

const newProps = {
  meals: { rows: { name: '' } },
  mostOrder: [
  ],
  allOrder: [
  ],
  successMessage: {
    createMealSuccess: ''
  },
  errorMessage: {
    createMealError: ''
  },
  actions: {
    clearMessages: jest.fn()
  },
  mealActions: {
    createMeal: jest.fn(),
    getAllMeals: jest.fn(),
    updateMeal: jest.fn(),
    getAllMeal: jest.fn()
  },
  menuActions: {
  },
  state: {
    meals: { find: jest.fn() }
  }
};

describe('Test edit meal component', () => {
  it('renders correctly', () => {
    const tree = shallow(<Edit {...newProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = shallow(<Edit {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should respond to change event and change the state of the name input', () => {
    const tree = shallow(<Edit {...emptyProps} />);
    tree.find('#name').simulate('change', { target: { name: 'name', value: 'rice' } });
    expect(tree.state('name')).toEqual('rice');
  });

  it('should respond to lifeCycle methods', () => {
    const componentDidMount = jest.spyOn(Edit.prototype, 'componentDidMount');
    const componentWillUnmount = jest.spyOn(Edit.prototype, 'componentWillUnmount');

    const tree = shallow(<Edit {...emptyProps} />);
    const wrapper = tree.instance();
    wrapper.componentDidMount();
    wrapper.componentWillUnmount();
    expect(wrapper).toMatchSnapshot();
    expect(componentDidMount).toHaveBeenCalled();
    expect(componentWillUnmount).toHaveBeenCalled();
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

  it('should respond to class methods', () => {
    const tree = shallow(<Edit {...emptyProps} />);
    const wrapper = tree.instance();
    wrapper.onDrop([{ preview: 'image.jpg' }]);
    wrapper.addMeal({ preventDefault: jest.fn() });
    expect(wrapper).toMatchSnapshot();
  });

  it('should respond to lifeCycle methods', () => {
    const tree = shallow(<Edit {...emptyProps} />);
    const wrapper = tree.instance();
    tree.instance().constructor.getDerivedStateFromProps({
      meals: {
        name: 'rice', image: 'url', price: '200', description: 'Good'
      }
    }, { meals: { } });
    expect(tree).toMatchSnapshot();
    tree.instance().constructor.getDerivedStateFromProps({ meals: {} }, { meals: { } });
    expect(tree).toMatchSnapshot();
  });

  it('should respond to addMeal onClick method and return error when name input is not supplied', () => {
    const tree = shallow(<Edit {...emptyProps} />);
    tree.find('.submit').simulate('click', { target: { name: 'submit' }, preventDefault: jest.fn() });
    expect(tree.state('validName')).toEqual('Name is required');
  });

  it('should respond addMeal method onClick event and return error when price input is empty', () => {
    const tree = shallow(<Edit {...emptyProps} />);
    tree.find('#name').simulate('change', { target: { name: 'name', value: 'rice' } });
    tree.find('.submit').simulate('click', { target: { name: 'submit' }, preventDefault: jest.fn() });
    expect(tree.state('validPrice')).toEqual('Price is required');
  });

  it('should respond addMeal method onClick event of edit profile page', () => {
    const tree = shallow(<Edit {...emptyProps} />);
    tree.find('#name').simulate('change', { target: { name: 'name', value: 'rice' } });
    tree.find('#price').simulate('change', { target: { name: 'price', value: '100' } });
    tree.find('#description').simulate('change', { target: { name: 'description', value: 'Good' } });
    tree.find('.submit').simulate('click', { target: { name: 'submit' }, preventDefault: jest.fn() });
    expect(tree).toMatchSnapshot();
  });
});
