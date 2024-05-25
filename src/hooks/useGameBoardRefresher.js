import { useGameManagerContext } from "../context/GameManagerProvider.js";



function useGameBoardRefresher() {
    const {
        playableCards, setPlayableCards,
        setCardIndexArray,
        numOfCardTypes,
        numOfCardCopies,
    
    } = useGameManagerContext()

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
    return(
        {setUpCardIndexArray}
    )

}





export default useGameBoardRefresher;