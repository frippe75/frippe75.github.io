//import React from 'react'
import React, { Component, useState  } from 'react';
import Espconfig from './espconfig.js'; // Check the sources on https://urishx.github.io/esp32_web-ble_wifi_config/#config

import {
  CButton,
  CCollapse,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInputGroup,
  CInput,
  CLabel,
  CFormText,
  CFormGroup,
  CProgress,
  CProgressBar
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const getBadge = status => {
  switch (status) {
    case 'connected': return 'success'
    case 'unavailable': return 'danger'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const getButton = status => {
  switch (status) {
    case 'connected': return 'disconnect'
    case 'configured': return 'connect'
    case 'unavailable': return 'warning'
    case 'not used': return 'add'
    default: return 'primary'
  }
}

const getWifiIcon = quality => {
  console.log(quality);
  
  if (quality<20) {
  	return 'cilWifiSignal0';
  } else if (quality<40) {
  	return 'cilWifiSignal1';
  } else if (quality<60) {
  	return 'cilWifiSignal2';
  } else if (quality<80) {
  	return 'cilWifiSignal3';
  } else {
  	return 'cilWifiSignal0';
  }
  return 'cil-wifi-signal-off';
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const onClickButton = (index,status) => {
  switch (status) {
    case 'connected': alert("DISCONNECT");
    case 'configured': console.log("MODAL");
    case 'unavailable': return 'warning'
    case 'not used': return 'add'
    default: return 'primary'
  }
}

const toggleDetails = (index) => {
    const position = this.state.settings.networks.indexOf(index)
    let newDetails = this.state.settings.networks.slice()

    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...this.state.settings.networks, index]
    }

    //setDetails(newDetails)
}
const networkName = () => {
	"Networkname1";	
	//this.state.settings.networks[this.state.currentSelected]
};

const fields = ['ssid', 'encryption', 'rssi', 'quality', 'status']

let counter = 0


let jsonRecieved = undefined;
let jsonStringToSend = undefined;
// Obtain configured instance.
let espconfig = new Espconfig();
var bleConnected = false;

class Settings extends Component {
        
	/*
	For example:
	High quality: 90% ~= -55db
	Medium quality: 50% ~= -75db
	Low quality: 30% ~= -85db
	Unusable quality: 8% ~= -96db
	*/
 
  installPrompt = null;

	state = {
		settings: [],
		modal: false,
                currentSelected: 0,
                currentNetwork: "",
                progress: 0 
	};
      
  toggleModal = () => {
    this.setState((currentState) => ({
      modal: !currentState.modal            
    }));
  }
      
  isWebBluetoothEnabled() {
    if (navigator.bluetooth) {
      return true;
    } else {
      console.log('Web Bluetooth API is not available.\n' +
      'Please make sure the "Experimental Web Platform features" flag is enabled.');
      return false;
    }
  }


  onClickPair2() {
	  if (!bleConnected) {
	    // Request the device for connection and get its name after successful connection.
	    espconfig.request()
	    .then(_ => espconfig.connect())
	    .then(_ => { 
              console.log("SHOULD REALLY RUN recieveCredentials() which has been commented out");
	      //recieveCredentials();
	    })
	    .catch(error => { console.log(error) });
	  } else {
	    // Disconnect from the connected device.
	    espconfig.disconnect();
	  }
  }

  onClickPair() {
	  console.log('Requesting Bluetooth Device...');
    let options = {
		  filters: [
		    {namePrefix: 'TermBee'}
		  ],
		  optionalServices: ['0000aaaa-ead2-11e7-80c1-9a214cf093ae']
	  }

	  navigator.bluetooth.requestDevice(options)
	  .then(device => {
	    console.log('Connecting to GATT Server...');
	    return device.gatt.connect();
	  })
	  .then(server => {
	    console.log('Getting Battery Service...');
	    return server.getPrimaryService('battery_service');
	  })
	  .then(service => {
	    console.log('Getting Battery Level Characteristic...');
	    return service.getCharacteristic('battery_level');
	  })
	  .then(characteristic => {
	    console.log('Reading Battery Level...');
	    return characteristic.readValue();
	  })
	  .then(value => {
	    let batteryLevel = value.getUint8(0);
	    console.log('> Battery Level is ' + batteryLevel + '%');
	  })
	  .catch(error => {
	    console.log('Arghhhhhh! ' + error);
	  });
  }

  async installApp() {
	  if(!this.installPrompt) return false;
	    this.installPrompt.prompt();
	    let outcome = await this.installPrompt.userChoice;
	    if(outcome.outcome=='accepted'){
	      console.log("App Installed")
	    }
	    else{
	      console.log("App not installed");
	    }
	    // Remove the event reference
	    this.installPrompt=null;
	    // Hide the button
	    this.setState({ installButton:false })
      }

  async onClickScan() {
   	let i = 0
        //let progress = 0

        fetch('http://slowwly.robertomurray.co.uk/delay/7000/url/http://google.co.uk' , {method: 'GET', mode: 'no-cors'})
          .then(res => res.text())
          .then((data) => {
            console.log(data)
            //this.setState({ settings: data.settings })
            this.setState((currentState) => ({
	      progress: 95           	  
            }));

        })
        .catch(console.log)
	
   	for (i; i<20; i++) {
		await sleep(500)
		if (this.state.progress != 100) {
		   //progress += 10;
		   //counter += 10;
		   console.log("Progress: " + this.state.progress)
		   this.setState((currentState) => ({
	    	      progress: this.state.progress + 5           	  
         	   }));
                } else {
		    break
 		}
   	}  
        await sleep(1000) 
	this.setState((currentState) => ({
	   progress: 0           	  
        }));
      };

      toggle = (index) => {
         this.setState((currentState) => ({
	    modal: !currentState.modal,
            currentSelected: index,
            currentNetwork: currentState.settings.networks[index].ssid
         }));
      };

      componentDidMount() {

	// To be able to install PWA to Android
        console.log("Listening for Install prompt!");
        window.addEventListener('beforeinstallprompt',e=>{
            // For older browsers
            e.preventDefault();
            console.log("Install Prompt fired!");
            this.installPrompt = e;
            // See if the app is already installed, in that case, do nothing
            if((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true){
              return false;
            }
            // Set the state variable to make button visible
            this.setState({ installButton:true })
        })


	espconfig.setOnConnected(function() {
            this.setState({ connected:true })
	}.bind(this));
        
        espconfig.setOnDisconnected(function() {
            this.setState({ connected:false })
	}.bind(this));

        fetch('http://192.168.0.209:4001/rest/v1/settings' , {method: 'GET'})
        .then(res => res.json())
        .then((data) => {
          this.setState({ settings: data.settings })
        })
        .catch(console.log)
      };

  render() {
    return (
    <>


      <CRow>

        <CCol xs="12" lg="6">

	  <CCard>
            <CCardHeader>
	      Bluetooth
            </CCardHeader>
		<CButton
		   color="primary"
		   variant="outline"
		   size="sm"
		   onClick={()=>{this.onClickPair2()}}
		        >
		     Pair
 		</CButton>
          </CCard>

          <CCard>
           <CCollapse
            show={this.state.connected} >


            <CCardHeader>
	      <CProgress value={this.state.progress} className="mb-3" style={{height: "3px"}}/>
              Wifi Networks
		&nbsp;&nbsp;

              	<CButton
		   color="primary"
		   variant="outline"
		   size="sm"
		   onClick={()=>{this.onClickScan()}}
		        >
		     Rescan
 		</CButton>

            </CCardHeader>

            <CCardBody>
            <CDataTable
              items={this.state.settings.networks}
              fields={fields}
              size="sm"
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'status':
                  (item,index)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
			&nbsp;&nbsp;
                      <CButton
                          color="light"
		          size="sm"
			  onClick={()=>{onClickButton(index, item.status);this.toggle(index)}}
			  >
                          
                          {getButton(item.status)}
		        </CButton>
                    </td>
                  ),
                'quality':
                  (item)=>(
                    <td>

		      <CIcon size={'sm'} name={getWifiIcon(parseInt(item.quality))} />
                    </td>
                  ),
              'show_details':
		  (item, index)=>{
		    return (
		      <td className="py-2">
                        <div>
		        <CButton
		          color="primary"
		          variant="outline"
		          shape="square"
		          size="sm"
		          onClick={()=>{toggleDetails(index)}}
		        >
		          {this.state.settings.networks.includes(index) ? 'Hide' : 'Show'}
		        </CButton>
			</div>
		      </td>
		      )
		  },
		'details':
		    (item, index)=>{
		      return (
		      <CCollapse show={this.state.settings.networks.includes(index)}>
		        <CCardBody>
		          <h4>
		            {item.username}
		          </h4>
		          <p className="text-muted">User since: {item.registered}</p>
		          <CButton size="sm" color="info">
		            User Settings
		          </CButton>
		          <CButton size="sm" color="danger" className="ml-1">
		            Delete
		          </CButton>
		        </CCardBody>
		      </CCollapse>
		    )
		  }
	      }}
            />

            <CModal 
              show={this.state.modal} 
              onClose={ () => { this.toggleModal() } }
            >
              <CModalHeader closeButton>
                <CModalTitle>Add Network - {this.state.currentNetwork} </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">Network Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                    <CFormText className="help-block">Please try to enter the correct password</CFormText>
                  </CCol>
                </CFormGroup>
              </CModalBody>
              <CModalFooter>
                <CButton color="primary">Save</CButton>{' '}
                <CButton 
                  color="secondary" 
                  onClick={ () => { this.toggleModal() } }
                >Cancel</CButton>
              </CModalFooter>
            </CModal>



            <CModal 
              show={this.state.installButton} 
              onClose={ () => { this.toggleModal() } }
            >
              <CModalHeader closeButton>
                <CModalTitle>Install Application</CModalTitle>
              </CModalHeader>
              <CModalBody>
 
              </CModalBody>
              <CModalFooter>
                <CButton color="primary">Install it</CButton>{' '}
                <CButton 
                  color="secondary" 
                  onClick={ () => { this.installApp() } }
                >Cancel</CButton>
              </CModalFooter>
            </CModal>

	        </CCardBody>

           </CCollapse>
          </CCard>
        </CCol> 
      </CRow>
    </>
    );
  }
}

export default Settings