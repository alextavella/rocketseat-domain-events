import { Entity } from "../../core/Entity";
import { Repository } from "../../core/Repository";
import { InvoiceCreatedEvent } from "./invoice-created";
import { InvoicePaidEvent } from "./invoice-paid";

interface InvoiceProps {
  orderId: string;
  status: "pending" | "paid";
}
type InvoiceCreateProps = Partial<InvoiceProps> & {
  orderId: string;
};

export class Invoice extends Entity<InvoiceProps> {
  get orderId() {
    return this.props.orderId;
  }

  get status() {
    return this.props.status;
  }

  static create(props: InvoiceCreateProps) {
    props.status = "pending";

    const invoice = new Invoice(props);

    Repository.invoiceDB.create(invoice);

    invoice.addDomainEvent(new InvoiceCreatedEvent(invoice));

    return invoice;
  }

  public pay() {
    this.props.status = "paid";

    Repository.invoiceDB.update(this);

    this.addDomainEvent(new InvoicePaidEvent(this));
  }
}
