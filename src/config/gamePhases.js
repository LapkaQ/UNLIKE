// Navigation/Screen states
export const SCREEN = {
  MAIN_MENU: "main_menu",
  DEVICE_SELECT: "device_select",
  MODE_SELECT: "mode_select",
  LOBBY: "lobby",
  GAME: "game",
};

// Device types (single vs multi)
export const DEVICE_TYPE = {
  SINGLE_DEVICE: "single_device",
  MULTI_DEVICE: "multi_device",
};

// Game modes (type of gameplay)
export const GAME_MODE = {
  SAME_QUESTION: "same_question",
  DIFFERENT_QUESTION: "different_question",
  IMPOSTOR: "impostor",
};

// Game phases (within an active game)
export const GAME_PHASES = {
  LOBBY: "lobby",
  ASSIGNMENT: "assignment",
  GAME: "game",
  VOTING: "voting",
  RESULTS: "results",
};
