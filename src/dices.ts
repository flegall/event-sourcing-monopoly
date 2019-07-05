export const rollDices = (): number => {
  return getRandomInt(6) + getRandomInt(6);
};

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}
