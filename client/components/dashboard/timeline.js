
import React from 'react';
import PropTypes from 'prop-types';

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
const Timeline = ({ notifics }) => (
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
            {window.localStorage.getItem('role') === 'user' ?
              <li><button className="p-color"> Upgrade To A Caterer</button></li>
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
);
Timeline.propTypes = {
  notifics: PropTypes.array.isRequired,
};
export default Timeline;
