import { useGameManagerContext } from "../context/GameManagerProvider.js";

function useApplySettings() {
    const {
        setNumOfCardTypes,
        setNumOfCardCopies,
        setCurrentCardBack,
        updatedNumOfCardTypes,
        updatedNumOfCardCopies,
        updatedCardBackNumber,
        cardBackArray,
        
    } = useGameManagerContext()

    function setCardBack(cardBackNumber) {
        setCurrentCardBack(cardBackArray[cardBackNumber])
        console.log(cardBackNumber)
    }

    const applySettings = () => {
        setNumOfCardTypes(updatedNumOfCardTypes)
        setNumOfCardCopies(updatedNumOfCardCopies)
        setCardBack(updatedCardBackNumber)

        console.log(updatedNumOfCardTypes, updatedCardBackNumber, updatedNumOfCardCopies)
    }

    return (
        {applySettings}
    )

}

export default useApplySettings;