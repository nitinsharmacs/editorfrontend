import React, { Component } from 'react';
import './App.css';
import './assests/icons';
import Editor from './components/Editor/Editor';
import Popup from './components/Popup/Popup';
import Aux from './hoc/Aux';
import { URL } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class App extends Component{
  storeInput = (data) => {
    this.sendCode(data);
  };
  state = {
    language:'cpp',
    content:'',
    isInput:false,
    popup:{
      onSubmit: this.storeInput,
      close:()=>{
        this.setState({popup:{...this.state.popup, show:false}})
      }
    },
    running:false,
  };
  changeContent = (content) => {
    this.setState({content:content});
  };
  changeLang = (evt) => {
    this.setState({language:evt.target.value});
  };
  submitForm = (e) => {
    e.preventDefault();
    if(this.state.isInput){
      this.setState({popup:{...this.state.popup, show:true, type:'input', heading:'Input'}})
    } else {
      this.sendCode();
    }
  };
  sendCode = (input) => {
      this.setState({running:true});
      fetch(URL+`/compile/${this.state.language}`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          code:this.state.content,
          input:input
        })
      }).then(res=>res.json()).then(result=>{
        console.log(result.result)
            this.setState({running:false, popup:{...this.state.popup, show:true, heading:'Output', type:'output', output:result.result}});
      }).catch(err=>{
        console.log(err)
        this.setState({running:false, popup:{...this.state.popup, show:true, heading:'Error', output:'Opps! There is some error, try again!', type:'output'}});
      });
  };
  render(){
    return (
    <form className="App" onSubmit={this.submitForm}>
      <h1 className='Heading'>Code Editor</h1>
      <div className='Header' >
        <select name='language' className='Language' onChange={this.changeLang}>
          <option value='cpp'>C++</option>
           <option value='python'>Python</option>
        </select>
        <div className='Checkbox'>
          <input type='checkbox' name='input' value='true' onChange={(evt)=>{
              this.setState({isInput:evt.target.checked});
          }} />Input
        </div>
      </div>
      <Editor language={this.state.language} content={this.state.content} onChange={this.changeContent} />
      <div className='Controls'>
        <button className='runBtn' disabled={this.state.running || this.state.content.length<=0} >
          {
            this.state.running?<Aux>
              <FontAwesomeIcon icon='circle-notch' spin className='spin' />Runnig...
            </Aux>:'Run'
          }
        </button>
      </div>
      {
        this.state.popup&&this.state.popup.show?<Popup {...this.state.popup} />:null
      }
      
    </form>
  );
  }
}
export default App;
