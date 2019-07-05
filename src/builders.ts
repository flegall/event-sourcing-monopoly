import { Place, State, Player } from "./types";

export const emptyState = (): State => ({
  started: false,
});

export const aStartedState = (partialState: Partial<State> = {}): State => ({
  started: true,
  players: [],
  places: defaultPlaces(),
  currentPlayerId: "a",
  askingQuestion: null,
  ...partialState,
});

export const defaultPlaces = (): Place[] => [
  { type: "StartCase", position: 0 },
  {
    type: "Property",
    position: 1,
    ownedByPlayer: null,
    name: "Rue de Vaugirard",
  },
  {
    type: "Property",
    position: 2,
    ownedByPlayer: null,
    name: "Rue de Courcelles",
  },
  {
    type: "Property",
    position: 2,
    ownedByPlayer: null,
    name: "Avenue de la République",
  },
];

export const aPlayer = (partialPlayer: Partial<Player>): Player => ({
  id: "a",
  position: 0,
  ...partialPlayer,
});
