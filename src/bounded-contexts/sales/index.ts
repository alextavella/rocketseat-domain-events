import { DomainEvents } from "../../core/DomainEvents";
import { Invoice } from "../fiscal/invoice";
import { OrderCreatedEvent } from "./order-created";
import { OrderPaidEvent } from "./order-paid";

// Subscribers
DomainEvents.registerSubscriber(OrderCreatedEvent.name, (event) => {
  console.log(`1. order created`);
  console.log(event);

  const invoice = Invoice.create({ orderId: event.order.id });

  DomainEvents.dispatchEventsForEntity(invoice.id);
});

DomainEvents.registerSubscriber(OrderPaidEvent.name, (event) => {
  console.log("4. order paid");
  console.log(event);
});
