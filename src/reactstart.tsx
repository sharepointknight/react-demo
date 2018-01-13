import * as React from 'react';
import * as reactDom from 'react-dom';
import HelloWorld from "./components/HelloWorld";

const element = <div>
    <HelloWorld Name={"World"} />
    <HelloWorld Name={"Chicago"} />
    <HelloWorld Name={"is"} />
    <HelloWorld Name={"cool!"} />
    </div>;

reactDom.render(element, document.getElementById("main"));
