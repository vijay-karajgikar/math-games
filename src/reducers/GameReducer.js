const defaultGameState = [{
    type: "Addition",
    score: 0,
    inProgress: false
}]

export default (state = defaultGameState, action) => {

    switch (action.type) {

        default:
            return state;

        case "TOGGLE_GAME":
            //Find the game and set inProgress to true
            return state.map((game) => {
                if (game.type == action.game.type) {
                    return { ...game, inProgress: action.game.inProgress }
                } else {
                    return game;
                }
            });

        case "UPDATE_SCORE":
            //Find the game and add or subtract the score
            return state.map((game) => {
                if (game.type === action.game.type) {
                    return { ...game, score: action.game.score };
                } else {
                    return game;
                }
            });

    }

}