import { State, Event } from "./types";
import { defaultPlaces } from "./builders";

export const apply = (state: State, event: Event): State => {
  if (event.type === "GameInitiated") {
    return {
      started: true,
      places: defaultPlaces(),
      players: event.players.map(id => ({ id, position: 0 })),
      currentPlayerId: event.players[0],
      askingQuestion: null,
    };
  }

  if (event.type === "PlayerPositionChanged" && state.started) {
    return {
      ...state,
      players: state.players.map(player => {
        if (player.id === event.playerId) {
          return { ...player, position: event.nextPosition };
        } else {
          return player;
        }
      }),
    };
  }

  if (event.type === "QuestionAsked" && state.started) {
    return {
      ...state,
      askingQuestion: event.question,
    };
  }

  return state;
};
