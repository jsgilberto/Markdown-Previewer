import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

import './index.css';

const defaultText = `# hello, This is Markdown Live Preview

----
## what is Markdown?
see [Wikipedia](http://en.wikipedia.org/wiki/Markdown)

> Markdown is a lightweight markup language, originally created by John Gruber and Aaron Swartz allowing people "to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML)".

----
## usage
1. Write markdown text in this textarea.
2. Click 'HTML Preview' button.

----
## markdown quick reference
# headers

*emphasis*

**strong**

* list

> block quote

    code
[links](http://wikipedia.org)

----
## changelog
* 21-September-2018 added styles

----
## thanks
* [marked.js](https://github.com/markedjs/marked)`;

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


