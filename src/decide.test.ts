import * as dices from "./dices";
import { Command } from "./types";
import { decide } from "./decide";
import { emptyState, aStartedState, aPlayer } from "./builders";

jest.mock("./dices");

describe("decide()", () => {
  describe("InitGame command", () => {
    it("should emit GameInitiated event", () => {
      const players = ["a", "b", "c", "d"];
      const state = emptyState();

      const command: Command = {
        type: "InitGame",
        players,
      };
      const events = decide(state, command);

      expect(events).toEqual([{ type: "GameInitiated", players }]);
    });
  });

  describe("RollDices", () => {
    it(`should reject RollDices when an unwanted player roll dices`, () => {
      const players = [aPlayer({ id: "a" }), aPlayer({ id: "b" })];
      const state = aStartedState({ currentPlayerId: "b", players });

      const command: Command = {
        type: "RollDices",
        playerId: "a",
      };
      const events = decide(state, command);

      expect(events).toEqual([]);
    });

    it(`should ask a buy property question and move player when visiting an unowned property`, () => {
      const players = [aPlayer({ id: "a", position: 0 }), aPlayer({ id: "b" })];
      const state = aStartedState({ currentPlayerId: "a", players });
      (dices.rollDices as any).mockReturnValue(2);

      const command: Command = {
        type: "RollDices",
        playerId: "a",
      };
      const events = decide(state, command);

      expect(events).toEqual([
        {
          type: "PlayerPositionChanged",
          nextPosition: 2,
          playerId: "a",
        },
        {
          type: "QuestionAsked",
          question: "DO_YOU_WANT_TO_BUY_PROPERTY",
        },
      ]);
    });
  });
});
