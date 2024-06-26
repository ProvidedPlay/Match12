import { Grid, VStack, Heading, Button, HStack} from "@chakra-ui/react";
import { useGameManagerContext } from "../../context/GameManagerProvider.js";
import useGameBoardRefresher from "../../hooks/useGameBoardRefresher";
import CharacterCard from "../CharacterCard";
import SettingsMenu from "../SettingsMenu";
import GameOverScreen from "../GameOverScreen/index.js";
import "./style.css"




const GameBoard = () =>{

    const { startGame } = useGameBoardRefresher();
    const {
        
        backgroundArt,
        gameBoardCardArray,
        livesRemaining,
        onOpen //"Reset Game" button activates the Chakra UI custom hook 'useDisclosure' method

    } = useGameManagerContext() //all of these are either state or state changers stored in my context component "GameManagerProvider"



    return(
        <VStack backgroundImage={backgroundArt.imageSrc} backgroundSize={["cover","cover", "cover", "100vw 100vh"]} backgroundColor="midnightblue" backgroundRepeat="no-repeat" backgroundPosition="top" backgroundAttachment="fixed" minHeight="100vh" > 
            <Heading as="h1" color="white" maxHeight="8vh" display={{base: "none", lg: "block"}}>
                Concentration: Star Wars Edition
            </Heading>
            <HStack spacing="3vw" height="5vh" p={{base: "1vh", lg: "none"}}>
                <Button size={{base: "sm", md: "md"}} onClick = {startGame} colorScheme="blue">Reset Game</Button>
                <Heading as="h3" size={{base:"md", md: "lg"}} color="white">Lives Remaining: {livesRemaining}</Heading>
                <Button size={{base: "sm", md: "md"}} onClick = {onOpen} colorScheme="blue"> Quit To Main Menu </Button>
            </HStack>
            <SettingsMenu></SettingsMenu>
            <GameOverScreen></GameOverScreen>
            <Grid templateColumns={["repeat(3,1fr)","repeat(3,1fr)","repeat(3,1fr)", "repeat(4,1fr)" ]} gap={3} minHeight="87vh">
                {gameBoardCardArray.map((gameBoardCardProps) => <CharacterCard className="characterCard" {...gameBoardCardProps}/>)}
            </Grid>
        </VStack>

    )
}

export default GameBoard;