const EDITOR_HEADER_TOOLS_ON = "Все слайды";
const EDITOR_HEADER_TOOLS_OFF = "Вернуться к списку";
const PASSWORD_REG_EXP = new RegExp(
  "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$"
  // "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$"
);

export { EDITOR_HEADER_TOOLS_ON, EDITOR_HEADER_TOOLS_OFF, PASSWORD_REG_EXP };
