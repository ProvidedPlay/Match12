import { Grid, VStack, Heading } from "@chakra-ui/react"
import { useEffect, useState, useCallback } from "react";
import CharacterCard from "../CharacterCard"
import characters from "../../characters.json"
import { useForceUpdate } from "framer-motion";

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
    const [cardIndexArray, setCardIndexArray] = useState([])
    const [state, updateState] = useState()

    const forceUpdate = useCallback(() => updateState({}), [])

    function handleClick() {
        setUpGameBoard()
        forceUpdate()
    }
    
    const setUpGameBoard = () =>{
        unpackCardIndexArray(8,2)
        shuffleCardIndexArray()
    }

    const unpackCardIndexArray = (numOfCardGroups, numOfTimesRepeated) =>
        {
            let newCardIndexArray = []
            for(let i=1; i<= numOfTimesRepeated; i++){
                newCardIndexArray.push.apply(newCardIndexArray,[...Array(numOfCardGroups).keys()])
            }
            setCardIndexArray(newCardIndexArray)
        }
       
    
    const shuffleCardIndexArray = () => {
        
        let newCardIndexArray = cardIndexArray;
        
        for(let i= newCardIndexArray.length-1; i>0; i--){
            let randomIndex = Math.floor(Math.random() *i)
            let currentValue = newCardIndexArray[i]
            newCardIndexArray[i] = newCardIndexArray[randomIndex]
            newCardIndexArray[randomIndex] = currentValue
        }
        if(cardIndexArray.length>0){
            setCardIndexArray(newCardIndexArray)
            console.log(cardIndexArray)
        }

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