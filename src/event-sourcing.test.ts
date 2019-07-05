import { EventSourcing } from "./event-sourcing";
import { decide } from "./decide";
import { apply } from "./apply";
import { State, Command, Event } from "./types";
import { defaultPlaces, emptyState } from "./builders";

describe("event sourcing", () => {
  it("should initialize the event-sourcing system and accept the InitGame command", () => {
    // given
    const saveEvent = jest.fn();
    const eventSourcing = new EventSourcing<State, Command, Event>(
      decide,
      apply,
      emptyState(),
      {
        saveEvent: saveEvent,
        getEvents: () => [],
      },
    );

    // when
    const players = ["a", "b"];
    const command: Command = {
      type: "InitGame",
      players,
    };
    eventSourcing.acceptCommand(command);

    // then
    expect(eventSourcing.get()).toEqual({
      started: true,
      currentPlayerId: "a",
      players: [{ id: "a", position: 0 }, { id: "b", position: 0 }],
      places: defaultPlaces(),
      askingQuestion: null,
    });
    expect(saveEvent).toHaveBeenCalledWith({
      type: "GameInitiated",
      players: ["a", "b"],
    });
  });

  it("should initialize the event-sourcing system from existing events", () => {
    // given
    const eventSourcing = new EventSourcing<State, Command, Event>(
      decide,
      apply,
      emptyState(),
      {
        saveEvent: () => {},
        getEvents: () => [
          {
            type: "GameInitiated",
            players: ["a", "b"],
          },
        ],
      },
    );

    // then
    expect(eventSourcing.get()).toEqual({
      started: true,
      currentPlayerId: "a",
      players: [{ id: "a", position: 0 }, { id: "b", position: 0 }],
      places: defaultPlaces(),
      askingQuestion: null,
    });
  });
});
