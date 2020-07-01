import React from 'react';
import './App.css';

// components
import Header from './components/header_component/header';
import Footer from './components/footer_component/footer';
import Homepage from './components/pages/homepage';

class App extends React.Component {
  render() {
    return(
      <div className="App">

        <Header />

          <Homepage />

        <Footer />

      

      </div>
    );
  }
}

export default App;

