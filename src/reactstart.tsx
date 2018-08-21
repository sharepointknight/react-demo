import * as React from "react";
import * as reactDom from "react-dom";
import HelloWorld from "./components/HelloWorld";

var elem = <span>
    <HelloWorld Name="DC" />
    <HelloWorld Name="You guys are cool" />
</span>;

reactDom.render(elem, document.getElementById("main"));
