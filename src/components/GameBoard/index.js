import { Grid, VStack, Heading, useDisclosure, Button, Box, RadioGroup, HStack, Radio } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider } from "@chakra-ui/react"
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark } from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import "./style.js"
import CharacterCard from "../CharacterCard"
import characters from "../../characters.json"
import cardBacks from "../../cardBacks.json"
import { labelStyles } from "./style.js";


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
    const [numOfCardTypes, setNumOfCardTypes] = useState(8)
    const [numOfCardCopies, setNumOfCardCopies] = useState(2)
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure({defaultIsOpen: true});

    function handleResetGameClick() {
        setUpCardIndexArray()
    }
    
    const setUpCardIndexArray = () =>{

        const newIndexArray = (instantiateIndexArray(numOfCardTypes));
        const modifiedIndexArray = shuffleCardIndexArray(duplicateCardArray(newIndexArray, numOfCardCopies))

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

    function setCardBack(cardBackNumber) {
        setCurrentCardBack(importedCardBackArray[cardBackNumber])
        console.log(cardBackNumber)
    }
    
    function closeSettingsMenu(){
        onClose()
        setUpCardIndexArray()
    }

    return(
        <VStack background="darkblue"  > 
            <Heading as="h1" color="white" height="8%">
                Star Wars Card Matcher
            </Heading>
            <Button onClick = {handleResetGameClick} colorScheme="blue">Reset Game</Button>
            <Button onClick = {onOpen} colorScheme="blue"> Game Settings </Button>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay background="midnightblue"/>
                <ModalContent background="navy">
                    <ModalHeader color="white">Game Settings</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody p="5%">
                        <Box
                            background = "darkblue"
                            color="white"
                            rounded = "md"
                            shadow = "xl"
                            border="solid navy"
                            p= "40px"
                        >
                            <FormControl as="fieldset">
                                <FormLabel as="legend">Card Background</FormLabel>
                                <Menu>
                                    <MenuOptionGroup defaultValue='0' type="radio" onChange={setCardBack}>
                                        <MenuItemOption value="0">Imperial Black</MenuItemOption>
                                        <MenuItemOption value="1">Jedi Blue</MenuItemOption>
                                        <MenuItemOption value="2">Jedi Yellow</MenuItemOption>
                                        <MenuItemOption value="3">Rebel Green</MenuItemOption>
                                    </MenuOptionGroup>
                                </Menu>
                                <FormLabel as="legend" mt="8%"> Number of Card Types </FormLabel>
                                <Slider aria-label="slider-ex-6" min={1} max={8} onChange={(numOfCardTypes) => setNumOfCardTypes(numOfCardTypes)} mt="5%">
                                    <SliderMark value={1} {...labelStyles}>1</SliderMark>
                                    <SliderMark value={8} {...labelStyles}>8</SliderMark>
                                    <SliderMark
                                        value={numOfCardTypes}
                                        textAlign='center'
                                        color='white'
                                        mt="-10"
                                        ml="-5"
                                        w="12"
                                    >
                                        {numOfCardTypes}
                                    </SliderMark>
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb/>
                                </Slider> 
                                <FormLabel as="legend" mt="8%"> Number of Card Copies </FormLabel>
                                <Slider aria-label="slider-ex-6" min={2} max={4} onChange={(numOfCardCopies) => setNumOfCardCopies(numOfCardCopies)} mt="5%" >
                                    <SliderMark value={2} {...labelStyles}>2</SliderMark>
                                    <SliderMark value={4} {...labelStyles}>4</SliderMark>
                                    <SliderMark
                                        value={numOfCardCopies}
                                        textAlign='center'
                                        color='white'
                                        mt="-10"
                                        ml="-5"
                                        w="12"
                                    >
                                        {numOfCardCopies}
                                    </SliderMark>
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb/>
                                </Slider>

                            </FormControl>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={closeSettingsMenu}>
                            Save and Start Game
                        </Button>
                    </ModalFooter>
                </ModalContent>


            </Modal>
            <Grid templateColumns="repeat(4,1fr)" gap={3} minHeight="100vh">
                {addPlayableCardsToGameBoard()}
            </Grid>
        </VStack>

    )
}

export default GameBoard;