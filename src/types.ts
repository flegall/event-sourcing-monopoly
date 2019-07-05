type Id = string;

export type Command =
  | Readonly<{ type: "InitGame"; players: ReadonlyArray<Id> }>
  | Readonly<{ type: "RollDices"; playerId: Id }>
  | Readonly<{ type: "BuyProperty"; playerId: Id; propertyId: Id }>
  | Readonly<{
      type: "BuyHouses";
      playerId: Id;
      propertyId: Id;
      housesNumber: number;
    }>
  | Readonly<{
      type: "SellHouses";
      playerId: Id;
      propertyId: Id;
      housesNumber: number;
    }>
  | Readonly<{
      type: "MortgageProperty";
      playerId: Id;
      propertyId: Id;
    }>;

export type Event =
  | Readonly<{ type: "GameInitiated"; players: ReadonlyArray<Id> }>
  | Readonly<{
      type: "QuestionAsked";
      question: Question;
    }>
  | Readonly<{ type: "TurnChanged"; nextTurn: number }>
  | Readonly<{ type: "PlayerChanged"; playerId: Id }>
  | Readonly<{
      type: "PlayerPositionChanged";
      nextPosition: number;
      playerId: Id;
    }>
  | Readonly<{
      type: "PlayerMoneyCredit";
      playerId: Id;
      amount: number;
      transactionId: Id;
    }>
  | Readonly<{
      type: "PlayerMoneyDebit";
      playerId: Id;
      amount: number;
      transactionId: Id;
    }>
  | Readonly<{
      type: "BankMoneyCredit";
      playerId: Id;
      amount: number;
      transactionId: Id;
    }>
  | Readonly<{
      type: "BankMoneyDebit";
      playerId: Id;
      amount: number;
      transactionId: Id;
    }>
  | Readonly<{
      type: "PropertyAcquired";
      playerId: Id;
      propertyId: Id;
      transactionId: Id;
    }>
  | Readonly<{
      type: "RentPaid";
      visitingPlayerId: Id;
      ownerPlayerId: Id;
      transactionId: Id;
    }>;

export type State =
  | Readonly<{
      started: true;
      players: ReadonlyArray<Player>;
      places: ReadonlyArray<Place>;
      currentPlayerId: Id;
      askingQuestion: null | Question;
    }>
  | Readonly<{ started: false }>;

export type Player = Readonly<{
  id: Id;
  position: number;
}>;

export type Place =
  | Readonly<{
      type: "StartCase";
      position: 0;
    }>
  | Readonly<{
      type: "Property";
      name: string;
      position: number;
      ownedByPlayer: Id | null;
    }>
  | Readonly<{
      type: "RailwayStation";
      name: string;
      position: number;
      ownedByPlayer: Id;
    }>
  | Readonly<{
      type: "Jail";
      position: 30;
    }>;

type Question = "DO_YOU_WANT_TO_BUY_PROPERTY";
