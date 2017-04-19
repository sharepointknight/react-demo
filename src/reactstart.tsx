import * as React from "react";
import * as ReactDOM from "react-dom";
import HelloWorld from './components/HelloWorld'

const element = <div>
    <HelloWorld Name="SharePoint Fest DC" />
    <HelloWorld Name="Cool People that are learning about React" />
    </div>
ReactDOM.render(
  element,
  document.getElementById('main')
);