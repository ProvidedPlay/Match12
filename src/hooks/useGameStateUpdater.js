import { useGameManagerContext } from "../context/GameManagerProvider.js";
import Card from "../components/CharacterCard"
import delay from "../utilities/delay.js"

const useGameStateUpdater = () => {

    const {
        revealedCards, setRevealedCards,
        numOfCardCopies,
        setGameRunning,

    } = useGameManagerContext()


    const processCardFlip = async(currentCard) => {
        
        const cardTitle = currentCard.title;
        const cardIndex = currentCard.gameBoardLocationIndex;
        
        //console.log(currentCard.gameBoardLocationIndex)
        setGameRunning(false)
        revealCard(currentCard)
        //checkAgainstRevealedCards(currentCard)

    }

    const revealCard = async(currentCard)=>{
        currentCard.cardRevealed = true

        const newRevealedCards = revealedCards.concat({gameBoardLocationIndex: currentCard.cardIndex, title: currentCard.cardTitle, card: currentCard})
        setRevealedCards(newRevealedCards)
        console.log("current card added to revealed cards" + revealedCards.length)

        checkAgainstRevealedCards(currentCard)
    }

    const checkAgainstRevealedCards = (currentCard) => {
        if(revealedCards.length===0 || revealedCards[0].card.title === currentCard.title){
            if(revealedCards.length < numOfCardCopies -1){
                //continue round
                continueRound()
                console.log("roundContinues"+revealedCards.length + currentCard.key)
                return null
            }
            else{
                //end round winner
                endRound(true, currentCard)
                return null
            }
        }
        else{
            //end round loser
            endRound(false, currentCard)
            return null
        }
    }

    const endRound = async(roundWon, currentCard) =>{
        await delay(1000)
        if(!roundWon){
            resetRevealedCards(currentCard)
        }
        setRevealedCards([])
        setGameRunning(true)
        console.log(roundWon? "winner" : "loser " + currentCard.key)
    }

    const continueRound = () =>{
        setGameRunning(true)
    }

    const resetRevealedCards = (currentCard) =>{
        currentCard.cardRevealed = false
        console.log("resetCards"+revealedCards.length)
        revealedCards.forEach((revealedCard) => {
            revealedCard.card.cardRevealed = false
            console.log("cardsReset" + revealedCard.card.key)

        })
    }

    return(
        {processCardFlip}
    )
}

export default useGameStateUpdater;