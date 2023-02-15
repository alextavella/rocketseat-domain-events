import "./infra/setup";

import { Order } from "./bounded-contexts/sales/order";
import { DomainEvents } from "./core/DomainEvents";

// Publisher
const order = Order.create({
  customerId: "customer-1",
  productId: "product-1",
  amountInCents: 1000,
  status: "pending",
});

// order.pay();

// Dentro da camada de persistência (repositório / active record)
// Atestado de finalização do processo de venda
DomainEvents.dispatchEventsForEntity(order.id);
