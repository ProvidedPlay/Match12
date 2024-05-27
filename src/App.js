import './App.css';
import { ChakraProvider} from '@chakra-ui/react';
import GameBoard from './components/GameBoard';
import GameManagerProvider from './context/GameManagerProvider';

function App() {
  return (
    <ChakraProvider>
      <main className='App'>
        <GameManagerProvider>
          <GameBoard/>
        </GameManagerProvider>
      </main>
    </ChakraProvider>
  );
}

export default App;
