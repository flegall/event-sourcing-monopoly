import { rollDices } from "./dices";
import { Command, Event, State } from "./types";

export const decide = (
  state: State,
  command: Command,
): ReadonlyArray<Event> => {
  const events: Event[] = [];
  if (command.type === "InitGame") {
    return [{ type: "GameInitiated", players: command.players }];
  }
  if (state.started) {
    if (command.type === "RollDices") {
      if (state.currentPlayerId === command.playerId) {
        const player = state.players.find(p => p.id === command.playerId);
        if (player) {
          const position = player.position;
          const dices = rollDices();
          const nextPosition = position + dices;
          const place = state.places[nextPosition];
          events.push({
            type: "PlayerPositionChanged",
            nextPosition,
            playerId: command.playerId,
          });

          if (place.type === "Property") {
            if (place.ownedByPlayer === null) {
              events.push({
                question: "DO_YOU_WANT_TO_BUY_PROPERTY",
                type: "QuestionAsked",
              });
            }
          }
        }
      }
    }
  }
  return events;
};
