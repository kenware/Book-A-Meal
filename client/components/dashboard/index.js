import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Link } from 'react-router-dom';

import Header from '../header/index';
import Header3 from '../header/header3';
import Menu from './menu';
import Orders from './order';
import Footer from '../footer/index';
import Profile from './profile';
import './index.scss';
import * as menuActions from '../../redux/Action/menuAction';
import * as orderActions from '../../redux/Action/orderAction';
import * as actions from '../../redux/Action/action';

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
      order: 'order',
      limit: 4,
      upgradeModal: 'modal',
      upgradeButton: 'Upgrade'
    };
    this.notific = this.notific.bind(this);
    this.upgrade = this.upgrade.bind(this);
    this.confirmUpgrade = this.confirmUpgrade.bind(this);
    this.cancelUpgrade = this.cancelUpgrade.bind(this);
  }
  componentDidMount() {
    this.props.menuActions.getMenu();
    this.props.actions.getNotifications();
    this.props.actions.refreshToken('role');
  }
  componentWillReceiveProps(newProps) {
    if (newProps.successMessage.upgradeSuccess) {
      this.setState({ upgradeModal: 'modal' });
    }
  }
  notific() {
    let { limit } = this.state;
    limit += 4;
  }
  cancelUpgrade() {
    this.setState({ upgradeModal: 'modal' });
  }
  confirmUpgrade() {
    this.props.actions.upgrade();
    this.setState({
      upgradeButton: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>)
    });
  }
  upgrade() {
    this.setState({ upgradeModal: '' });
  }
  render() {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June',
      'July', 'August', 'September',
      'October', 'November', 'December'
    ];

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
        <span className="largeScreen-header">
          <Header />
        </span>
        <span className="smallScreen-header">
          <Header3 />
        </span>
        <div className="admin-container">
          <nav className={`sidebar sidebar1-width ${this.state.nav1}`}>
            <div>
              <em className="fa fa-bars l-r-pad-text m-text bar1" onClick={() => toggle()} />
              <h3 className="y-color l-r-pad-text">Book-A-Meal</h3>
              <ul>
                {localStorage.getItem('role') === 'admin' ?
                  <li className="top-padding li-style">
                    <Link to="/admin" className="y-color">Admin</Link>

                  </li>
                : <span />}
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
                  <Link to="/dashboard/profile" className="bar1 y-color ">Profile</Link>
                </li>
                <li className="top-padding li-style">
                  <Link to="/dashboard/profile" className="set y-color">Change Password</Link>
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
              <ul className="y-color">
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
                    to="/dashboard/orders"
                    className="y-color m-text "
                    onMouseLeave={() => handleClose('order')}
                    onMouseEnter={() => handleClick('order')}
                  ><em className="fa fa-calendar-o popover all-meal" />
                  </Link>
                  <span className={`p-all m-text ${this.state.order}`}>My Orders</span>
                </li>
                <li className="top-padding li-style">
                  <a
                    href="javascript:void(0);"
                    className="y-color m-text"
                    onMouseLeave={() => handleClose('notific')}
                    onMouseEnter={() => handleClick('notific')}
                  ><em className="fa fa-bell notif" />
                  </a>
                  <span className={`p-notif m-text ${this.state.notific}`}>Notifications</span>
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
                    to="/dashboard/profile"
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
                <h4 className="white-color">USER DASHBOARD</h4>
                { localStorage.getItem('role') === 'user' ?
                  <span onClick={this.upgrade} className="y-color" role="button"> Upgrade To A Caterer ?</span>
                : <Link to="/admin" className="y-color">Manage your meals</Link>
                }
              </div>
              <div>
                <h4 className="white-color">{localStorage.getItem('username')}</h4>
                <img src="image/eze.jpg" className="user-img rounded-circle" />
              </div>
              <div className="notification1">
                <a href="javascript:void(0);" className="" onClick={() => toggle()}>
                  <h4 className="white-color">Notification</h4>
                  <em className="fa fa-bars l-r-pad-text y-color" />
                </a>
              </div>

            </header>

            <div className="content-container">
              <div className={`modal-order ${this.state.upgradeModal}`}>
                <button
                  style={{ float: 'right', backgroundColor: 'red', display: 'block' }}
                  className="remove-modal"
                  onClick={this.cancelUpgrade}
                >
                  &times;
                </button>
                <div className="modal-order-content" style={{ margin: '1rem 1rem 1rem 1rem' }}>
                  <p className="justify l-r-pad-text"> You are about to upgrade to admin/Caterer</p>
                  <p className="justify l-r-pad-text danger">{this.props.errorMessage.upgradeError}</p>
                </div>
                <div className="modal-order-content">
                  <button className="remove-modal" onClick={this.confirmUpgrade}>{this.state.upgradeButton}</button><button onClick={this.cancelUpgrade}className="remove-modal">Cancel</button>
                </div>
              </div>
              
              <Route exact path="/dashboard" component={Menu} />
              <Route path="/dashboard/orders" component={Orders} />
              <Route path="/dashboard/profile" component={Profile} />
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
                          <li><span className="h2-color" role="button"> Change Password</span></li>
                          {localStorage.getItem('role') === 'user' ?
                            <li><button onClick={this.upgrade} className="p-color" role="button"> Upgrade To A Caterer</button></li>
                          : <span />
                          }
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
                            {this.props.notifics.map(notific =>
                              (
                                <li style={{ marginTop: '1rem' }}>
                                  <div className="p-color">{notific.message}</div>
                                  <div>
                                    {monthNames[new Date(notific.createdAt).getMonth()].substr(0, 3)}&nbsp;
                                    {new Date(notific.createdAt).getDate()} &nbsp; {new Date(notific.createdAt).getFullYear()}
                                  </div>
                                </li>
                              ))}
                            <li>
                              <button onClick={this.notific}> Load Prev </button>
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
  let { notifics } = state;
  notifics = notifics.slice(0, 4);
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    notifics
  };
}
function mapDispatchToProps(dispatch) {
  return {
    menuActions: bindActionCreators(menuActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch),
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
