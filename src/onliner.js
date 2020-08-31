import React, { Component, useState } from 'react';
import { get } from 'core-js/fn/dict';
import { 
    CButton, 
    CBadge, 
    CToaster, 
    CToast,
    CToastHeader,
    CToastBody
} from '@coreui/react';
import { bind } from 'core-js/fn/function';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

class Onliner extends Component {

    constructor (props) {
        super(props)
        this.state = {
            online: true, 
            toasts: [
                //{ position: 'top-right', autohide: 10000, message: 'This is a default toast' }
            ]           
        };
        console.log(this.state)
        this.checkOnline = this.checkOnline.bind(this)
    }
    async componentDidMount() {
        const interval = 5;
        // Infinite loop to poll PWA connection status 
        while (true) {
            console.log("Checking online status ever " + interval +  " sec")
            this.checkOnline()
            await sleep(interval * 1000)
        }
    }
    addToast() {
        this.state.toasts([
            ...this.state.toasts, 
            { position: 'top-right', autohide: true, autohideValue: 5000, closeButton: true, fade: true, color: 'secondary' }
        ])
    }
    /*
    toasters() {
        return this.toasts.reduce((toasters, toast) => {
            toasters[toast.position] = toasters[toast.position] || []
            toasters[toast.position].push(toast)
            return toasters
        }, {})
    }
    */
    checkOnline() {
        // https://stackoverflow.com/questions/49684217/how-to-use-fetch-api-in-react-to-setstate
        // Arrow functions get the this of the parent but for catch I'm using a normal function which does not...
        // Setting that to this fixes the issue.
        const that = this
        fetch('https://europe-west1-termbee.cloudfunctions.net/online')
        .then(response => response.json())
        .then(data => this.setState({ online: data.status }))
        .catch(function(err) {
            //console.log("FETCH ERROR ONLINE CHECK2")
            if (that.state.online) {
                //console.log("STATE WILL CHANGED")
                that.setState({ toasts: [
                    ...that.state.toasts,
                    {position: 'top-right',  title: 'Network lost info', message: 'App is currently offline meaning their will be less functionality. Once network comes back the "App online-pill" will light up again.'}] })
                //that.addToast()
                //console.log(that.state.toasts)
                that.setState({ online: false })
                //console.log("STATE CHANGED")
            }
            console.log("STATE CHANGED2")
        }); 
    }
    render() {

        return (
          <div>
              {this.renderOnline()}
                <CToaster
                  style={{top: "50px"}} // Lowering toast enough to show the online pill
                  position={'top-right'}
                  key={'toaster'}
                >
                  {
                    this.state.toasts.map((toast, key)=>{
                    return(
                      <CToast
                        key={'toast' + key}
                        show={true}
                        autohide={toast.autohide}
                        fade={toast.fade}
                        color={toast.color}
                      >
                        <CToastHeader closeButton={toast.closeButton}>
                        {toast.title}
                        </CToastHeader>
                        <CToastBody>
                          {toast.message}
                        </CToastBody>
                      </CToast>
                    )
                  })
                  }
                  
                </CToaster>
                
          </div>

        )
      }
    renderOnline() {
        return (
            <div>
         
            { this.state.online 
                ? <CBadge className="mr-1" color="dark" shape="pill">Online</CBadge>
                :<CBadge className="mr-1" color="light" shape="pill">Offline</CBadge>
            }
           
  

            </div>
        );
    }
}

export default Onliner;