/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sp_pnp_js_1 = __webpack_require__(11);
var SharePointService = (function () {
    function SharePointService() {
    }
    SharePointService.GetListItems = function (listTitle) {
        return sp_pnp_js_1.default.sp.web.lists.getByTitle(listTitle).items.get();
    };
    SharePointService.AddListItem = function (listTitle, item) {
        return sp_pnp_js_1.default.sp.web.lists.getByTitle(listTitle).items.add(item);
    };
    return SharePointService;
}());
exports.default = SharePointService;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BandList_1 = __webpack_require__(5);
var BandDetail_1 = __webpack_require__(4);
var NewBand_1 = __webpack_require__(7);
var React = __webpack_require__(0);
var Band_1 = __webpack_require__(9);
var SharePointService_1 = __webpack_require__(2);
;
var SharePointData = (function (_super) {
    __extends(SharePointData, _super);
    function SharePointData() {
        var _this = _super.call(this) || this;
        _this.state = { Bands: [], selectedBand: new Band_1.default() };
        return _this;
    }
    SharePointData.prototype.loadBands = function () {
        SharePointService_1.default.GetListItems("Bands").then(function (data) {
            this.setState({ Bands: data });
        }.bind(this));
    };
    SharePointData.prototype.componentWillMount = function () {
        this.loadBands();
    };
    SharePointData.prototype.bandClicked = function (selBand) {
        this.setState({ selectedBand: selBand });
    };
    SharePointData.prototype.bandAdded = function (newBand) {
        var bands = this.state.Bands;
        bands.push(newBand);
        this.setState({ Bands: bands });
    };
    SharePointData.prototype.render = function () {
        var detail = React.createElement("br", null);
        if (this.state.selectedBand.Title != null)
            detail = React.createElement(BandDetail_1.default, { Band: this.state.selectedBand });
        return (React.createElement("div", null,
            React.createElement("div", { className: "left" },
                React.createElement(BandList_1.default, { Bands: this.state.Bands, ref: "List", bandClicked: this.bandClicked.bind(this) }),
                React.createElement(NewBand_1.default, { bandAdded: this.bandAdded.bind(this) })),
            detail));
    };
    return SharePointData;
}(React.Component));
exports.default = SharePointData;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
;
var BandDetail = (function (_super) {
    __extends(BandDetail, _super);
    function BandDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BandDetail.prototype.render = function () {
        return (React.createElement("div", { className: "left detail" },
            React.createElement("h2", null, this.props.Band.Title),
            React.createElement("img", { src: this.props.Band.ImageUrl, width: "300" }),
            React.createElement("br", null),
            this.props.Band.Description));
    };
    return BandDetail;
}(React.Component));
exports.default = BandDetail;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BandListItem_1 = __webpack_require__(6);
var React = __webpack_require__(0);
;
;
var BandList = (function (_super) {
    __extends(BandList, _super);
    function BandList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //static defaultProps: BandListProps;
    BandList.prototype.handleClick = function (obj) {
        this.setState({ selectedBand: obj });
        if (typeof (this.props.bandClicked) !== "undefined" && this.props.bandClicked != null)
            this.props.bandClicked(obj);
    };
    BandList.prototype.render = function () {
        return (React.createElement("ul", null, this.props.Bands.map(function (obj) {
            return (React.createElement(BandListItem_1.default, { onClick: this.handleClick.bind(this, obj), key: obj.ID, Band: obj }));
        }.bind(this))));
    };
    return BandList;
}(React.Component));
exports.default = BandList;
//BandList.defaultProps = { Bands:[], bandClicked: null}; 


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
;
var BandListItem = (function (_super) {
    __extends(BandListItem, _super);
    function BandListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BandListItem.prototype.render = function () {
        return (React.createElement("li", { onClick: this.props.onClick },
            this.props.Band.Title,
            " - ",
            this.props.Band.Category));
    };
    return BandListItem;
}(React.Component));
exports.default = BandListItem;
//<i className="ms-Icon ms-Icon--MusicNote"></i> 


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var SharePointService_1 = __webpack_require__(2);
;
;
var NewBand = (function (_super) {
    __extends(NewBand, _super);
    function NewBand() {
        var _this = _super.call(this) || this;
        _this.state = { bandName: "", imageUrl: "", category: "Rock", description: "" };
        return _this;
    }
    NewBand.prototype.onTitleChange = function (event) {
        var val = event.target.value;
        this.setState({ bandName: val });
    };
    NewBand.prototype.onImageChange = function (event) {
        var val = event.target.value;
        this.setState({ imageUrl: val });
    };
    NewBand.prototype.onCategoryChange = function (event) {
        var val = event.target.value;
        this.setState({ category: val });
    };
    NewBand.prototype.onDescriptionChange = function (event) {
        var val = event.target.value;
        this.setState({ description: val });
    };
    NewBand.prototype.submit = function () {
        var _this = this;
        SharePointService_1.default.AddListItem("Bands", {
            Title: this.state.bandName,
            Category: this.state.category,
            Description: this.state.description,
            ImageUrl: this.state.imageUrl
        }).then(function (result) {
            _this.setState({
                imageUrl: "",
                category: "Rock",
                description: "",
                bandName: ""
            });
            if (typeof (_this.props.bandAdded) !== "undefined" && _this.props.bandAdded != null)
                _this.props.bandAdded(result.data);
        });
    };
    NewBand.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("input", { type: "text", placeholder: "Band Name", onChange: this.onTitleChange.bind(this), value: this.state.bandName }),
            React.createElement("br", null),
            React.createElement("input", { type: "text", placeholder: "Image URL", onChange: this.onImageChange.bind(this), value: this.state.imageUrl }),
            React.createElement("br", null),
            React.createElement("select", { onChange: this.onCategoryChange.bind(this), value: this.state.category },
                React.createElement("option", null, "Rock"),
                React.createElement("option", null, "Country"),
                React.createElement("option", null, "Techno")),
            React.createElement("br", null),
            React.createElement("textarea", { rows: 2, cols: 10, onChange: this.onDescriptionChange.bind(this), value: this.state.description }),
            React.createElement("br", null),
            React.createElement("button", { type: "button", onClick: this.submit.bind(this) }, "Add")));
    };
    return NewBand;
}(React.Component));
exports.default = NewBand;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var SharePointData_1 = __webpack_require__(3);
ReactDOM.render(React.createElement(SharePointData_1.default, null), document.getElementById("bandApp"));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Band = (function () {
    function Band() {
    }
    return Band;
}());
exports.default = Band;


/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

module.exports = $pnp;

/***/ })
/******/ ]);