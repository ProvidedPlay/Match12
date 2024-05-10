import { Grid, VStack, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import CharacterCard from "../CharacterCard"
import characters from "../../characters.json"

const importedCardArray = characters;


const RenderCard = (cardData) => {

    return(
        <CharacterCard
        key = {cardData.title}
        title= {cardData.title}
        imageSrc = {cardData.imageSrc}
        />

    )
}


const GameBoard = () =>{
    const [playableCards, setPlayableCards] = useState(importedCardArray);
    const [cardIndexArray, setCardIndexArray] = useState([])

    useEffect( () => {
        setPlayableCards(importedCardArray)
        console.log(playableCards)
        UnpackCardIndexArray(8,2)
        ShuffleCardIndexArray()
    }, [cardIndexArray, playableCards])

    const UnpackCardIndexArray = (numOfCardGroups, numOfTimesRepeated) =>
        {
            let newCardIndexArray = []
            for(let i=1; i<= numOfTimesRepeated; i++){
                newCardIndexArray.push.apply(newCardIndexArray,[...Array(numOfCardGroups).keys()])
            }
            setCardIndexArray(newCardIndexArray)
            console.log(newCardIndexArray)
            console.log(cardIndexArray)
        }
       
    
    const ShuffleCardIndexArray = () => {
        let newCardIndexArray = cardIndexArray;
        
        for(let i= newCardIndexArray.length-1; i>0; i--){
            let randomIndex = Math.floor(Math.random() *i)
            let currentValue = newCardIndexArray[i]
            newCardIndexArray[i] = newCardIndexArray[randomIndex]
            newCardIndexArray[randomIndex] = currentValue
        }

        setCardIndexArray(newCardIndexArray);
        console.log(cardIndexArray)

    }

    const AddPlayableCardsToGameBoard = () => {
        //console.log(importedCardArray)
        return(
            cardIndexArray.map((index) => (RenderCard(playableCards[cardIndexArray[index]])))
        )
    }
    
    return(
        <VStack background="darkblue"  > 
            <Heading as="h1" color="white" height="8%">
                Game Board
            </Heading>
            <Grid templateColumns="repeat(4,1fr)" gap={3} minHeight="100vh">
                {AddPlayableCardsToGameBoard()}
            </Grid>
        </VStack>

    )
}

export default GameBoard;