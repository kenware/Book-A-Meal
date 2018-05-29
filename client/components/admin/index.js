import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Link } from 'react-router-dom';

import Header from '../header/index';
import Footer from '../footer/index';
import * as actions from '../../redux/Action/action';
import * as mealActions from '../../redux/Action/mealAction';
import * as orderActions from '../../redux/Action/orderAction';
import './index.scss';
import Orders from './order';
import Allmeals from './allMeals';
import Setmenu from './setMenu';
import Addmeals from './addMeal';
import Edit from './edit';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: '',
      nav2: 'nav2',
      modal: 'modal',
      timeline: 'timeliner',
      main: 'main-sidebar1',
      dash: 'dash',
      cPassword: 'cPassword',
      profile: 'profile',
      notific: 'notific',
      logOut: 'logOut',
      order: 'order',
      setmeal: 'setmeal'
    };
  }
  componentWillMount() {
    this.props.mealActions.getAllMeals();
    this.props.mealActions.loadMostOrderedMeal();
    this.props.orderActions.getAllOrders();
  }
  render() {
    const toggle = () => {
      if (this.state.nav1 === '') {
        this.setState({
          nav2: '',
          nav1: 'nav1',
          main: 'main-sidebar2',
          timeline: ''
        });
      } else {
        this.setState({
          nav2: 'nav2',
          nav1: '',
          main: 'main-sidebar1',
          timeline: 'timeliner'
        });
      }
    };

    const handleClose = (value) => {
      const state = this.state;
      state[value] = value;
      this.setState(state);
    };
    const handleClick = (value) => {
      const state = this.state;
      state[value] = '';
      this.setState(state);
    };
    return (
      <div>
        <Header />

        <div className="admin-container">
          <nav className={`sidebar sidebar1-width ${this.state.nav1}`}>
            <div>
              <em className="fa fa-bars l-r-pad-text m-text bar1" onClick={() => toggle()} />
              <h3 className="y-color l-r-pad-text"><Link to="/admin" className="y-color">ADMIN</Link></h3>
              <ul>
                <li className="top-padding li-style">
                  <Link to="/dashboard" className="y-color">Dashoard</Link>

                </li>
                <li className="top-padding li-style">
                  <Link to="/admin/allmeals" className="y-color my-order">All Meals</Link>
                </li>
                <li className="top-padding li-style">
                  <Link to="/admin/addmeals" className="y-color my-order">Add Meals</Link>
                </li>
                <li className="top-padding li-style">
                  <Link to="/admin/setmenu" className="y-color my-order">Set Menu</Link>
                </li>
                <li className="top-padding li-style">
                  <Link to="/profile" className="bar1 y-color ">Profile</Link>
                </li>
                <li className="top-padding li-style">
                  <Link to="/profile" className="set y-color">Change Password</Link>
                </li>
                <li className="top-padding li-style">
                  <a href="javascript:void(0);" className="y-color">LogOut</a>
                </li>
              </ul>
            </div>
          </nav>
          <nav className={`sidebar sidebar2-width ${this.state.nav2}`}>
            <div>
              <em className="fa fa-bars l-r-pad-text m-text bar2 y-color" onClick={() => toggle()} />
              <h1 className="l-r-pad-text"><a href="index.html"><em className="y-color fa fa-home" /></a></h1>
              <ul className="">
                <li className="top-padding li-style">
                  <Link
                    to="/dashboard"
                    className="y-color dashboard"
                    onMouseLeave={() => handleClose('dash')}
                    onMouseEnter={() => handleClick('dash')}
                  ><em className="fa fa-dashboard" />
                  </Link>
                  <span className={`p-dash m-text ${this.state.dash}`}>Dashoard</span>
                </li>
                <li className="top-padding li-style">
                  <Link
                    to="/admin/allmeals"
                    className="y-color m-text "
                    onMouseLeave={() => handleClose('order')}
                    onMouseEnter={() => handleClick('order')}
                  ><em className="fa fa-list-alt popover all-meal" />
                  </Link>
                  <span className={`p-all m-text ${this.state.order}`}>All Meals</span>
                </li>
                <li className="top-padding li-style">
                  <Link
                    to="/admin/addmeals"
                    className="y-color m-text"
                    onMouseLeave={() => handleClose('notific')}
                    onMouseEnter={() => handleClick('notific')}
                  ><em className="fa fa-cart-plus " />
                  </Link>
                  <span className={`p-notif m-text ${this.state.notific}`}>Add Meals</span>
                </li>
                <li className="top-padding li-style">
                  <Link
                    to="/admin/setmenu"
                    className="y-color m-text"
                    onMouseLeave={() => handleClose('setmeal')}
                    onMouseEnter={() => handleClick('setmeal')}
                  ><em className="fa fa-plus " />
                  </Link>
                  <span className={`p-notif m-text ${this.state.setmeal}`}>Set Menu</span>
                </li>
                <li className="top-padding li-style">
                  <Link
                    to="dashboard/profile"
                    className="y-color m-text"
                    onMouseLeave={() => handleClose('profile')}
                    onMouseEnter={() => handleClick('profile')}
                  ><em className="fa fa-user add-meal" />
                  </Link>
                  <label className={`p-add m-text ${this.state.profile}`}>Profile</label>
                </li>
                <li className="top-padding li-style">
                  <Link
                    to="dashboard/profile"
                    className="y-color m-text"
                    onMouseLeave={() => handleClose('cPassword')}
                    onMouseEnter={() => handleClick('cPassword')}
                  ><em className="fa fa-edit set-meal" />
                  </Link>
                  <label className={`p-set m-text ${this.state.cPassword}`}>Change Password</label>
                </li>
                <li className="top-padding li-style">
                  <a
                    href="javascript:void(0);"
                    className="y-color m-text"
                    onMouseLeave={() => handleClose('logOut')}
                    onMouseEnter={() => handleClick('logOut')}
                  ><em className="fa fa-power-off logout" />
                  </a>
                  <label className={`p-out m-text ${this.state.logOut}`}>LougOut</label>
                </li>
              </ul>
            </div>
          </nav>

          <main className={`main ${this.state.main}`} id="main">
            <header className="header">
              <div className="l-r-pad-text">
                <h4 className="white-color">ADMIN</h4>
              </div>
              <div>
                <h4 className="white-color">Keny</h4>
                <img src="image/eze.jpg" className="user-img rounded-circle" />
              </div>
            </header>
            <Route exact path="/admin" component={Orders} />
            <Route exact path="/admin/allmeals" component={Allmeals} />
            <Route exact path="/admin/setmenu" component={Setmenu} />
            <Route exact path="/admin/addmeals" component={Addmeals} />
            <Route path="/admin/edit/:mealId" component={Edit} />
            <Footer />
          </main>

        </div>

      </div>

    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage
  };
}
function mapDispatchToProps(dispatch) {
  return { 
    actions: bindActionCreators(actions, dispatch),
    mealActions: bindActionCreators(mealActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
