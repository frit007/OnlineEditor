import React, { Component } from 'react';

import FileList from '../containers/file-list';
import FileEditor from '../containers/file-editor';
var css = require('../css/style.scss');

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap';

export default class Editor extends Component {
  render() {
    return (
      <div style={{height:100+'vh'}}>
        <FileList project={this.props.project}/>
        <FileEditor project={this.props.project}/>
      </div>
    );
  }
}
