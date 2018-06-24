import React from 'react';
import { shallow } from 'enzyme';
import { AllMeal, mapDispatchToProps, mapStateToProps } from '../../../../components/admin/allMeals';
import { props, emptyProps } from '../../adminMockData';

describe('Test Component of ALLMeals component', () => {
  it('renders correctly', () => {
    const tree = shallow(<AllMeal {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should display two meals contents', () => {
    const tree = shallow(<AllMeal {...props} />);
    expect(tree.find('.contents')).toHaveLength(2);
  });

  it('should display 1 modal-order contents', () => {
    const tree = shallow(<AllMeal {...props} />);
    expect(tree.find('.modal-order')).toHaveLength(1);
  });

  it('should display 3 modal-order-content class contents', () => {
    const tree = shallow(<AllMeal {...props} />);
    expect(tree.find('.modal-order-content')).toHaveLength(3);
  });

  it('should display 8 col-meal class from the meals contents', () => {
    const tree = shallow(<AllMeal {...props} />);
    expect(tree.find('.col-meal')).toHaveLength(8);
  });

  it('should have 17 divs', () => {
    const tree = shallow(<AllMeal {...props} />);
    expect(tree.find('div')).toHaveLength(17);
  });

  it('should display 2 img tag from the meals contents', () => {
    const tree = shallow(<AllMeal {...props} />);
    expect(tree.find('img')).toHaveLength(3);
  });

  it('should display no meal meals with empty meal props', () => {
    const tree = shallow(<AllMeal {...emptyProps} />);
    expect(tree.find('.contents')).toHaveLength(0);
  });

  it('should display no menu meals with empty meal props', () => {
    const tree = shallow(<AllMeal {...props} />);
    expect(tree.find('Link')).toHaveLength(4);
  });

  it('should respond to a click event by dispalying a modal when caterer want to delete a meal by selecting from meal options', () => {
    const tree = shallow(<AllMeal {...props} />);
    // onClick event
    tree.find('#rice').simulate('click');
    expect(tree).toMatchSnapshot();
  });
  it('should respond to deleteMeal method', () => {
    const tree = shallow(<AllMeal {...props} />);
    // onClick event
    const wrapper = tree.instance();
    wrapper.deleteMeal();
    expect(tree).toMatchSnapshot();
  });
  it('should respond to deleteMeal method ', () => {
    const tree = shallow(<AllMeal {...props} />);
    // onClick event
    const wrapper = tree.instance();
    wrapper.cancelDelete();
    expect(tree).toMatchSnapshot();
  });
  it('should call deletMeal method onclick event', () => {
    const deleteMeal = jest.spyOn(AllMeal.prototype, 'deleteMeal');
    const tree = shallow(<AllMeal {...props} />);
    // onClick event
    tree.find('#rice').simulate('click');
    tree.find('.delete-meal').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(deleteMeal).toHaveBeenCalled();
  });

  it('should cancel/remove modal that delete meal using cancelAdd method onclick event', () => {
    const cancelDelete = jest.spyOn(AllMeal.prototype, 'cancelDelete');
    const tree = shallow(<AllMeal {...props} />);
    // onClick event
    tree.find('#rice').simulate('click');
    tree.find('.cancel-delete').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(cancelDelete).toHaveBeenCalled();
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
