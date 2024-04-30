import './App.css';
import { ChakraProvider} from '@chakra-ui/react';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <ChakraProvider>
      <main>
        <GameBoard/>
      </main>
    </ChakraProvider>
  );
}

export default App;
