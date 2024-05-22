import { Grid, VStack, Heading } from "@chakra-ui/react"
import { useState } from "react";
import CharacterCard from "../CharacterCard"
import characters from "../../characters.json"
import cardBacks from "../../cardBacks.json"


const importedCardArray = characters;
const importedCardBackArray = cardBacks;

const renderCard = (cardData, key, cardBack) => {

    return(
        <CharacterCard
        key = {cardData.title + key}
        title= {cardData.title}
        imageSrc = {cardData.imageSrc}
        cardBackImageSrc={cardBack.imageSrc}
        />

    )
}

const GameBoard = () =>{
    const [playableCards, setPlayableCards] = useState(importedCardArray);
    const [cardIndexArray, setCardIndexArray] = useState([]);
    const [currentCardBack, setCurrentCardBack] = useState(importedCardBackArray[3])

    function handleClick() {
        setUpCardIndexArray()
    }
    
    const setUpCardIndexArray = () =>{

        const newIndexArray = (instantiateIndexArray(8));
        const modifiedIndexArray = shuffleCardIndexArray(duplicateCardArray(newIndexArray, 2))

        setCardIndexArray(modifiedIndexArray);
    }

    const instantiateIndexArray = (numOfCardGroups) => [...Array(numOfCardGroups).keys()]

    const duplicateCardArray = (originalArray, numOfinstances) => [...Array(numOfinstances).keys()].flatMap(() => originalArray)
       
    const shuffleCardIndexArray = (inputCardIndexArray) => {
        
        return inputCardIndexArray.map((inputCardIndex) => ({ sort: Math.random(), value: inputCardIndex}))
            .sort((inputCardIndex, nextInputCardIndex) => inputCardIndex.sort - nextInputCardIndex.sort)
            .map((inputCardIndex) => inputCardIndex.value)


    }

    const addPlayableCardsToGameBoard = () => {
        return(
            cardIndexArray.map((index, key) => (renderCard(playableCards[index], key, currentCardBack)))
        )
    }
    
    return(
        <VStack background="darkblue"  > 
            <Heading as="h1" color="white" height="8%">
                Game Board
            </Heading>
            <button onClick = {handleClick}>Start!</button>
            <Grid templateColumns="repeat(4,1fr)" gap={3} minHeight="100vh">
                {addPlayableCardsToGameBoard()}
            </Grid>
        </VStack>

    )
}

export default GameBoard;