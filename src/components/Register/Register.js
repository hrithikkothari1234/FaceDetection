import React from 'react';
class Register extends React.Component{

  constructor(props){
    super();
    this.state={
      Email: '',
      Password: '',
      Name: ''
    }
  }

      onEmailChange= (event) =>{
        this.setState({Email:event.target.value})
      }

      onPasswordChange= (event) =>{
        this.setState({Password:event.target.value})
      }

      onNameChange= (event)=>{
        this.setState({Name:event.target.value})
      }

      onSubmitRegister = () =>{
          this.props.loadUser(this.state.Name);
          this.props.onRouteChange('home');
      }


  render(){

  return(
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
           <div className="measure">
             <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                 <legend className="f1 fw6 ph0 mh0">Register</legend>
                   <div className="mt3">
                       <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                       <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onNameChange}
                         type="text" name="name"  id="name" />
                   </div>
                   <div className="mt3">
                       <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                       <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onEmailChange}
                         type="email" name="email-address"  id="email-address" />
                   </div>
                   <div className="mv3">
                       <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                       <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onPasswordChange}
                         type="password" name="password"  id="password" />
                   </div>
             </fieldset>
             <div className="">
                 <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                onClick={this.onSubmitRegister}
                 type="submit" value="Register" />
             </div>
           </div>
     </main>
   </article>
  );
 }
}

export default Register;
