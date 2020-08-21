import React, { Component, useState  } from 'react'
import { Link, useHistory, Redirect, Route, Router } from 'react-router-dom'

import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { WebLinksAddon } from 'xterm-addon-web-links';
//import * as attach from 'xterm/lib/addons/attach/attach'
   
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// To parse a .cast file recorded using asciinema
// https://github.com/asciinema/asciinema/blob/master/doc/asciicast-v2.md
const reex = /^\[(.+?), "(.+?)". "(.+?)"\]/;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Welcome extends Component {
	state = {
		text: ""
  };

  async componentDidMount() {

    
    /*
    const protocol = (window.location.protocol === 'https:') ? 'wss://' : 'ws://';
    console.log("TEST TEST FRIPPE" + this.props.termy);
    let socketURL = protocol + window.location.hostname + ((window.location.port) ? (':' + window.location.port) : '') + '/terminals/'
    */

   console.log("TEST TEST FRIPPE" + this.props.termy);
    const term = new Terminal({
      cursorBlink: "block",
      rendererType: 'dom', // default is canvas
      });
    term.setOption('theme', {
        background: '#0e2a35',
        foreground: '#8b9fa9',
        fontFamily: 'Lucida Console',
        fontSize: '35px',
        cols: 50,
	      rows: 14
    });
    term.open(this.termElm)
    term.loadAddon(new WebLinksAddon());
    //Terminal.applyAddon(localLinks);
    //Terminal.applyAddon(fit);
    //this.xterm.fit()
    //term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')

    const out = `
    
    `;
    //term.write(out);
    //term.open(document.getElementById(this.props.termy));
    this.term = term

    fetch('/termbee.cast')
    .then(function(response){
        return response.text();
    }).then(function (data) {
      console.log("fetched termbee.cast ok");
      
      /*
      var arrMatch = null
      var rePattern = new RegExp(
        reex,
        "gm"
      );
      var i = 0
      while (arrMatch = rePattern.exec(data)) {
        console.log("ok");
        i++
        if (i==1) {
          console.log(arrMatch[3])
          term.write(utf8To16(arrMatch[3]))
          console.log(utf8To16(arrMatch[3]))
        }
      }
      */

      const lines = data.trim().split('\n').filter(txt => txt)
      const events = lines.slice(1)
      sleep(1000*700).then(() => {
        //// code
        console.log(events.length)
      })
      
      var a = events.map(e => {
        const j = JSON.parse(e)
        sleep(j[0]*700).then(() => {
          //// code
          term.write(j[2]);
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
      <div className={this.props.termy} ref={ref=>this.termElm = ref}></div>
      {/*<Asciinema src='/example.cast'/>*/}
      </>
    );
  }
  /*
  render() {
    return (
      
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
            
          <CIcon
            className="c-sidebar-brand-full"
            name="logo-negative"
            height={105}
          />
          <div class="center">
            <h5 class="mysvg" >TermBee an IOT Device.</h5>
          </div>
          <div class="b">
            <h2>
              <span>
              { this.state.currentNetwork }
              </span>
            </h2>
          </div>
          
          <div className={this.props.termy} ref={ref=>this.termElm = ref}></div>
        
          
          <div class="center">       
            
            <button onclick="location.href='https://termbee.frippe.com/#/settings';" class="mysvg button button4">Run Setup Wizard</button>
          </div>
          
        </CContainer>
      </div>
        
    );
    
  }
  */
}

export default Welcome