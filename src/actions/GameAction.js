//TOGGLE_GAME
//UPDATE_SCORE

export const toggleGameAction = (game) => ({
    type: "TOGGLE_GAME",
    game // { type: "Addition", start: true }
});

export const updateScoreAction = (game) => ({
    type: "UPDATE_SCORE",
    game // { type: "Addition", score: 5 }
});