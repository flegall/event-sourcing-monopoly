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
  ) {
    this.state = this.applyEvents(eventStore.getEvents(), this.state);
  }

  public acceptCommand(command: C): void {
    const events = this.decide(this.state, command);
    events.forEach(event => this.eventStore.saveEvent(event));
    this.state = this.applyEvents(events, this.state);
  }

  public get(): S {
    return this.state;
  }

  private applyEvents(events: ReadonlyArray<E>, initialState: S): S {
    return events.reduce(
      (state, event) => this.apply(state, event),
      initialState,
    );
  }
}
