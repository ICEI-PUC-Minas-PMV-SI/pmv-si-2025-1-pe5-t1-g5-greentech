const reset = "\x1b[0m";

const colorsMap = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 34,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  lightGray: 90,
  lightRed: 91,
  lightGreen: 92,
  lightYellow: 93,
  lightBlue: 94,
  lightMagenta: 95,
  lightCyan: 96,
  lightWhite: 97,
} as const;

type Colors = keyof typeof colorsMap;

const setColor = (color: Colors) => (text: string) => `\x1b[${colorsMap[color]}m${text}${reset}`;

const chalk = {
  black: setColor("black"),
  red: setColor("red"),
  green: setColor("green"),
  yellow: setColor("yellow"),
  blue: setColor("blue"),
};

export default chalk;