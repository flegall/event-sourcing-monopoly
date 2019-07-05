import { State, Event } from "./types";
import { apply } from "./apply";
import { defaultPlaces, aPlayer, aStartedState } from "./builders";

describe("apply()", () => {
  describe("GameInitiated", () => {
    xit("should reset the current game", () => {
      const state: State = {
        started: true,
        currentPlayerId: "b",
        players: [
          { id: "a", position: 7 },
          { id: "b", position: 13 },
          { id: "c", position: 17 },
        ],
        places: [
          { type: "StartCase", position: 0 },
          {
            type: "Property",
            position: 1,
            ownedByPlayer: "a",
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
        ],
        askingQuestion: null,
      };

      const event: Event = {
        type: "GameInitiated",
        players: ["a", "b"],
      };
      const finalState: State = apply(state, event);

      expect(finalState).toEqual({
        started: true,
        currentPlayerId: "a",
        players: [{ id: "a", position: 0 }, { id: "b", position: 0 }],
        places: defaultPlaces(),
        askingQuestion: null,
      });
    });
  });

  describe("PlayerPositionChanged", () => {
    xit("should increase a players position", () => {
      const players = [aPlayer({ id: "a", position: 0 }), aPlayer({ id: "b" })];
      const state = aStartedState({ currentPlayerId: "a", players });

      const event: Event = {
        type: "PlayerPositionChanged",
        nextPosition: 2,
        playerId: "a",
      };
      const finalState: State = apply(state, event);

      expect(finalState).toEqual(
        aStartedState({
          currentPlayerId: "a",
          players: [aPlayer({ id: "a", position: 2 }), aPlayer({ id: "b" })],
        }),
      );
    });
  });

  describe("QuestionAsked", () => {
    xit("should ask a question to the current player", () => {
      const players = [aPlayer({ id: "a", position: 2 }), aPlayer({ id: "b" })];
      const state = aStartedState({ currentPlayerId: "a", players });

      const event: Event = {
        type: "QuestionAsked",
        question: "DO_YOU_WANT_TO_BUY_PROPERTY",
      };
      const finalState: State = apply(state, event);

      expect(finalState).toEqual(
        aStartedState({
          currentPlayerId: "a",
          players,
          askingQuestion: "DO_YOU_WANT_TO_BUY_PROPERTY",
        }),
      );
    });
  });
});
