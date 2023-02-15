import { Entity } from "../../core/Entity";
import { Repository } from "../../core/Repository";
import { OrderCreatedEvent } from "./order-created";
import { OrderPaidEvent } from "./order-paid";

interface OrderProps {
  customerId: string;
  productId: string;
  amountInCents: number;
  status: "pending" | "paid";
}
type CreateOrderProps = Partial<OrderProps> & {
  customerId: string;
  productId: string;
  amountInCents: number;
};

export class Order extends Entity<OrderProps> {
  get customerId() {
    return this.props.customerId;
  }

  get productId() {
    return this.props.productId;
  }

  get amountInCents() {
    return this.props.amountInCents;
  }

  get status() {
    return this.props.status;
  }

  public pay() {
    this.props.status = "paid";

    Repository.ordersDB.update(this);

    this.addDomainEvent(new OrderPaidEvent(this));
  }

  static create(props: CreateOrderProps, id?: string) {
    props.status = "pending";

    const order = new Order(props, id);

    if (!id) {
      Repository.ordersDB.create(order);

      order.addDomainEvent(new OrderCreatedEvent(order));
    }

    return order;
  }
}
