//import React from 'react'
import React, { Component } from 'react';
import TermBee from '../../TermBee'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CCollapse,
  CFade,
  CSwitch,
  CLink
} from  '@coreui/react'
import CIcon from '@coreui/icons-react'
//import * as attach from 'xterm/lib/addons/attach/attach'
import GridLayout from 'react-grid-layout';

//const Terminals = () => {
class Terminals extends Component {

/*
  async componentDidMount() {
    const protocol = (window.location.protocol === 'https:') ? 'wss://' : 'ws://';
    console.log("TEST TEST FRIPPE" + this.props.termy);
    let socketURL = protocol + window.location.hostname + ((window.location.port) ? (':' + window.location.port) : '') + '/terminals/'
    
    const term = new Terminal({
	cursorBlink: "block"
    });
    term.setOption('theme', {
        background: '#0e2a35',
        foreground: '#8b9fa9',
        fontFamily: 'Lucida Console',
        fontSize: '15px',
        cols: 80,
	rows: 24
       
    });
    term.open(this.termElm);
    //term.open(document.getElementById(this.props.termy));

    term.attachCustomKeyEventHandler(function (e) {
  	// Ctrl + Shift + C
     	if (e.ctrlKey && e.shiftKey && (e.keyCode === 3)) {
    		var copySucceeded = document.execCommand('copy');
    		console.log('copy succeeded', copySucceeded);
    		return false;
  	}
    });
    
    const res = await fetch('http://localhost:4001/rest/v1/wifi/scan' , {method: 'GET'})
    const processId = await res.text()
    
    // const pid = processId;
    socketURL += processId;
    const socket = new WebSocket(socketURL);
    
    socket.onopen = () => {
      //term.attach(socket);
      term._initialized = true;
    }
    this.term = term
  }
*/

  render() {

    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      {i: 'a', x: 0, y: 0, w: 5, h: 3, isResizable:true },
      {i: 'b', x: 0, y: 10, w: 5, h: 3},
      {i: 'c', x: 1, y: 3, w: 5, h: 3},

    ];

    return (
      <>
      <div>
        <GridLayout className="layout" layout={layout} draggableHandle=".card-header" cols={10} rowHeight={50} width={1800}>

          <div key="a">
            <TermBee name={"Tutorial"} speed={2} rows={24} cols={80} cast={"/termbee.cast"}/>
          </div>
         
          <div key="b">
            <TermBee name={"Tutorial"} speed={1.3} rows={24} cols={80} cast={"/termbee.cast"}/>
          </div>
 
          <div key="c">
            <TermBee name={"Running htop"} loop={true} speed={0.7} rows={24} cols={40} cast={"/termbee-htop.cast"}/>
          </div>
          
        </GridLayout>
	

      </div>
      </>
    );
  }
}
/* <div className={this.props.termy} ref={ref=>this.termElm = ref}></div> */

export default Terminals
