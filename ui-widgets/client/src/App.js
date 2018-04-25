import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from '../components/NavBar';
import Palette from '../components/Palette';
import {createMuiTheme} from 'material-ui/styles'
import {blue, amber, red} from 'material-ui/colors'

const muiTheme = createMuiTheme({
    palette: {
      primary: blue,
      accent: amber,
      error: red,
      type: 'light'
    }
  })

class App extends Component {
  render() {
    return(
    	/*
        <div className="container-fluid">
            <NavBar />
            <Palette />
        </div>
        */
        <MuiThemeProvider theme={muiTheme}>
        	<NavBar />
          <Palette />
        </MuiThemeProvider>
    );
  }
}

export default App;