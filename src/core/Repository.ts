import { Invoice } from "../bounded-contexts/fiscal/invoice";
import { Order } from "../bounded-contexts/sales/order";
import { DB } from "../infra/db";

export class Repository {
  public static invoiceDB = new DB<Invoice>();
  public static ordersDB = new DB<Order>();
}
