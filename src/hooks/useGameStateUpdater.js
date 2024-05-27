import { useGameManagerContext } from "../context/GameManagerProvider.js";
import Card from "../components/CharacterCard"
import delay from "../utilities/delay.js"

const useGameStateUpdater = () => {

    const {
        activeCards, setActiveCards,
        numOfCardCopies,
        setGameRunning,
        livesRemaining, setLivesRemaining,
        cardGroupsRemaining, setCardGroupsRemaining,
        setGameWon,
        onGameOverScreenOpen,
    } = useGameManagerContext()


    const processCardFlip = async(currentCard) => {
        

        
        //console.log(currentCard.gameBoardLocationIndex)
        setGameRunning(false)
        revealCard(currentCard)
        //checkAgainstRevealedCards(currentCard)

    }

    const revealCard = async(currentCard)=>{
        currentCard.cardRevealed = true

        const newRevealedCards = activeCards.concat({gameBoardLocationIndex: currentCard.cardIndex, title: currentCard.cardTitle, card: currentCard})
        setActiveCards(newRevealedCards)
        //console.log("current card added to revealed cards" + activeCards.length)

        checkAgainstRevealedCards(currentCard)
    }

    const checkAgainstRevealedCards = (currentCard) => {
        if(activeCards.length===0 || activeCards[0].card.title === currentCard.title){
            if(activeCards.length < numOfCardCopies -1){
                //continue round
                continueRound()
                //console.log("roundContinues"+activeCards.length + currentCard.key)
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

    const continueRound = () =>{
        setGameRunning(true)
    }

    const endRound = async(roundWon, currentCard) =>{
        let currentLivesRemaining = livesRemaining
        let currentCardGroupsRemaining = cardGroupsRemaining
        await delay(1000)

        if(!roundWon){
            resetRevealedCards(currentCard)
            currentLivesRemaining -= 1
            console.log("round lost, lives remaining:" + currentLivesRemaining)
        }
        if(roundWon){
            currentCardGroupsRemaining -= 1
            console.log("round won, card groups remaining:" + currentCardGroupsRemaining)
        }

        setActiveCards([])

        setLivesRemaining(currentLivesRemaining)
        setCardGroupsRemaining(currentCardGroupsRemaining)
        
        if(currentLivesRemaining <= 0){
            endGame(false)
            return null
        }
        if(currentCardGroupsRemaining<=0){
            endGame(true)
            return null
        }



        setGameRunning(true)
        //console.log(roundWon? "winner" : "loser " + currentCard.key)
    }

    const resetRevealedCards = (currentCard) =>{
        currentCard.cardRevealed = false
        //console.log("resetCards"+activeCards.length)
        activeCards.forEach((revealedCard) => {
            revealedCard.card.cardRevealed = false
            //console.log("cardsReset" + revealedCard.card.key)

        })
    }

    const endGame = (gameWon) =>
    {
        setGameRunning(false)
        setGameWon(gameWon)
        onGameOverScreenOpen()
        console.log(gameWon? "you win" : "you lose")
    }

    return(
        {processCardFlip}
    )
}

export default useGameStateUpdater;