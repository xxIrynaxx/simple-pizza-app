type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizzaName: Pizza;
  status: 'completed' | 'ordered';
};

let cashInRegister = 100;
let nextOrderId = 1;
let nextPizzaId = 1;
const orderQueue: Order[] = [];

const menu: Pizza[] = [
  { id: nextPizzaId++, name: 'Napoletana', price: 10 },
  { id: nextPizzaId++, name: 'Calzone', price: 8 },
  { id: nextPizzaId++, name: 'Siciliana', price: 9 },
  { id: nextPizzaId++, name: 'Romana', price: 9 },
];

function addNewPizza(pizza: Pizza): Pizza {
  menu.push(pizza);
  return pizza;
}

function placeOrder(pizza: Pizza): Order | undefined {
  const newOrder: Order = {
    id: nextOrderId++,
    pizzaName: pizza,
    status: 'ordered',
  };
  orderQueue.push(newOrder);
  cashInRegister += pizza.price;
  return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find(order => order.id === orderId);
  if (!order) {
    console.error(`${orderId} was not found in the orderQueue`);
    return;
  }
  order.status = 'completed';
  return order;
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
  if (typeof identifier === 'string') {
    return menu.find(
      pizza => pizza.name.toLowerCase() === identifier.toLowerCase()
    );
  } else if (typeof identifier === 'number') {
    return menu.find(pizza => pizza.id === identifier);
  } else {
    throw TypeError(
      'Parameter `identifier` must be either a string or a number'
    );
  }
}

function addToArray<T>(array: T[], item: T): T[] {
  array.push(item);
  return array;
}

addNewPizza({ id: nextPizzaId++, name: 'Pepperoni', price: 9 });
addNewPizza({ id: nextPizzaId++, name: 'Four cheeses', price: 10 });

placeOrder({ id: nextPizzaId++, name: 'Pepperoni', price: 9 });
placeOrder({ id: nextPizzaId++, name: 'Romana', price: 9 });

completeOrder(1);

getPizzaDetail(2);
getPizzaDetail('Siciliana');

addToArray(menu, { id: nextPizzaId++, name: 'Chicken Bacon Ranch', price: 12 });
addToArray<Order>(orderQueue, {
  id: nextOrderId++,
  pizzaName: menu[2],
  status: 'completed',
});

console.log('Menu: ', menu);
console.log('Cash in register: ', cashInRegister);
console.log('Order queue: ', orderQueue);
