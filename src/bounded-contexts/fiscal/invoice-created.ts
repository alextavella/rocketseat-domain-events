import { DomainEvent } from "../../core/DomainEvent";
import { Invoice } from "./invoice";

export class InvoiceCreatedEvent implements DomainEvent {
  public createdAt: Date;
  public invoice: Invoice;

  constructor(invoice: Invoice) {
    this.createdAt = new Date();
    this.invoice = invoice;
  }

  getEntityId(): string {
    return this.invoice.id;
  }
}
