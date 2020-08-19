import React, { Component } from 'react';
import { useHistory, Redirect, HashRouter, Route, Switch, Router } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Terminal = React.lazy(() => import('./views/pages/terminal/Terminal'));
const Welcome = React.lazy(() => import('./views/pages/welcome/Welcome'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));


var dbCreated = false;
/*
var request = window.indexedDB.open("TermBeeDB");
request.onupgradeneeded = function (e){
    console.log("OLDVERSION: " + e.oldVersion);
    if (e.oldVersion == 0) {
      console.log("Database does not exist, init and redirect to Setup Guide");
      initDB(DBConfig);
    }
    //e.target.transaction.abort();
    dbCreated = true;
}
*/ 

/*
if (!dbExists) {
  console.log("Database does not exist, init and redirect to Setup Guide");
  initDB(DBConfig);
} else {
  console.log("Database exists");
}

initDB(DBConfig);
*/

class App extends Component {
  /*
  state = {
    DBcreated: false,
  }
  */

/*
  constructor(props) {
    super(props);
    
    var request = window.indexedDB.open("TermBeeDB");
    console.log("Trying to open TermBeeDB");
    request.onupgradeneeded = function (e){
      console.log("OLDVERSION2: " + e.oldVersion);
      if (e.oldVersion == 0) {
        console.log("Database does not exist, init and redirect to Setup Guide");
        initDB(DBConfig);
        dbCreated = true;
        this.setState({ DBcreated:true })
      } 
    }.bind(this);
  }
*/
  /*
  installPrompt = null;

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
    //this.setState({ installButton:false })
  }
  */

  componentDidMount() {
    console.log("In App CompnentDidMount")

    //e.target.transaction.abort();
  
    /*
    if (!dbCreated) {
      const history = useHistory();
      history.push("/welcome");
    }
    */

    /*
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
    */

  }
  render() {

    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/terminal" name="Terminal Page" render={props => <Terminal {...props}/>} />
              <Route exact path="/welcome" name="Welcome Page" render={props => <Welcome {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
