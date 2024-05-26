import { createContext, useContext, useState, useMemo, React } from "react";
import { useDisclosure } from "@chakra-ui/react";
import characters from "../characters.json"
import cardBacks from "../cardBacks.json"

const GameManagerContext = createContext();

const importedCardArray = characters;
const importedCardBackArray = cardBacks;

const GameManagerProvider = ({children}) => {
    const [playableCards, setPlayableCards] = useState(importedCardArray);
    const [cardIndexArray, setCardIndexArray] = useState([]);
    const [currentCardBack, setCurrentCardBack] = useState(importedCardBackArray[0])
    const [numOfCardTypes, setNumOfCardTypes] = useState(8)
    const [numOfCardCopies, setNumOfCardCopies] = useState(2)
    const [cardBackArray, setCardBackArray] = useState(importedCardBackArray)
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure({defaultIsOpen: true});

    const [updatedNumOfCardTypes, setUpdatedNumOfCardTypes] = useState(numOfCardTypes)
    const [updatedNumOfCardCopies, setUpdatedNumOfCardCopies] = useState(numOfCardCopies)
    const [updatedCardBackNumber, setUpdatedCardBackNumber] = useState(0)

    const [revealedCards, setRevealedCards] = useState([])
    const [gameBoardCardArray, setGameBoardCardArray] = useState([])

    const[gameRunning, setGameRunning] = useState(false)

    const context = useMemo(() => ({
        playableCards, setPlayableCards,
        cardIndexArray, setCardIndexArray,
        currentCardBack, setCurrentCardBack,
        numOfCardTypes, setNumOfCardTypes,
        numOfCardCopies, setNumOfCardCopies,
        cardBackArray, setCardBackArray,
        isOpen, onOpen, onClose, onToggle,
        updatedNumOfCardTypes, setUpdatedNumOfCardTypes,
        updatedNumOfCardCopies, setUpdatedNumOfCardCopies,
        updatedCardBackNumber, setUpdatedCardBackNumber,
        revealedCards, setRevealedCards,
        gameRunning, setGameRunning,
        gameBoardCardArray, setGameBoardCardArray
    }), [cardIndexArray, isOpen, numOfCardCopies, numOfCardTypes, currentCardBack, revealedCards, gameBoardCardArray, gameRunning])

    return (
        <GameManagerContext.Provider value={context}> {children} </GameManagerContext.Provider>
    )
}

export const useGameManagerContext = () => useContext(GameManagerContext) //This is what all consumer components will import

export default GameManagerProvider; //Wrapper component in App.js