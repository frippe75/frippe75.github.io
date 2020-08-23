import React, { Component, useState  } from 'react'
import { Link, useHistory, Redirect, Route, Router } from 'react-router-dom'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { WebLinksAddon } from 'xterm-addon-web-links';
import { FitAddon } from 'xterm-addon-fit';
import {
  CCard,
  CCardBody, 
  CCardHeader,
  CCol,
  CContainer,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const divStyle = {
  "background-color": 'terminal'
};

class TermBee extends Component {
	state = {
		text: ""
  };

  async componentDidMount() {

   console.log("TEST TEST FRIPPE" + this.props.termy);
    const term = new Terminal({
      cursorBlink: "block",
      rendererType: 'dom', // default is canvas
      });
    term.setOption('theme', {
        background: '#0e2a35',
        foreground: '#8b9fa9',
        fontFamily: 'Lucida Console',
        fontSize: '15px',
        cols: 70,
	      rows: 24
    });
    term.open(this.termElm)
    term.loadAddon(new WebLinksAddon())
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();

    this.term = term

    fetch('/termbee.cast')
    .then(function(response){
        return response.text();
    }).then(function (data) {
      console.log("fetched termbee.cast ok");

      const lines = data.trim().split('\n').filter(txt => txt)
      const events = lines.slice(1)

     //var audio = new Audio('/sounds/key1.mp3')
      
      var a = events.map(e => {
        const j = JSON.parse(e)
        sleep(j[0]*700).then(() => {
          //// code
          term.write(j[2]);
          //audio.play()
          
        })
        /*
        return {
          time: j[0],
          type: j[1],
          data: j[2]
        }
        */
      })

    }).then(function(response){
      //this.props.history.push('/welcome', { some: 'state' });
    })  //.bind(this);

  }
  render() {
    return (
      <>

          <CCard>
            <CCardHeader>
              Terminal 50x24 - Tutorial (@root)
              <div className="card-header-actions">
                <CIcon name="cil-x-circle" className="float-right"/>
              </div>
            </CCardHeader>
            <CCardBody color="terminal"  height={255}>
              <div className={this.props.termy} ref={ref=>this.termElm = ref}></div>
            </CCardBody>
          </CCard>
       
      </>
    );
  }

}

export default TermBee