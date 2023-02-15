import { DomainEvents } from "../../core/DomainEvents";
import { Repository } from "../../core/Repository";
import { delay } from "../../infra/delay";
import { InvoiceCreatedEvent } from "./invoice-created";
import { InvoicePaidEvent } from "./invoice-paid";

// Subscribers
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
