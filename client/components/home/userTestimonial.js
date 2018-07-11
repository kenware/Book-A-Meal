import React from 'react';
/**
 * feature functional component with user testimonial
 */
const userTestimomial = () => (
  <div className="testimonial-wrap">
    <div>
      <div className="user-testimonial-menu">
        <div className="testimonial-photo">
          <img src="image/eze.jpg" className="rounded-circle" style={{ width: '100px', height: '100px' }} alt="profile" />
        </div>
        <p className="justify text-pad">
    Book-A-Meal is just amazing!. For the first time i can book for any meal
    by a single click any where around the world, without having to go to any  resturant
    .This is really awesome.
        </p>
        <div className="container">
          <h2 className="white-color">Kevin</h2>
          <p className="text-center white-color">Developer</p>
        </div>
      </div>
    </div>
    <div>
      <div className="user-testimonial-menu">
        <div className="testimonial-photo">
          <img src="image/face1.jpg" className="rounded-circle" style={{ width: '100px', height: '100px' }} alt="profile" />
        </div>
        <p className="justify l-r-pad-text">
      Book-A-Meal is  awesome!.This have preventd the stress of having to
      go down the street from one resturant to another, i have my favorite
      delivered to my door step b a single click.This is really awsome.
        </p>
        <div className="container">
          <h2 className="white-color">Jessica Jones</h2>
          <p className="white-color text-center">Actor</p>
        </div>
      </div>
    </div>
  </div>
);
export default userTestimomial;

