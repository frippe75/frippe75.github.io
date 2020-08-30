import React, { Component, useState  } from 'react'
import { Link, useHistory, Redirect, Route, Router } from 'react-router-dom'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { WebLinksAddon } from 'xterm-addon-web-links';
import { FitAddon } from 'xterm-addon-fit';
import {
  CButton,
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

const cardStyle = {
  "padding": 0
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
    //const runFit = this.runFit

    fetch(url)
    .then(function(response){
        return response.text();
    })
    .then(function (data) {
      console.log("speed " + speed + " ok");

      const lines = data.trim().split('\n').filter(txt => txt)
      const header = JSON.parse(lines[0])
      console.log("width: " + header.width + " height: " + header.height)
      const events = lines.slice(1)

      term2.resize(header.width, header.height)
      

      /*
      this.term.setOption('theme', {
        background: this.props.background,
        foreground: '#8b9fa9',
        fontFamily: 'Lucida Console',
        fontSize: this.props.fontSize,
        cols: this.props.cols,
	      rows: this.props.rows
    });
    this.term.open(this.termElm)
    this.term.loadAddon(new WebLinksAddon())
    
    const fitAddon = new FitAddon();
    this.term.loadAddon(fitAddon);
    fitAddon.fit();
    */
      
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

  runFit() {
    //this.term.
    console.log("Fitting")
    const fitAddon = new FitAddon();
    this.term.loadAddon(fitAddon);
    fitAddon.fit();
  }

  async componentDidMount() {

    const term = new Terminal({
      cursorBlink: "block",
      rendererType: 'dom', // default is canvas
    });
    this.term = term 
    console.log("Props:" + this.props.name);

    this.term.setOption('theme', {
        background: this.props.background,
        foreground: '#8b9fa9',
        fontFamily: 'Lucida Console',
        fontSize: this.props.fontSize,
        cols: this.props.cols,
	      rows: this.props.rows
    });
    this.term.open(this.termElm)
    this.term.loadAddon(new WebLinksAddon())
    
    const fitAddon = new FitAddon();
    this.term.loadAddon(fitAddon);
    fitAddon.fit();
    

    //this.term = term

    this.playCast("/casts/" + this.props.cast)

    console.log("fetching " + this.props.cast + " ok");
  }  

  render() {
    return (
      //<>

          <CCard>
            <CCardHeader>
              Terminal - {this.props.name} (@root) {this.props.cols}x{this.props.rows} cast from {this.props.cast} {"      "} 
              
              <CButton
                variant="ghost" color="secondary" size="sm"
                onClick={ () => { this.runFit() } }
              >
              Fit
              </CButton>

              <CButton
                variant="ghost" color="secondary" size="sm"
                onClick={ () => { this.props.on() } }
              >
              Close
              </CButton>
  

              <div className="card-header-actions">
                  <CIcon name="cil-x-circle" className="float-right"/>
              </div>

            </CCardHeader>
            <CCardBody style={cardStyle} color={this.props.background}  height={this.props.rows*25}>
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
  height: 200,
  fontSize: 20,
  background: "#0e2a35",
  loop: false,
  speed: 1,
  onCloseClick: () => {} // ? makes it optional
}

export default TermBee