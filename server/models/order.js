import dumyData from '../dumydata/store';
const orders = dumyData.orders;

export default class Order {
    getAll(){
      return orders;
    }
    createOrder(id,userId,quantity,status,meal){
      const totalPrice = quantity * meal.price;
      const order = { id,userId,quantity,status, totalPrice,meal}
      orders.push(order);
      return order;
    }
    updateOrder(newOrder,existingOrder){
      const { status,quantity } = newOrder;
      existingOrder.status = status || existingOrder.status;
      existingOrder.quantity = quantity || existingOrder.quantity;
      existingOrder.totalPrice = quantity*existingOrder.meal.price || 
      existingOrder.totalPrice;
      return existingOrder;
    }
  }
