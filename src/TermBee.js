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

  constructor(props){
    super(props);

    this.playCast = this.playCast.bind(this);
    console.log("construct: props.cast:" + props.cast + " ok");
    console.log("construct: this.props.cast:" + this.props.cast + " ok");
    this.props = props;
    console.log("construct: this.props.cast:" + this.props.cast + " ok");
    this.state = {
      text: ""
    };    
  }

  playCast(url) {
    const term2 = this.term
    const speed = this.props.speed

    fetch(url)
    .then(function(response){
        return response.text();
    })
    .then(function (data) {
      console.log("speed " + speed + " ok");

      const lines = data.trim().split('\n').filter(txt => txt)
      const events = lines.slice(1)

      //var audio = new Audio('/sounds/key1.mp3')
      
      var a = events.map(e => {
        const j = JSON.parse(e)
        sleep(j[0]*(1000/speed)).then(() => {
          //// code
          term2.write(j[2]);
          //audio.play()
          
        })

      })

    })
    .then(function(){
      //this.props.history.push('/welcome', { some: 'state' });
    }); //.bind(this);
  }

  async componentDidMount() {

    const term = new Terminal({
      cursorBlink: "block",
      rendererType: 'dom', // default is canvas
    });
  this.term = term 
   console.log("Props:" + this.props.name);

    this.term.setOption('theme', {
        background: '#0e2a35',
        foreground: '#8b9fa9',
        fontFamily: 'Lucida Console',
        fontSize: '15px',
        cols: this.props.cols,
	      rows: this.props.rows
    });
    this.term.open(this.termElm)
    this.term.loadAddon(new WebLinksAddon())
    /*
    const fitAddon = new FitAddon();
    this.term.loadAddon(fitAddon);
    fitAddon.fit();
    */

    //this.term = term

    this.playCast(this.props.cast)

    console.log("fetching " + this.props.cast + " ok");
  }  

  render() {
    return (
      //<>

          <CCard>
            <CCardHeader>
              Terminal - {this.props.name} (@root) {this.props.cols}x{this.props.rows} cast from {this.props.cast}
              <div className="card-header-actions">
                <CIcon name="cil-x-circle" className="float-right"/>
              </div>
            </CCardHeader>
            <CCardBody color="terminal"  height={this.props.rows*12}>
              <div className={this.props.termy} ref={ref=>this.termElm = ref}></div>
            </CCardBody>
          </CCard>
       
      //</>
    );
  }

}
TermBee.defaultProps = {
  name: "Name from Default Props",
  cast: "./props.cast",
  cols: 80,
  rows: 24,
  height: 100,
  loop: false,
  speed: 1
}

export default TermBee