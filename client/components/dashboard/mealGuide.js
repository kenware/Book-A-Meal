import React from 'react';

const mealGuide = () => (
  <div>
    <h2>ORDER A MEAL IN A TWO MORE EASY STEPS</h2>
    <div className="all-meal-step">
      <div className="meal-day">
        <div >
          <div className="circle" ><span className="fa fa-check fa-4x p-color" style={{ margin: '10px 0px 0px 13px' }} /></div><br />
          <span>SignUp/SignIn</span>
        </div>
      </div>
      <div className="meal-day">
        <span className="fa fa-long-arrow-right fa-4x p-color" />
      </div>
      <div className="meal-day">
        <div >
          <div className="circle" /><br />
          <span>Order A Meal</span>
        </div>
      </div>
      <div className="meal-day">
        <span className="fa fa-long-arrow-right fa-4x p-color" />
      </div>
      <div className="meal-day">
        <div>
          <div><img src="image/l.png" id="App-logo" className="rounded-circle" style={{ height: '100px', width: '100px' }} alt="meal" /></div>
          <br /><span>Hot Fresh Meal</span>
        </div>
      </div>
    </div>
    <h4 className="p-color text-center">Add meals to cart from menu of different caterers</h4>
  </div>
);
export default mealGuide;
