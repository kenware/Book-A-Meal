import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../redux/Action/action'
import * as types from '../../redux/ActionTypes'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
​
describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })
});