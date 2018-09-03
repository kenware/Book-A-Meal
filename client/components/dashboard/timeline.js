
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

const monthNames = [
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December'
];
/**
   * timeline components
   * displays notification
  */
const Timeline = ({ notifics, upGrade }) => (
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
              <img src={window.localStorage.getItem('image')} className="user-img rounded-circle" alt="profil" />
            </li>
            <li>
              <span className="h2-color">{window.localStorage.getItem('username')}</span>
            </li>
            <li>
              <span className="h2-color"><Link to="/profile">profile</Link></span>
            </li>
            {window.localStorage.getItem('role') === 'user' ?
              <li>
                <button
                  id="userUpgrade"
                  onClick={upGrade}
                  style={{ backgroundColor: '#b8b507', color: 'white', minHeight: '2rem' }}
                >
                  Upgrade To A Caterer
                </button>
              </li>
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
          <ul style={{ overflow: 'scroll', height: '300px' }}>
            {notifics.map(notific =>
              (
                <li style={{ marginTop: '1rem' }} key={notific.id}>
                  <div className="p-color">{notific.message}</div>
                  <div>
                    {monthNames[new Date(notific.createdAt).getMonth()].substr(0, 3)}&nbsp;
                    {new Date(notific.createdAt).getDate()} &nbsp;
                    {new Date(notific.createdAt).getFullYear()}
                  </div>
                </li>
              ))}
          </ul>
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
          <ul >
            <li />
            <li>Italian Recipes</li>
            <li>Ewedu Meal</li>
            <li>Abacha</li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
);
Timeline.propTypes = {
  notifics: PropTypes.array.isRequired,
  upGrade: PropTypes.func.isRequired
};
export default Timeline;
