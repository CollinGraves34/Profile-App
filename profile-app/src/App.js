import Header from './Components/header.js'
import Table from './Components/table.js'
import Navi from './Components/navi.js'
import './App.css';

function App() {

  return (
    <>
      <Header />
      <div className="body">
        <Navi />
        <Table />
      </div>
    </>
  );
}

export default App;
