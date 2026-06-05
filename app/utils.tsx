import {Dimensions} from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const dotsToText: Record<string, string> = {
  "100000": "a",
  "101000": "b",
  "110000": "c",
  "110100": "d",
  "100100": "e",
  "111000": "f",
  "111100": "g",
  "101100": "h",
  "011000": "i",
  "011100": "j",
  "100010": "k",
  "101010": "l",
  "110010": "m",
  "110110": "n",
  "100110": "o",
  "111010": "p",
  "111110": "q",
  "101110": "r",
  "011010": "s",
  "011110": "t",
  "100011": "u",
  "101011": "v",
  "011101": "w",
  "110011": "x",
  "110111": "y",
  "100111": "z",
  "001101": ".",
  "001000": ",",
  "001110": "!",
  "001011": "?",
  "001100": ":",
  "001010": ";",
  "000011": "-",
  "010010": "/",
  "100001": "\\",
  "000010": "'",
  "000110": "*",
  "010111": "#",
  "010110": "@",
  "001111": "=",
  "000000": " ",
};

export const textToBraille: Record<string, string> = {
  "a":"⠁",
  "b":"⠃",
  "c":"⠉",
  "d":"⠙",
  "e":"⠑",
  "f":"⠋",
  "g":"⠛",
  "h":"⠓",
  "i":"⠊",
  "j":"⠚",
  "k":"⠅",
  "l":"⠇",
  "m":"⠍",
  "n":"⠝",
  "o":"⠕",
  "p":"⠏",
  "q":"⠟",
  "r":"⠗",
  "s":"⠎",
  "t":"⠞",
  "u":"⠥",
  "v":"⠧",
  "w":"⠺",
  "x":"⠭",
  "y":"⠽",
  "z":"⠵",
  ".":"⠲",
  ",":"⠂",
  "!":"⠖",
  "?":"⠦",
  ":":"⠒",
  ";":"⠆",
  "-":"⠤",
  "/":"⠌",
  "\\":"⠡",
  "'":"⠄",
  "*":"⠔",
  "#":"⠼",
  "@":"⠜",
  "=":"⠶",
  " ":"⠀",
}

export const brailleTextToNumber: Record<string, string> = {
  "a":"1",
  "b":"2",
  "c":"3",
  "d":"4",
  "e":"5",
  "f":"6",
  "g":"7",
  "h":"8",
  "i":"9",
  "j":"0",
};

export const getBrailleTextToNumberKeyByValue = (char: string): string => {
  return Object.keys(brailleTextToNumber).find(k => brailleTextToNumber[k] === char);
};

export const isCharAlphaNum = (char: string): boolean => {
  return char >= 'a' && char <= 'j';
};

export const isCharNum = (char: string): boolean => {
  return char >= '0' && char <= '9';
};

export const charToNum = (char: string): string => {
  if(char.length == 1){
    return brailleTextToNumber[char];
  } else {
    return "";
  }
};

export default isCharAlphaNum;