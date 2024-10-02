type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
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

function placeOrder(pizzaName: string): Order | undefined {
  const findPizza = menu.find(pizza => pizza.name.toLowerCase() === pizzaName);

  if (!findPizza) {
    return undefined;
  }

  const newOrder: Order = {
    id: nextOrderId++,
    pizza: findPizza,
    status: 'ordered',
  };
  orderQueue.push(newOrder);
  cashInRegister += findPizza.price;
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
  return menu.find(
    pizza =>
      (typeof identifier === 'string' &&
        pizza.name.toLowerCase() === identifier.toLowerCase()) ||
      (typeof identifier === 'number' && pizza.id === identifier)
  );
}

function addToArray<T>(array: T[], item: T): T[] {
  array.push(item);
  return array;
}

addNewPizza({ id: nextPizzaId++, name: 'Pepperoni', price: 9 });
addNewPizza({ id: nextPizzaId++, name: 'Four cheeses', price: 10 });

placeOrder('Pepperoni');
placeOrder('Romana');

completeOrder(1);

getPizzaDetail(2);
getPizzaDetail('Siciliana');

addToArray(menu, { id: nextPizzaId++, name: 'Chicken Bacon Ranch', price: 12 });
addToArray<Order>(orderQueue, {
  id: nextOrderId++,
  pizza: menu[2],
  status: 'completed',
});

console.log('Menu: ', menu);
console.log('Cash in register: ', cashInRegister);
console.log('Order queue: ', orderQueue);
