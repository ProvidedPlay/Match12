import { Grid, VStack, Heading, Button, HStack} from "@chakra-ui/react";
import { useGameManagerContext } from "../../context/GameManagerProvider.js";
import useGameBoardRefresher from "../../hooks/useGameBoardRefresher";
import CharacterCard from "../CharacterCard";
import SettingsMenu from "../SettingsMenu";
import "./style.css"




const GameBoard = () =>{

    const { startGame } = useGameBoardRefresher();
    const {
        
        gameBoardCardArray,
        onOpen //"Reset Game" button activates the Chakra UI custom hook 'useDisclosure' method

    } = useGameManagerContext() //all of these are either state or state changers stored in my context component "GameManagerProvider"



    return(
        <VStack background="darkblue"> 
            <Heading as="h1" color="white" height="8%">
                Star Wars Card Matcher
            </Heading>
            <HStack spacing="4vw" maxHeight="5vh">
                <Button onClick = {startGame} colorScheme="blue">Reset Game</Button>
                <Button onClick = {onOpen} colorScheme="blue"> Game Settings </Button>
            </HStack>
            <SettingsMenu></SettingsMenu>
            <Grid templateColumns="repeat(4,1fr)" gap={3} minHeight="89.6vh">
                {gameBoardCardArray.map((gameBoardCardProps) => <CharacterCard {...gameBoardCardProps}/>)}
            </Grid>
        </VStack>

    )
}

export default GameBoard;