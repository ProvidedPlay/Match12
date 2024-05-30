import {Image, GridItem, Box, ScaleFade, useDisclosure} from "@chakra-ui/react";
import React, { useEffect } from "react";

import { useGameManagerContext } from "../../context/GameManagerProvider";
import  useGameStateUpdater  from "../../hooks/useGameStateUpdater"

const Card = ({gameBoardLocationIndex, imageSrc, cardBackImageSrc, cardRevealed, currentImage, cardSolved}) => {
    // Display the name and title on the card component when flipped
    const {
        gameRunning,
    } = useGameManagerContext();

    const {processCardFlip} = useGameStateUpdater()
    const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen:true})

    const attemptToRevealCard = () => {

        if (!cardRevealed && gameRunning){
            processCardFlip(gameBoardLocationIndex)
        }
    }

    const solveCard = () => {
        if(!cardSolved){
            onOpen()
        }
        if(cardSolved){
            onClose()
        }
    }

    useEffect(() => {
        solveCard();
    }, [cardSolved])

    return(
        <ScaleFade in={isOpen} initialScale={.95} transition={{ exit: {duration: 0.2} }}>
            <GridItem 
            id="characterCard"
            _hover={!cardRevealed? {cursor: "pointer", transform: "scale(1.03)", transitionProperty: "transform", transitionDuration: ".08s", transitionTimingFunction: "ease-in-out"} : {}}
            >
                <Box className={`flip-card ${cardRevealed ? "flipped" : ""}`} height={{base: "30vw", lg: "20vh"}} width={{base: "30vw", lg: "20vh"}} minHeight="5em" minWidth="5em" rounded="xl" borderColor="black" backgroundColor="black" p="5%" shadow="Dark lg" aspectRatio="1/1">
                    <Box className="flip-card-inner">
                        <Box className="flip-card-front">
                            <Box><Image src={cardBackImageSrc} alt="Card Image" height="100%" width="100%" rounded="xl" onClick={attemptToRevealCard} /></Box>
                        </Box>
                        <Box className="flip-card-back">
                            <Box><Image src={imageSrc} alt="Card Image" height="100%" width="100%" rounded="xl" /></Box>
                        </Box>
                    </Box>
                </Box>
            </GridItem>
        </ScaleFade>
    )
}

export default Card;