type EventStore<E> = Readonly<{
  saveEvent(event: E): void;
  getEvents(): ReadonlyArray<E>;
}>;

export class EventSourcing<S, C, E> {
  constructor(
    private decide: (state: S, command: C) => ReadonlyArray<E>,
    private apply: (state: S, event: E) => S,
    private state: S,
    private eventStore: EventStore<E>,
  ) {}

  public acceptCommand(command: C): void {}

  public get(): S {
    return this.state;
  }
}
