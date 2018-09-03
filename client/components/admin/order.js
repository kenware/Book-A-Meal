import React from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import Pagination from 'react-js-pagination';
import './index.scss';

// this component displays all the order history and overview of most orderedMeal
const Orders = ({
  mostOrder,
  allOrder,
  activePage,
  handlePageChange
}) => {
  const limit = 6;
  const data = [];
  mostOrder.forEach((element) => {
    const name = `${element.name.substr(0, 10)}...`;
    data.push({ name, totalOrder: element.orderCount, price: element.price });
  });

  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
  ];
  return (
    <div className="order-container" style={{ marginTop: '6rem', justifyContent: 'spaceAround' }}>
      <h2 style={{ marginTop: '4rem' }}>Overview Of Most Ordered Meal </h2>
      {mostOrder.length > 0 ?
        <div className="order-wrapper" style={{ marginLeft: '5%', marginRight: '5%' }}>
          <AreaChart
            width={1000}
            height={250}
            data={data}
            margin={{
              top: 10, right: 30, left: 0, bottom: 0
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="totalOrder" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="price" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>
        </div> : <h3 style={{ marginTop: '1rem' }} className="p-color text-center">Users have not Ordered a meal</h3>}
      <h2 style={{ marginTop: '4rem' }}>ORDER HISTORY OF ALL USERS</h2>
      <div className="order-wrapper">
        {allOrder.orders.length > 0 ?
          <span>
            <Accordion>
              <AccordionItem>
                <AccordionItemTitle>
                  <div className="accordion__meal" />
                  <div className="order-accordion accordion-color">
                    <div> S/N </div>
                    <div>Total price</div>
                    <div>Address</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div>Username</div>
                  </div>
                </AccordionItemTitle>
              </AccordionItem>
              {allOrder.orders.map(order => (
                <AccordionItem key={order.id}>
                  <AccordionItemTitle>
                    <div className="accordion__arrow u-postion-relative" />
                    <div className="order-accordion">
                      <div className="order-">
                        {allOrder.orders.indexOf(order) + 1}
                      </div>
                      <div className="order-contents ">
                        {order.totalPrice}
                      </div>
                      <div className="order-contents">
                        {order.address}
                      </div>
                      <div className="order-contents ">
                        {monthNames[new Date(order.createdAt).getMonth()].substr(0, 3)}&nbsp;
                        {new Date(order.createdAt).getDate()} &nbsp;
                        {new Date(order.createdAt).getFullYear()}
                      </div>
                      <div className="order-contents">
                        {order.status}
                      </div>
                      <div className="order-contents ">
                        {order.user.username}
                      </div>
                    </div>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <table className="table">
                      <tbody>
                        <tr className="p-color tr-height tr-color">
                          <th>S/N</th>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total Price</th>
                        </tr>
                        { order.meals.map(meal => (
                          <tr className="p-color tr tr-height" key={meal.id}>
                            <td>{order.meals.indexOf(meal) + 1}</td>
                            <td>{meal.name}</td>
                            <td>{meal.orderMealItems.quantity}</td>
                            <td>{meal.price}</td>
                            <td>{meal.totalPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </AccordionItemBody>
                </AccordionItem>
             ))}
            </Accordion>
            <div className="meal-pagination">
              <Pagination
                activePage={activePage}
                itemsCountPerPage={limit}
                totalItemsCount={Math.ceil(allOrder.count)}
                pageRangeDisplayed={4}
                onChange={handlePageChange}
              />
            </div>
          </span>
        : <h3 style={{ marginTop: '1rem' }} className="p-color text-center">Users have not Ordered your meal</h3>}
      </div>
    </div>
  );
};

Orders.propTypes = {
  activePage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  mostOrder: PropTypes.array.isRequired,
  allOrder: PropTypes.object.isRequired,
};

export default Orders;
