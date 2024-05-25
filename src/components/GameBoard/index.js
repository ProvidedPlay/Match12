import { Grid, VStack, Heading, Button, HStack} from "@chakra-ui/react";
import { useGameManagerContext } from "../../context/GameManagerProvider.js";
import useGameBoardRefresher from "../../hooks/useGameBoardRefresher";
import CharacterCard from "../CharacterCard";
import SettingsMenu from "../SettingsMenu";
import "./style.css"


const RenderCard = (cardData, key, cardBack) => {

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

    const { setUpCardIndexArray } = useGameBoardRefresher();
    const {
        playableCards,
        cardIndexArray,
        currentCardBack,
        onOpen //"Reset Game" button activates the Chakra UI custom hook 'useDisclosure' method

    } = useGameManagerContext() //all of these are either state or state changers stored in my context component "GameManagerProvider"

    const addPlayableCardsToGameBoard = () => {
        return(
            cardIndexArray.map((index, key) => (RenderCard(playableCards[index], key, currentCardBack)))
        )
    }


    return(
        <VStack background="darkblue"> 
            <Heading as="h1" color="white" height="8%">
                Star Wars Card Matcher
            </Heading>
            <HStack spacing="4vw" maxHeight="5vh">
                <Button onClick = {setUpCardIndexArray} colorScheme="blue">Reset Game</Button>
                <Button onClick = {onOpen} colorScheme="blue"> Game Settings </Button>
            </HStack>
            <SettingsMenu></SettingsMenu>
            <Grid templateColumns="repeat(4,1fr)" gap={3} minHeight="89.6vh">
                {addPlayableCardsToGameBoard()}
            </Grid>
        </VStack>

    )
}

export default GameBoard;