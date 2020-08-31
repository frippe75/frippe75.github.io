import React, { Component, useState } from 'react';
import TermBee from '../../TermBee';
import IdleTimer from 'react-idle-timer'       // used for screenlock
import GaussianBlur from 'react-gaussian-blur' // used for screenlock
import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CCollapse,
  CFade,
  CSwitch,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLink
} from  '@coreui/react'
import CIcon from '@coreui/icons-react'
import GridLayout from 'react-grid-layout';

const gridCols = 30
const originalLayout = getFromLS("layout") || [
  //const originalLayout = [
  // layout is an array of objects, see the demo for more complete usage
    {i: 'a', x: 0, y: 0, w: gridCols/2-3, h: 3, isResizable:true },
    {i: 'b', x: 10, y: 6, w: gridCols/2-3, h: 3},
    {i: 'c', x: 8, y: 3, w: gridCols/2-2, h: 3},
    {i: 'd', x: 12, y: 0, w: gridCols/2+2, h: 3},
    {i: 'e', x: 2, y: 5, w: gridCols/3 + 1, h: 5, isResizable:true},
    {i: 'f', x: 0, y: 7, w: gridCols/5, h: 1},
    {i: 'g', x: 0, y: 8, w: gridCols/5, h: 1},
    {i: 'h', x: 0, y: 9, w: gridCols/5, h: 1},
    {i: 'i', x: 0, y: 8, w: gridCols/5, h: 1},
    {i: 'j', x: 0, y: 9, w: gridCols/5, h: 1}
  ];


class Demo extends Component {
  state = {
		blur: 0 
  };
  
  constructor(props) {
    super(props)
    
    this.idleTimer = null
    this.handleOnAction = this.handleOnAction.bind(this)
    this.handleOnActive = this.handleOnActive.bind(this)
    this.handleOnIdle = this.handleOnIdle.bind(this)
    this.onClickLogin = this.onClickLogin.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.resetLayout = this.resetLayout.bind(this)
  }

  componentDidMount() {
    this.setState({ 
      blur: 0,
      modal: false, 
      locked: false,
      layout: JSON.parse(JSON.stringify(originalLayout))
    })
  }

  /*
      Functions related to layout  
  */
  resetLayout() {
    this.setState({
      layout: []
    });
  }
  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    //this.props.onLayoutChange(layout); // updates status display
  }
  /*
  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ layout: _.reject(this.state.layout, { i: i }) });
  }
  */
  /*
      Functions related to idler 
  */
  handleOnAction (event) {
    //console.log('IDLER: user did something', event)
    // users got back from after being idle, present password prompt
    if (this.state.locked && !this.state.modal) {
      this.setState({ modal: true })
    }
  }
 
  handleOnActive (event) {
    //console.log('IDLER: user is active', event)
    //console.log('IDLER: time remaining', this.idleTimer.getRemainingTime())
  }
 
  handleOnIdle (event) {
    this.setState({ blur: 10, locked: true })
        
    console.log('IDLER: user is idle', event)
    console.log('IDLER: last active', this.idleTimer.getLastActiveTime())
  }
  onClickLogin() {
    this.setState({ modal: false, locked: false })
    //window.alert("Login")
  }
  onCloseClick (a) {
    //this.setState({ modal: false, locked: false })
    window.alert("Close Pressed:" + a)
  }
  toggleModal = () => {
    this.setState((currentState) => ({
      modal: !currentState.modal            
    }));
  }

  renderLayout() {

    return (
      <>
      <div>
        <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            timeout={1000 * 10 * 1} // 1-minute
            onActive={this.handleOnActive}
            onIdle={this.handleOnIdle}
            onAction={this.handleOnAction}
            debounce={250}
          />

          <GridLayout 
            className="layout" 
            layout={this.state.layout}
            draggableHandle=".card-header" 
            cols={gridCols} 
            rowHeight={40} 
            width={2200}
            onLayoutChange={this.onLayoutChange}
          >


            <div key="a">
              <TermBee name={"Tutorial Slow"} 
                speed={2} 
                rows={24} 
                cols={80} 
                cast={"termbee.cast"}  
              />
            </div>

             
            {/*onCloseClick={this.onCloseClick}*/}
              
          
            <div key="b">
              <TermBee name={"Tutorial Fast"} speed={1.3} rows={24} cols={80} cast={"termbee.cast"}/>
            </div>

            <div key="e">
              <TermBee name={"Author Fredrik Tarnell"} loop={true} background={"#FFFFFF"} speed={1} rows={100} cols={70} cast={"termbee-author.cast"}/>
            </div>
  
            <div key="c">
              <TermBee name={"Running htop"} loop={true} background={"#000000"} speed={0.7} rows={24} cols={80} cast={"termbee-htop.cast"}/>
            </div>
            
            <div key="d">
              <TermBee name={"Apache access.log tail"} loop={true} background={"#333333"} speed={1} rows={26} cols={135} cast={"termbee-apache.cast"}/>
            </div>

            <div key="f"></div>
            <div key="g"></div>
            <div key="h"></div>
            <div key="i"></div>
            <div key="j"></div>
          </GridLayout>
        
      </div>
      </>
    );
  }
  // Difficult to have the SVG gaussian filter hidden.
  // Having it in the DOM 100% of the time caused performance issues. Moved to separate function
  renderLocked() {
    return ( 
      <>
        <GaussianBlur x={this.state.blur} y={this.state.blur}>
          {this.renderLayout()}
        </GaussianBlur>
        
        <CModal 
          centered={true}
          show={this.state.modal}  
        >
          <CModalBody>
            <CForm>
              <h1>Login</h1>
              <p className="text-muted">You were locked out due to inactivity</p>

              <CInputGroup className="mb-4">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-lock-locked" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput type="password" placeholder="Password" autoComplete="current-password" />
              </CInputGroup>
              <CRow>
                <CCol xs="6">
                  <CButton 
                    color="seconday" 
                    className="px-4"
                    onClick={this.onClickLogin}
                  >Login</CButton>
                </CCol>
                
              </CRow>
            </CForm>
          </CModalBody>
        </CModal>
      </>

    );
  }
  render() {
    return(
      <>
      {this.state.locked ? this.renderLocked() : this.renderLayout()}
      </>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

export default Demo