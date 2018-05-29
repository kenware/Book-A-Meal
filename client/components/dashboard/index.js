import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Link } from 'react-router-dom';

import Header from '../header/index';
import Menu from './menu';
import Orders from './order';
import Footer from '../footer/index';
import './index.scss';
import * as menuActions from '../../redux/Action/menuAction';
import * as orderActions from '../../redux/Action/orderAction';

class Dashboard extends Component {
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
      order: 'order'
    };
  }
  componentWillMount() {
    this.props.menuActions.getMenu();
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
              <h3 className="y-color l-r-pad-text">Book-A-Meal</h3>
              <ul>
                <li className="top-padding li-style">
                  <Link to="/dashboard" className="y-color">Dashboard</Link>

                </li>
                <li className="top-padding li-style">
                  <Link to="/dashboard/orders" className="y-color my-order">My Orders</Link>
                </li>
                <li className="top-padding li-style">
                  <a onClick={() => toggle()} href="javascript:void(0);" className="bar1 y-color ">Notification</a>
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
              <em className="fa fa-bars l-r-pad-text m-text bar2" onClick={() => toggle()} />
              <h1 className="l-r-pad-text"><a href="index.html"><em className="white-color fa fa-home" /></a></h1>
              <ul className="list-type">
                <li className="top-padding li-style">
                  <Link
                    to="/dashboard"
                    className="white-color dashboard"
                    onMouseLeave={() => handleClose('dash')}
                    onMouseEnter={() => handleClick('dash')}
                  ><em className="fa fa-dashboard" />
                  </Link>
                  <span className={`p-dash m-text ${this.state.dash}`}>Dashoard</span>
                </li>
                <li className="top-padding li-style">
                  <Link
                    to="/dashboard/orders"
                    className="white-color m-text "
                    onMouseLeave={() => handleClose('order')}
                    onMouseEnter={() => handleClick('order')}
                  ><em className="fa fa-calendar-o popover all-meal" />
                  </Link>
                  <span className={`p-all m-text ${this.state.order}`}>My Orders</span>
                </li>
                <li className="top-padding li-style">
                  <a
                    href="javascript:void(0);"
                    className=" white-color m-text"
                    onMouseLeave={() => handleClose('notific')}
                    onMouseEnter={() => handleClick('notific')}
                  ><em className="fa fa-bell notif" />
                  </a>
                  <span className={`p-notif m-text ${this.state.notific}`}>Notifications</span>
                </li>
                <li className="top-padding li-style">
                  <Link
                    to="dashboard/profile"
                    className="white-color m-text"
                    onMouseLeave={() => handleClose('profile')}
                    onMouseEnter={() => handleClick('profile')}
                  ><em className="fa fa-user add-meal" />
                  </Link>
                  <label className={`p-add m-text ${this.state.profile}`}>Profile</label>
                </li>
                <li className="top-padding li-style">
                  <Link
                    to="dashboard/profile"
                    className="white-color m-text"
                    onMouseLeave={() => handleClose('cPassword')}
                    onMouseEnter={() => handleClick('cPassword')}
                  ><em className="fa fa-edit set-meal" />
                  </Link>
                  <label className={`p-set m-text ${this.state.cPassword}`}>Change Password</label>
                </li>
                <li className="top-padding li-style">
                  <a
                    href="javascript:void(0);"
                    className="white-color m-text"
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
                <h4 className="white-color">USER DASHBOARD</h4>
              </div>
              <div>
                <h4 className="white-color">Keny</h4>
                <img src="image/eze.jpg" className="user-img rounded-circle" />
              </div>
              <div className="notification1">
                <a href="javascript:void(0);" className="" onClick={() => toggle()}>
                  <h4 className="white-color">Notification</h4>
                  <em className="fa fa-bars l-r-pad-text white-color" />
                </a>
              </div>

            </header>
            
            <div className="content-container">
              <Route exact path="/dashboard" component={Menu} />
              <Route exact path="/dashboard/orders" component={Orders} />
              
              <div className={`timeline-container ${this.state.timeline}`}>
                <h2>Timeline</h2>
                <ul className="timeline" >
                  <li>
                    <div className="timeline-badge"><em className="fa fa-camera" /></div>
                    <div className="timeline-panel bg-light">
                      <div className="timeline-heading">
                        <h5 className="timeline-title l-margin m-text">Profile</h5>
                      </div>
                      <div className="timeline-body">
                        <ul>
                          <li style={{ listStyle: 'none' }}>
                            <img src="image/eze.jpg" className="user-img rounded-circle" alt="profil" />
                          </li>
                          <li>
                            <span className="h2-color">Keny</span>
                          </li>
                          <li>
                            <span className="h2-color">Update profile</span>
                          </li>
                          <li><span className="h2-color">Change Password</span></li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-badge primary"><em className="fa fa-link" /></div>
                    <div className="timeline-panel bg-light">
                      <div className="timeline-heading">
                        <h5 className="timeline-title l-margin m-text">Notifications</h5>
                      </div>
                      <div className="timeline-body">
                        <p>
                          <ul>
                            <li>
                             Jollof rice, new italian recipe is just added
                             to monday meal menu.Order <a href="dashboard.html">now</a>
                            </li>
                          </ul>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-badge"><em className="fa fa-paperclip" /></div>
                    <div className="timeline-panel bg-light">
                      <div className="timeline-heading">
                        <h5 className="timeline-title m-text l-margin">Recently Ordered Meal</h5>
                      </div>
                      <div className="timeline-body">
                        <p>
                          <ul >
                            <li />
                            <li>Italian Recipes</li>
                            <li>Ewedu Meal</li>
                            <li>Abacha</li>
                          </ul>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>

              </div>
              
            </div>
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
    menuActions: bindActionCreators(menuActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
