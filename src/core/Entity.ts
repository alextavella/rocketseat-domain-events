import { randomUUID } from "node:crypto";
import { DomainEvent } from "./DomainEvent";
import { DomainEvents } from "./DomainEvents";

export abstract class Entity<Props> {
  protected readonly _id: string;
  protected readonly _createdAt: Date;

  protected props: Props;
  private _domainEvents: DomainEvent[] = [];

  protected constructor(props: Partial<Props>, id?: string) {
    this.props = props as Props;
    this._id = id ?? randomUUID();
    this._createdAt = new Date(Date.now());
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get domainEvents() {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent) {
    this._domainEvents.push(domainEvent);
    DomainEvents.markEntityForDispatch(this);
  }

  public clearEvents() {
    this._domainEvents = [];
  }
}
