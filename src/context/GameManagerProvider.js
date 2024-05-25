import { createContext, useContext, useState, useMemo, React } from "react";
import characters from "../characters.json"
import cardBacks from "../cardBacks.json"

const GameManagerContext = createContext();

//const importedCardArray = characters;
//const importedCardBackArray = cardBacks;

const gameSettingsValues = "test"
const gameSettingsSecondValue = "foobar"

const GameManagerProvider = ({children}) => {
    const [gameSettingsTestValue, setGameSettingsTestValue] = useState(gameSettingsValues)
    const [gameSettingsSecondTestValue, setGameSettingsSecondTestValue] = useState(gameSettingsSecondValue)
    //const [playableCards, setPlayableCards] = useState(importedCardArray);
    //const [cardIndexArray, setCardIndexArray] = useState([]);
    //const [currentCardBack, setCurrentCardBack] = useState(importedCardBackArray[0])
    //const [numOfCardTypes, setNumOfCardTypes] = useState(8)
    //const [numOfCardCopies, setNumOfCardCopies] = useState(2)

    const context = useMemo(() => ({
        gameSettingsSecondTestValue, setGameSettingsSecondTestValue,
        gameSettingsTestValue, setGameSettingsTestValue
    }), [gameSettingsTestValue, gameSettingsSecondTestValue])

    return (
        <GameManagerContext.Provider value={context}> {children} </GameManagerContext.Provider>
    )
}

export const useGameManagerContext = () => useContext(GameManagerContext)

export default GameManagerProvider;