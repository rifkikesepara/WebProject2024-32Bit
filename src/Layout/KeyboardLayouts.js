export const NumericLayout = {
  default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {tick}"],
  shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp}"],
};

export const CashierLayout = {
  default: ["{cancel} +/- {bksp}", "1 2 3", "4 5 6", "7 8 9", "00 0 ."],
};

export const EnglishLayout = {
  default: [
    "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} q w e r t y u i o p [ ] \\",
    "{lock} a s d f g h j k l ; ' {enter}",
    "{shift} z x c v b n m , . / {shift}",
    ".com @ {space}",
  ],
  shift: [
    "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
    "{tab} Q W E R T Y U I O P { } |",
    '{lock} A S D F G H J K L : " {enter}',
    "{shift} Z X C V B N M < > ? {shift}",
    ".com @ {space}",
  ],
};

export const TurkishLayout = {
  default: [
    '" 1 2 3 4 5 6 7 8 9 0 * - # {bksp}',
    "{tab} q w e r t y u ı o p ğ ü [ ]",
    "{lock} a s d f g h j k l ş i , {enter}",
    "{shift} < z x c v b n m ö ç . | $ € {shift}",
    ".com @ {space}",
  ],
  shift: [
    "é ! ' ^ + % & / ( ) = ? _ ~ {bksp}",
    "{tab} Q W E R T Y U I O P Ğ Ü { }",
    "{lock} A S D F G H J K L Ş İ ; {enter}",
    "{shift} > Z X C V B N M Ö Ç : \\ ` ´ {shift}",
    ".com @ {space}",
  ],
};
