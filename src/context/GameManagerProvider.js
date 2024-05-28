import { createContext, useContext, useState, useMemo, React } from "react";
import { useDisclosure } from "@chakra-ui/react";
import characters from "../characters.json"
import cardBacks from "../cardBacks.json"
import backgrounds from "../backgroundArt.json"

const GameManagerContext = createContext();

const importedCardArray = characters;
const importedCardBackArray = cardBacks;
const importedBackgroundArtArray = backgrounds;

const GameManagerProvider = ({children}) => {
    const [playableCards, setPlayableCards] = useState(importedCardArray);
    const [cardIndexArray, setCardIndexArray] = useState([]);
    const [currentCardBack, setCurrentCardBack] = useState(importedCardBackArray[0])
    const [backgroundArt, setBackgroundArt] = useState(importedBackgroundArtArray[0])
    const [numOfCardTypes, setNumOfCardTypes] = useState(8)
    const [numOfCardCopies, setNumOfCardCopies] = useState(2)
    const [backgroundArtArray, setBackgroundArtArray] = useState(importedBackgroundArtArray)
    const [cardBackArray, setCardBackArray] = useState(importedCardBackArray)
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure({defaultIsOpen: true});
    const { isOpen: gameOverScreenIsOpen, onOpen: onGameOverScreenOpen, onClose: onGameOverScreenClose, onToggle: onGameOverScreenToggle } = useDisclosure({defaultIsOpen: false});

    const [activeCards, setActiveCards] = useState([])
    const [gameBoardCardArray, setGameBoardCardArray] = useState([])

    const[gameRunning, setGameRunning] = useState(false)
    const[livesRemaining, setLivesRemaining] = useState(8)
    const[cardGroupsRemaining, setCardGroupsRemaining] = useState(8)

    const[gameWon, setGameWon] = useState(false)

    const context = useMemo(() => ({
        playableCards, setPlayableCards,
        cardIndexArray, setCardIndexArray,
        currentCardBack, setCurrentCardBack,
        backgroundArt, setBackgroundArt,
        backgroundArtArray, setBackgroundArtArray,
        numOfCardTypes, setNumOfCardTypes,
        numOfCardCopies, setNumOfCardCopies,
        cardBackArray, setCardBackArray,
        isOpen, onOpen, onClose, onToggle,
        gameOverScreenIsOpen, onGameOverScreenOpen, onGameOverScreenClose, onGameOverScreenToggle,
        activeCards, setActiveCards,
        gameRunning, setGameRunning,
        gameBoardCardArray, setGameBoardCardArray,
        livesRemaining, setLivesRemaining,
        cardGroupsRemaining, setCardGroupsRemaining,
        gameWon, setGameWon,
    }), [cardIndexArray, backgroundArt, isOpen, numOfCardCopies, numOfCardTypes, currentCardBack, activeCards, gameBoardCardArray, gameRunning, livesRemaining, cardGroupsRemaining, gameWon])

    return (
        <GameManagerContext.Provider value={context}> {children} </GameManagerContext.Provider>
    )
}

export const useGameManagerContext = () => useContext(GameManagerContext) //This is what all consumer components will import

export default GameManagerProvider; //Wrapper component in App.js