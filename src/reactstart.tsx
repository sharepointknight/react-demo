import * as React from "react";
import * as ReactDOM from "react-dom";
import HelloWorld from './components/HelloWorld';

const element = <div>
    <HelloWorld Name="ESPC Webinar Attendees"/>
    <HelloWorld Name="You people are awesome!!!!" />
</div>;

ReactDOM.render(element, document.getElementById("main")); 