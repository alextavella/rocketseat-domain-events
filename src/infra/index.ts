import { Invoice } from "../bounded-contexts/fiscal/invoice";
import { InvoiceCreatedEvent } from "../bounded-contexts/fiscal/invoice-created";
import { InvoicePaidEvent } from "../bounded-contexts/fiscal/invoice-paid";
import { Order } from "../bounded-contexts/sales/order";
import { OrderCreatedEvent } from "../bounded-contexts/sales/order-created";
import { OrderPaidEvent } from "../bounded-contexts/sales/order-paid";
import { DomainEvents } from "../core/DomainEvents";
import { Repository } from "../core/Repository";
import { delay } from "./delay";

// Subscribers
DomainEvents.registerSubscriber(OrderCreatedEvent.name, (event) => {
  console.log(`1. order created`);

  const invoice = Invoice.create({ orderId: event.order.id });

  DomainEvents.dispatchEventsForEntity(invoice.id);
});

DomainEvents.registerSubscriber(OrderPaidEvent.name, (event) => {
  console.log("4. order paid");
});

DomainEvents.registerSubscriber(InvoiceCreatedEvent.name, async (event) => {
  console.log("2. invoice created");

  const invoice = await Repository.invoiceDB.findOne(event.invoice.id);

  if (invoice) {
    await delay(1000);

    invoice.pay();

    DomainEvents.dispatchEventsForEntity(invoice.id);
  }
});

DomainEvents.registerSubscriber(InvoicePaidEvent.name, async (event) => {
  console.log("3. invoice paid");

  const order = await Repository.ordersDB.findOne(event.invoice.orderId);

  if (order) {
    order.pay();

    DomainEvents.dispatchEventsForEntity(event.invoice.orderId);
  }
});

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
