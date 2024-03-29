import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

const app = new Clarifai.App({
  apiKey: 'Clarifai Api Key here'
});


const particlesOptions ={
  "particles": {
    "number": {
      "value": 150,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
  "move": {
      "enable": true,
      "speed": 11.21678030333378,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
     "events": {
       "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    }
 }
};

class App extends Component{
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false,
      isLoading: true,
      user:{
        id:'',
        name:'',
        email:'',
        entries:'0',
        joined: ''
      }
    }
  }

  componentDidMount() {
    this.setState({isLoading: false})
  }

 calculateFaceLocation =(data) =>{

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width=Number(image.width);
    const height=Number(image.height);
    return {
        leftcol: clarifaiFace.left_col * width,
        toprow: clarifaiFace.top_row * height,
        rightcol: width-(clarifaiFace.right_col * width ),
        bottomrow: height - (clarifaiFace.bottom_row * height),

   }
 }


 loadUser =(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:'0',
      joined: data.joined
     }
   })
}


 displayFaceBox = (box) =>{
   this.setState({box: box});
 }

 onInputChange=(event)=>{
   this.setState({input : event.target.value});
 }
 onButtonSubmit= () => {
    this.setState({
      imageUrl: this.state.input
 });






 app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
      this.state.input)
        .then (response => {
            if(response){
               fetch('https://source.unsplash.com/random/500x500',{
                 method: 'put',
                 headers: {'Content-Type':'application/json'},
                 body: JSON.stringify({
                   id:this.state.user.id,
                 })
               })
               .then(response => response.json())
               .then(count=>{
                this.setState(Object.assign(this.state.user,{entries:count}))
               })
            }

     this.displayFaceBox(this.calculateFaceLocation(response))})
        .catch(err => console.log(err));
 }


 onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState({isSignedIn: false})
    }
    else if(route==='home'){
      this.setState({isSignedIn: true})
   }
      this.setState({route: route});
 }

  render(){
    return (
        this.state.isLoading ?
          <LoadingScreen />
        :
          <div className="App">
            <Particles className='particles'
                params={particlesOptions}
                 />
               <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
              { this.state.route==='home' ?
                 <div>
                    <Logo />
                    <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                    <FaceRecognition box={this.state.box}imageUrl={this.state.imageUrl}/>
                 </div>
                  : (
                    this.state.route==='signin'?
                    <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    :
                    <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  )
               }
          </div>
    );
}
}

export default App;
