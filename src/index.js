import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

import './index.css';
import defaultText from './seed.js';


class Editor extends React.Component {
  render(){
    return (
      <div id="editor-window">
        <h1>Editor</h1>
        <textarea defaultValue={defaultText} id="editor"/>
      </div>
      
    );
  }
}

class Previewer extends React.Component {
  createMarkup() {
    return {__html: marked(this.props.text)}
  }
  render(){
    
      return (
        <div id="preview-window">
          <h1>Preview</h1>
          <div id="preview" dangerouslySetInnerHTML={this.createMarkup()} />
        </div>
      );
    
  }
}

class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    document.getElementById("editor").removeEventListener("keyup", this.handleChange);
  }
  componentDidMount(){
    document.getElementById("editor").addEventListener("keyup", this.handleChange);
    this.setState({
      input: defaultText
    });
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  render(){
    return (
      <div className="markdown-previewer">
        <h1>Markdown Previewer</h1>
        <div id="main">
          <Editor />
          <Previewer text={this.state.input} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <MarkdownPreviewer />, 
  document.getElementById('root')
);


