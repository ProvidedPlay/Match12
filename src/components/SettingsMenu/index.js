import { React } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Box, Button } from "@chakra-ui/react"
import { Menu, MenuItemOption, MenuOptionGroup, } from "@chakra-ui/react";
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark } from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/react";

import { useGameManagerContext } from "../../context/GameManagerProvider";
import useGameBoardRefresher from "../../hooks/useGameBoardRefresher";
import useApplySettings from "../../hooks/useApplySettings";

const SettingsMenu = () => {

    const {

        currentCardBack, setCurrentCardBack,
        numOfCardTypes, setNumOfCardTypes,
        numOfCardCopies, setNumOfCardCopies,
        cardBackArray,
        isOpen, onClose,
        //updatedNumOfCardTypes, setUpdatedNumOfCardTypes,
        //updatedNumOfCardCopies, setUpdatedNumOfCardCopies,
        //updatedCardBackNumber, setUpdatedCardBackNumber,

    } = useGameManagerContext()

    const { setUpCardIndexArray } = useGameBoardRefresher()
    //const { applySettings } = useApplySettings()

    
    function closeSettingsMenu(){
        onClose()
        //applySettings()
        setUpCardIndexArray()
    }

    function setCardBack(cardBackNumber) {
        setCurrentCardBack(cardBackArray[cardBackNumber])
        console.log(cardBackNumber)
    }

    return(
        <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay/>
                <ModalContent background="midnightBlue">
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
                                    <MenuOptionGroup defaultValue={currentCardBack.id.toString()} type="radio" onChange={setCardBack}>
                                        <MenuItemOption className="menuOption" value="0">Imperial Black</MenuItemOption>
                                        <MenuItemOption className="menuOption" value="1">Jedi Blue</MenuItemOption>
                                        <MenuItemOption className="menuOption" value="2">Jedi Yellow</MenuItemOption>
                                        <MenuItemOption className="menuOption" value="3">Rebel Green</MenuItemOption>
                                    </MenuOptionGroup>
                                </Menu>
                                <FormLabel as="legend" mt="8%"> Number of Card Types </FormLabel>
                                <Slider aria-label="slider-ex-6" min={1} max={8} onChange={(numOfCardTypes) => setNumOfCardTypes(numOfCardTypes)} mt="5%" defaultValue={numOfCardTypes.toString()}>
                                    <SliderMark id="sliderMark" value={1}>1</SliderMark>
                                    <SliderMark id="sliderMark" value={8}>8</SliderMark>
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
                                <Slider aria-label="slider-ex-6" min={2} max={4} onChange={(numOfCardCopies) => setNumOfCardCopies(numOfCardCopies)} defaultValue={numOfCardCopies.toString()} mt="5%" >
                                    <SliderMark id="sliderMark" value={2}>2</SliderMark>
                                    <SliderMark id="sliderMark" value={4}>4</SliderMark>
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
    )
}

export default SettingsMenu;