import { useGameManagerContext } from "../context/GameManagerProvider.js";
import CharacterCard from "../components/CharacterCard"



function useGameBoardRefresher() {
    const {
        playableCards,
        setCardIndexArray,
        numOfCardTypes,
        numOfCardCopies,
        setGameBoardCardArray,
        currentCardBack,
        setGameRunning,
    
    } = useGameManagerContext()

    const startGame = () =>{
        setGameRunning(true)
        setUpCardIndexArray()
    }

    const setUpCardIndexArray = () =>{

        const newIndexArray = (instantiateIndexArray(numOfCardTypes));
        const modifiedIndexArray = shuffleCardIndexArray(duplicateCardArray(newIndexArray, numOfCardCopies))
        
        addPlayableCardsToGameBoard(modifiedIndexArray)
        setCardIndexArray(modifiedIndexArray);
        
    }
    
    const instantiateIndexArray = (numOfCardGroups) => [...Array(numOfCardGroups).keys()]
    
    const duplicateCardArray = (originalArray, numOfinstances) => [...Array(numOfinstances).keys()].flatMap(() => originalArray)
       
    const shuffleCardIndexArray = (inputCardIndexArray) => {
        
        return inputCardIndexArray.map((inputCardIndex) => ({ sort: Math.random(), value: inputCardIndex}))
            .sort((inputCardIndex, nextInputCardIndex) => inputCardIndex.sort - nextInputCardIndex.sort)
            .map((inputCardIndex) => inputCardIndex.value)
    
    
    }

    const addPlayableCardsToGameBoard = (cardIndexArray) => {
        
        const newGameBoardCardArray = []
        cardIndexArray.map((index, key) => (newGameBoardCardArray.push(AddCardToGameBoardCardArray(playableCards[index], key, currentCardBack))))
        setGameBoardCardArray(newGameBoardCardArray)
        console.log(newGameBoardCardArray)
    }

    function AddCardToGameBoardCardArray(cardData, key, cardBack) {

        const newCardProps = 
            {
            key : cardData.title + key,
            gameBoardLocationIndex : key,
            title: cardData.title,
            imageSrc : cardData.imageSrc,
            cardBackImageSrc: cardBack.imageSrc,
            cardRevealed: false,
            currentImage: cardBack.imageSrc,
            }


        return(
            newCardProps
        )
    }

    return(
        {startGame}
    )

}





export default useGameBoardRefresher;