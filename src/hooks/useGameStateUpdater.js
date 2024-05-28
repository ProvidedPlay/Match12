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
        gameBoardCardArray,
    } = useGameManagerContext()


    const processCardFlip = async(currentCardIndex) => {
        const currentCard = gameBoardCardArray[currentCardIndex]

        
        //console.log(currentCard.gameBoardLocationIndex)
        setGameRunning(false)
        await revealCard(currentCard)
        //checkAgainstRevealedCards(currentCard)

    }

    const revealCard = async(currentCard)=>{
        currentCard.cardRevealed = true

        const newRevealedCards = activeCards.concat({gameBoardLocationIndex: currentCard.cardIndex, title: currentCard.cardTitle, card: currentCard})
        setActiveCards(newRevealedCards)
        //console.log("current card added to revealed cards" + activeCards.length)

        await checkAgainstRevealedCards(currentCard, newRevealedCards)
    }

    const checkAgainstRevealedCards = async(currentCard, revealedCards) => {
        console.log("current card:" + currentCard.key + "new revealed cards: " + revealedCards )
        if(revealedCards[0].card.title === currentCard.title){//in the case of one card in the array (first card clicked), the 0th index card would be the current card so their names would match and the round continues
            if(revealedCards.length < numOfCardCopies){
                //continue round
                await continueRound()
                //console.log("roundContinues"+newRevealedCards.length + currentCard.key)
                return null
            }
            else{
                //end round winner
                await endRound(true, revealedCards)
                return null
            }
        }
        else{
            //end round loser
            await endRound(false, revealedCards)
            return null
        }
    }

    const continueRound = async() =>{
        await delay(50)
        setGameRunning(true)
    }

    const endRound = async(roundWon, revealedCards) =>{
        let currentLivesRemaining = livesRemaining
        let currentCardGroupsRemaining = cardGroupsRemaining
        await delay(1000)

        if(!roundWon){
            resetRevealedCards(revealedCards)
            currentLivesRemaining -= 1
            //console.log("round lost, lives remaining:" + currentLivesRemaining)
        }
        if(roundWon){
            removeRevealedCards(revealedCards)
            currentCardGroupsRemaining -= 1
            //console.log("round won, card groups remaining:" + currentCardGroupsRemaining)
        }

        setActiveCards([])

        setLivesRemaining(currentLivesRemaining)
        setCardGroupsRemaining(currentCardGroupsRemaining)
        
        if(currentLivesRemaining <= 0){
            triggerGameOver(false)
            return null
        }
        if(currentCardGroupsRemaining<=0){
            triggerGameOver(true)
            return null
        }



        setGameRunning(true)
        //console.log(roundWon? "winner" : "loser " + currentCard.key)
    }

    const resetRevealedCards = (revealedCards) =>{
        //currentCard.cardRevealed = false
        //console.log("resetCards"+activeCards.length)
        revealedCards.forEach((revealedCard) => {
            revealedCard.card.cardRevealed = false
            //console.log("cardsReset" + revealedCard.card.key)

        })
    }

    const removeRevealedCards = (revealedCards) =>{
        //currentCard.cardSolved = true
        revealedCards.forEach((revealedCard) => {
            revealedCard.card.cardSolved = true
        })
    }

    const triggerGameOver = (gameWon) =>
    {
        setGameRunning(false)
        setGameWon(gameWon)
        onGameOverScreenOpen()
        //console.log(gameWon? "you win" : "you lose")
    }

    return(
        {processCardFlip}
    )
}

export default useGameStateUpdater;