'use strict';

//const { marked } = require('marked');

const DEBUG = 1;

let app = null;

const SAMPLE = "# Welcome to my React Markdown Previewer!\n" +
"## This is a sub-heading...\n" +
"### And here's some other cool stuff:\n" +
"Heres some code, `<div></div>`, between 2 backticks.\n\n" +
"```\n" +
"// this is multi-line code:\n\n" +
"function anotherExample(firstLine, lastLine) {\n" +
"  if (firstLine == '```' && lastLine == '```') {\n" +
"    return multiLineCode;\n" +
"  }\n" +
"}\n" +
"```\n\n" +
"You can also make text **bold**... whoa!\n" +
"Or _italic_.\n" +
"Or... wait for it... **_both!_**\n" +
"And feel free to go crazy ~~crossing stuff out~~.\n\n" +
"There's also [links](https://www.freecodecamp.org), and\n\n" +
"> Block Quotes!\n\n" +
"And if you want to get really crazy, even tables:\n\n" +
"Wild Header | Crazy Header | Another Header?\n" +
"------------ | ------------- | -------------\n" +
"Your content can | be here, and it | can be here....\n" +
"And here. | Okay. | I think we get it.\n\n" +
"- And of course there are lists.\n" +
"  - Some are bulleted.\n" +
"     - With different indentation levels.\n" +
"        - That look like this.\n\n\n" +
"1. And there are numbered lists too.\n" +
"1. Use just 1s if you want!\n" +
"1. And last but not least, let's not forget embedded images:\n\n" +
"![GPL3 Logo](https://www.gnu.org/graphics/gplv3-with-text-136x68.png)";

const FOCUS = {
  NONE: 0,
  EDITOR: 1,
  PREVIEW: 2
};

class MarkdownPreview extends React.Component {
  constructor(props) {
    super(props);
    app = this;
    this.state = {
      focus: FOCUS.NONE,
      text: SAMPLE
    };
    this.onButton = this.onButton.bind (this);
  }

  onButton (e) {
    let s = 0;
    switch (e.currentTarget.id) {
      case 'editor-max':
        s = FOCUS.EDITOR;
        break;
      case 'preview-max':
        s = FOCUS.PREVIEW;
        break;
      default:
        s = FOCUS.NONE;
    }
    this.setState ({
      focus: s,
      text: this.state.text
    });
  }

  render() {
    let editor = "", preview = "";
    let editor_button = <button id="editor-max" onClick={this.onButton} ><i className="fa fa-arrows-alt"></i></button>;
    let preview_button = <button id="preview-max" onClick={this.onButton} ><i className="fa fa-arrows-alt"></i></button>;
    let styles = {};
    if (this.state.focus != FOCUS.PREVIEW) {
      if (this.state.focus == FOCUS.EDITOR) {
        editor_button = <button id="editor-min" onClick={this.onButton} ><i className="fa fa-compress"></i></button>;
        styles = {height: '82vh'};
      }
      editor = (
        <div id="editor-window" className="window">
          <div className="titlebar">
            <i className="fa fa-edit"></i>
            <div className="title">Editor</div>
            {editor_button}
          </div>
          <textarea id="editor" onChange={(e) => this.setState ({focus:this.state.focus, text:e.target.value})} value={this.state.text} style={styles} rows="12"/>
        </div>
      );
    }
    if (this.state.focus != FOCUS.EDITOR) {
      if (this.state.focus == FOCUS.PREVIEW)
        preview_button = <button id="preview-min" onClick={this.onButton} ><i className="fa fa-compress"></i></button>;
      preview = (
        <div id="preview-window" className="window">
          <div className="titlebar">
            <i className="fa fa-eye"></i>
            <div className="title">Markdown Preview</div>
            {preview_button}
          </div>
          <div id="preview" dangerouslySetInnerHTML={{__html: window['getmarked'](this.state.text)}}>
          </div>

        </div>
      );
    }
    //debug (Marked.parse (this.state.text));
    return (
      <div>
       {editor}
       {preview}
      </div>
    );
  }
}

function debug (msg) {
    if (DEBUG) console.log (msg);
}

const domContainer = document.querySelector('#previewer_container');
const root = ReactDOM.createRoot(domContainer);
root.render(<MarkdownPreview />);
