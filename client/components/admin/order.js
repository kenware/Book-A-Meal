import React from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import PropTypes from 'prop-types';
import './index.scss';

// this component displays all the order history and overview of most orderedMeal
const Orders = ({ mostOrder, allOrder }) => {
  const data = [];
  mostOrder.forEach((element) => {
    const name = `${element.Meal.name.substr(0, 7)}...`;
    data.push({ name, totalOrder: element.OrderCount, price: element.Meal.price });
  });
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
  ];

  return (
    <div className="order-container" style={{ marginTop: '4rem', justifyContent: 'spaceAround' }}>
      <h2 style={{ marginTop: '4rem' }}>Overview Of Most Ordered Meal </h2>
      {mostOrder.length > 0 ?
        <div className="order-wrapper">
          <AreaChart
            width={670}
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
      <div className="order-wrapper">
        <h2 style={{ marginTop: '4rem' }}>ORDER HISTORY OF ALL USERS</h2>
        {allOrder.length > 0 ?
          <table>
            <tbody>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Quanitity
                </th>
                <th>Price (#)</th>

                <th>Total price</th>
                <td>Address</td>
                <td>Date</td>
                <td>Status</td>
              </tr>
              {allOrder.map(order =>
                  (
                    <tr key={order.id} className="order-contents">
                      <td>{order.Meal.id}</td>
                      <td>{order.Meal.name}</td>
                      <td>{order.quantity}</td>
                      <td>{order.Meal.price}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.address}</td>
                      <td>{monthNames[new Date(order.createdAt).getMonth()].substr(0, 3)}&nbsp;
                        {new Date(order.createdAt).getDate()} &nbsp;
                        {new Date(order.createdAt).getFullYear()}
                      </td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        : <h3 style={{ marginTop: '1rem' }} className="p-color text-center">Users have not Ordered your meal</h3>}
      </div>
    </div>
  );
};
Orders.propTypes = {
  mostOrder: PropTypes.array.isRequired,
  allOrder: PropTypes.array.isRequired,
};
export default Orders;
