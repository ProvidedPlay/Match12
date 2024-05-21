import { Grid, VStack, Heading } from "@chakra-ui/react"
import { useState } from "react";
import CharacterCard from "../CharacterCard"
import characters from "../../characters.json"


const importedCardArray = characters;

const renderCard = (cardData, key) => {

    return(
        <CharacterCard
        key = {cardData.title + key}
        title= {cardData.title}
        imageSrc = {cardData.imageSrc}
        />

    )
}

const GameBoard = () =>{
    const [playableCards, setPlayableCards] = useState(importedCardArray);
    const [cardIndexArray, setCardIndexArray] = useState([]);

    function handleClick() {
        setUpGameBoard()
    }
    
    const setUpGameBoard = () =>{

        const newIndexArray = (instantiateIndexArray(8));
        const modifiedIndexArray = shuffleCardIndexArray(duplicateCardArray(newIndexArray, 2))

        setCardIndexArray(modifiedIndexArray);
    }

    const instantiateIndexArray = (numOfCardGroups) => [...Array(numOfCardGroups).keys()]

    const duplicateCardArray = (originalArray, numOfinstances) => [...Array(numOfinstances).keys()].flatMap(() => originalArray)
       
    const shuffleCardIndexArray = (inputCardIndexArray) => {
        
        let newCardIndexArray = inputCardIndexArray;
        
        for(let i= newCardIndexArray.length-1; i>0; i--){
            let randomIndex = Math.floor(Math.random() *i)
            let currentValue = newCardIndexArray[i]
            newCardIndexArray[i] = newCardIndexArray[randomIndex]
            newCardIndexArray[randomIndex] = currentValue
        }
        
        
        return newCardIndexArray


    }

    const addPlayableCardsToGameBoard = () => {
        return(
            cardIndexArray.map((index, key) => (renderCard(playableCards[index], key)))
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