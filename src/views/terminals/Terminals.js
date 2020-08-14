//import React from 'react'
import React, { Component } from 'react';
import { Terminal } from 'xterm'
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
      {i: 'a', x: 0, y: 0, w: 1, h: 1, isResizable:true },
      {i: 'b', x: 0, y: 0, w: 1, h: 1},
      {i: 'c', x: 0, y: 0, w: 1, h: 1},
      {i: 'd', x: 0, y: 0, w: 2, h: 1},
      {i: 'e', x: 0, y: 0, w: 2, h: 2}
    ];

    return (
      <div>
        <GridLayout className="layout" layout={layout} draggableHandle=".card-header" cols={3} rowHeight={110} width={1000}>
		<div key="a">
		  <CCard>
		    <CCardHeader>
		      Terminal 1 - 192.168.0.13 (@root)
		      <div className="card-header-actions">
		        <CIcon name="cil-x-circle" className="float-right"/>
		      </div>
		    </CCardHeader>
		    <CCardBody>		
			Some text to fill out the card.  		
		    </CCardBody>
		  </CCard>
		</div>
		<div key="b">
		  <CCard>
		    <CCardHeader>
		      Terminal 2 - 192.168.0.13 (@root)
		      <div className="card-header-actions">
		        <CIcon name="cil-x-circle" className="float-right"/>
		      </div>
		    </CCardHeader>
		    <CCardBody>		
			Some text to fill out the card.  		
		    </CCardBody>
		  </CCard>
		</div>
		<div key="c">
		  <CCard>
		    <CCardHeader>
		      Terminal 3 - 192.168.0.13 (@root)
		      <div className="card-header-actions">
		        <CIcon name="cil-x-circle" className="float-right"/>
		      </div>
		    </CCardHeader>
		    <CCardBody>		
			Some text to fill out the card.  		
		    </CCardBody>
		  </CCard>
		</div>
		<div key="d">
		  <CCard>
		    <CCardHeader>
		      Terminal 4 - 192.168.0.13 (@root)
		      <div className="card-header-actions">
		        <CIcon name="cil-x-circle" className="float-right"/>
		      </div>
		    </CCardHeader>
		    <CCardBody>		
			Some text to fill out the card.  		
		    </CCardBody>
		  </CCard>
		</div>
		<div key="e">
		  <CCard>
		    <CCardHeader>
		      Terminal 5 - 192.168.0.13 (@root)
		      <div className="card-header-actions">
		        <CIcon name="cil-x-circle" className="float-right"/>
		      </div>
		    </CCardHeader>
		    <CCardBody>		
			Some text to fill out the card. This do require some more text to fill out the full card. This was not eough so I added some more text
                        Some text to fill out the card. This do require some more text to fill out the full card. This was not eough so I added some more text
                        Some text to fill out the card. This do require some more text to fill out the full card. This was not eough so I added some more text
                        Some text to fill out the card. This do require some more text to fill out the full card. This was not eough so I added some more text
                          		
		    </CCardBody>
		  </CCard>
		</div>
        </GridLayout>
	

      </div>
    );
  }
}
/* <div className={this.props.termy} ref={ref=>this.termElm = ref}></div> */

export default Terminals
