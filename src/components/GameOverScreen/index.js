import { React } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Box, Button, Heading } from "@chakra-ui/react"

import { useGameManagerContext } from "../../context/GameManagerProvider";
import useGameBoardRefresher from "../../hooks/useGameBoardRefresher";

const GameOverScreen = () => {

    const {
        gameOverScreenIsOpen, onGameOverScreenClose,
        gameWon,

    } = useGameManagerContext()

    const { startGame } = useGameBoardRefresher()
    
    function closeAndStartNewGame(){
        onGameOverScreenClose()
        startGame()
    }

    const gameOverMessage = gameWon? "Congratulations! You Won!" : "So close... Try again."

    return(
        <Modal isOpen={gameOverScreenIsOpen} onClose={onGameOverScreenClose} closeOnOverlayClick={false}>
                <ModalOverlay/>
                <ModalContent background="midnightBlue" border="solid black" borderWidth=".4vw">
                    <ModalBody pt="13%">
                        <Box
                            background = "darkblue"
                            color="white"
                            rounded = "md"
                            shadow = "xl"
                            border="solid black"
                            borderWidth=".3vw"
                            p= "40px"
                        >
                            <Heading>{gameOverMessage}</Heading>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={closeAndStartNewGame}>
                            Start New Game
                        </Button>
                    </ModalFooter>
                </ModalContent>


            </Modal>
    )
}

export default GameOverScreen;