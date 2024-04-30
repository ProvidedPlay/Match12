import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Card = ({title, imageSrc}) => {
    // Display the name and title on the card component when flipped

    return(
        <VStack bg="darkblue" spacing={1} width="30%">
            <VStack>
                <Image src={imageSrc} alt="Card Image" width="100%" rounded="xl" />
            </VStack>
        </VStack>
    )
}

export default Card;