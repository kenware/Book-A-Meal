import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn()
};
const historymock = {
  push: jest.fn()
};
// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.history = historymock;
global.localStorage = localStorageMock;
global.mapStateToProps = jest.fn();
global.mapDispatchToProps = jest.fn();
global.bindActionCreators = jest.fn();
global.payload = { append: jest.fn() };
