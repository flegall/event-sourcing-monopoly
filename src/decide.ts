import { rollDices } from "./dices";
import { Command, Event, State } from "./types";

export const decide = (
  state: State,
  command: Command,
): ReadonlyArray<Event> => {
  const events: Event[] = [];

  return events;
};
