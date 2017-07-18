/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 91);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(35));

//# sourceMappingURL=Utilities.js.map


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * An IThemingInstruction can specify a rawString to be preserved or a theme slot and a default value
 * to use if that slot is not specified by the theme.
 */

// IE needs to inject styles using cssText. However, we need to evaluate this lazily, so this
// value will initialize as undefined, and later will be set once on first loadStyles injection.
var _injectStylesWithCssText;
// Store the theming state in __themeState__ global scope for reuse in the case of duplicate
// load-themed-styles hosted on the page.
var _root = (typeof window === 'undefined') ? global : window; // tslint:disable-line:no-any
var _themeState = _root.__themeState__ = _root.__themeState__ || {
    theme: undefined,
    lastStyleElement: undefined,
    registeredStyles: []
};
/**
 * Matches theming tokens. For example, "[theme: themeSlotName, default: #FFF]" (including the quotes).
 */
/* tslint:disable: max-line-length */
var _themeTokenRegex = /[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g;
/* tslint:enable: max-line-length */
/** Maximum style text length, for supporting IE style restrictions. */
var MAX_STYLE_CONTENT_SIZE = 10000;
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load
 * event is fired.
 * @param {string | ThemableArray} styles Themable style text to register.
 */
function loadStyles(styles) {
    var styleParts = Array.isArray(styles) ? styles : splitStyles(styles);
    if (_injectStylesWithCssText === undefined) {
        _injectStylesWithCssText = shouldUseCssText();
    }
    applyThemableStyles(styleParts);
}
exports.loadStyles = loadStyles;
/**
 * Allows for customizable loadStyles logic. e.g. for server side rendering application
 * @param {(styles: string) => void} a loadStyles callback that gets called when styles are loaded or reloaded
 */
function configureLoadStyles(callback) {
    _themeState.loadStyles = callback;
}
exports.configureLoadStyles = configureLoadStyles;
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load event
 * is fired.
 * @param {string} styleText Style to register.
 * @param {IStyleRecord} styleRecord Existing style record to re-apply.
 */
function applyThemableStyles(stylesArray, styleRecord) {
    if (_themeState.loadStyles) {
        var styles = resolveThemableArray(stylesArray);
        _themeState.loadStyles(styles);
    }
    else {
        _injectStylesWithCssText ?
            registerStylesIE(stylesArray, styleRecord) :
            registerStyles(stylesArray, styleRecord);
    }
}
/**
 * Registers a set theme tokens to find and replace. If styles were already registered, they will be
 * replaced.
 * @param {theme} theme JSON object of theme tokens to values.
 */
function loadTheme(theme) {
    _themeState.theme = theme;
    // reload styles.
    reloadStyles();
}
exports.loadTheme = loadTheme;
/**
 * Reloads styles.
 */
function reloadStyles() {
    if (_themeState.theme) {
        for (var _i = 0, _a = _themeState.registeredStyles; _i < _a.length; _i++) {
            var styleRecord = _a[_i];
            applyThemableStyles(styleRecord.themableStyle, styleRecord);
        }
    }
}
/**
 * Find theme tokens and replaces them with provided theme values.
 * @param {string} styles Tokenized styles to fix.
 */
function detokenize(styles) {
    if (styles) {
        styles = resolveThemableArray(splitStyles(styles));
    }
    return styles;
}
exports.detokenize = detokenize;
/**
 * Resolves ThemingInstruction objects in an array and joins the result into a string.
 * @param {ThemableArray} splitStyleArray ThemableArray to resolve and join.
 */
function resolveThemableArray(splitStyleArray) {
    var theme = _themeState.theme;
    var resolvedCss;
    if (splitStyleArray) {
        // Resolve the array of theming instructions to an array of strings.
        // Then join the array to produce the final CSS string.
        var resolvedArray = splitStyleArray.map(function (currentValue) {
            var themeSlot = currentValue.theme;
            if (themeSlot) {
                // A theming annotation. Resolve it.
                var themedValue = theme ? theme[themeSlot] : undefined;
                var defaultValue = currentValue.defaultValue;
                // Warn to console if we hit an unthemed value even when themes are provided.
                // Allow the themedValue to be undefined to explicitly request the default value.
                if (theme && !themedValue && console && !(themeSlot in theme)) {
                    /* tslint:disable: max-line-length */
                    console.warn("Theming value not provided for \"" + themeSlot + "\". Falling back to \"" + (defaultValue || 'inherit') + "\".");
                }
                return themedValue || defaultValue || 'inherit';
            }
            else {
                // A non-themable string. Preserve it.
                return currentValue.rawString;
            }
        });
        resolvedCss = resolvedArray.join('');
    }
    return resolvedCss;
}
/**
 * Split tokenized CSS into an array of strings and theme specification objects
 * @param {string} styles Tokenized styles to split.
 */
function splitStyles(styles) {
    var result = [];
    if (styles) {
        var pos = 0; // Current position in styles.
        var tokenMatch = void 0;
        while (tokenMatch = _themeTokenRegex.exec(styles)) {
            var matchIndex = tokenMatch.index;
            if (matchIndex > pos) {
                result.push({
                    rawString: styles.substring(pos, matchIndex)
                });
            }
            result.push({
                theme: tokenMatch[1],
                defaultValue: tokenMatch[2] // May be undefined
            });
            // index of the first character after the current match
            pos = _themeTokenRegex.lastIndex;
        }
        // Push the rest of the string after the last match.
        result.push({
            rawString: styles.substring(pos)
        });
    }
    return result;
}
exports.splitStyles = splitStyles;
/**
 * Registers a set of style text. If it is registered too early, we will register it when the
 * window.load event is fired.
 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
 * @param {IStyleRecord} styleRecord May specify a style Element to update.
 */
function registerStyles(styleArray, styleRecord) {
    var head = document.getElementsByTagName('head')[0];
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(resolveThemableArray(styleArray)));
    if (styleRecord) {
        head.replaceChild(styleElement, styleRecord.styleElement);
        styleRecord.styleElement = styleElement;
    }
    else {
        head.appendChild(styleElement);
    }
    if (!styleRecord) {
        _themeState.registeredStyles.push({
            styleElement: styleElement,
            themableStyle: styleArray
        });
    }
}
/**
 * Registers a set of style text, for IE 9 and below, which has a ~30 style element limit so we need
 * to register slightly differently.
 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
 * @param {IStyleRecord} styleRecord May specify a style Element to update.
 */
function registerStylesIE(styleArray, styleRecord) {
    var head = document.getElementsByTagName('head')[0];
    var lastStyleElement = _themeState.lastStyleElement, registeredStyles = _themeState.registeredStyles;
    var stylesheet = lastStyleElement ? lastStyleElement.styleSheet : undefined;
    var lastStyleContent = stylesheet ? stylesheet.cssText : '';
    var lastRegisteredStyle = registeredStyles[registeredStyles.length - 1];
    var resolvedStyleText = resolveThemableArray(styleArray);
    if (!lastStyleElement || (lastStyleContent.length + resolvedStyleText.length) > MAX_STYLE_CONTENT_SIZE) {
        lastStyleElement = document.createElement('style');
        lastStyleElement.type = 'text/css';
        if (styleRecord) {
            head.replaceChild(lastStyleElement, styleRecord.styleElement);
            styleRecord.styleElement = lastStyleElement;
        }
        else {
            head.appendChild(lastStyleElement);
        }
        if (!styleRecord) {
            lastRegisteredStyle = {
                styleElement: lastStyleElement,
                themableStyle: styleArray
            };
            registeredStyles.push(lastRegisteredStyle);
        }
    }
    lastStyleElement.styleSheet.cssText += detokenize(resolvedStyleText);
    Array.prototype.push.apply(lastRegisteredStyle.themableStyle, styleArray); // concat in-place
    // Preserve the theme state.
    _themeState.lastStyleElement = lastStyleElement;
}
/**
 * Checks to see if styleSheet exists as a property off of a style element.
 * This will determine if style registration should be done via cssText (<= IE9) or not
 */
function shouldUseCssText() {
    var useCSSText = false;
    if (typeof document !== 'undefined') {
        var emptyStyle = document.createElement('style');
        emptyStyle.type = 'text/css';
        useCSSText = !!emptyStyle.styleSheet;
    }
    return useCSSText;
}

//# sourceMappingURL=index.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(89)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DirectionalHint;
(function (DirectionalHint) {
    /**
     * Appear above the target element, with the left edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["topLeftEdge"] = 0] = "topLeftEdge";
    /**
     * Appear above the target element, with the centers of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["topCenter"] = 1] = "topCenter";
    /**
     * Appear above the target element, with the right edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["topRightEdge"] = 2] = "topRightEdge";
    /**
     * Appear above the target element, aligning with the target element such that the callout tends toward the center of the screen.
     */
    DirectionalHint[DirectionalHint["topAutoEdge"] = 3] = "topAutoEdge";
    /**
     * Appear below the target element, with the left edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["bottomLeftEdge"] = 4] = "bottomLeftEdge";
    /**
     * Appear below the target element, with the centers of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["bottomCenter"] = 5] = "bottomCenter";
    /**
     * Appear below the target element, with the right edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["bottomRightEdge"] = 6] = "bottomRightEdge";
    /**
     * Appear below the target element, aligning with the target element such that the callout tends toward the center of the screen.
     */
    DirectionalHint[DirectionalHint["bottomAutoEdge"] = 7] = "bottomAutoEdge";
    /**
     * Appear to the left of the target element, with the top edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["leftTopEdge"] = 8] = "leftTopEdge";
    /**
     * Appear to the left of the target element, with the centers of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["leftCenter"] = 9] = "leftCenter";
    /**
     * Appear to the left of the target element, with the bottom edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["leftBottomEdge"] = 10] = "leftBottomEdge";
    /**
     * Appear to the right of the target element, with the top edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["rightTopEdge"] = 11] = "rightTopEdge";
    /**
     * Appear to the right of the target element, with the centers of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["rightCenter"] = 12] = "rightCenter";
    /**
     * Appear to the right of the target element, with the bottom edges of the callout and target aligning.
     */
    DirectionalHint[DirectionalHint["rightBottomEdge"] = 13] = "rightBottomEdge";
})(DirectionalHint = exports.DirectionalHint || (exports.DirectionalHint = {}));

//# sourceMappingURL=DirectionalHint.js.map


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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var Icon_1 = __webpack_require__(12);
var DirectionalHint_1 = __webpack_require__(3);
var ContextualMenu_1 = __webpack_require__(47);
var styles = __webpack_require__(52);
var BaseButton = (function (_super) {
    __extends(BaseButton, _super);
    function BaseButton(props, rootClassName) {
        var _this = _super.call(this, props) || this;
        _this._warnDeprecations({
            rootProps: null,
            icon: 'iconProps',
            menuIconName: 'menuIconProps'
        });
        _this._labelId = Utilities_1.getId();
        _this._descriptionId = Utilities_1.getId();
        _this._ariaDescriptionId = Utilities_1.getId();
        _this.state = {
            menuProps: null
        };
        return _this;
    }
    BaseButton.prototype.render = function () {
        var _a = this.props, description = _a.description, ariaLabel = _a.ariaLabel, ariaDescription = _a.ariaDescription, href = _a.href, disabled = _a.disabled, classNames = _a.classNames;
        var _b = this, _ariaDescriptionId = _b._ariaDescriptionId, _labelId = _b._labelId, _descriptionId = _b._descriptionId;
        var renderAsAnchor = !!href;
        var tag = renderAsAnchor ? 'a' : 'button';
        var nativeProps = Utilities_1.getNativeProps(Utilities_1.assign({}, this.props.rootProps, this.props), renderAsAnchor ? Utilities_1.anchorProperties : Utilities_1.buttonProperties, [
            'disabled' // Let disabled buttons be focused and styled as disabled.
        ]);
        // Check for ariaDescription, description or aria-describedby in the native props to determine source of aria-describedby
        // otherwise default to null.
        var ariaDescribedBy;
        if (ariaDescription) {
            ariaDescribedBy = _ariaDescriptionId;
        }
        else if (description) {
            ariaDescribedBy = _descriptionId;
        }
        else if (nativeProps['aria-describedby']) {
            ariaDescribedBy = nativeProps['aria-describedby'];
        }
        else {
            ariaDescribedBy = null;
        }
        var buttonProps = Utilities_1.assign(nativeProps, {
            className: Utilities_1.css(styles.root, this.props.className, classNames.base, classNames.variant, classNames.root, (_c = {
                    'disabled': disabled
                },
                _c[classNames.isDisabled] = disabled,
                _c[classNames.isEnabled] = !disabled,
                _c)),
            ref: this._resolveRef('_buttonElement'),
            'disabled': disabled,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabel ? null : _labelId,
            'aria-describedby': ariaDescribedBy,
            'aria-disabled': disabled
        });
        // Override onClick if contextualMenuItems passed in. Eventually allow _onToggleMenu to
        // be assigned to split button click if onClick already has a value
        if (this.props.menuProps) {
            Utilities_1.assign(buttonProps, { 'onClick': this._onToggleMenu });
        }
        return this._onRenderContent(tag, buttonProps);
        var _c;
    };
    BaseButton.prototype.focus = function () {
        if (this._buttonElement) {
            this._buttonElement.focus();
        }
    };
    BaseButton.prototype._onRenderContent = function (tag, buttonProps) {
        var props = this.props;
        var classNames = props.classNames, menuIconName = props.menuIconName, menuProps = props.menuProps, _a = props.onRenderIcon, onRenderIcon = _a === void 0 ? this._onRenderIcon : _a, _b = props.onRenderText, onRenderText = _b === void 0 ? this._onRenderText : _b, _c = props.onRenderDescription, onRenderDescription = _c === void 0 ? this._onRenderDescription : _c, _d = props.onRenderAriaDescription, onRenderAriaDescription = _d === void 0 ? this._onRenderAriaDescription : _d, _e = props.onRenderChildren, onRenderChildren = _e === void 0 ? this._onRenderChildren : _e, _f = props.onRenderMenu, onRenderMenu = _f === void 0 ? this._onRenderMenu : _f, _g = props.onRenderMenuIcon, onRenderMenuIcon = _g === void 0 ? this._onRenderMenuIcon : _g;
        var className = Utilities_1.css(classNames.base + '-flexContainer', styles.flexContainer, classNames.flexContainer);
        return React.createElement(tag, buttonProps, React.createElement('div', { className: className }, onRenderIcon(props, this._onRenderIcon), onRenderText(props, this._onRenderText), onRenderDescription(props, this._onRenderDescription), onRenderAriaDescription(props, this._onRenderAriaDescription), onRenderChildren(props, this._onRenderChildren), (menuProps || menuIconName || this.props.onRenderMenuIcon) && onRenderMenuIcon(this.props, this._onRenderMenuIcon), this.state.menuProps && onRenderMenu(menuProps, this._onRenderMenu)));
    };
    BaseButton.prototype._onRenderIcon = function (buttonProps, defaultRender) {
        var _a = this.props, classNames = _a.classNames, icon = _a.icon, iconProps = _a.iconProps;
        if (icon || iconProps) {
            iconProps = iconProps || {
                iconName: icon
            };
        }
        return iconProps && (React.createElement(Icon_1.Icon, __assign({}, iconProps, { className: Utilities_1.css(classNames.base + "-icon", classNames.icon, iconProps.className) })));
    };
    BaseButton.prototype._onRenderText = function () {
        var _a = this.props, classNames = _a.classNames, children = _a.children, text = _a.text;
        // For backwards compat, we should continue to take in the text content from children.
        if (text === undefined && typeof (children) === 'string') {
            text = children;
        }
        return text && (React.createElement("span", { className: Utilities_1.css(classNames.base + "-label", classNames.label), id: this._labelId }, text));
    };
    BaseButton.prototype._onRenderChildren = function () {
        var children = this.props.children;
        // If children is just a string, either it or the text will be rendered via onRenderLabel
        // If children is another component, it will be rendered after text
        if (typeof (children) === 'string') {
            return null;
        }
        return children;
    };
    BaseButton.prototype._onRenderDescription = function () {
        var _a = this.props, classNames = _a.classNames, description = _a.description;
        // ms-Button-description is only shown when the button type is compound.
        // In other cases it will not be displayed.
        return description ? (React.createElement("span", { className: Utilities_1.css(classNames.base + "-description", classNames.description), id: this._descriptionId }, description)) : (null);
    };
    BaseButton.prototype._onRenderAriaDescription = function () {
        var ariaDescription = this.props.ariaDescription;
        // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
        // otherwise it will be assigned to descriptionSpan.
        return ariaDescription ? (React.createElement("span", { className: styles.screenReaderOnly, id: this._ariaDescriptionId }, ariaDescription)) : (null);
    };
    BaseButton.prototype._onRenderMenuIcon = function (props) {
        var _a = this.props, classNames = _a.classNames, menuIconProps = _a.menuIconProps, menuIconName = _a.menuIconName;
        if (menuIconProps === undefined) {
            menuIconProps = {
                iconName: menuIconName === undefined ? 'ChevronDown' : menuIconName
            };
        }
        return (menuIconProps ?
            React.createElement(Icon_1.Icon, __assign({}, menuIconProps, { className: Utilities_1.css(classNames.base + "-icon", classNames.menuIcon, menuIconProps.className) }))
            :
                null);
    };
    BaseButton.prototype._onRenderMenu = function (menuProps) {
        return (React.createElement(ContextualMenu_1.ContextualMenu, { className: Utilities_1.css('ms-BaseButton-menuHost'), isBeakVisible: true, directionalHint: DirectionalHint_1.DirectionalHint.bottomLeftEdge, items: menuProps.items, target: this._buttonElement, labelElementId: this._labelId, onDismiss: this._onToggleMenu }));
    };
    BaseButton.prototype._onToggleMenu = function () {
        var menuProps = this.props.menuProps;
        var currentMenuProps = this.state.menuProps;
        this.setState({ menuProps: currentMenuProps ? null : menuProps });
    };
    return BaseButton;
}(Utilities_1.BaseComponent));
BaseButton.defaultProps = {
    classNames: {
        base: 'ms-Button',
        variant: '',
        isEnabled: '',
        isDisabled: ''
    }
};
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderIcon", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderText", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderChildren", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderDescription", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderAriaDescription", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderMenuIcon", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onRenderMenu", null);
__decorate([
    Utilities_1.autobind
], BaseButton.prototype, "_onToggleMenu", null);
exports.BaseButton = BaseButton;

//# sourceMappingURL=BaseButton.js.map


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sets the virtual parent of an element.
 * Pass `undefined` as the `parent` to clear the virtual parent.
 *
 * @export
 * @param {HTMLElement} child
 * @param {HTMLElement} parent
 */
function setVirtualParent(child, parent) {
    var virtualChild = child;
    var virtualParent = parent;
    if (!virtualChild._virtual) {
        virtualChild._virtual = {
            children: []
        };
    }
    var oldParent = virtualChild._virtual.parent;
    if (oldParent && oldParent !== parent) {
        // Remove the child from its old parent.
        var index = oldParent._virtual.children.indexOf(virtualChild);
        if (index > -1) {
            oldParent._virtual.children.splice(index, 1);
        }
    }
    virtualChild._virtual.parent = virtualParent || undefined;
    if (virtualParent) {
        if (!virtualParent._virtual) {
            virtualParent._virtual = {
                children: []
            };
        }
        virtualParent._virtual.children.push(virtualChild);
    }
}
exports.setVirtualParent = setVirtualParent;
function getVirtualParent(child) {
    var parent;
    if (child && isVirtualElement(child)) {
        parent = child._virtual.parent;
    }
    return parent;
}
exports.getVirtualParent = getVirtualParent;
/**
 * Gets the element which is the parent of a given element.
 * If `allowVirtuaParents` is `true`, this method prefers the virtual parent over
 * real DOM parent when present.
 *
 * @export
 * @param {HTMLElement} child
 * @param {boolean} [allowVirtualParents=true]
 * @returns {HTMLElement}
 */
function getParent(child, allowVirtualParents) {
    if (allowVirtualParents === void 0) { allowVirtualParents = true; }
    return child && (allowVirtualParents && getVirtualParent(child) ||
        child.parentNode && child.parentNode);
}
exports.getParent = getParent;
/**
 * Determines whether or not a parent element contains a given child element.
 * If `allowVirtualParents` is true, this method may return `true` if the child
 * has the parent in its virtual element hierarchy.
 *
 * @export
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 * @param {boolean} [allowVirtualParents=true]
 * @returns {boolean}
 */
function elementContains(parent, child, allowVirtualParents) {
    if (allowVirtualParents === void 0) { allowVirtualParents = true; }
    var isContained = false;
    if (parent && child) {
        if (allowVirtualParents) {
            isContained = false;
            while (child) {
                var nextParent = getParent(child);
                if (nextParent === parent) {
                    isContained = true;
                    break;
                }
                child = nextParent;
            }
        }
        else if (parent.contains) {
            isContained = parent.contains(child);
        }
    }
    return isContained;
}
exports.elementContains = elementContains;
var _isSSR = false;
/** Helper to set ssr mode to simulate no window object returned from getWindow helper. */
function setSSR(isEnabled) {
    _isSSR = isEnabled;
}
exports.setSSR = setSSR;
/** Helper to get the window object. */
function getWindow(rootElement) {
    if (_isSSR) {
        return undefined;
    }
    else {
        return (rootElement &&
            rootElement.ownerDocument &&
            rootElement.ownerDocument.defaultView ?
            rootElement.ownerDocument.defaultView :
            window);
    }
}
exports.getWindow = getWindow;
/** Helper to get the document object. */
function getDocument(rootElement) {
    if (_isSSR) {
        return undefined;
    }
    else {
        return rootElement && rootElement.ownerDocument ? rootElement.ownerDocument : document;
    }
}
exports.getDocument = getDocument;
/** Helper to get bounding client rect, works with window. */
function getRect(element) {
    var rect;
    if (element) {
        if (element === window) {
            rect = {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                right: window.innerWidth,
                bottom: window.innerHeight
            };
        }
        else if (element.getBoundingClientRect) {
            rect = element.getBoundingClientRect();
        }
    }
    return rect;
}
exports.getRect = getRect;
/**
 * Determines whether or not an element has the virtual hierarchy extension.
 *
 * @param {(HTMLElement | IVirtualElement)} element
 * @returns {element is IVirtualElement}
 */
function isVirtualElement(element) {
    return element && !!element._virtual;
}

//# sourceMappingURL=dom.js.map


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* tslint:disable:no-string-literal */

Object.defineProperty(exports, "__esModule", { value: true });
/** An instance of EventGroup allows anything with a handle to it to trigger events on it.
 *  If the target is an HTMLElement, the event will be attached to the element and can be
 *  triggered as usual (like clicking for onclick).
 *  The event can be triggered by calling EventGroup.raise() here. If the target is an
 *  HTMLElement, the event gets raised and is handled by the browser. Otherwise, it gets
 *  handled here in EventGroup, and the handler is called in the context of the parent
 *  (which is passed in in the constructor).
 */
var EventGroup = (function () {
    /** parent: the context in which events attached to non-HTMLElements are called */
    function EventGroup(parent) {
        this._id = EventGroup._uniqueId++;
        this._parent = parent;
        this._eventRecords = [];
    }
    /** For IE8, bubbleEvent is ignored here and must be dealt with by the handler.
     *  Events raised here by default have bubbling set to false and cancelable set to true.
     *  This applies also to built-in events being raised manually here on HTMLElements,
     *  which may lead to unexpected behavior if it differs from the defaults.
     */
    EventGroup.raise = function (target, eventName, eventArgs, bubbleEvent) {
        var retVal;
        if (EventGroup._isElement(target)) {
            if (document.createEvent) {
                var ev = document.createEvent('HTMLEvents');
                ev.initEvent(eventName, bubbleEvent, true);
                ev['args'] = eventArgs;
                retVal = target.dispatchEvent(ev);
            }
            else if (document['createEventObject']) {
                var evObj = document['createEventObject'](eventArgs);
                // cannot set cancelBubble on evObj, fireEvent will overwrite it
                target.fireEvent('on' + eventName, evObj);
            }
        }
        else {
            while (target && retVal !== false) {
                var events = target.__events__;
                var eventRecords = events ? events[eventName] : null;
                for (var id in eventRecords) {
                    if (eventRecords.hasOwnProperty(id)) {
                        var eventRecordList = eventRecords[id];
                        for (var listIndex = 0; retVal !== false && listIndex < eventRecordList.length; listIndex++) {
                            var record = eventRecordList[listIndex];
                            if (record.objectCallback) {
                                retVal = record.objectCallback.call(record.parent, eventArgs);
                            }
                        }
                    }
                }
                // If the target has a parent, bubble the event up.
                target = bubbleEvent ? target.parent : null;
            }
        }
        return retVal;
    };
    EventGroup.isObserved = function (target, eventName) {
        var events = target && target.__events__;
        return !!events && !!events[eventName];
    };
    /** Check to see if the target has declared support of the given event. */
    EventGroup.isDeclared = function (target, eventName) {
        var declaredEvents = target && target.__declaredEvents;
        return !!declaredEvents && !!declaredEvents[eventName];
    };
    EventGroup.stopPropagation = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            event.cancelBubble = true;
        }
    };
    EventGroup._isElement = function (target) {
        return !!target && (target.addEventListener || target instanceof HTMLElement);
    };
    EventGroup.prototype.dispose = function () {
        if (!this._isDisposed) {
            this._isDisposed = true;
            this.off();
            this._parent = null;
        }
    };
    /** On the target, attach a set of events, where the events object is a name to function mapping. */
    EventGroup.prototype.onAll = function (target, events, useCapture) {
        for (var eventName in events) {
            if (events.hasOwnProperty(eventName)) {
                this.on(target, eventName, events[eventName], useCapture);
            }
        }
    };
    /** On the target, attach an event whose handler will be called in the context of the parent
     * of this instance of EventGroup.
     */
    EventGroup.prototype.on = function (target, eventName, callback, useCapture) {
        var _this = this;
        if (eventName.indexOf(',') > -1) {
            var events = eventName.split(/[ ,]+/);
            for (var i = 0; i < events.length; i++) {
                this.on(target, events[i], callback, useCapture);
            }
        }
        else {
            var parent_1 = this._parent;
            var eventRecord = {
                target: target,
                eventName: eventName,
                parent: parent_1,
                callback: callback,
                objectCallback: null,
                elementCallback: null,
                useCapture: useCapture
            };
            // Initialize and wire up the record on the target, so that it can call the callback if the event fires.
            var events = (target.__events__ = target.__events__ || {});
            events[eventName] = events[eventName] || {
                count: 0
            };
            events[eventName][this._id] = events[eventName][this._id] || [];
            events[eventName][this._id].push(eventRecord);
            events[eventName].count++;
            if (EventGroup._isElement(target)) {
                var processElementEvent = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (_this._isDisposed) {
                        return;
                    }
                    var result;
                    try {
                        result = callback.apply(parent_1, args);
                        if (result === false && args[0]) {
                            var e = args[0];
                            if (e.preventDefault) {
                                e.preventDefault();
                            }
                            if (e.stopPropagation) {
                                e.stopPropagation();
                            }
                            e.cancelBubble = true;
                        }
                    }
                    catch (e) {
                        /* ErrorHelper.log(e); */
                    }
                    return result;
                };
                eventRecord.elementCallback = processElementEvent;
                if (target.addEventListener) {
                    /* tslint:disable:ban-native-functions */
                    target.addEventListener(eventName, processElementEvent, useCapture);
                    /* tslint:enable:ban-native-functions */
                }
                else if (target.attachEvent) {
                    target.attachEvent('on' + eventName, processElementEvent);
                }
            }
            else {
                var processObjectEvent = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (_this._isDisposed) {
                        return;
                    }
                    return callback.apply(parent_1, args);
                };
                eventRecord.objectCallback = processObjectEvent;
            }
            // Remember the record locally, so that it can be removed.
            this._eventRecords.push(eventRecord);
        }
    };
    EventGroup.prototype.off = function (target, eventName, callback, useCapture) {
        for (var i = 0; i < this._eventRecords.length; i++) {
            var eventRecord = this._eventRecords[i];
            if ((!target || target === eventRecord.target) &&
                (!eventName || eventName === eventRecord.eventName) &&
                (!callback || callback === eventRecord.callback) &&
                ((typeof useCapture !== 'boolean') || useCapture === eventRecord.useCapture)) {
                var events = eventRecord.target.__events__;
                var targetArrayLookup = events[eventRecord.eventName];
                var targetArray = targetArrayLookup ? targetArrayLookup[this._id] : null;
                // We may have already target's entries, so check for null.
                if (targetArray) {
                    if (targetArray.length === 1 || !callback) {
                        targetArrayLookup.count -= targetArray.length;
                        delete events[eventRecord.eventName][this._id];
                    }
                    else {
                        targetArrayLookup.count--;
                        targetArray.splice(targetArray.indexOf(eventRecord), 1);
                    }
                    if (!targetArrayLookup.count) {
                        delete events[eventRecord.eventName];
                    }
                }
                if (eventRecord.elementCallback) {
                    if (eventRecord.target.removeEventListener) {
                        eventRecord.target.removeEventListener(eventRecord.eventName, eventRecord.elementCallback, eventRecord.useCapture);
                    }
                    else if (eventRecord.target.detachEvent) {
                        eventRecord.target.detachEvent('on' + eventRecord.eventName, eventRecord.elementCallback);
                    }
                }
                this._eventRecords.splice(i--, 1);
            }
        }
    };
    /** Trigger the given event in the context of this instance of EventGroup. */
    EventGroup.prototype.raise = function (eventName, eventArgs, bubbleEvent) {
        return EventGroup.raise(this._parent, eventName, eventArgs, bubbleEvent);
    };
    /** Declare an event as being supported by this instance of EventGroup. */
    EventGroup.prototype.declare = function (event) {
        var declaredEvents = this._parent.__declaredEvents = this._parent.__declaredEvents || {};
        if (typeof event === 'string') {
            declaredEvents[event] = true;
        }
        else {
            for (var i = 0; i < event.length; i++) {
                declaredEvents[event[i]] = true;
            }
        }
    };
    return EventGroup;
}());
EventGroup._uniqueId = 0;
exports.EventGroup = EventGroup;

//# sourceMappingURL=EventGroup.js.map


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Bugs often appear in async code when stuff gets disposed, but async operations don't get canceled.
 * This Async helper class solves these issues by tying async code to the lifetime of a disposable object.
 *
 * Usage: Anything class extending from BaseModel can access this helper via this.async. Otherwise create a
 * new instance of the class and remember to call dispose() during your code's dispose handler.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var Async = (function () {
    function Async(parent, onError) {
        this._timeoutIds = null;
        this._immediateIds = null;
        this._intervalIds = null;
        this._animationFrameIds = null;
        this._isDisposed = false;
        this._parent = parent || null;
        this._onErrorHandler = onError;
        this._noop = function () { };
    }
    /**
     * Dispose function, clears all async operations.
     */
    Async.prototype.dispose = function () {
        var id;
        this._isDisposed = true;
        this._parent = null;
        // Clear timeouts.
        if (this._timeoutIds) {
            for (id in this._timeoutIds) {
                if (this._timeoutIds.hasOwnProperty(id)) {
                    this.clearTimeout(id);
                }
            }
            this._timeoutIds = null;
        }
        // Clear immediates.
        if (this._immediateIds) {
            for (id in this._immediateIds) {
                if (this._immediateIds.hasOwnProperty(id)) {
                    this.clearImmediate(id);
                }
            }
            this._immediateIds = null;
        }
        // Clear intervals.
        if (this._intervalIds) {
            for (id in this._intervalIds) {
                if (this._intervalIds.hasOwnProperty(id)) {
                    this.clearInterval(id);
                }
            }
            this._intervalIds = null;
        }
        // Clear animation frames.
        if (this._animationFrameIds) {
            for (id in this._animationFrameIds) {
                if (this._animationFrameIds.hasOwnProperty(id)) {
                    this.cancelAnimationFrame(id);
                }
            }
            this._animationFrameIds = null;
        }
    };
    /**
     * SetTimeout override, which will auto cancel the timeout during dispose.
     * @param callback Callback to execute.
     * @param duration Duration in milliseconds.
     * @return The setTimeout id.
     */
    Async.prototype.setTimeout = function (callback, duration) {
        var _this = this;
        var timeoutId = 0;
        if (!this._isDisposed) {
            if (!this._timeoutIds) {
                this._timeoutIds = {};
            }
            /* tslint:disable:ban-native-functions */
            timeoutId = setTimeout(function () {
                // Time to execute the timeout, enqueue it as a foreground task to be executed.
                try {
                    // Now delete the record and call the callback.
                    delete _this._timeoutIds[timeoutId];
                    callback.apply(_this._parent);
                }
                catch (e) {
                    if (_this._onErrorHandler) {
                        _this._onErrorHandler(e);
                    }
                }
            }, duration);
            /* tslint:enable:ban-native-functions */
            this._timeoutIds[timeoutId] = true;
        }
        return timeoutId;
    };
    /**
     * Clears the timeout.
     * @param id Id to cancel.
     */
    Async.prototype.clearTimeout = function (id) {
        if (this._timeoutIds && this._timeoutIds[id]) {
            /* tslint:disable:ban-native-functions */
            clearTimeout(id);
            delete this._timeoutIds[id];
            /* tslint:enable:ban-native-functions */
        }
    };
    /**
     * SetImmediate override, which will auto cancel the immediate during dispose.
     * @param callback Callback to execute.
     * @return The setTimeout id.
     */
    Async.prototype.setImmediate = function (callback) {
        var _this = this;
        var immediateId = 0;
        if (!this._isDisposed) {
            if (!this._immediateIds) {
                this._immediateIds = {};
            }
            /* tslint:disable:ban-native-functions */
            var setImmediateCallback = function () {
                // Time to execute the timeout, enqueue it as a foreground task to be executed.
                try {
                    // Now delete the record and call the callback.
                    delete _this._immediateIds[immediateId];
                    callback.apply(_this._parent);
                }
                catch (e) {
                    _this._logError(e);
                }
            };
            immediateId = window.setImmediate ? window.setImmediate(setImmediateCallback) : window.setTimeout(setImmediateCallback, 0);
            /* tslint:enable:ban-native-functions */
            this._immediateIds[immediateId] = true;
        }
        return immediateId;
    };
    /**
     * Clears the immediate.
     * @param id Id to cancel.
     */
    Async.prototype.clearImmediate = function (id) {
        if (this._immediateIds && this._immediateIds[id]) {
            /* tslint:disable:ban-native-functions */
            window.clearImmediate ? window.clearImmediate(id) : window.clearTimeout(id);
            delete this._immediateIds[id];
            /* tslint:enable:ban-native-functions */
        }
    };
    /**
     * SetInterval override, which will auto cancel the timeout during dispose.
     * @param callback Callback to execute.
     * @param duration Duration in milliseconds.
     * @return The setTimeout id.
     */
    Async.prototype.setInterval = function (callback, duration) {
        var _this = this;
        var intervalId = 0;
        if (!this._isDisposed) {
            if (!this._intervalIds) {
                this._intervalIds = {};
            }
            /* tslint:disable:ban-native-functions */
            intervalId = setInterval(function () {
                // Time to execute the interval callback, enqueue it as a foreground task to be executed.
                try {
                    callback.apply(_this._parent);
                }
                catch (e) {
                    _this._logError(e);
                }
            }, duration);
            /* tslint:enable:ban-native-functions */
            this._intervalIds[intervalId] = true;
        }
        return intervalId;
    };
    /**
     * Clears the interval.
     * @param id Id to cancel.
     */
    Async.prototype.clearInterval = function (id) {
        if (this._intervalIds && this._intervalIds[id]) {
            /* tslint:disable:ban-native-functions */
            clearInterval(id);
            delete this._intervalIds[id];
            /* tslint:enable:ban-native-functions */
        }
    };
    /**
     * Creates a function that, when executed, will only call the func function at most once per
     * every wait milliseconds. Provide an options object to indicate that func should be invoked
     * on the leading and/or trailing edge of the wait timeout. Subsequent calls to the throttled
     * function will return the result of the last func call.
     *
     * Note: If leading and trailing options are true func will be called on the trailing edge of
     * the timeout only if the the throttled function is invoked more than once during the wait timeout.
     *
     * @param func The function to throttle.
     * @param wait The number of milliseconds to throttle executions to. Defaults to 0.
     * @param options The options object.
     * @param options.leading Specify execution on the leading edge of the timeout.
     * @param options.trailing Specify execution on the trailing edge of the timeout.
     * @return The new throttled function.
     */
    Async.prototype.throttle = function (func, wait, options) {
        var _this = this;
        if (this._isDisposed) {
            return this._noop;
        }
        var waitMS = wait || 0;
        var leading = true;
        var trailing = true;
        var lastExecuteTime = 0;
        var lastResult;
        var lastArgs;
        var timeoutId = null;
        if (options && typeof (options.leading) === 'boolean') {
            leading = options.leading;
        }
        if (options && typeof (options.trailing) === 'boolean') {
            trailing = options.trailing;
        }
        var callback = function (userCall) {
            var now = (new Date).getTime();
            var delta = now - lastExecuteTime;
            var waitLength = leading ? waitMS - delta : waitMS;
            if (delta >= waitMS && (!userCall || leading)) {
                lastExecuteTime = now;
                if (timeoutId) {
                    _this.clearTimeout(timeoutId);
                    timeoutId = null;
                }
                lastResult = func.apply(_this._parent, lastArgs);
            }
            else if (timeoutId === null && trailing) {
                timeoutId = _this.setTimeout(callback, waitLength);
            }
            return lastResult;
        };
        var resultFunction = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            lastArgs = args;
            return callback(true);
        };
        return resultFunction;
    };
    /**
     * Creates a function that will delay the execution of func until after wait milliseconds have
     * elapsed since the last time it was invoked. Provide an options object to indicate that func
     * should be invoked on the leading and/or trailing edge of the wait timeout. Subsequent calls
     * to the debounced function will return the result of the last func call.
     *
     * Note: If leading and trailing options are true func will be called on the trailing edge of
     * the timeout only if the the debounced function is invoked more than once during the wait
     * timeout.
     *
     * @param func The function to debounce.
     * @param wait The number of milliseconds to delay.
     * @param options The options object.
     * @param options.leading Specify execution on the leading edge of the timeout.
     * @param options.maxWait The maximum time func is allowed to be delayed before it's called.
     * @param options.trailing Specify execution on the trailing edge of the timeout.
     * @return The new debounced function.
     */
    Async.prototype.debounce = function (func, wait, options) {
        var _this = this;
        if (this._isDisposed) {
            return this._noop;
        }
        var waitMS = wait || 0;
        var leading = false;
        var trailing = true;
        var maxWait = null;
        var lastCallTime = 0;
        var lastExecuteTime = (new Date).getTime();
        var lastResult;
        var lastArgs;
        var timeoutId = null;
        if (options && typeof (options.leading) === 'boolean') {
            leading = options.leading;
        }
        if (options && typeof (options.trailing) === 'boolean') {
            trailing = options.trailing;
        }
        if (options && typeof (options.maxWait) === 'number' && !isNaN(options.maxWait)) {
            maxWait = options.maxWait;
        }
        var callback = function (userCall) {
            var now = (new Date).getTime();
            var executeImmediately = false;
            if (userCall) {
                if (leading && now - lastCallTime >= waitMS) {
                    executeImmediately = true;
                }
                lastCallTime = now;
            }
            var delta = now - lastCallTime;
            var waitLength = waitMS - delta;
            var maxWaitDelta = now - lastExecuteTime;
            var maxWaitExpired = false;
            if (maxWait !== null) {
                // maxWait only matters when there is a pending callback
                if (maxWaitDelta >= maxWait && timeoutId) {
                    maxWaitExpired = true;
                }
                else {
                    waitLength = Math.min(waitLength, maxWait - maxWaitDelta);
                }
            }
            if (delta >= waitMS || maxWaitExpired || executeImmediately) {
                if (timeoutId) {
                    _this.clearTimeout(timeoutId);
                    timeoutId = null;
                }
                lastExecuteTime = now;
                lastResult = func.apply(_this._parent, lastArgs);
            }
            else if ((timeoutId === null || !userCall) && trailing) {
                timeoutId = _this.setTimeout(callback, waitLength);
            }
            return lastResult;
        };
        var resultFunction = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            lastArgs = args;
            return callback(true);
        };
        return resultFunction;
    };
    Async.prototype.requestAnimationFrame = function (callback) {
        var _this = this;
        var animationFrameId = 0;
        if (!this._isDisposed) {
            if (!this._animationFrameIds) {
                this._animationFrameIds = {};
            }
            /* tslint:disable:ban-native-functions */
            var animationFrameCallback = function () {
                try {
                    // Now delete the record and call the callback.
                    delete _this._animationFrameIds[animationFrameId];
                    callback.apply(_this._parent);
                }
                catch (e) {
                    _this._logError(e);
                }
            };
            animationFrameId = window.requestAnimationFrame ?
                window.requestAnimationFrame(animationFrameCallback) :
                window.setTimeout(animationFrameCallback, 0);
            /* tslint:enable:ban-native-functions */
            this._animationFrameIds[animationFrameId] = true;
        }
        return animationFrameId;
    };
    Async.prototype.cancelAnimationFrame = function (id) {
        if (this._animationFrameIds && this._animationFrameIds[id]) {
            /* tslint:disable:ban-native-functions */
            window.cancelAnimationFrame ? window.cancelAnimationFrame(id) : window.clearTimeout(id);
            /* tslint:enable:ban-native-functions */
            delete this._animationFrameIds[id];
        }
    };
    Async.prototype._logError = function (e) {
        if (this._onErrorHandler) {
            this._onErrorHandler(e);
        }
    };
    return Async;
}());
exports.Async = Async;

//# sourceMappingURL=Async.js.map


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var KeyCodes;
(function (KeyCodes) {
    KeyCodes[KeyCodes["a"] = 65] = "a";
    KeyCodes[KeyCodes["backspace"] = 8] = "backspace";
    KeyCodes[KeyCodes["comma"] = 188] = "comma";
    KeyCodes[KeyCodes["del"] = 46] = "del";
    KeyCodes[KeyCodes["down"] = 40] = "down";
    KeyCodes[KeyCodes["end"] = 35] = "end";
    KeyCodes[KeyCodes["enter"] = 13] = "enter";
    KeyCodes[KeyCodes["escape"] = 27] = "escape";
    KeyCodes[KeyCodes["home"] = 36] = "home";
    KeyCodes[KeyCodes["left"] = 37] = "left";
    KeyCodes[KeyCodes["pageDown"] = 34] = "pageDown";
    KeyCodes[KeyCodes["pageUp"] = 33] = "pageUp";
    KeyCodes[KeyCodes["right"] = 39] = "right";
    KeyCodes[KeyCodes["semicolon"] = 186] = "semicolon";
    KeyCodes[KeyCodes["space"] = 32] = "space";
    KeyCodes[KeyCodes["tab"] = 9] = "tab";
    KeyCodes[KeyCodes["up"] = 38] = "up";
})(KeyCodes = exports.KeyCodes || (exports.KeyCodes = {}));

//# sourceMappingURL=KeyCodes.js.map


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
// Initialize global window id.
var CURRENT_ID_PROPERTY = '__currentId__';
var _global = (typeof window !== 'undefined' && window) || process;
if (_global[CURRENT_ID_PROPERTY] === undefined) {
    _global[CURRENT_ID_PROPERTY] = 0;
}
function checkProperties(a, b) {
    for (var propName in a) {
        if (a.hasOwnProperty(propName)) {
            if (!b.hasOwnProperty(propName) || (b[propName] !== a[propName])) {
                return false;
            }
        }
    }
    return true;
}
// Compare a to b and b to a
function shallowCompare(a, b) {
    return checkProperties(a, b) && checkProperties(b, a);
}
exports.shallowCompare = shallowCompare;
/**
 * Makes a resulting merge of a bunch of objects. Pass in the target object followed by 1 or more
 * objects as arguments and they will be merged sequentially into the target. Note that this will
 * shallow merge; it will not create new cloned values for target members.
 *
 * @params target {Object} Target object to merge following object arguments into.
 * @params args {Object} One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
function assign(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return filteredAssign.apply(this, [null, target].concat(args));
}
exports.assign = assign;
/**
 * Makes a resulting merge of a bunch of objects, but allows a filter function to be passed in to filter
 * the resulting merges. This allows for scenarios where you want to merge "everything except that one thing"
 * or "properties that start with data-". Note that this will shallow merge; it will not create new cloned
 * values for target members.
 *
 * @params filteredAssign {Function} A callback function that tests if the property should be assigned.
 * @params target {Object} Target object to merge following object arguments into.
 * @params args {Object} One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
function filteredAssign(isAllowed, target) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    target = target || {};
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var sourceObject = args_1[_a];
        if (sourceObject) {
            for (var propName in sourceObject) {
                if (sourceObject.hasOwnProperty(propName) &&
                    !isAllowed || isAllowed(propName)) {
                    target[propName] = sourceObject[propName];
                }
            }
        }
    }
    return target;
}
exports.filteredAssign = filteredAssign;
/** Generates a unique id in the global scope (this spans across duplicate copies of the same library.) */
function getId(prefix) {
    var index = _global[CURRENT_ID_PROPERTY]++;
    return (prefix || '') + index;
}
exports.getId = getId;

//# sourceMappingURL=object.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(83)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(6);
var scroll_scss_1 = __webpack_require__(42);
var _scrollbarWidth;
var _bodyScrollDisabledCount = 0;
exports.DATA_IS_SCROLLABLE_ATTRIBUTE = 'data-is-scrollable';
function disableBodyScroll() {
    var doc = dom_1.getDocument();
    if (doc && doc.body && !_bodyScrollDisabledCount) {
        doc.body.classList.add(scroll_scss_1.default.msFabricScrollDisabled);
    }
    _bodyScrollDisabledCount++;
}
exports.disableBodyScroll = disableBodyScroll;
function enableBodyScroll() {
    if (_bodyScrollDisabledCount > 0) {
        var doc = dom_1.getDocument();
        if (doc && doc.body && _bodyScrollDisabledCount === 1) {
            doc.body.classList.remove(scroll_scss_1.default.msFabricScrollDisabled);
        }
        _bodyScrollDisabledCount--;
    }
}
exports.enableBodyScroll = enableBodyScroll;
/** Calculates the width of a scrollbar for the browser/os. */
function getScrollbarWidth() {
    if (_scrollbarWidth === undefined) {
        var scrollDiv = document.createElement('div');
        scrollDiv.style.setProperty('width', '100px');
        scrollDiv.style.setProperty('height', '100px');
        scrollDiv.style.setProperty('overflow', 'scroll');
        scrollDiv.style.setProperty('position', 'absolute');
        scrollDiv.style.setProperty('top', '-9999px');
        document.body.appendChild(scrollDiv);
        // Get the scrollbar width
        _scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        // Delete the DIV
        document.body.removeChild(scrollDiv);
    }
    return _scrollbarWidth;
}
exports.getScrollbarWidth = getScrollbarWidth;
/**
 * Traverses up the DOM for the element with the data-is-scrollable=true attribute, or returns
 * document.body.
 */
function findScrollableParent(startingElement) {
    var el = startingElement;
    // First do a quick scan for the scrollable attribute.
    while (el && el !== document.body) {
        if (el.getAttribute(exports.DATA_IS_SCROLLABLE_ATTRIBUTE) === 'true') {
            return el;
        }
        el = el.parentElement;
    }
    // If we haven't found it, the use the slower method: compute styles to evaluate if overflow is set.
    el = startingElement;
    while (el && el !== document.body) {
        if (el.getAttribute(exports.DATA_IS_SCROLLABLE_ATTRIBUTE) !== 'false') {
            var styles_1 = getComputedStyle(el);
            var overflowY = styles_1 ? styles_1.getPropertyValue('overflow-y') : '';
            if (overflowY && (overflowY === 'scroll' || overflowY === 'auto')) {
                return el;
            }
        }
        el = el.parentElement;
    }
    // Fall back to window scroll.
    if (!el || el === document.body) {
        el = window;
    }
    return el;
}
exports.findScrollableParent = findScrollableParent;

//# sourceMappingURL=scroll.js.map


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(73));

//# sourceMappingURL=Icon.js.map


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ElementType;
(function (ElementType) {
    /** <button> element. */
    ElementType[ElementType["button"] = 0] = "button";
    /** <a> element. */
    ElementType[ElementType["anchor"] = 1] = "anchor";
})(ElementType = exports.ElementType || (exports.ElementType = {}));
var ButtonType;
(function (ButtonType) {
    ButtonType[ButtonType["normal"] = 0] = "normal";
    ButtonType[ButtonType["primary"] = 1] = "primary";
    ButtonType[ButtonType["hero"] = 2] = "hero";
    ButtonType[ButtonType["compound"] = 3] = "compound";
    ButtonType[ButtonType["command"] = 4] = "command";
    ButtonType[ButtonType["icon"] = 5] = "icon";
    ButtonType[ButtonType["default"] = 6] = "default";
})(ButtonType = exports.ButtonType || (exports.ButtonType = {}));

//# sourceMappingURL=Button.Props.js.map


/***/ }),
/* 14 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var BaseButton_1 = __webpack_require__(4);
var Utilities_1 = __webpack_require__(1);
var styles = __webpack_require__(54);
var CLASS_NAMES = {
    base: 'ms-Button',
    variant: 'ms-Button--command',
    icon: styles.icon,
    menuIcon: styles.icon,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    label: styles.label,
    root: styles.root,
    flexContainer: styles.flexContainer
};
var CommandButton = (function (_super) {
    __extends(CommandButton, _super);
    function CommandButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Tell BaseComponent to bypass resolution of componentRef.
         */
        _this._shouldUpdateComponentRef = false;
        return _this;
    }
    CommandButton.prototype.render = function () {
        return (React.createElement(BaseButton_1.BaseButton, __assign({ classNames: CLASS_NAMES, onRenderDescription: Utilities_1.nullRender }, this.props)));
    };
    return CommandButton;
}(Utilities_1.BaseComponent));
exports.CommandButton = CommandButton;

//# sourceMappingURL=CommandButton.js.map


/***/ }),
/* 15 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var BaseButton_1 = __webpack_require__(4);
var Utilities_1 = __webpack_require__(1);
var styles = __webpack_require__(55);
var CLASS_NAMES = {
    base: 'ms-Button',
    variant: 'ms-Button--compound',
    description: styles.description,
    flexContainer: styles.flexContainer,
    icon: null,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    label: styles.label,
    root: styles.root
};
var CompoundButton = (function (_super) {
    __extends(CompoundButton, _super);
    function CompoundButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Tell BaseComponent to bypass resolution of componentRef.
         */
        _this._shouldUpdateComponentRef = false;
        return _this;
    }
    CompoundButton.prototype.render = function () {
        return (React.createElement(BaseButton_1.BaseButton, __assign({ classNames: CLASS_NAMES }, this.props)));
    };
    return CompoundButton;
}(Utilities_1.BaseComponent));
exports.CompoundButton = CompoundButton;

//# sourceMappingURL=CompoundButton.js.map


/***/ }),
/* 16 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var BaseButton_1 = __webpack_require__(4);
var Utilities_1 = __webpack_require__(1);
var styles = __webpack_require__(56);
exports.CLASS_NAMES = {
    base: 'ms-Button',
    variant: 'ms-Button--default',
    icon: styles.icon,
    menuIcon: styles.icon,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    label: styles.label,
    root: styles.root
};
var DefaultButton = (function (_super) {
    __extends(DefaultButton, _super);
    function DefaultButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Tell BaseComponent to bypass resolution of componentRef.
         */
        _this._shouldUpdateComponentRef = false;
        return _this;
    }
    DefaultButton.prototype.render = function () {
        return (React.createElement(BaseButton_1.BaseButton, __assign({ classNames: exports.CLASS_NAMES, onRenderDescription: Utilities_1.nullRender }, this.props)));
    };
    return DefaultButton;
}(Utilities_1.BaseComponent));
exports.DefaultButton = DefaultButton;

//# sourceMappingURL=DefaultButton.js.map


/***/ }),
/* 17 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var BaseButton_1 = __webpack_require__(4);
var Utilities_1 = __webpack_require__(1);
var styles = __webpack_require__(57);
var CLASS_NAMES = {
    base: 'ms-Button',
    variant: 'ms-Button--icon',
    icon: styles.icon,
    menuIcon: styles.icon,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    root: styles.root
};
var IconButton = (function (_super) {
    __extends(IconButton, _super);
    function IconButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Tell BaseComponent to bypass resolution of componentRef.
         */
        _this._shouldUpdateComponentRef = false;
        return _this;
    }
    IconButton.prototype.render = function () {
        return (React.createElement(BaseButton_1.BaseButton, __assign({ classNames: CLASS_NAMES, onRenderText: Utilities_1.nullRender, onRenderDescription: Utilities_1.nullRender }, this.props)));
    };
    return IconButton;
}(Utilities_1.BaseComponent));
exports.IconButton = IconButton;

//# sourceMappingURL=IconButton.js.map


/***/ }),
/* 18 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var BaseButton_1 = __webpack_require__(4);
var styles = __webpack_require__(58);
var CLASS_NAMES = {
    base: 'ms-Button',
    variant: 'ms-Button--primary',
    icon: styles.icon,
    menuIcon: styles.icon,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    label: styles.label,
    root: styles.root
};
var PrimaryButton = (function (_super) {
    __extends(PrimaryButton, _super);
    function PrimaryButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Set this BaseComponent._resolveComponentRef to false, bypassing resolution of componentRef.
         */
        _this._shouldUpdateComponentRef = false;
        return _this;
    }
    PrimaryButton.prototype.render = function () {
        return (React.createElement(BaseButton_1.BaseButton, __assign({ classNames: CLASS_NAMES, onRenderDescription: Utilities_1.nullRender }, this.props)));
    };
    return PrimaryButton;
}(Utilities_1.BaseComponent));
exports.PrimaryButton = PrimaryButton;

//# sourceMappingURL=PrimaryButton.js.map


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DirectionalHint_1 = __webpack_require__(3);
exports.DirectionalHint = DirectionalHint_1.DirectionalHint;
var ContextualMenuItemType;
(function (ContextualMenuItemType) {
    ContextualMenuItemType[ContextualMenuItemType["Normal"] = 0] = "Normal";
    ContextualMenuItemType[ContextualMenuItemType["Divider"] = 1] = "Divider";
    ContextualMenuItemType[ContextualMenuItemType["Header"] = 2] = "Header";
})(ContextualMenuItemType = exports.ContextualMenuItemType || (exports.ContextualMenuItemType = {}));

//# sourceMappingURL=ContextualMenu.Props.js.map


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FocusZoneDirection;
(function (FocusZoneDirection) {
    /** Only react to up/down arrows. */
    FocusZoneDirection[FocusZoneDirection["vertical"] = 0] = "vertical";
    /** Only react to left/right arrows. */
    FocusZoneDirection[FocusZoneDirection["horizontal"] = 1] = "horizontal";
    /** React to all arrows. */
    FocusZoneDirection[FocusZoneDirection["bidirectional"] = 2] = "bidirectional";
})(FocusZoneDirection = exports.FocusZoneDirection || (exports.FocusZoneDirection = {}));

//# sourceMappingURL=FocusZone.Props.js.map


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Please keep alphabetized
var IconType;
(function (IconType) {
    /**
     * Render using the fabric icon font.
     */
    IconType[IconType["default"] = 0] = "default";
    /**
     * Render using an image, where imageProps would be used.
     */
    IconType[IconType["image"] = 1] = "image";
    /**
     * Deprecated, use default.
     * @deprecated
     */
    IconType[IconType["Default"] = 100000] = "Default";
    /**
     * Deprecated, use image.
     * @deprecated
     */
    IconType[IconType["Image"] = 100001] = "Image";
})(IconType = exports.IconType || (exports.IconType = {}));

//# sourceMappingURL=Icon.Props.js.map


/***/ }),
/* 22 */
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
/* tslint:disable:no-unused-variable */
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(5);
/* tslint:enable:no-unused-variable */
var Fabric_1 = __webpack_require__(48);
var Utilities_1 = __webpack_require__(1);
var styles = __webpack_require__(77);
var _layersByHostId = {};
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer(props) {
        var _this = _super.call(this, props) || this;
        _this._warnDeprecations({
            onLayerMounted: 'onLayerDidMount'
        });
        if (_this.props.hostId) {
            if (!_layersByHostId[_this.props.hostId]) {
                _layersByHostId[_this.props.hostId] = [];
            }
            _layersByHostId[_this.props.hostId].push(_this);
        }
        return _this;
    }
    /**
     * Used for notifying applicable Layers that a host is available/unavailable and to re-evaluate Layers that
     * care about the specific host.
     */
    Layer.notifyHostChanged = function (id) {
        if (_layersByHostId[id]) {
            _layersByHostId[id].forEach(function (layer) { return layer.forceUpdate(); });
        }
    };
    Layer.prototype.componentDidMount = function () {
        this.componentDidUpdate();
    };
    Layer.prototype.componentWillUnmount = function () {
        var _this = this;
        this._removeLayerElement();
        if (this.props.hostId) {
            _layersByHostId[this.props.hostId] = _layersByHostId[this.props.hostId].filter(function (layer) { return layer !== _this; });
            if (!_layersByHostId[this.props.hostId].length) {
                delete _layersByHostId[this.props.hostId];
            }
        }
    };
    Layer.prototype.componentDidUpdate = function () {
        var _this = this;
        var host = this._getHost();
        if (host !== this._host) {
            this._removeLayerElement();
        }
        if (host) {
            this._host = host;
            if (!this._layerElement) {
                var doc = Utilities_1.getDocument(this._rootElement);
                this._layerElement = doc.createElement('div');
                this._layerElement.className = Utilities_1.css('ms-Layer', (_a = {},
                    _a['ms-Layer--fixed ' + styles.rootIsFixed] = !this.props.hostId,
                    _a));
                host.appendChild(this._layerElement);
                Utilities_1.setVirtualParent(this._layerElement, this._rootElement);
            }
            // Using this 'unstable' method allows us to retain the React context across the layer projection.
            ReactDOM.unstable_renderSubtreeIntoContainer(this, React.createElement(Fabric_1.Fabric, { className: Utilities_1.css('ms-Layer-content', styles.content) }, this.props.children), this._layerElement, function () {
                if (!_this._hasMounted) {
                    _this._hasMounted = true;
                    // TODO: @deprecated cleanup required.
                    if (_this.props.onLayerMounted) {
                        _this.props.onLayerMounted();
                    }
                    _this.props.onLayerDidMount();
                }
            });
        }
        var _a;
    };
    Layer.prototype.render = function () {
        return (React.createElement("span", { className: 'ms-Layer', ref: this._resolveRef('_rootElement') }));
    };
    Layer.prototype._removeLayerElement = function () {
        if (this._layerElement) {
            this.props.onLayerWillUnmount();
            ReactDOM.unmountComponentAtNode(this._layerElement);
            var parentNode = this._layerElement.parentNode;
            if (parentNode) {
                parentNode.removeChild(this._layerElement);
            }
            this._layerElement = undefined;
            this._hasMounted = false;
        }
    };
    Layer.prototype._getHost = function () {
        var hostId = this.props.hostId;
        var doc = Utilities_1.getDocument(this._rootElement);
        if (hostId) {
            return doc.getElementById(hostId);
        }
        else {
            return doc.body;
        }
    };
    return Layer;
}(Utilities_1.BaseComponent));
Layer.defaultProps = {
    onLayerDidMount: function () { return undefined; },
    onLayerWillUnmount: function () { return undefined; }
};
exports.Layer = Layer;

//# sourceMappingURL=Layer.js.map


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sp_pnp_js_1 = __webpack_require__(90);
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
/* 24 */,
/* 25 */
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
var BandList_1 = __webpack_require__(85);
var BandDetail_1 = __webpack_require__(84);
var NewBand_1 = __webpack_require__(87);
var React = __webpack_require__(0);
var Band_1 = __webpack_require__(88);
var SharePointService_1 = __webpack_require__(23);
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventGroup_1 = __webpack_require__(7);
var scroll_1 = __webpack_require__(11);
var dom_1 = __webpack_require__(6);
var SCROLL_ITERATION_DELAY = 16;
var SCROLL_GUTTER_HEIGHT = 100;
var MAX_SCROLL_VELOCITY = 15;
/**
 * AutoScroll simply hooks up mouse events given a parent element, and scrolls the container
 * up/down depending on how close the mouse is to the top/bottom of the container.
 *
 * Once you don't want autoscroll any more, just dispose the helper and it will unhook events.
 */
var AutoScroll = (function () {
    function AutoScroll(element) {
        this._events = new EventGroup_1.EventGroup(this);
        this._scrollableParent = scroll_1.findScrollableParent(element);
        this._incrementScroll = this._incrementScroll.bind(this);
        this._scrollRect = dom_1.getRect(this._scrollableParent);
        if (this._scrollableParent === window) {
            this._scrollableParent = document.body;
        }
        if (this._scrollableParent) {
            this._events.on(window, 'mousemove', this._onMouseMove, true);
            this._events.on(window, 'touchmove', this._onTouchMove, true);
        }
    }
    AutoScroll.prototype.dispose = function () {
        this._events.dispose();
        this._stopScroll();
    };
    AutoScroll.prototype._onMouseMove = function (ev) {
        this._computeScrollVelocity(ev.clientY);
    };
    AutoScroll.prototype._onTouchMove = function (ev) {
        if (ev.touches.length > 0) {
            this._computeScrollVelocity(ev.touches[0].clientY);
        }
    };
    AutoScroll.prototype._computeScrollVelocity = function (clientY) {
        var scrollRectTop = this._scrollRect.top;
        var scrollClientBottom = scrollRectTop + this._scrollRect.height - SCROLL_GUTTER_HEIGHT;
        if (clientY < (scrollRectTop + SCROLL_GUTTER_HEIGHT)) {
            this._scrollVelocity = Math.max(-MAX_SCROLL_VELOCITY, -MAX_SCROLL_VELOCITY * ((SCROLL_GUTTER_HEIGHT - (clientY - scrollRectTop)) / SCROLL_GUTTER_HEIGHT));
        }
        else if (clientY > scrollClientBottom) {
            this._scrollVelocity = Math.min(MAX_SCROLL_VELOCITY, MAX_SCROLL_VELOCITY * ((clientY - scrollClientBottom) / SCROLL_GUTTER_HEIGHT));
        }
        else {
            this._scrollVelocity = 0;
        }
        if (this._scrollVelocity) {
            this._startScroll();
        }
        else {
            this._stopScroll();
        }
    };
    AutoScroll.prototype._startScroll = function () {
        if (!this._timeoutId) {
            this._incrementScroll();
        }
    };
    AutoScroll.prototype._incrementScroll = function () {
        this._scrollableParent.scrollTop += Math.round(this._scrollVelocity);
        this._timeoutId = setTimeout(this._incrementScroll, SCROLL_ITERATION_DELAY);
    };
    AutoScroll.prototype._stopScroll = function () {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
            delete this._timeoutId;
        }
    };
    return AutoScroll;
}());
exports.AutoScroll = AutoScroll;

//# sourceMappingURL=AutoScroll.js.map


/***/ }),
/* 27 */
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
var Async_1 = __webpack_require__(8);
var EventGroup_1 = __webpack_require__(7);
var warn_1 = __webpack_require__(44);
var BaseComponent = (function (_super) {
    __extends(BaseComponent, _super);
    /**
     * BaseComponent constructor
     * @param {P} props The props for the component.
     * @param {Object} context The context for the component.
     * value is the new name. If a prop is removed rather than renamed, leave the value undefined.
     */
    function BaseComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        _this._shouldUpdateComponentRef = true;
        _makeAllSafe(_this, BaseComponent.prototype, [
            'componentWillMount',
            'componentDidMount',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentWillReceiveProps',
            'render',
            'componentDidUpdate',
            'componentWillUnmount'
        ]);
        return _this;
    }
    /** When the component will receive props, make sure the componentRef is updated. */
    BaseComponent.prototype.componentWillReceiveProps = function (newProps, newContext) {
        this._updateComponentRef(this.props, newProps);
    };
    /** When the component has mounted, update the componentRef. */
    BaseComponent.prototype.componentDidMount = function () {
        this._updateComponentRef(undefined, this.props);
    };
    /** If we have disposables, dispose them automatically on unmount. */
    BaseComponent.prototype.componentWillUnmount = function () {
        if (this.__disposables) {
            for (var i = 0, len = this._disposables.length; i < len; i++) {
                var disposable = this.__disposables[i];
                if (disposable.dispose) {
                    disposable.dispose();
                }
            }
            this.__disposables = null;
        }
    };
    Object.defineProperty(BaseComponent.prototype, "className", {
        /** Gets the object's class name. */
        get: function () {
            if (!this.__className) {
                var funcNameRegex = /function (.{1,})\(/;
                var results = (funcNameRegex).exec((this).constructor.toString());
                this.__className = (results && results.length > 1) ? results[1] : '';
            }
            return this.__className;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "_disposables", {
        /** Allows subclasses to push things to this._disposables to be auto disposed. */
        get: function () {
            if (!this.__disposables) {
                this.__disposables = [];
            }
            return this.__disposables;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "_async", {
        /**
         * Gets the async instance associated with the component, created on demand. The async instance gives
         * subclasses a way to execute setTimeout/setInterval async calls safely, where the callbacks
         * will be cleared/ignored automatically after unmounting. The helpers within the async object also
         * preserve the this pointer so that you don't need to "bind" the callbacks.
         */
        get: function () {
            if (!this.__async) {
                this.__async = new Async_1.Async(this);
                this._disposables.push(this.__async);
            }
            return this.__async;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "_events", {
        /**
         * Gets the event group instance assocaited with the component, created on demand. The event instance
         * provides on/off methods for listening to DOM (or regular javascript object) events. The event callbacks
         * will be automatically disconnected after unmounting. The helpers within the events object also
         * preserve the this reference so that you don't need to "bind" the callbacks.
         */
        get: function () {
            if (!this.__events) {
                this.__events = new EventGroup_1.EventGroup(this);
                this._disposables.push(this.__events);
            }
            return this.__events;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Helper to return a memoized ref resolver function.
     * @params refName Name of the member to assign the ref to.
     *
     * @examples
     * class Foo extends BaseComponent<...> {
     *   private _root: HTMLElement;
     *
     *   public render() {
     *     return <div ref={ this._resolveRef('_root') } />
     *   }
     * }
     */
    BaseComponent.prototype._resolveRef = function (refName) {
        var _this = this;
        if (!this.__resolves) {
            this.__resolves = {};
        }
        if (!this.__resolves[refName]) {
            this.__resolves[refName] = function (ref) {
                return _this[refName] = ref;
            };
        }
        return this.__resolves[refName];
    };
    /**
     * Updates the componentRef (by calling it with "this" when necessary.)
     */
    BaseComponent.prototype._updateComponentRef = function (currentProps, newProps) {
        if (newProps === void 0) { newProps = {}; }
        if (this._shouldUpdateComponentRef &&
            ((!currentProps && newProps.componentRef) ||
                (currentProps && currentProps.componentRef !== newProps.componentRef))) {
            if (currentProps && currentProps.componentRef) {
                currentProps.componentRef(null);
            }
            if (newProps.componentRef) {
                newProps.componentRef(this);
            }
        }
    };
    /**
     * Warns when a deprecated props are being used.
     *
     * @protected
     * @param {ISettingsMap<P>} deprecationMap The map of deprecations, where key is the prop name and the value is
     * either null or a replacement prop name.
     *
     * @memberOf BaseComponent
     */
    BaseComponent.prototype._warnDeprecations = function (deprecationMap) {
        warn_1.warnDeprecations(this.className, this.props, deprecationMap);
    };
    /**
     * Warns when props which are mutually exclusive with each other are both used.
     *
     * @protected
     * @param {ISettingsMap<P>} mutuallyExclusiveMap The map of mutually exclusive props.
     *
     * @memberOf BaseComponent
     */
    BaseComponent.prototype._warnMutuallyExclusive = function (mutuallyExclusiveMap) {
        warn_1.warnMutuallyExclusive(this.className, this.props, mutuallyExclusiveMap);
    };
    return BaseComponent;
}(React.Component));
exports.BaseComponent = BaseComponent;
/**
 * Helper to override a given method with a wrapper method that can try/catch the original, but also
 * ensures that the BaseComponent's methods are called before the subclass's. This ensures that
 * componentWillUnmount in the base is called and that things in the _disposables array are disposed.
 */
function _makeAllSafe(obj, prototype, methodNames) {
    for (var i = 0, len = methodNames.length; i < len; i++) {
        _makeSafe(obj, prototype, methodNames[i]);
    }
}
function _makeSafe(obj, prototype, methodName) {
    var classMethod = obj[methodName];
    var prototypeMethod = prototype[methodName];
    if (classMethod || prototypeMethod) {
        obj[methodName] = function () {
            var retVal;
            try {
                if (prototypeMethod) {
                    retVal = prototypeMethod.apply(this, arguments);
                }
                if (classMethod !== prototypeMethod) {
                    retVal = classMethod.apply(this, arguments);
                }
            }
            catch (e) {
                var errorMessage = "Exception in " + obj.className + "." + methodName + "(): " + (typeof e === 'string' ? e : e.stack);
                if (BaseComponent.onError) {
                    BaseComponent.onError(errorMessage, e);
                }
            }
            return retVal;
        };
    }
}
BaseComponent.onError = function (errorMessage) {
    console.error(errorMessage);
    throw errorMessage;
};
function nullRender() { return null; }
exports.nullRender = nullRender;

//# sourceMappingURL=BaseComponent.js.map


/***/ }),
/* 28 */
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
/**
 * Utility component for delaying the render of a child component after a given delay. This component
 * requires a single child component; don't pass in many components. Wrap multiple components in a DIV
 * if necessary.
 *
 * @example
 * <DelayedRender delay={ 3000 }>
 *  <div className='foo-List-loadingSpinner'>
 *    <p>I am loading</p>
 *    <Spinner />
 *  </div>
 * </DelayedRender>
 */
var DelayedRender = (function (_super) {
    __extends(DelayedRender, _super);
    function DelayedRender(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isRendered: false
        };
        return _this;
    }
    DelayedRender.prototype.componentDidMount = function () {
        var _this = this;
        var delay = this.props.delay;
        this._timeoutId = setTimeout(function () {
            _this.setState({
                isRendered: true
            });
        }, delay);
    };
    DelayedRender.prototype.componentWillUnmount = function () {
        clearTimeout(this._timeoutId);
    };
    DelayedRender.prototype.render = function () {
        return this.state.isRendered ? React.Children.only(this.props.children) : null;
    };
    return DelayedRender;
}(React.Component));
DelayedRender.defaultProps = {
    delay: 0
};
exports.DelayedRender = DelayedRender;

//# sourceMappingURL=DelayedRender.js.map


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rectangle = (function () {
    function Rectangle(left, right, top, bottom) {
        if (left === void 0) { left = 0; }
        if (right === void 0) { right = 0; }
        if (top === void 0) { top = 0; }
        if (bottom === void 0) { bottom = 0; }
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }
    Object.defineProperty(Rectangle.prototype, "width", {
        /**
         * Calculated automatically by subtracting the right from left
         */
        get: function () {
            return this.right - this.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        /**
         * Calculated automatically by subtracting the bottom from top.
         */
        get: function () {
            return this.bottom - this.top;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Tests if another rect is approximately equal to this rect (within 4 decimal places.)
     */
    Rectangle.prototype.equals = function (rect) {
        // I'm fixing it to 4 decimal places because it allows enough precision and will handle cases when something should be rounded,
        // like .999999 should round to 1.
        return (parseFloat(this.top.toFixed(4)) === parseFloat(rect.top.toFixed(4)) &&
            parseFloat(this.bottom.toFixed(4)) === parseFloat(rect.bottom.toFixed(4)) &&
            parseFloat(this.left.toFixed(4)) === parseFloat(rect.left.toFixed(4)) &&
            parseFloat(this.right.toFixed(4)) === parseFloat(rect.right.toFixed(4)));
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;

//# sourceMappingURL=Rectangle.js.map


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function findIndex(array, cb) {
    var index = -1;
    for (var i = 0; array && i < array.length; i++) {
        if (cb(array[i], i)) {
            index = i;
            break;
        }
    }
    return index;
}
exports.findIndex = findIndex;
function createArray(size, getItem) {
    var array = [];
    for (var i = 0; i < size; i++) {
        array.push(getItem(i));
    }
    return array;
}
exports.createArray = createArray;

//# sourceMappingURL=array.js.map


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Autobind is a utility for binding methods in a class. This simplifies tagging methods as being "bound" to the this pointer
 * so that they can be used in scenarios that simply require a function callback.
 *
 * @example
 * import { autobind } from '../utilities/autobind';
 *
 * public class Foo {
 *   @autobind
 *   method() {
 *   }
 * }
 */
function autobind(target, key, descriptor) {
    var fn = descriptor.value;
    var defining = false;
    return {
        configurable: true,
        get: function () {
            if (defining || this === fn.prototype || this.hasOwnProperty(key)) {
                return fn;
            }
            // Bind method only once, and update the property to return the bound value from now on
            var fnBound = fn.bind(this);
            defining = true;
            Object.defineProperty(this, key, {
                configurable: true,
                writable: true,
                enumerable: true,
                value: fnBound
            });
            defining = false;
            return fnBound;
        },
        set: function (newValue) {
            Object.defineProperty(this, key, {
                configurable: true,
                writable: true,
                enumerable: true,
                value: newValue
            });
        }
    };
}
exports.autobind = autobind;

//# sourceMappingURL=autobind.js.map


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function css() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var classes = [];
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var arg = args_1[_a];
        if (arg) {
            if (typeof arg === 'string') {
                classes.push(arg);
            }
            else {
                for (var key in arg) {
                    if (arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }
    }
    return classes.join(' ');
}
exports.css = css;

//# sourceMappingURL=css.js.map


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* tslint:disable:no-string-literal */

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(6);
var IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
var IS_VISIBLE_ATTRIBUTE = 'data-is-visible';
var FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
function getFirstFocusable(rootElement, currentElement, includeElementsInFocusZones) {
    return getNextElement(rootElement, currentElement, true, false, false, includeElementsInFocusZones);
}
exports.getFirstFocusable = getFirstFocusable;
function getLastFocusable(rootElement, currentElement, includeElementsInFocusZones) {
    return getPreviousElement(rootElement, currentElement, true, false, true, includeElementsInFocusZones);
}
exports.getLastFocusable = getLastFocusable;
/**
 * Attempts to focus the first focusable element that is a child or child's child of the rootElement.
 * @return True if focus was set, false if it was not.
 * @param {HTMLElement} rootElement - element to start the search for a focusable child.
 */
function focusFirstChild(rootElement) {
    var element = getNextElement(rootElement, rootElement, true, false, false, true);
    if (element) {
        element.focus();
        return true;
    }
    return false;
}
exports.focusFirstChild = focusFirstChild;
/** Traverse to find the previous element. */
function getPreviousElement(rootElement, currentElement, checkNode, suppressParentTraversal, traverseChildren, includeElementsInFocusZones) {
    if (!currentElement ||
        currentElement === rootElement) {
        return null;
    }
    var isCurrentElementVisible = isElementVisible(currentElement);
    // Check its children.
    if (traverseChildren && (includeElementsInFocusZones || !isElementFocusZone(currentElement)) && isCurrentElementVisible) {
        var childMatch = getPreviousElement(rootElement, currentElement.lastElementChild, true, true, true, includeElementsInFocusZones);
        if (childMatch) {
            return childMatch;
        }
    }
    // Check the current node, if it's not the first traversal.
    if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement)) {
        return currentElement;
    }
    // Check its previous sibling.
    var siblingMatch = getPreviousElement(rootElement, currentElement.previousElementSibling, true, true, true, includeElementsInFocusZones);
    if (siblingMatch) {
        return siblingMatch;
    }
    // Check its parent.
    if (!suppressParentTraversal) {
        return getPreviousElement(rootElement, currentElement.parentElement, true, false, false, includeElementsInFocusZones);
    }
    return null;
}
exports.getPreviousElement = getPreviousElement;
/** Traverse to find the next focusable element. */
function getNextElement(rootElement, currentElement, checkNode, suppressParentTraversal, suppressChildTraversal, includeElementsInFocusZones) {
    if (!currentElement ||
        (currentElement === rootElement && suppressChildTraversal)) {
        return null;
    }
    var isCurrentElementVisible = isElementVisible(currentElement);
    // Check the current node, if it's not the first traversal.
    if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement)) {
        return currentElement;
    }
    // Check its children.
    if (!suppressChildTraversal && isCurrentElementVisible && (includeElementsInFocusZones || !isElementFocusZone(currentElement))) {
        var childMatch = getNextElement(rootElement, currentElement.firstElementChild, true, true, false, includeElementsInFocusZones);
        if (childMatch) {
            return childMatch;
        }
    }
    if (currentElement === rootElement) {
        return null;
    }
    // Check its sibling.
    var siblingMatch = getNextElement(rootElement, currentElement.nextElementSibling, true, true, false, includeElementsInFocusZones);
    if (siblingMatch) {
        return siblingMatch;
    }
    if (!suppressParentTraversal) {
        return getNextElement(rootElement, currentElement.parentElement, false, false, true, includeElementsInFocusZones);
    }
    return null;
}
exports.getNextElement = getNextElement;
function isElementVisible(element) {
    // If the element is not valid, return false.
    if (!element || !element.getAttribute) {
        return false;
    }
    var visibilityAttribute = element.getAttribute(IS_VISIBLE_ATTRIBUTE);
    // If the element is explicitly marked with the visibility attribute, return that value as boolean.
    if (visibilityAttribute !== null && visibilityAttribute !== undefined) {
        return visibilityAttribute === 'true';
    }
    // Fallback to other methods of determining actual visibility.
    return (element.offsetHeight !== 0 ||
        element.offsetParent !== null ||
        element.isVisible === true); // used as a workaround for testing.
}
exports.isElementVisible = isElementVisible;
function isElementTabbable(element) {
    // If this element is null or is disabled, it is not considered tabbable.
    if (!element || element.disabled) {
        return false;
    }
    // In IE, element.tabIndex is default to 0. We need to use element get tabIndex attribute to get the correct tabIndex
    var tabIndex = -1;
    if (element && element.getAttribute) {
        tabIndex = parseInt(element.getAttribute('tabIndex'), 10);
    }
    var isFocusableAttribute = element.getAttribute ? element.getAttribute(IS_FOCUSABLE_ATTRIBUTE) : null;
    return (!!element && isFocusableAttribute !== 'false' &&
        (element.tagName === 'A' ||
            (element.tagName === 'BUTTON') ||
            (element.tagName === 'INPUT') ||
            (element.tagName === 'TEXTAREA') ||
            (tabIndex >= 0) ||
            (element.getAttribute && (isFocusableAttribute === 'true' ||
                element.getAttribute('role') === 'button'))));
}
exports.isElementTabbable = isElementTabbable;
function isElementFocusZone(element) {
    return element && !!element.getAttribute(FOCUSZONE_ID_ATTRIBUTE);
}
exports.isElementFocusZone = isElementFocusZone;
function doesElementContainFocus(element) {
    var currentActiveElement = dom_1.getDocument(element).activeElement;
    if (currentActiveElement && dom_1.elementContains(element, currentActiveElement)) {
        return true;
    }
    return false;
}
exports.doesElementContainFocus = doesElementContainFocus;

//# sourceMappingURL=focus.js.map


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var REACT_LIFECYCLE_EXCLUSIONS = [
    'setState',
    'render',
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount'
];
/**
 * Allows you to hoist methods, except those in an exclusion set from a source object into a destination object.
 * @param destination The instance of the object to hoist the methods onto.
 * @param source The instance of the object where the methods are hoisted from.
 * @param exclusions (Optional) What methods to exclude from being hoisted.
 * @returns {string[]} An array of names of methods that were hoisted.
 */
function hoistMethods(destination, source, exclusions) {
    if (exclusions === void 0) { exclusions = REACT_LIFECYCLE_EXCLUSIONS; }
    var hoisted = [];
    var _loop_1 = function (methodName) {
        if (typeof source[methodName] === 'function' &&
            destination[methodName] === undefined &&
            (!exclusions || exclusions.indexOf(methodName) === -1)) {
            hoisted.push(methodName);
            /* tslint:disable:no-function-expression */
            destination[methodName] = function () { source[methodName].apply(source, arguments); };
            /* tslint:enable */
        }
    };
    for (var methodName in source) {
        _loop_1(methodName);
    }
    return hoisted;
}
exports.hoistMethods = hoistMethods;
/**
 * Provides a method for convenience to unhoist hoisted methods.
 * @param {any} source The source object upon which methods were hoisted.
 * @param {string[]} methodNames An array of method names to unhoist.
 */
function unhoistMethods(source, methodNames) {
    methodNames
        .forEach(function (methodName) { return delete source[methodName]; });
}
exports.unhoistMethods = unhoistMethods;

//# sourceMappingURL=hoist.js.map


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(8));
__export(__webpack_require__(26));
__export(__webpack_require__(27));
__export(__webpack_require__(28));
__export(__webpack_require__(7));
__export(__webpack_require__(9));
__export(__webpack_require__(29));
__export(__webpack_require__(30));
__export(__webpack_require__(31));
__export(__webpack_require__(32));
__export(__webpack_require__(6));
__export(__webpack_require__(33));
__export(__webpack_require__(34));
__export(__webpack_require__(36));
__export(__webpack_require__(37));
__export(__webpack_require__(10));
__export(__webpack_require__(38));
__export(__webpack_require__(39));
__export(__webpack_require__(40));
__export(__webpack_require__(41));
__export(__webpack_require__(11));
__export(__webpack_require__(43));

//# sourceMappingURL=index.js.map


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Regex to detect words within paraenthesis in a string where gi implies global and case-insensitive. */
var CHARS_WITHIN_PARENTHESIS_REGEX = new RegExp('\\(([^)]*)\\)', 'gi');
/**
 *  Matches any non-word characters with respect to the Unicode codepoints; generated by
 * https://mothereff.in/regexpu for regex /\W /u where u stands for Unicode support (ES6 feature).
 * More info here: http://stackoverflow.com/questions/280712/javascript-unicode-regexes.
 * gi implies global and case-insensitive.
 */
/* tslint:disable:max-line-length */
var UNICODE_ALPHANUMERIC_CHARS_REGEX = new RegExp('(?:[\0-/:-@\[-\^`\{-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]) ', 'gi');
/* tslint:enable:max-line-length */
/** Regex to detect multiple spaces in a string where gi implies global and case-insensitive. */
var MULTIPLE_WHITESPACES_REGEX_TOKEN = new RegExp('\\s+', 'gi');
/** Regex to detect Arabic text. */
var ARABIC_LANGUAGE_REGEX = new RegExp('[\u0621-\u064A\u0660-\u0669]');
/** Regex to detect Korean text. */
var KOREAN_LANGUAGE_REGEX = new RegExp('[\u1100-\u11FF|\u3130-\u318F|\uA960-\uA97F|\uAC00-\uD7AF|\uD7B0-\uD7FF]');
/** Regex to detect Chinese text. */
/* tslint:disable:max-line-length */
var CHINESE_LANGUAGE_REGEX = new RegExp('[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]');
/* tslint:enable:max-line-length */
function getInitialsArabic(displayName, isRtl) {
    var name = displayName.replace(/\s/, '');
    return isRtl ? name[name.length - 1] : name[0];
}
function getInitialsAsian(displayName, isRtl) {
    var name = displayName.replace(/\s/, '');
    // For short names, only display a single character of the family name
    if (name.length <= 2) {
        return isRtl ? name[0] : name[name.length - 1];
    }
    // For long names, display the two most significant characters of the family name
    return isRtl ? name.substr(0, 2) : name.substr(name.length - 2, name.length);
}
function getInitialsLatin(displayName, isRtl) {
    var initials = '';
    var splits = displayName.split(' ');
    if (splits.length === 2) {
        initials += splits[0].charAt(0).toUpperCase();
        initials += splits[1].charAt(0).toUpperCase();
    }
    else if (splits.length === 3) {
        initials += splits[0].charAt(0).toUpperCase();
        initials += splits[2].charAt(0).toUpperCase();
    }
    else if (splits.length !== 0) {
        initials += splits[0].charAt(0).toUpperCase();
    }
    if (isRtl && initials.length > 1) {
        return initials.charAt(1) + initials.charAt(0);
    }
    return initials;
}
function cleanupDisplayName(displayName) {
    // Do not consider the suffixes within parenthesis while computing the initials.
    displayName = displayName.replace(CHARS_WITHIN_PARENTHESIS_REGEX, '');
    // Ignore non-word characters
    displayName = displayName.replace(UNICODE_ALPHANUMERIC_CHARS_REGEX, '');
    // Make whitespace consistent
    displayName = displayName.replace(MULTIPLE_WHITESPACES_REGEX_TOKEN, ' ');
    displayName = displayName.trim();
    return displayName;
}
/** Get (up to 2 characters) initials based on display name of the persona. */
function getInitials(displayName, isRtl) {
    if (displayName == null) {
        return '';
    }
    displayName = cleanupDisplayName(displayName);
    if (ARABIC_LANGUAGE_REGEX.test(displayName)) {
        return getInitialsArabic(displayName, isRtl);
    }
    if (KOREAN_LANGUAGE_REGEX.test(displayName) || CHINESE_LANGUAGE_REGEX.test(displayName)) {
        return getInitialsAsian(displayName, isRtl);
    }
    return getInitialsLatin(displayName, isRtl);
}
exports.getInitials = getInitials;

//# sourceMappingURL=initials.js.map


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getDistanceBetweenPoints(point1, point2) {
    var distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    return distance;
}
exports.getDistanceBetweenPoints = getDistanceBetweenPoints;

//# sourceMappingURL=math.js.map


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Detects whether an element's content has horizontal overflow
 *
 * @param element Element to check for overflow
 * @returns True if element's content overflows
 */
function hasHorizontalOverflow(element) {
    return element.clientWidth < element.scrollWidth;
}
exports.hasHorizontalOverflow = hasHorizontalOverflow;
/**
 * Detects whether an element's content has vertical overflow
 *
 * @param element Element to check for overflow
 * @returns True if element's content overflows
 */
function hasVerticalOverflow(element) {
    return element.clientHeight < element.scrollHeight;
}
exports.hasVerticalOverflow = hasVerticalOverflow;
/**
 * Detects whether an element's content has overflow in any direction
 *
 * @param element Element to check for overflow
 * @returns True if element's content overflows
 */
function hasOverflow(element) {
    return hasHorizontalOverflow(element) || hasVerticalOverflow(element);
}
exports.hasOverflow = hasOverflow;

//# sourceMappingURL=overflow.js.map


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = __webpack_require__(10);
exports.baseElementEvents = [
    'onCopy',
    'onCut',
    'onPaste',
    'onCompositionEnd',
    'onCompositionStart',
    'onCompositionUpdate',
    'onFocus',
    'onFocusCapture',
    'onBlur',
    'onBlurCapture',
    'onChange',
    'onInput',
    'onSubmit',
    'onLoad',
    'onError',
    'onKeyDown',
    'onKeyDownCapture',
    'onKeyPress',
    'onKeyUp',
    'onAbort',
    'onCanPlay',
    'onCanPlayThrough',
    'onDurationChange',
    'onEmptied',
    'onEncrypted',
    'onEnded',
    'onLoadedData',
    'onLoadedMetadata',
    'onLoadStart',
    'onPause',
    'onPlay',
    'onPlaying',
    'onProgress',
    'onRateChange',
    'onSeeked',
    'onSeeking',
    'onStalled',
    'onSuspend',
    'onTimeUpdate',
    'onVolumeChange',
    'onWaiting',
    'onClick',
    'onClickCapture',
    'onContextMenu',
    'onDoubleClick',
    'onDrag',
    'onDragEnd',
    'onDragEnter',
    'onDragExit',
    'onDragLeave',
    'onDragOver',
    'onDragStart',
    'onDrop',
    'onMouseDown',
    'onMouseDownCapture',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',
    'onMouseUpCapture',
    'onSelect',
    'onTouchCancel',
    'onTouchEnd',
    'onTouchMove',
    'onTouchStart',
    'onScroll',
    'onWheel'
];
exports.baseElementProperties = [
    'defaultChecked',
    'defaultValue',
    'accept',
    'acceptCharset',
    'accessKey',
    'action',
    'allowFullScreen',
    'allowTransparency',
    'alt',
    'async',
    'autoComplete',
    'autoFocus',
    'autoPlay',
    'capture',
    'cellPadding',
    'cellSpacing',
    'charSet',
    'challenge',
    'checked',
    'children',
    'classID',
    'className',
    'cols',
    'colSpan',
    'content',
    'contentEditable',
    'contextMenu',
    'controls',
    'coords',
    'crossOrigin',
    'data',
    'dateTime',
    'default',
    'defer',
    'dir',
    'download',
    'draggable',
    'encType',
    'form',
    'formAction',
    'formEncType',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'frameBorder',
    'headers',
    'height',
    'hidden',
    'high',
    'hrefLang',
    'htmlFor',
    'httpEquiv',
    'icon',
    'id',
    'inputMode',
    'integrity',
    'is',
    'keyParams',
    'keyType',
    'kind',
    'label',
    'lang',
    'list',
    'loop',
    'low',
    'manifest',
    'marginHeight',
    'marginWidth',
    'max',
    'maxLength',
    'media',
    'mediaGroup',
    'method',
    'min',
    'minLength',
    'multiple',
    'muted',
    'name',
    'noValidate',
    'open',
    'optimum',
    'pattern',
    'placeholder',
    'poster',
    'preload',
    'radioGroup',
    'readOnly',
    'rel',
    'required',
    'role',
    'rows',
    'rowSpan',
    'sandbox',
    'scope',
    'scoped',
    'scrolling',
    'seamless',
    'selected',
    'shape',
    'size',
    'sizes',
    'span',
    'spellCheck',
    'src',
    'srcDoc',
    'srcLang',
    'srcSet',
    'start',
    'step',
    'style',
    'summary',
    'tabIndex',
    'title',
    'type',
    'useMap',
    'value',
    'width',
    'wmode',
    'wrap'
];
exports.htmlElementProperties = exports.baseElementProperties.concat(exports.baseElementEvents);
exports.anchorProperties = exports.htmlElementProperties.concat([
    'href',
    'target'
]);
exports.buttonProperties = exports.htmlElementProperties.concat([
    'disabled'
]);
exports.divProperties = exports.htmlElementProperties.concat(['align', 'noWrap']);
exports.inputProperties = exports.buttonProperties;
exports.textAreaProperties = exports.buttonProperties;
exports.imageProperties = exports.divProperties;
/**
 * Gets native supported props for an html element provided the allowance set. Use one of the property
 * sets defined (divProperties, buttonPropertes, etc) to filter out supported properties from a given
 * props set. Note that all data- and aria- prefixed attributes will be allowed.
 * NOTE: getNativeProps should always be applied first when adding props to a react component. The
 * non-native props should be applied second. This will prevent getNativeProps from overriding your custom props.
 * For example, if props passed to getNativeProps has an onClick function and getNativeProps is added to
 * the component after an onClick function is added, then the getNativeProps onClick will override it.
 * @param props The unfiltered input props
 * @param allowedPropsNames The array of allowed propnames.
 * @returns The filtered props
 */
function getNativeProps(props, allowedPropNames, excludedPropNames) {
    return object_1.filteredAssign(function (propName) {
        return ((!excludedPropNames || excludedPropNames.indexOf(propName) < 0) && ((propName.indexOf('data-') === 0) ||
            (propName.indexOf('aria-') === 0) ||
            (allowedPropNames.indexOf(propName) >= 0)));
    }, {}, props);
}
exports.getNativeProps = getNativeProps;

//# sourceMappingURL=properties.js.map


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _baseUrl = '';
/** Sets the current base url used for fetching images. */
function getResourceUrl(url) {
    return _baseUrl + url;
}
exports.getResourceUrl = getResourceUrl;
/** Gets the current base url used for fetching images. */
function setBaseUrl(baseUrl) {
    _baseUrl = baseUrl;
}
exports.setBaseUrl = setBaseUrl;
/** Gets the current runtime language. */
function getLanguage() {
    return 'en-us';
}
exports.getLanguage = getLanguage;

//# sourceMappingURL=resources.js.map


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var KeyCodes_1 = __webpack_require__(9);
var dom_1 = __webpack_require__(6);
// Default to undefined so that we initialize on first read.
var _isRTL;
/**
 * Gets the rtl state of the page (returns true if in rtl.)
 */
function getRTL() {
    if (_isRTL === undefined) {
        var doc = dom_1.getDocument();
        if (doc) {
            _isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        }
        else {
            throw new Error('getRTL was called in a server environment without setRTL being called first. ' +
                'Call setRTL to set the correct direction first.');
        }
    }
    return _isRTL;
}
exports.getRTL = getRTL;
/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 */
function setRTL(isRTL) {
    var doc = dom_1.getDocument();
    if (doc) {
        doc.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    }
    _isRTL = isRTL;
}
exports.setRTL = setRTL;
/**
 * Returns the given key, but flips right/left arrows if necessary.
 */
function getRTLSafeKeyCode(key) {
    if (getRTL()) {
        if (key === KeyCodes_1.KeyCodes.left) {
            key = KeyCodes_1.KeyCodes.right;
        }
        else if (key === KeyCodes_1.KeyCodes.right) {
            key = KeyCodes_1.KeyCodes.left;
        }
    }
    return key;
}
exports.getRTLSafeKeyCode = getRTLSafeKeyCode;

//# sourceMappingURL=rtl.js.map


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    msFabricScrollDisabled: 'msFabricScrollDisabled_093f9403',
};
exports.default = styles;
load_themed_styles_1.loadStyles([{ "rawString": ".msFabricScrollDisabled_093f9403{overflow:hidden!important}" }]);
/* tslint:enable */ 

//# sourceMappingURL=scroll.scss.js.map


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Regex that finds { and } so they can be removed on a lookup for string format
var FORMAT_ARGS_REGEX = /[\{\}]/g;
// Regex that finds {#} so it can be replaced by the arguments in string format
var FORMAT_REGEX = /\{\d+\}/g;
/**
 * String Format is like C# string format.
 * Usage Example: "hello {0}!".format("mike") will return "hello mike!"
 * Calling format on a string with less arguments than specified in the format is invalid
 * Example "I love {0} every {1}".format("CXP") will result in a Debug Exception.
 */
function format(s) {
    'use strict';
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var args = values;
    // Callback match function
    function replace_func(match) {
        // looks up in the args
        var replacement = args[match.replace(FORMAT_ARGS_REGEX, '')];
        // catches undefined in nondebug and null in debug and nondebug
        if (replacement === null || replacement === undefined) {
            replacement = '';
        }
        return replacement;
    }
    return (s.replace(FORMAT_REGEX, replace_func));
}
exports.format = format;

//# sourceMappingURL=string.js.map


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _warningCallback = _warn;
/**
 * Warns when a deprecated props are being used.
 *
 * @export
 * @param {string} componentName The name of the component being used.
 * @param {Object} props The props passed into the component.
 * @param {ISettingsMap} deprecationMap The map of deprecations, where key is the prop name and the value is
 * either null or a replacement prop name.
 */
function warnDeprecations(componentName, props, deprecationMap) {
    for (var propName in deprecationMap) {
        if (props && propName in props) {
            var deprecationMessage = componentName + " property '" + propName + "' was used but has been deprecated.";
            var replacementPropName = deprecationMap[propName];
            if (replacementPropName) {
                deprecationMessage += " Use '" + replacementPropName + "' instead.";
            }
            _warningCallback(deprecationMessage);
        }
    }
}
exports.warnDeprecations = warnDeprecations;
function warnMutuallyExclusive(componentName, props, exclusiveMap) {
    for (var propName in exclusiveMap) {
        if (props && propName in props && exclusiveMap[propName] in props) {
            _warningCallback(componentName + " property '" + propName + "' is mutually exclusive with '" + exclusiveMap[propName] + "'. Use one or the other.");
        }
    }
}
exports.warnMutuallyExclusive = warnMutuallyExclusive;
/**
 * Configures the warning callback. Passing in undefined will reset it to use the default
 * console.warn function.
 *
 * @export
 * @param {(message) => void} warningCallback
 */
function setWarningCallback(warningCallback) {
    _warningCallback = warningCallback === undefined ? _warn : warningCallback;
}
exports.setWarningCallback = setWarningCallback;
function _warn(message) {
    if (console && console.warn) {
        console.warn(message);
    }
}

//# sourceMappingURL=warn.js.map


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(59));

//# sourceMappingURL=Button.js.map


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(63));

//# sourceMappingURL=Callout.js.map


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(66));

//# sourceMappingURL=ContextualMenu.js.map


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(68));

//# sourceMappingURL=Fabric.js.map


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(70));

//# sourceMappingURL=FocusZone.js.map


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(79));

//# sourceMappingURL=Layer.js.map


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(81));

//# sourceMappingURL=Popup.js.map


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    flexContainer: 'flexContainer_c0927fee',
    root: 'root_c0927fee',
    screenReaderOnly: 'screenReaderOnly_c0927fee',
};
load_themed_styles_1.loadStyles([{ "rawString": ".flexContainer_c0927fee{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.root_c0927fee{outline:transparent}.screenReaderOnly_c0927fee{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}" }]);
module.exports = styles;
/* tslint:enable */ 

//# sourceMappingURL=BaseButton.scss.js.map


/***/ }),
/* 53 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = __webpack_require__(0);
/* tslint:enable:no-unused-variable */
var Utilities_1 = __webpack_require__(1);
var Button_Props_1 = __webpack_require__(13);
var DefaultButton_1 = __webpack_require__(16);
var CommandButton_1 = __webpack_require__(14);
var CompoundButton_1 = __webpack_require__(15);
var IconButton_1 = __webpack_require__(17);
var PrimaryButton_1 = __webpack_require__(18);
/**
 * This class is deprecated. Use the individual *Button components instead.
 * @deprecated
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Set this BaseComponent._resolveComponentRef to false, bypassing resolution of componentRef.
         */
        _this._shouldUpdateComponentRef = false;
        Utilities_1.warn("The Button component has been deprecated. Use specific variants instead. " +
            "(PrimaryButton, DefaultButton, IconButton, CommandButton, etc.)");
        return _this;
    }
    Button.prototype.render = function () {
        var props = this.props;
        switch (props.buttonType) {
            case Button_Props_1.ButtonType.command:
                return React.createElement(CommandButton_1.CommandButton, __assign({}, props));
            case Button_Props_1.ButtonType.compound:
                return React.createElement(CompoundButton_1.CompoundButton, __assign({}, props));
            case Button_Props_1.ButtonType.icon:
                return React.createElement(IconButton_1.IconButton, __assign({}, props));
            case Button_Props_1.ButtonType.primary:
                return React.createElement(PrimaryButton_1.PrimaryButton, __assign({}, props));
            default:
                return React.createElement(DefaultButton_1.DefaultButton, __assign({}, props));
        }
    };
    return Button;
}(Utilities_1.BaseComponent));
exports.Button = Button;

//# sourceMappingURL=Button.js.map


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_ed411742',
    flexContainer: 'flexContainer_ed411742',
    label: 'label_ed411742',
    icon: 'icon_ed411742',
    isEnabled: 'isEnabled_ed411742',
    isDisabled: 'isDisabled_ed411742',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_ed411742{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;text-decoration:none;text-align:center;cursor:pointer;display:inline-block;vertical-align:top;padding:0 16px;border-width:0;background-color:transparent;padding:0 4px;height:40px;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": "}.root_ed411742::-moz-focus-inner{border:0}.root_ed411742{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_ed411742:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.flexContainer_ed411742{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.label_ed411742{margin:0 4px;line-height:100%}.icon_ed411742{margin:0 4px;height:16px;line-height:16px;text-align:center;vertical-align:middle}.isEnabled_ed411742:hover{color:" }, { "theme": "themeDarker", "defaultValue": "#004578" }, { "rawString": "}.isEnabled_ed411742:active{color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}.isEnabled_ed411742 .icon_ed411742{color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}.isDisabled_ed411742{background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": ";cursor:default;pointer-events:none;background-color:transparent}.isDisabled_ed411742:focus,.isDisabled_ed411742:hover{outline:0}" }]);
module.exports = styles;
/* tslint:enable */ 

//# sourceMappingURL=CommandButton.scss.js.map


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_7e7905e6',
    flexContainer: 'flexContainer_7e7905e6',
    label: 'label_7e7905e6',
    description: 'description_7e7905e6',
    isEnabled: 'isEnabled_7e7905e6',
    isDisabled: 'isDisabled_7e7905e6',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_7e7905e6{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;text-decoration:none;text-align:center;cursor:pointer;display:inline-block;vertical-align:top;padding:0 16px;padding:16px 20px;background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": ";min-width:80px;max-width:280px;min-height:72px}.root_7e7905e6::-moz-focus-inner{border:0}.root_7e7905e6{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_7e7905e6:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.flexContainer_7e7905e6{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch;min-width:100%;height:auto}html[dir=ltr] .flexContainer_7e7905e6{text-align:left}html[dir=rtl] .flexContainer_7e7905e6{text-align:right}.label_7e7905e6{margin:0 4px;line-height:100%;font-weight:600;color:" }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": ";margin:0 0 5px}.description_7e7905e6{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:12px;font-weight:400;color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": ";line-height:100%}.isEnabled_7e7905e6:hover{background-color:" }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": "}.isEnabled_7e7905e6:hover .description_7e7905e6{color:" }, { "theme": "neutralDark", "defaultValue": "#212121" }, { "rawString": "}.isEnabled_7e7905e6:active{background-color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}.isEnabled_7e7905e6:active .description_7e7905e6,.isEnabled_7e7905e6:active .label_7e7905e6{color:inherit}.isDisabled_7e7905e6{background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": ";cursor:default;pointer-events:none}.isDisabled_7e7905e6:focus,.isDisabled_7e7905e6:hover{outline:0}.isDisabled_7e7905e6 .description_7e7905e6,.isDisabled_7e7905e6 .label_7e7905e6{color:inherit}" }]);
module.exports = styles;
/* tslint:enable */ 

//# sourceMappingURL=CompoundButton.scss.js.map


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_fb0ff2e2',
    label: 'label_fb0ff2e2',
    icon: 'icon_fb0ff2e2',
    isEnabled: 'isEnabled_fb0ff2e2',
    isDisabled: 'isDisabled_fb0ff2e2',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_fb0ff2e2{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;text-decoration:none;text-align:center;cursor:pointer;display:inline-block;vertical-align:top;padding:0 16px;background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";min-width:80px;height:32px;font-weight:600;font-size:14px}.root_fb0ff2e2::-moz-focus-inner{border:0}.root_fb0ff2e2{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_fb0ff2e2:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.label_fb0ff2e2{margin:0 4px;line-height:100%}.icon_fb0ff2e2{margin:0 4px;height:16px;line-height:16px;text-align:center;vertical-align:middle}.isEnabled_fb0ff2e2:hover{background-color:" }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": ";color:" }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": "}.isEnabled_fb0ff2e2:active{background-color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}.isDisabled_fb0ff2e2{background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": ";cursor:default;pointer-events:none}.isDisabled_fb0ff2e2:focus,.isDisabled_fb0ff2e2:hover{outline:0}" }]);
module.exports = styles;
/* tslint:enable */ 

//# sourceMappingURL=DefaultButton.scss.js.map


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_d4f870d0',
    icon: 'icon_d4f870d0',
    isEnabled: 'isEnabled_d4f870d0',
    isDisabled: 'isDisabled_d4f870d0',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_d4f870d0{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;text-decoration:none;text-align:center;cursor:pointer;display:inline-block;vertical-align:top;padding:0 16px;border-width:0;background-color:transparent;padding:0 4px;width:32px;height:32px;color:" }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": ";font-size:16px}.root_d4f870d0::-moz-focus-inner{border:0}.root_d4f870d0{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_d4f870d0:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.icon_d4f870d0{margin:0 4px;height:16px;line-height:16px;text-align:center;vertical-align:middle}.isEnabled_d4f870d0:hover{color:" }, { "theme": "themeDarker", "defaultValue": "#004578" }, { "rawString": "}.isEnabled_d4f870d0:active{color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}.isDisabled_d4f870d0{background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": ";cursor:default;pointer-events:none;background-color:transparent}.isDisabled_d4f870d0:focus,.isDisabled_d4f870d0:hover{outline:0}@media screen and (-ms-high-contrast:active){.isDisabled_d4f870d0{color:" }, { "theme": "yellowLight", "defaultValue": "#fff100" }, { "rawString": "}}@media screen and (-ms-high-contrast:black-on-white){.isDisabled_d4f870d0{color:" }, { "theme": "blueMid", "defaultValue": "#00188f" }, { "rawString": "}}" }]);
module.exports = styles;
/* tslint:enable */ 

//# sourceMappingURL=IconButton.scss.js.map


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_653ab08f',
    label: 'label_653ab08f',
    icon: 'icon_653ab08f',
    isEnabled: 'isEnabled_653ab08f',
    isDisabled: 'isDisabled_653ab08f',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_653ab08f{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;text-decoration:none;text-align:center;cursor:pointer;display:inline-block;vertical-align:top;padding:0 16px;background-color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": ";min-width:80px;height:32px;font-weight:600;font-size:14px}.root_653ab08f::-moz-focus-inner{border:0}.root_653ab08f{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_653ab08f:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}.root_653ab08f::-moz-focus-inner{border:0}.root_653ab08f{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .root_653ab08f:focus:after{content:'';position:absolute;top:1px;right:1px;bottom:1px;left:1px;pointer-events:none;border:1px solid " }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}.label_653ab08f{margin:0 4px;line-height:100%}.icon_653ab08f{margin:0 4px;height:16px;line-height:16px;text-align:center;vertical-align:middle}.isEnabled_653ab08f:hover{background-color:" }, { "theme": "themeDark", "defaultValue": "#005a9e" }, { "rawString": "}.isEnabled_653ab08f:active{background-color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}.isDisabled_653ab08f{background-color:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": ";color:" }, { "theme": "neutralTertiary", "defaultValue": "#a6a6a6" }, { "rawString": ";cursor:default;pointer-events:none}.isDisabled_653ab08f:focus,.isDisabled_653ab08f:hover{outline:0}" }]);
module.exports = styles;
/* tslint:enable */ 

//# sourceMappingURL=PrimaryButton.scss.js.map


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(4));
__export(__webpack_require__(13));
__export(__webpack_require__(53));
__export(__webpack_require__(14));
__export(__webpack_require__(15));
__export(__webpack_require__(16));
__export(__webpack_require__(18));
__export(__webpack_require__(17));

//# sourceMappingURL=index.js.map


/***/ }),
/* 60 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = __webpack_require__(0);
/* tslint:enable:no-unused-variable */
var Utilities_1 = __webpack_require__(1);
var CalloutContent_1 = __webpack_require__(62);
var Layer_1 = __webpack_require__(50);
var Callout = (function (_super) {
    __extends(Callout, _super);
    function Callout(props) {
        return _super.call(this, props) || this;
    }
    Callout.prototype.render = function () {
        var content = (React.createElement(CalloutContent_1.CalloutContent, __assign({}, this.props)));
        return this.props.doNotLayer ? content : (React.createElement(Layer_1.Layer, null, content));
    };
    return Callout;
}(Utilities_1.BaseComponent));
exports.Callout = Callout;

//# sourceMappingURL=Callout.js.map


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_efb7768a',
    container: 'container_efb7768a',
    main: 'main_efb7768a',
    beak: 'beak_efb7768a',
    beakCurtain: 'beakCurtain_efb7768a',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_efb7768a{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;box-shadow:0 0 15px -5px rgba(0,0,0,.4);position:absolute;border:1px solid " }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": ";box-sizing:border-box}@media screen and (-ms-high-contrast:active){.root_efb7768a{border:1px solid " }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}}@media screen and (-ms-high-contrast:black-on-white){.root_efb7768a{border:1px solid " }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": "}}.container_efb7768a{position:relative}.main_efb7768a{background-color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": ";overflow-x:hidden;overflow-y:auto;position:relative}.beak_efb7768a{position:absolute;background-color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": ";box-shadow:inherit;border:inherit;box-sizing:border-box;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.beakCurtain_efb7768a{position:absolute;top:0;right:0;bottom:0;left:0;background-color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": "}" }]);
module.exports = styles;
/* tslint:enable */ 

//# sourceMappingURL=Callout.scss.js.map


/***/ }),
/* 62 */
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = __webpack_require__(0);
var DirectionalHint_1 = __webpack_require__(3);
var Utilities_1 = __webpack_require__(1);
var positioning_1 = __webpack_require__(82);
var Popup_1 = __webpack_require__(51);
var styles = __webpack_require__(61);
var BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
var OFF_SCREEN_STYLE = { opacity: 0 };
var BORDER_WIDTH = 1;
var SPACE_FROM_EDGE = 8;
var CalloutContent = (function (_super) {
    __extends(CalloutContent, _super);
    function CalloutContent(props) {
        var _this = _super.call(this, props) || this;
        _this._warnDeprecations({ 'beakStyle': 'beakWidth' });
        _this._didSetInitialFocus = false;
        _this.state = {
            positions: null,
            slideDirectionalClassName: null,
            calloutElementRect: null
        };
        _this._positionAttempts = 0;
        return _this;
    }
    CalloutContent.prototype.componentDidUpdate = function () {
        this._setInitialFocus();
        this._updatePosition();
    };
    CalloutContent.prototype.componentWillMount = function () {
        var target = this.props.targetElement ? this.props.targetElement : this.props.target;
        this._setTargetWindowAndElement(target);
    };
    CalloutContent.prototype.componentWillUpdate = function (newProps) {
        if (newProps.targetElement !== this.props.targetElement || newProps.target !== this.props.target) {
            var newTarget = newProps.targetElement ? newProps.targetElement : newProps.target;
            this._maxHeight = undefined;
            this._setTargetWindowAndElement(newTarget);
        }
        if (newProps.gapSpace !== this.props.gapSpace || this.props.beakWidth !== newProps.beakWidth) {
            this._maxHeight = undefined;
        }
    };
    CalloutContent.prototype.componentDidMount = function () {
        this._onComponentDidMount();
    };
    CalloutContent.prototype.render = function () {
        // If there is no target window then we are likely in server side rendering and we should not render anything.
        if (!this._targetWindow) {
            return null;
        }
        var _a = this.props, className = _a.className, target = _a.target, targetElement = _a.targetElement, isBeakVisible = _a.isBeakVisible, beakStyle = _a.beakStyle, children = _a.children, beakWidth = _a.beakWidth;
        var positions = this.state.positions;
        var beakStyleWidth = beakWidth;
        // This is here to support the old way of setting the beak size until version 1.0.0.
        // beakStyle is now deprecated and will be be removed at version 1.0.0
        if (beakStyle === 'ms-Callout-smallbeak') {
            beakStyleWidth = 16;
        }
        var beakReactStyle = {
            top: positions && positions.beakPosition ? positions.beakPosition.top : BEAK_ORIGIN_POSITION.top,
            left: positions && positions.beakPosition ? positions.beakPosition.left : BEAK_ORIGIN_POSITION.left,
            height: beakStyleWidth,
            width: beakStyleWidth
        };
        var directionalClassName = positions && positions.directionalClassName ? "ms-u-" + positions.directionalClassName : '';
        var contentMaxHeight = this._getMaxHeight();
        var beakVisible = isBeakVisible && (!!targetElement || !!target);
        var content = (React.createElement("div", { ref: this._resolveRef('_hostElement'), className: Utilities_1.css('ms-Callout-container', styles.container) },
            React.createElement("div", { className: Utilities_1.css('ms-Callout', styles.root, className, directionalClassName), style: positions ? positions.calloutPosition : OFF_SCREEN_STYLE, ref: this._resolveRef('_calloutElement') },
                beakVisible && (React.createElement("div", { className: Utilities_1.css('ms-Callout-beak', styles.beak), style: beakReactStyle })),
                beakVisible &&
                    (React.createElement("div", { className: Utilities_1.css('ms-Callout-beakCurtain', styles.beakCurtain) })),
                React.createElement(Popup_1.Popup, { className: Utilities_1.css('ms-Callout-main', styles.main), onDismiss: this.dismiss, shouldRestoreFocus: true, style: { maxHeight: contentMaxHeight } }, children))));
        return content;
    };
    CalloutContent.prototype.dismiss = function (ev) {
        var onDismiss = this.props.onDismiss;
        if (onDismiss) {
            onDismiss(ev);
        }
    };
    CalloutContent.prototype._dismissOnScroll = function (ev) {
        var preventDismissOnScroll = this.props.preventDismissOnScroll;
        if (this.state.positions && !preventDismissOnScroll) {
            this._dismissOnLostFocus(ev);
        }
    };
    CalloutContent.prototype._dismissOnLostFocus = function (ev) {
        var target = ev.target;
        var clickedOutsideCallout = this._hostElement && !Utilities_1.elementContains(this._hostElement, target);
        if ((!this._target && clickedOutsideCallout) ||
            ev.target !== this._targetWindow &&
                clickedOutsideCallout &&
                (this._target.stopPropagation ||
                    (!this._target || (target !== this._target && !Utilities_1.elementContains(this._target, target))))) {
            this.dismiss(ev);
        }
    };
    CalloutContent.prototype._setInitialFocus = function () {
        if (this.props.setInitialFocus && !this._didSetInitialFocus && this.state.positions) {
            this._didSetInitialFocus = true;
            Utilities_1.focusFirstChild(this._calloutElement);
        }
    };
    CalloutContent.prototype._onComponentDidMount = function () {
        var _this = this;
        // This is added so the callout will dismiss when the window is scrolled
        // but not when something inside the callout is scrolled. The delay seems
        // to be required to avoid React firing an async focus event in IE from
        // the target changing focus quickly prior to rendering the callout.
        this._async.setTimeout(function () {
            _this._events.on(_this._targetWindow, 'scroll', _this._dismissOnScroll, true);
            _this._events.on(_this._targetWindow, 'resize', _this.dismiss, true);
            _this._events.on(_this._targetWindow, 'focus', _this._dismissOnLostFocus, true);
            _this._events.on(_this._targetWindow, 'click', _this._dismissOnLostFocus, true);
        }, 0);
        if (this.props.onLayerMounted) {
            this.props.onLayerMounted();
        }
        this._updatePosition();
    };
    CalloutContent.prototype._updatePosition = function () {
        var positions = this.state.positions;
        var hostElement = this._hostElement;
        var calloutElement = this._calloutElement;
        if (hostElement && calloutElement) {
            var currentProps = void 0;
            currentProps = Utilities_1.assign(currentProps, this.props);
            currentProps.bounds = this._getBounds();
            // Temporary to be removed when targetElement is removed. Currently deprecated.
            if (this.props.targetElement) {
                currentProps.targetElement = this._target;
            }
            else {
                currentProps.target = this._target;
            }
            var newPositions = positioning_1.getRelativePositions(currentProps, hostElement, calloutElement);
            // Set the new position only when the positions are not exists or one of the new callout positions are different.
            // The position should not change if the position is within 2 decimal places.
            if ((!positions && newPositions) ||
                (positions && newPositions && !this._arePositionsEqual(positions, newPositions)
                    && this._positionAttempts < 5)) {
                // We should not reposition the callout more than a few times, if it is then the content is likely resizing
                // and we should stop trying to reposition to prevent a stack overflow.
                this._positionAttempts++;
                this.setState({
                    positions: newPositions
                });
            }
            else {
                this._positionAttempts = 0;
                if (this.props.onPositioned) {
                    this.props.onPositioned();
                }
            }
        }
    };
    CalloutContent.prototype._getBounds = function () {
        if (!this._bounds) {
            var currentBounds = this.props.bounds;
            if (!currentBounds) {
                currentBounds = {
                    top: 0 + SPACE_FROM_EDGE,
                    left: 0 + SPACE_FROM_EDGE,
                    right: this._targetWindow.innerWidth - SPACE_FROM_EDGE,
                    bottom: this._targetWindow.innerHeight - SPACE_FROM_EDGE,
                    width: this._targetWindow.innerWidth - SPACE_FROM_EDGE * 2,
                    height: this._targetWindow.innerHeight - SPACE_FROM_EDGE * 2
                };
            }
            this._bounds = currentBounds;
        }
        return this._bounds;
    };
    CalloutContent.prototype._getMaxHeight = function () {
        if (!this._maxHeight) {
            if (this.props.directionalHintFixed && this._target) {
                var beakWidth = this.props.isBeakVisible ? this.props.beakWidth : 0;
                var gapSpace = this.props.gapSpace ? this.props.gapSpace : 0;
                this._maxHeight = positioning_1.getMaxHeight(this._target, this.props.directionalHint, beakWidth + gapSpace, this._getBounds());
            }
            else {
                this._maxHeight = this._getBounds().height - BORDER_WIDTH * 2;
            }
        }
        return this._maxHeight;
    };
    CalloutContent.prototype._arePositionsEqual = function (positions, newPosition) {
        if (positions.calloutPosition.top.toFixed(2) !== newPosition.calloutPosition.top.toFixed(2)) {
            return false;
        }
        if (positions.calloutPosition.left.toFixed(2) !== newPosition.calloutPosition.left.toFixed(2)) {
            return false;
        }
        if (positions.beakPosition.top.toFixed(2) !== newPosition.beakPosition.top.toFixed(2)) {
            return false;
        }
        if (positions.beakPosition.top.toFixed(2) !== newPosition.beakPosition.top.toFixed(2)) {
            return false;
        }
        return true;
    };
    CalloutContent.prototype._setTargetWindowAndElement = function (target) {
        if (target) {
            if (typeof target === 'string') {
                var currentDoc = Utilities_1.getDocument();
                this._target = currentDoc ? currentDoc.querySelector(target) : null;
                this._targetWindow = Utilities_1.getWindow();
            }
            else if (target.stopPropagation) {
                this._target = target;
                this._targetWindow = Utilities_1.getWindow(target.toElement);
            }
            else {
                var targetElement = target;
                this._target = target;
                this._targetWindow = Utilities_1.getWindow(targetElement);
            }
        }
        else {
            this._targetWindow = Utilities_1.getWindow();
        }
    };
    return CalloutContent;
}(Utilities_1.BaseComponent));
CalloutContent.defaultProps = {
    preventDismissOnScroll: false,
    isBeakVisible: true,
    beakWidth: 16,
    gapSpace: 16,
    directionalHint: DirectionalHint_1.DirectionalHint.bottomAutoEdge
};
__decorate([
    Utilities_1.autobind
], CalloutContent.prototype, "dismiss", null);
__decorate([
    Utilities_1.autobind
], CalloutContent.prototype, "_setInitialFocus", null);
__decorate([
    Utilities_1.autobind
], CalloutContent.prototype, "_onComponentDidMount", null);
exports.CalloutContent = CalloutContent;

//# sourceMappingURL=CalloutContent.js.map


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(60));
__export(__webpack_require__(3));

//# sourceMappingURL=index.js.map


/***/ }),
/* 64 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ContextualMenu_Props_1 = __webpack_require__(19);
var DirectionalHint_1 = __webpack_require__(3);
var FocusZone_1 = __webpack_require__(49);
var Utilities_1 = __webpack_require__(1);
var Callout_1 = __webpack_require__(46);
var Icon_1 = __webpack_require__(12);
var styles = __webpack_require__(65);
var ContextualMenuType;
(function (ContextualMenuType) {
    ContextualMenuType[ContextualMenuType["vertical"] = 0] = "vertical";
    ContextualMenuType[ContextualMenuType["horizontal"] = 1] = "horizontal";
})(ContextualMenuType || (ContextualMenuType = {}));
var HorizontalAlignmentHint;
(function (HorizontalAlignmentHint) {
    HorizontalAlignmentHint[HorizontalAlignmentHint["auto"] = 0] = "auto";
    HorizontalAlignmentHint[HorizontalAlignmentHint["left"] = 1] = "left";
    HorizontalAlignmentHint[HorizontalAlignmentHint["center"] = 2] = "center";
    HorizontalAlignmentHint[HorizontalAlignmentHint["right"] = 3] = "right";
})(HorizontalAlignmentHint || (HorizontalAlignmentHint = {}));
var VerticalAlignmentHint;
(function (VerticalAlignmentHint) {
    VerticalAlignmentHint[VerticalAlignmentHint["top"] = 0] = "top";
    VerticalAlignmentHint[VerticalAlignmentHint["center"] = 1] = "center";
    VerticalAlignmentHint[VerticalAlignmentHint["bottom"] = 2] = "bottom";
})(VerticalAlignmentHint || (VerticalAlignmentHint = {}));
function hasSubmenuItems(item) {
    var submenuItems = getSubmenuItems(item);
    return !!(submenuItems && submenuItems.length);
}
exports.hasSubmenuItems = hasSubmenuItems;
function getSubmenuItems(item) {
    return item.subMenuProps ? item.subMenuProps.items : item.items;
}
exports.getSubmenuItems = getSubmenuItems;
var ContextualMenu = (function (_super) {
    __extends(ContextualMenu, _super);
    function ContextualMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            contextualMenuItems: null,
            subMenuId: Utilities_1.getId('ContextualMenu')
        };
        _this._isFocusingPreviousElement = false;
        _this._enterTimerId = 0;
        return _this;
    }
    ContextualMenu.prototype.dismiss = function (ev, dismissAll) {
        var onDismiss = this.props.onDismiss;
        if (onDismiss) {
            onDismiss(ev, dismissAll);
        }
    };
    ContextualMenu.prototype.componentWillUpdate = function (newProps) {
        if (newProps.targetElement !== this.props.targetElement || newProps.target !== this.props.target) {
            var newTarget = newProps.targetElement ? newProps.targetElement : newProps.target;
            this._setTargetWindowAndElement(newTarget);
        }
    };
    // Invoked once, both on the client and server, immediately before the initial rendering occurs.
    ContextualMenu.prototype.componentWillMount = function () {
        var target = this.props.targetElement ? this.props.targetElement : this.props.target;
        this._setTargetWindowAndElement(target);
        this._previousActiveElement = this._targetWindow ? this._targetWindow.document.activeElement : null;
    };
    // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
    ContextualMenu.prototype.componentDidMount = function () {
        this._events.on(this._targetWindow, 'resize', this.dismiss);
        if (this.props.onMenuOpened) {
            this.props.onMenuOpened(this.props);
        }
    };
    // Invoked immediately before a component is unmounted from the DOM.
    ContextualMenu.prototype.componentWillUnmount = function () {
        var _this = this;
        if (this._isFocusingPreviousElement && this._previousActiveElement) {
            // This slight delay is required so that we can unwind the stack, let react try to mess with focus, and then
            // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
            // to reset the focus back to the thing it thinks should have been focused.
            setTimeout(function () { return _this._previousActiveElement.focus(); }, 0);
        }
        this._events.dispose();
        this._async.dispose();
    };
    ContextualMenu.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, items = _a.items, isBeakVisible = _a.isBeakVisible, labelElementId = _a.labelElementId, targetElement = _a.targetElement, id = _a.id, targetPoint = _a.targetPoint, useTargetPoint = _a.useTargetPoint, beakWidth = _a.beakWidth, directionalHint = _a.directionalHint, gapSpace = _a.gapSpace, coverTarget = _a.coverTarget, ariaLabel = _a.ariaLabel, doNotLayer = _a.doNotLayer, arrowDirection = _a.arrowDirection, target = _a.target, bounds = _a.bounds, directionalHintFixed = _a.directionalHintFixed, shouldFocusOnMount = _a.shouldFocusOnMount;
        var submenuProps = this.state.submenuProps;
        var hasIcons = !!(items && items.some(function (item) { return !!item.icon || !!item.iconProps; }));
        var hasCheckmarks = !!(items && items.some(function (item) { return !!item.canCheck; }));
        // The menu should only return if items were provided, if no items were provided then it should not appear.
        if (items && items.length > 0) {
            return (React.createElement(Callout_1.Callout, { target: target, targetElement: targetElement, targetPoint: targetPoint, useTargetPoint: useTargetPoint, isBeakVisible: isBeakVisible, beakWidth: beakWidth, directionalHint: directionalHint, gapSpace: gapSpace, coverTarget: coverTarget, doNotLayer: doNotLayer, className: 'ms-ContextualMenu-Callout', setInitialFocus: shouldFocusOnMount, onDismiss: this.props.onDismiss, bounds: bounds, directionalHintFixed: directionalHintFixed },
                React.createElement("div", { ref: function (host) { return _this._host = host; }, id: id, className: Utilities_1.css('ms-ContextualMenu-container', className) },
                    (items && items.length) ? (React.createElement(FocusZone_1.FocusZone, { className: Utilities_1.css('ms-ContextualMenu is-open', styles.root), direction: arrowDirection, ariaLabelledBy: labelElementId, ref: function (focusZone) { return _this._focusZone = focusZone; }, role: 'menu', isCircularNavigation: true },
                        React.createElement("ul", { className: Utilities_1.css('ms-ContextualMenu-list is-open', styles.list), onKeyDown: this._onKeyDown, "aria-label": ariaLabel }, items.map(function (item, index) { return (_this._renderMenuItem(item, index, hasCheckmarks, hasIcons)); })))) : (null),
                    submenuProps ? (React.createElement(ContextualMenu, __assign({}, submenuProps))) : (null))));
        }
        else {
            return null;
        }
    };
    ContextualMenu.prototype._renderMenuItem = function (item, index, hasCheckmarks, hasIcons) {
        var renderedItems = [];
        if (item.name === '-') {
            item.itemType = ContextualMenu_Props_1.ContextualMenuItemType.Divider;
        }
        switch (item.itemType) {
            case ContextualMenu_Props_1.ContextualMenuItemType.Divider:
                renderedItems.push(this._renderSeparator(index, item.className));
                break;
            case ContextualMenu_Props_1.ContextualMenuItemType.Header:
                renderedItems.push(this._renderSeparator(index));
                var headerItem = this._renderHeaderMenuItem(item, index, hasCheckmarks, hasIcons);
                renderedItems.push(this._renderListItem(headerItem, item.key || index, item.className, item.title));
                break;
            default:
                var menuItem = this._renderNormalItem(item, index, hasCheckmarks, hasIcons);
                renderedItems.push(this._renderListItem(menuItem, item.key || index, item.className, item.title));
                break;
        }
        return renderedItems;
    };
    ContextualMenu.prototype._renderListItem = function (content, key, className, title) {
        return React.createElement("li", { role: 'menuitem', title: title, key: key, className: Utilities_1.css('ms-ContextualMenu-item', styles.item, className) }, content);
    };
    ContextualMenu.prototype._renderSeparator = function (index, className) {
        if (index > 0) {
            return React.createElement("li", { role: 'separator', key: 'separator-' + index, className: Utilities_1.css('ms-ContextualMenu-divider', styles.divider, className) });
        }
        return null;
    };
    ContextualMenu.prototype._renderNormalItem = function (item, index, hasCheckmarks, hasIcons) {
        if (item.onRender) {
            return [item.onRender(item)];
        }
        if (item.href) {
            return this._renderAnchorMenuItem(item, index, hasCheckmarks, hasIcons);
        }
        return this._renderButtonItem(item, index, hasCheckmarks, hasIcons);
    };
    ContextualMenu.prototype._renderHeaderMenuItem = function (item, index, hasCheckmarks, hasIcons) {
        return (React.createElement("div", { className: Utilities_1.css('ms-ContextualMenu-header', styles.header), style: item.style }, this._renderMenuItemChildren(item, index, hasCheckmarks, hasIcons)));
    };
    ContextualMenu.prototype._renderAnchorMenuItem = function (item, index, hasCheckmarks, hasIcons) {
        return (React.createElement("div", null,
            React.createElement("a", __assign({}, Utilities_1.getNativeProps(item, Utilities_1.anchorProperties), { href: item.href, className: Utilities_1.css('ms-ContextualMenu-link', styles.link, (item.isDisabled || item.disabled) && 'is-disabled'), style: item.style, onClick: this._onAnchorClick.bind(this, item) }), this._renderMenuItemChildren(item, index, hasCheckmarks, hasIcons))));
    };
    ContextualMenu.prototype._renderButtonItem = function (item, index, hasCheckmarks, hasIcons) {
        var _this = this;
        var _a = this.state, expandedMenuItemKey = _a.expandedMenuItemKey, subMenuId = _a.subMenuId;
        var ariaLabel = '';
        if (item.ariaLabel) {
            ariaLabel = item.ariaLabel;
        }
        else if (item.name) {
            ariaLabel = item.name;
        }
        var itemButtonProperties = {
            className: Utilities_1.css('ms-ContextualMenu-link', styles.link, (_b = {},
                _b['is-expanded ' + styles.isExpanded] = (expandedMenuItemKey === item.key),
                _b)),
            onClick: this._onItemClick.bind(this, item),
            onKeyDown: hasSubmenuItems(item) ? this._onItemKeyDown.bind(this, item) : null,
            onMouseEnter: this._onItemMouseEnter.bind(this, item),
            onMouseLeave: this._onMouseLeave,
            onMouseDown: function (ev) { return _this._onItemMouseDown(item, ev); },
            disabled: item.isDisabled || item.disabled,
            href: item.href,
            title: item.title,
            'aria-label': ariaLabel,
            'aria-haspopup': hasSubmenuItems(item) ? true : null,
            'aria-owns': item.key === expandedMenuItemKey ? subMenuId : null,
            style: item.style,
        };
        return React.createElement('button', Utilities_1.assign({}, Utilities_1.getNativeProps(item, Utilities_1.buttonProperties), itemButtonProperties), this._renderMenuItemChildren(item, index, hasCheckmarks, hasIcons));
        var _b;
    };
    ContextualMenu.prototype._renderMenuItemChildren = function (item, index, hasCheckmarks, hasIcons) {
        var isItemChecked = item.isChecked || item.checked;
        return (React.createElement("div", { className: Utilities_1.css('ms-ContextualMenu-linkContent', styles.linkContent) },
            (hasCheckmarks) ? (React.createElement(Icon_1.Icon, { iconName: isItemChecked ? 'CheckMark' : 'CustomIcon', className: Utilities_1.css('ms-ContextualMenu-icon', styles.icon), onClick: this._onItemClick.bind(this, item) })) : (null),
            (hasIcons) ? (this._renderIcon(item)) : (null),
            React.createElement("span", { className: Utilities_1.css('ms-ContextualMenu-itemText', styles.itemText) }, item.name),
            hasSubmenuItems(item) ? (React.createElement(Icon_1.Icon, __assign({ iconName: Utilities_1.getRTL() ? 'ChevronLeft' : 'ChevronRight' }, item.submenuIconProps, { className: Utilities_1.css('ms-ContextualMenu-submenuIcon', styles.submenuIcon, item.submenuIconProps ? item.submenuIconProps.className : '') }))) : (null)));
    };
    ContextualMenu.prototype._renderIcon = function (item) {
        // Only present to allow continued use of item.icon which is deprecated.
        var iconProps = item.iconProps ? item.iconProps : {
            iconName: 'CustomIcon',
            className: item.icon ? 'ms-Icon--' + item.icon : ''
        };
        // Use the default icon color for the known icon names
        var iconColorClassName = iconProps.iconName === 'None' ? '' : ('ms-ContextualMenu-iconColor ' + styles.iconColor);
        var iconClassName = Utilities_1.css('ms-ContextualMenu-icon', styles.icon, iconColorClassName, iconProps.className);
        return React.createElement(Icon_1.Icon, __assign({}, iconProps, { className: iconClassName }));
    };
    ContextualMenu.prototype._onKeyDown = function (ev) {
        var submenuCloseKey = Utilities_1.getRTL() ? Utilities_1.KeyCodes.right : Utilities_1.KeyCodes.left;
        if (ev.which === Utilities_1.KeyCodes.escape
            || ev.which === Utilities_1.KeyCodes.tab
            || (ev.which === submenuCloseKey && this.props.isSubMenu && this.props.arrowDirection === FocusZone_1.FocusZoneDirection.vertical)) {
            // When a user presses escape, we will try to refocus the previous focused element.
            this._isFocusingPreviousElement = true;
            ev.preventDefault();
            ev.stopPropagation();
            this.dismiss(ev);
        }
    };
    ContextualMenu.prototype._onItemMouseEnter = function (item, ev) {
        var _this = this;
        var targetElement = ev.currentTarget;
        if (item.key !== this.state.expandedMenuItemKey) {
            if (hasSubmenuItems(item)) {
                this._enterTimerId = this._async.setTimeout(function () { return _this._onItemSubMenuExpand(item, targetElement); }, 500);
            }
            else {
                this._enterTimerId = this._async.setTimeout(function () { return _this._onSubMenuDismiss(ev); }, 500);
            }
        }
    };
    ContextualMenu.prototype._onMouseLeave = function (ev) {
        this._async.clearTimeout(this._enterTimerId);
    };
    ContextualMenu.prototype._onItemMouseDown = function (item, ev) {
        if (item.onMouseDown) {
            item.onMouseDown(item, ev);
        }
    };
    ContextualMenu.prototype._onItemClick = function (item, ev) {
        var items = getSubmenuItems(item);
        if (!items || !items.length) {
            this._executeItemClick(item, ev);
        }
        else {
            if (item.key === this.state.expandedMenuItemKey) {
                this._onSubMenuDismiss(ev);
            }
            else {
                this._onItemSubMenuExpand(item, ev.currentTarget);
            }
        }
        ev.stopPropagation();
        ev.preventDefault();
    };
    ContextualMenu.prototype._onAnchorClick = function (item, ev) {
        this._executeItemClick(item, ev);
        ev.stopPropagation();
    };
    ContextualMenu.prototype._executeItemClick = function (item, ev) {
        if (item.onClick) {
            item.onClick(ev, item);
        }
        else if (this.props.onItemClick) {
            this.props.onItemClick(ev, item);
        }
        this.dismiss(ev, true);
    };
    ContextualMenu.prototype._onItemKeyDown = function (item, ev) {
        var openKey = Utilities_1.getRTL() ? Utilities_1.KeyCodes.left : Utilities_1.KeyCodes.right;
        if (ev.which === openKey) {
            this._onItemSubMenuExpand(item, ev.currentTarget);
            ev.preventDefault();
        }
    };
    ContextualMenu.prototype._onItemSubMenuExpand = function (item, target) {
        if (this.state.expandedMenuItemKey !== item.key) {
            if (this.state.submenuProps) {
                this._onSubMenuDismiss();
            }
            var submenuProps = {
                items: getSubmenuItems(item),
                target: target,
                onDismiss: this._onSubMenuDismiss,
                isSubMenu: true,
                id: this.state.subMenuId,
                shouldFocusOnMount: true,
                directionalHint: Utilities_1.getRTL() ? DirectionalHint_1.DirectionalHint.leftTopEdge : DirectionalHint_1.DirectionalHint.rightTopEdge,
                className: this.props.className,
                gapSpace: 0
            };
            if (item.subMenuProps) {
                Utilities_1.assign(submenuProps, item.subMenuProps);
            }
            this.setState({
                expandedMenuItemKey: item.key,
                submenuProps: submenuProps,
            });
        }
    };
    ContextualMenu.prototype._onSubMenuDismiss = function (ev, dismissAll) {
        if (dismissAll) {
            this.dismiss(ev, dismissAll);
        }
        else {
            this.setState({
                dismissedMenuItemKey: this.state.expandedMenuItemKey,
                expandedMenuItemKey: null,
                submenuProps: null
            });
        }
    };
    ContextualMenu.prototype._setTargetWindowAndElement = function (target) {
        if (target) {
            if (typeof target === 'string') {
                var currentDoc = Utilities_1.getDocument();
                this._target = currentDoc ? currentDoc.querySelector(target) : null;
                this._targetWindow = Utilities_1.getWindow();
            }
            else if (target.stopPropagation) {
                this._target = target;
                this._targetWindow = Utilities_1.getWindow(target.toElement);
            }
            else {
                var targetElement = target;
                this._target = target;
                this._targetWindow = Utilities_1.getWindow(targetElement);
            }
        }
        else {
            this._targetWindow = Utilities_1.getWindow();
        }
    };
    return ContextualMenu;
}(Utilities_1.BaseComponent));
// The default ContextualMenu properities have no items and beak, the default submenu direction is right and top.
ContextualMenu.defaultProps = {
    items: [],
    shouldFocusOnMount: true,
    isBeakVisible: false,
    gapSpace: 0,
    directionalHint: DirectionalHint_1.DirectionalHint.bottomAutoEdge,
    beakWidth: 16,
    arrowDirection: FocusZone_1.FocusZoneDirection.vertical,
};
__decorate([
    Utilities_1.autobind
], ContextualMenu.prototype, "dismiss", null);
__decorate([
    Utilities_1.autobind
], ContextualMenu.prototype, "_onKeyDown", null);
__decorate([
    Utilities_1.autobind
], ContextualMenu.prototype, "_onMouseLeave", null);
__decorate([
    Utilities_1.autobind
], ContextualMenu.prototype, "_onSubMenuDismiss", null);
exports.ContextualMenu = ContextualMenu;

//# sourceMappingURL=ContextualMenu.js.map


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_ecf67d3f',
    list: 'list_ecf67d3f',
    item: 'item_ecf67d3f',
    link: 'link_ecf67d3f',
    isDisabled: 'isDisabled_ecf67d3f',
    icon: 'icon_ecf67d3f',
    isExpanded: 'isExpanded_ecf67d3f',
    header: 'header_ecf67d3f',
    linkContent: 'linkContent_ecf67d3f',
    divider: 'divider_ecf67d3f',
    iconColor: 'iconColor_ecf67d3f',
    itemText: 'itemText_ecf67d3f',
    submenuIcon: 'submenuIcon_ecf67d3f',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_ecf67d3f{background-color:" }, { "theme": "white", "defaultValue": "#ffffff" }, { "rawString": ";min-width:180px}.list_ecf67d3f{list-style-type:none;margin:0;padding:0;line-height:0}.item_ecf67d3f{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;color:" }, { "theme": "neutralPrimary", "defaultValue": "#333333" }, { "rawString": ";height:36px;position:relative;box-sizing:border-box}.link_ecf67d3f{font:inherit;color:inherit;background:0 0;border:none;width:100%;height:36px;line-height:36px;display:block;cursor:pointer;padding:0 6px}.link_ecf67d3f::-moz-focus-inner{border:0}.link_ecf67d3f{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .link_ecf67d3f:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}html[dir=ltr] .link_ecf67d3f{text-align:left}html[dir=rtl] .link_ecf67d3f{text-align:right}.link_ecf67d3f:hover:not([disabled]){background:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": "}.link_ecf67d3f.isDisabled_ecf67d3f,.link_ecf67d3f[disabled]{color:" }, { "theme": "neutralTertiaryAlt", "defaultValue": "#c8c8c8" }, { "rawString": ";cursor:default;pointer-events:none}.link_ecf67d3f.isDisabled_ecf67d3f .icon_ecf67d3f,.link_ecf67d3f[disabled] .icon_ecf67d3f{color:" }, { "theme": "neutralTertiaryAlt", "defaultValue": "#c8c8c8" }, { "rawString": "}.is-focusVisible .link_ecf67d3f:focus{background:" }, { "theme": "neutralLighter", "defaultValue": "#f4f4f4" }, { "rawString": "}.link_ecf67d3f.isExpanded_ecf67d3f,.link_ecf67d3f.isExpanded_ecf67d3f:hover{background:" }, { "theme": "neutralQuaternaryAlt", "defaultValue": "#dadada" }, { "rawString": ";color:" }, { "theme": "black", "defaultValue": "#000000" }, { "rawString": ";font-weight:600}.header_ecf67d3f{font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:12px;font-weight:400;font-weight:600;color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": ";background:0 0;border:none;height:36px;line-height:36px;cursor:default;padding:0 6px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.header_ecf67d3f::-moz-focus-inner{border:0}.header_ecf67d3f{outline:transparent;position:relative}.ms-Fabric.is-focusVisible .header_ecf67d3f:focus:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;border:1px solid " }, { "theme": "neutralSecondary", "defaultValue": "#666666" }, { "rawString": "}html[dir=ltr] .header_ecf67d3f{text-align:left}html[dir=rtl] .header_ecf67d3f{text-align:right}a.link_ecf67d3f{padding:0 6px;text-rendering:auto;color:inherit;letter-spacing:normal;word-spacing:normal;text-transform:none;text-indent:0;text-shadow:none;text-decoration:none;box-sizing:border-box}.linkContent_ecf67d3f{white-space:nowrap;height:inherit;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;max-width:100%}.divider_ecf67d3f{display:block;height:1px;background-color:" }, { "theme": "neutralLight", "defaultValue": "#eaeaea" }, { "rawString": ";position:relative}.icon_ecf67d3f{display:inline-block;min-height:1px;max-height:36px;width:14px;margin:0 4px;vertical-align:middle;-ms-flex-negative:0;flex-shrink:0}.iconColor_ecf67d3f{color:" }, { "theme": "themePrimary", "defaultValue": "#0078d7" }, { "rawString": "}.itemText_ecf67d3f{margin:0 4px;vertical-align:middle;display:inline-block;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.submenuIcon_ecf67d3f{height:36px;line-height:36px;text-align:center;font-size:10px;display:inline-block;vertical-align:middle;-ms-flex-negative:0;flex-shrink:0}" }]);
module.exports = styles;
/* tslint:enable */ 

//# sourceMappingURL=ContextualMenu.scss.js.map


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(64));
__export(__webpack_require__(19));

//# sourceMappingURL=index.js.map


/***/ }),
/* 67 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var DIRECTIONAL_KEY_CODES = [
    Utilities_1.KeyCodes.up,
    Utilities_1.KeyCodes.down,
    Utilities_1.KeyCodes.left,
    Utilities_1.KeyCodes.right,
    Utilities_1.KeyCodes.home,
    Utilities_1.KeyCodes.end,
    Utilities_1.KeyCodes.tab,
    Utilities_1.KeyCodes.pageUp,
    Utilities_1.KeyCodes.pageDown
];
// We will track the last focus visibility state so that if we tear down and recreate
// the Fabric component, we will use the last known value as the default.
var _lastIsFocusVisible = false;
// Ensure that the HTML element has a dir specified. This helps to ensure RTL/LTR macros in css for all components will work.
if (typeof (document) === 'object' && document.documentElement && !document.documentElement.getAttribute('dir')) {
    document.documentElement.setAttribute('dir', 'ltr');
}
var Fabric = (function (_super) {
    __extends(Fabric, _super);
    function Fabric() {
        var _this = _super.call(this) || this;
        _this.state = {
            isFocusVisible: _lastIsFocusVisible
        };
        return _this;
    }
    Fabric.prototype.componentDidMount = function () {
        this._events.on(document.body, 'mousedown', this._onMouseDown, true);
        this._events.on(document.body, 'keydown', this._onKeyDown, true);
    };
    Fabric.prototype.render = function () {
        var isFocusVisible = this.state.isFocusVisible;
        var rootClass = Utilities_1.css('ms-Fabric ms-font-m', this.props.className, {
            'is-focusVisible': isFocusVisible
        });
        return (React.createElement("div", __assign({}, this.props, { className: rootClass, ref: 'root' })));
    };
    Fabric.prototype._onMouseDown = function () {
        if (this.state.isFocusVisible) {
            this.setState({
                isFocusVisible: false
            });
            _lastIsFocusVisible = false;
        }
    };
    Fabric.prototype._onKeyDown = function (ev) {
        if (!this.state.isFocusVisible && DIRECTIONAL_KEY_CODES.indexOf(ev.which) > -1) {
            this.setState({
                isFocusVisible: true
            });
            _lastIsFocusVisible = true;
        }
    };
    return Fabric;
}(Utilities_1.BaseComponent));
exports.Fabric = Fabric;

//# sourceMappingURL=Fabric.js.map


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(67));

//# sourceMappingURL=index.js.map


/***/ }),
/* 69 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var FocusZone_Props_1 = __webpack_require__(20);
var Utilities_1 = __webpack_require__(1);
var IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
var IS_ENTER_DISABLED_ATTRIBUTE = 'data-disable-click-on-enter';
var FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
var TABINDEX = 'tabindex';
var _allInstances = {};
var ALLOWED_INPUT_TYPES = ['text', 'number', 'password', 'email', 'tel', 'url', 'search'];
var FocusZone = (function (_super) {
    __extends(FocusZone, _super);
    function FocusZone(props) {
        var _this = _super.call(this, props) || this;
        _this._warnDeprecations({ rootProps: null });
        _this._id = Utilities_1.getId('FocusZone');
        _allInstances[_this._id] = _this;
        _this._focusAlignment = {
            left: 0,
            top: 0
        };
        return _this;
    }
    FocusZone.prototype.componentDidMount = function () {
        var windowElement = this.refs.root.ownerDocument.defaultView;
        var parentElement = Utilities_1.getParent(this.refs.root);
        while (parentElement &&
            parentElement !== document.body &&
            parentElement.nodeType === 1) {
            if (Utilities_1.isElementFocusZone(parentElement)) {
                this._isInnerZone = true;
                break;
            }
            parentElement = Utilities_1.getParent(parentElement);
        }
        this._events.on(windowElement, 'keydown', this._onKeyDownCapture, true);
        // Assign initial tab indexes so that we can set initial focus as appropriate.
        this._updateTabIndexes();
        if (this.props.defaultActiveElement) {
            this._activeElement = Utilities_1.getDocument().querySelector(this.props.defaultActiveElement);
            this.focus();
        }
    };
    FocusZone.prototype.componentWillUnmount = function () {
        delete _allInstances[this._id];
    };
    FocusZone.prototype.render = function () {
        var _a = this.props, rootProps = _a.rootProps, ariaDescribedBy = _a.ariaDescribedBy, ariaLabelledBy = _a.ariaLabelledBy, className = _a.className;
        var divProps = Utilities_1.getNativeProps(this.props, Utilities_1.divProperties);
        return (React.createElement("div", __assign({}, divProps, rootProps, { className: Utilities_1.css('ms-FocusZone', className), ref: 'root', "data-focuszone-id": this._id, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, onKeyDown: this._onKeyDown, onFocus: this._onFocus }, { onMouseDownCapture: this._onMouseDown }), this.props.children));
    };
    /**
     * Sets focus to the first tabbable item in the zone.
     * @returns True if focus could be set to an active element, false if no operation was taken.
     */
    FocusZone.prototype.focus = function () {
        if (this._activeElement && Utilities_1.elementContains(this.refs.root, this._activeElement)) {
            this._activeElement.focus();
            return true;
        }
        else {
            var firstChild = this.refs.root.firstChild;
            return this.focusElement(Utilities_1.getNextElement(this.refs.root, firstChild, true));
        }
    };
    /**
     * Sets focus to a specific child element within the zone. This can be used in conjunction with
     * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
     * location and then focus.)
     * @param {HTMLElement} element The child element within the zone to focus.
     * @returns True if focus could be set to an active element, false if no operation was taken.
     */
    FocusZone.prototype.focusElement = function (element) {
        var onBeforeFocus = this.props.onBeforeFocus;
        if (onBeforeFocus && !onBeforeFocus(element)) {
            return false;
        }
        if (element) {
            if (this._activeElement) {
                this._activeElement.tabIndex = -1;
            }
            this._activeElement = element;
            if (element) {
                if (!this._focusAlignment) {
                    this._setFocusAlignment(element, true, true);
                }
                this._activeElement.tabIndex = 0;
                element.focus();
                return true;
            }
        }
        return false;
    };
    FocusZone.prototype._onFocus = function (ev) {
        var onActiveElementChanged = this.props.onActiveElementChanged;
        if (this._isImmediateDescendantOfZone(ev.target)) {
            this._activeElement = ev.target;
            this._setFocusAlignment(this._activeElement);
        }
        else {
            var parentElement = ev.target;
            while (parentElement && parentElement !== this.refs.root) {
                if (Utilities_1.isElementTabbable(parentElement) && this._isImmediateDescendantOfZone(parentElement)) {
                    this._activeElement = parentElement;
                    break;
                }
                parentElement = Utilities_1.getParent(parentElement);
            }
        }
        if (onActiveElementChanged) {
            onActiveElementChanged(this._activeElement, ev);
        }
    };
    /**
     * Handle global tab presses so that we can patch tabindexes on the fly.
     */
    FocusZone.prototype._onKeyDownCapture = function (ev) {
        if (ev.which === Utilities_1.KeyCodes.tab) {
            this._updateTabIndexes();
        }
    };
    FocusZone.prototype._onMouseDown = function (ev) {
        var disabled = this.props.disabled;
        if (disabled) {
            return;
        }
        var target = ev.target;
        var path = [];
        while (target && target !== this.refs.root) {
            path.push(target);
            target = Utilities_1.getParent(target);
        }
        while (path.length) {
            target = path.pop();
            if (Utilities_1.isElementFocusZone(target)) {
                break;
            }
            else if (target && Utilities_1.isElementTabbable(target)) {
                target.tabIndex = 0;
                this._setFocusAlignment(target, true, true);
            }
        }
    };
    /**
     * Handle the keystrokes.
     */
    FocusZone.prototype._onKeyDown = function (ev) {
        var _a = this.props, direction = _a.direction, disabled = _a.disabled, isInnerZoneKeystroke = _a.isInnerZoneKeystroke;
        if (disabled) {
            return;
        }
        if (this.props.onKeyDown) {
            this.props.onKeyDown(ev);
            if (ev.isDefaultPrevented()) {
                return;
            }
        }
        if (isInnerZoneKeystroke &&
            this._isImmediateDescendantOfZone(ev.target) &&
            isInnerZoneKeystroke(ev)) {
            // Try to focus
            var innerZone = this._getFirstInnerZone();
            if (!innerZone || !innerZone.focus()) {
                return;
            }
        }
        else if (ev.altKey) {
            return;
        }
        else {
            switch (ev.which) {
                case Utilities_1.KeyCodes.space:
                    if (this._tryInvokeClickForFocusable(ev.target)) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.left:
                    if (direction !== FocusZone_Props_1.FocusZoneDirection.vertical && this._moveFocusLeft()) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.right:
                    if (direction !== FocusZone_Props_1.FocusZoneDirection.vertical && this._moveFocusRight()) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.up:
                    if (direction !== FocusZone_Props_1.FocusZoneDirection.horizontal && this._moveFocusUp()) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.down:
                    if (direction !== FocusZone_Props_1.FocusZoneDirection.horizontal && this._moveFocusDown()) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.home:
                    var firstChild = this.refs.root.firstChild;
                    if (this.focusElement(Utilities_1.getNextElement(this.refs.root, firstChild, true))) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.end:
                    var lastChild = this.refs.root.lastChild;
                    if (this.focusElement(Utilities_1.getPreviousElement(this.refs.root, lastChild, true, true, true))) {
                        break;
                    }
                    return;
                case Utilities_1.KeyCodes.enter:
                    if (this._tryInvokeClickForFocusable(ev.target)) {
                        break;
                    }
                    return;
                default:
                    return;
            }
        }
        ev.preventDefault();
        ev.stopPropagation();
    };
    /**
     * Walk up the dom try to find a focusable element.
     */
    FocusZone.prototype._tryInvokeClickForFocusable = function (target) {
        do {
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT') {
                return false;
            }
            if (this._isImmediateDescendantOfZone(target) &&
                target.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' &&
                target.getAttribute(IS_ENTER_DISABLED_ATTRIBUTE) !== 'true') {
                Utilities_1.EventGroup.raise(target, 'click', null, true);
                return true;
            }
            target = Utilities_1.getParent(target);
        } while (target !== this.refs.root);
        return false;
    };
    /**
     * Traverse to find first child zone.
     */
    FocusZone.prototype._getFirstInnerZone = function (rootElement) {
        rootElement = rootElement || this._activeElement || this.refs.root;
        var child = rootElement.firstElementChild;
        while (child) {
            if (Utilities_1.isElementFocusZone(child)) {
                return _allInstances[child.getAttribute(FOCUSZONE_ID_ATTRIBUTE)];
            }
            var match = this._getFirstInnerZone(child);
            if (match) {
                return match;
            }
            child = child.nextElementSibling;
        }
        return null;
    };
    FocusZone.prototype._moveFocus = function (isForward, getDistanceFromCenter, ev) {
        var element = this._activeElement;
        var candidateDistance = -1;
        var candidateElement;
        var changedFocus = false;
        var isBidirectional = this.props.direction === FocusZone_Props_1.FocusZoneDirection.bidirectional;
        if (!element) {
            return false;
        }
        if (this._isElementInput(element)) {
            if (!this._shouldInputLoseFocus(element, isForward)) {
                return false;
            }
        }
        var activeRect = isBidirectional ? element.getBoundingClientRect() : null;
        do {
            element = isForward ?
                Utilities_1.getNextElement(this.refs.root, element) :
                Utilities_1.getPreviousElement(this.refs.root, element);
            if (isBidirectional) {
                if (element) {
                    var targetRect = element.getBoundingClientRect();
                    var elementDistance = getDistanceFromCenter(activeRect, targetRect);
                    if (elementDistance > -1 && (candidateDistance === -1 || elementDistance < candidateDistance)) {
                        candidateDistance = elementDistance;
                        candidateElement = element;
                    }
                    if (candidateDistance >= 0 && elementDistance < 0) {
                        break;
                    }
                }
            }
            else {
                candidateElement = element;
                break;
            }
        } while (element);
        // Focus the closest candidate
        if (candidateElement && candidateElement !== this._activeElement) {
            changedFocus = true;
            this.focusElement(candidateElement);
        }
        else if (this.props.isCircularNavigation) {
            if (isForward) {
                return this.focusElement(Utilities_1.getNextElement(this.refs.root, this.refs.root.firstElementChild, true));
            }
            else {
                return this.focusElement(Utilities_1.getPreviousElement(this.refs.root, this.refs.root.lastElementChild, true, true, true));
            }
        }
        return changedFocus;
    };
    FocusZone.prototype._moveFocusDown = function () {
        var targetTop = -1;
        var leftAlignment = this._focusAlignment.left;
        if (this._moveFocus(true, function (activeRect, targetRect) {
            var distance = -1;
            // ClientRect values can be floats that differ by very small fractions of a decimal.
            // If the difference between top and bottom are within a pixel then we should treat
            // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
            // but without Math.Floor they will be handled incorrectly.
            var targetRectTop = Math.floor(targetRect.top);
            var activeRectBottom = Math.floor(activeRect.bottom);
            if ((targetTop === -1 && targetRectTop >= activeRectBottom) ||
                (targetRectTop === targetTop)) {
                targetTop = targetRectTop;
                if (leftAlignment >= targetRect.left && leftAlignment <= (targetRect.left + targetRect.width)) {
                    distance = 0;
                }
                else {
                    distance = Math.abs((targetRect.left + (targetRect.width / 2)) - leftAlignment);
                }
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, false, true);
            return true;
        }
        return false;
    };
    FocusZone.prototype._moveFocusUp = function () {
        var targetTop = -1;
        var leftAlignment = this._focusAlignment.left;
        if (this._moveFocus(false, function (activeRect, targetRect) {
            var distance = -1;
            // ClientRect values can be floats that differ by very small fractions of a decimal.
            // If the difference between top and bottom are within a pixel then we should treat
            // them as equivalent by using Math.floor. For instance 5.2222 and 5.222221 should be equivalent,
            // but without Math.Floor they will be handled incorrectly.
            var targetRectBottom = Math.floor(targetRect.bottom);
            var targetRectTop = Math.floor(targetRect.top);
            var activeRectTop = Math.floor(activeRect.top);
            if ((targetTop === -1 && targetRectBottom <= activeRectTop) ||
                (targetRectTop === targetTop)) {
                targetTop = targetRectTop;
                if (leftAlignment >= targetRect.left && leftAlignment <= (targetRect.left + targetRect.width)) {
                    distance = 0;
                }
                else {
                    distance = Math.abs((targetRect.left + (targetRect.width / 2)) - leftAlignment);
                }
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, false, true);
            return true;
        }
        return false;
    };
    FocusZone.prototype._moveFocusLeft = function () {
        var _this = this;
        var targetTop = -1;
        var topAlignment = this._focusAlignment.top;
        if (this._moveFocus(Utilities_1.getRTL(), function (activeRect, targetRect) {
            var distance = -1;
            if ((targetTop === -1 &&
                targetRect.right <= activeRect.right &&
                (_this.props.direction === FocusZone_Props_1.FocusZoneDirection.horizontal || targetRect.top === activeRect.top)) ||
                (targetRect.top === targetTop)) {
                targetTop = targetRect.top;
                distance = Math.abs((targetRect.top + (targetRect.height / 2)) - topAlignment);
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, true, false);
            return true;
        }
        return false;
    };
    FocusZone.prototype._moveFocusRight = function () {
        var _this = this;
        var targetTop = -1;
        var topAlignment = this._focusAlignment.top;
        if (this._moveFocus(!Utilities_1.getRTL(), function (activeRect, targetRect) {
            var distance = -1;
            if ((targetTop === -1 &&
                targetRect.left >= activeRect.left &&
                (_this.props.direction === FocusZone_Props_1.FocusZoneDirection.horizontal || targetRect.top === activeRect.top)) ||
                (targetRect.top === targetTop)) {
                targetTop = targetRect.top;
                distance = Math.abs((targetRect.top + (targetRect.height / 2)) - topAlignment);
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, true, false);
            return true;
        }
        return false;
    };
    FocusZone.prototype._setFocusAlignment = function (element, isHorizontal, isVertical) {
        if (this.props.direction === FocusZone_Props_1.FocusZoneDirection.bidirectional &&
            (!this._focusAlignment || isHorizontal || isVertical)) {
            var rect = element.getBoundingClientRect();
            var left = rect.left + (rect.width / 2);
            var top_1 = rect.top + (rect.height / 2);
            if (!this._focusAlignment) {
                this._focusAlignment = { left: left, top: top_1 };
            }
            if (isHorizontal) {
                this._focusAlignment.left = left;
            }
            if (isVertical) {
                this._focusAlignment.top = top_1;
            }
        }
    };
    FocusZone.prototype._isImmediateDescendantOfZone = function (element) {
        var parentElement = Utilities_1.getParent(element);
        while (parentElement && parentElement !== this.refs.root && parentElement !== document.body) {
            if (Utilities_1.isElementFocusZone(parentElement)) {
                return false;
            }
            parentElement = Utilities_1.getParent(parentElement);
        }
        return true;
    };
    FocusZone.prototype._updateTabIndexes = function (element) {
        if (!element) {
            element = this.refs.root;
            if (this._activeElement && !Utilities_1.elementContains(element, this._activeElement)) {
                this._activeElement = null;
            }
        }
        var childNodes = element.children;
        for (var childIndex = 0; childNodes && childIndex < childNodes.length; childIndex++) {
            var child = childNodes[childIndex];
            if (!Utilities_1.isElementFocusZone(child)) {
                // If the item is explicitly set to not be focusable then TABINDEX needs to be set to -1.
                if (child.getAttribute && child.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'false') {
                    child.setAttribute(TABINDEX, '-1');
                }
                if (Utilities_1.isElementTabbable(child)) {
                    if (this.props.disabled) {
                        child.setAttribute(TABINDEX, '-1');
                    }
                    else if (!this._isInnerZone && (!this._activeElement || this._activeElement === child)) {
                        this._activeElement = child;
                        if (child.getAttribute(TABINDEX) !== '0') {
                            child.setAttribute(TABINDEX, '0');
                        }
                    }
                    else if (child.getAttribute(TABINDEX) !== '-1') {
                        child.setAttribute(TABINDEX, '-1');
                    }
                }
                else if (child.tagName === 'svg' && child.getAttribute('focusable') !== 'false') {
                    // Disgusting IE hack. Sad face.
                    child.setAttribute('focusable', 'false');
                }
                this._updateTabIndexes(child);
            }
        }
    };
    FocusZone.prototype._isElementInput = function (element) {
        if (element && element.tagName && element.tagName.toLowerCase() === 'input') {
            return true;
        }
        return false;
    };
    FocusZone.prototype._shouldInputLoseFocus = function (element, isForward) {
        if (element &&
            element.type &&
            ALLOWED_INPUT_TYPES.indexOf(element.type.toLowerCase()) > -1) {
            var selectionStart = element.selectionStart;
            var selectionEnd = element.selectionEnd;
            var isRangeSelected = selectionStart !== selectionEnd;
            var inputValue = element.value;
            // We shouldn't lose focus in the following cases:
            // 1. There is range selected.
            // 2. When selection start is larger than 0 and it is backward.
            // 3. when selection start is not the end of lenght and it is forward.
            if (isRangeSelected ||
                (selectionStart > 0 && !isForward) ||
                (selectionStart !== inputValue.length && isForward)) {
                return false;
            }
        }
        return true;
    };
    return FocusZone;
}(Utilities_1.BaseComponent));
FocusZone.defaultProps = {
    isCircularNavigation: false,
    direction: FocusZone_Props_1.FocusZoneDirection.bidirectional
};
__decorate([
    Utilities_1.autobind
], FocusZone.prototype, "_onFocus", null);
__decorate([
    Utilities_1.autobind
], FocusZone.prototype, "_onMouseDown", null);
__decorate([
    Utilities_1.autobind
], FocusZone.prototype, "_onKeyDown", null);
exports.FocusZone = FocusZone;

//# sourceMappingURL=FocusZone.js.map


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(69));
__export(__webpack_require__(20));

//# sourceMappingURL=index.js.map


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var React = __webpack_require__(0);
var styles = __webpack_require__(72);
/* tslint:enable */
var Icon_Props_1 = __webpack_require__(21);
var Image_1 = __webpack_require__(75);
var Utilities_1 = __webpack_require__(1);
exports.Icon = function (props) {
    var customIcon = props.iconName === 'None';
    var iconClassName = props.iconName ? ('ms-Icon--' + props.iconName) : '';
    if (props.iconType === Icon_Props_1.IconType.image || props.iconType === Icon_Props_1.IconType.Image) {
        var containerClassName = Utilities_1.css('ms-Icon', 'ms-Icon-imageContainer', styles.imageContainer, props.className);
        return (React.createElement("div", { className: containerClassName },
            React.createElement(Image_1.Image, __assign({}, props.imageProps))));
    }
    else {
        var className = Utilities_1.css('ms-Icon', customIcon ? '' : iconClassName, props.className);
        return React.createElement("i", __assign({}, Utilities_1.getNativeProps(props, Utilities_1.htmlElementProperties), { className: className }));
    }
};

//# sourceMappingURL=Icon.js.map


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    imageContainer: 'imageContainer_49bfe443',
};
load_themed_styles_1.loadStyles([{ "rawString": ".imageContainer_49bfe443{overflow:hidden}" }]);
module.exports = styles;
/* tslint:enable */ 

//# sourceMappingURL=Icon.scss.js.map


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(71));
__export(__webpack_require__(21));

//# sourceMappingURL=index.js.map


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The possible methods that can be used to fit the image.
 */
var ImageFit;
(function (ImageFit) {
    /**
     * The image is not scaled. The image is centered and cropped within the content box.
     */
    ImageFit[ImageFit["center"] = 0] = "center";
    /**
     * The image is scaled to maintain its aspect ratio while being fully contained within the frame. The image will
     * be centered horizontally and vertically within the frame. The space in the top and bottom or in the sides of
     * the frame will be empty depending on the difference in aspect ratio between the image and the frame.
     */
    ImageFit[ImageFit["contain"] = 1] = "contain";
    /**
     * The image is scaled to maintain its aspect ratio while filling the frame. Portions of the image will be cropped from
     * the top and bottom, or from the sides, depending on the difference in aspect ratio between the image and the frame.
     */
    ImageFit[ImageFit["cover"] = 2] = "cover";
    /**
     * Neither the image nor the frame are scaled. If their sizes do not match, the image will either be cropped or the
     * frame will have empty space.
     */
    ImageFit[ImageFit["none"] = 3] = "none";
})(ImageFit = exports.ImageFit || (exports.ImageFit = {}));
var ImageLoadState;
(function (ImageLoadState) {
    /**
     * The image has not yet been loaded, and there is no error yet.
     */
    ImageLoadState[ImageLoadState["notLoaded"] = 0] = "notLoaded";
    /**
     * The image has been loaded successfully.
     */
    ImageLoadState[ImageLoadState["loaded"] = 1] = "loaded";
    /**
     * An error has been encountered while loading the image.
     */
    ImageLoadState[ImageLoadState["error"] = 2] = "error";
    /**
     * Deprecated at v1.3.6, to replace the src in case of errors, use onLoadingStateChange instead
     * and rerender the Image with a difference src.
     * @deprecated
     */
    ImageLoadState[ImageLoadState["errorLoaded"] = 3] = "errorLoaded";
})(ImageLoadState = exports.ImageLoadState || (exports.ImageLoadState = {}));

//# sourceMappingURL=Image.Props.js.map


/***/ }),
/* 75 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var React = __webpack_require__(0);
/* tslint:enable:no-unused-variable */
var Utilities_1 = __webpack_require__(1);
var Image_Props_1 = __webpack_require__(74);
var styles = __webpack_require__(76);
var CoverStyle;
(function (CoverStyle) {
    CoverStyle[CoverStyle["landscape"] = 0] = "landscape";
    CoverStyle[CoverStyle["portrait"] = 1] = "portrait";
})(CoverStyle = exports.CoverStyle || (exports.CoverStyle = {}));
exports.CoverStyleMap = (_a = {},
    _a[CoverStyle.landscape] = 'ms-Image-image--landscape ' + styles.imageIsLandscape,
    _a[CoverStyle.portrait] = 'ms-Image-image--portrait ' + styles.imageIsPortrait,
    _a);
exports.ImageFitMap = (_b = {},
    _b[Image_Props_1.ImageFit.center] = 'ms-Image-image--center ' + styles.imageIsCenter,
    _b[Image_Props_1.ImageFit.contain] = 'ms-Image-image--contain ' + styles.imageIsContain,
    _b[Image_Props_1.ImageFit.cover] = 'ms-Image-image--cover ' + styles.imageIsCover,
    _b[Image_Props_1.ImageFit.none] = 'ms-Image-image--none ' + styles.imageIsNone,
    _b);
var KEY_PREFIX = 'fabricImage';
var Image = (function (_super) {
    __extends(Image, _super);
    function Image(props) {
        var _this = _super.call(this, props) || this;
        // Make an initial assumption about the image layout until we can
        // check the rendered element. The value here only takes effect when
        // shouldStartVisible is true.
        _this._coverStyle = CoverStyle.portrait;
        _this.state = {
            loadState: Image_Props_1.ImageLoadState.notLoaded
        };
        return _this;
    }
    Image.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.src !== this.props.src) {
            this.setState({
                loadState: Image_Props_1.ImageLoadState.notLoaded
            });
        }
        else if (this.state.loadState === Image_Props_1.ImageLoadState.loaded) {
            this._computeCoverStyle(nextProps);
        }
    };
    Image.prototype.componentDidUpdate = function (prevProps, prevState) {
        this._checkImageLoaded();
        if (this.props.onLoadingStateChange
            && prevState.loadState !== this.state.loadState) {
            this.props.onLoadingStateChange(this.state.loadState);
        }
    };
    Image.prototype.render = function () {
        var imageProps = Utilities_1.getNativeProps(this.props, Utilities_1.imageProperties, ['width', 'height']);
        var _a = this.props, src = _a.src, alt = _a.alt, width = _a.width, height = _a.height, shouldFadeIn = _a.shouldFadeIn, className = _a.className, imageFit = _a.imageFit, role = _a.role, maximizeFrame = _a.maximizeFrame;
        var loadState = this.state.loadState;
        var coverStyle = this._coverStyle;
        var loaded = loadState === Image_Props_1.ImageLoadState.loaded || (loadState === Image_Props_1.ImageLoadState.notLoaded && this.props.shouldStartVisible);
        // If image dimensions aren't specified, the natural size of the image is used.
        return (React.createElement("div", { className: Utilities_1.css('ms-Image', styles.root, className, (_b = {},
                _b['ms-Image--maximizeFrame ' + styles.rootIsMaximizeFrame] = maximizeFrame,
                _b)), style: { width: width, height: height }, ref: this._resolveRef('_frameElement') },
            React.createElement("img", __assign({}, imageProps, { onLoad: this._onImageLoaded, onError: this._onImageError, key: KEY_PREFIX + this.props.src || '', className: Utilities_1.css('ms-Image-image', styles.image, exports.CoverStyleMap[coverStyle], (imageFit !== undefined) && exports.ImageFitMap[imageFit], (_c = {
                        'is-fadeIn': shouldFadeIn,
                        'is-notLoaded': !loaded
                    },
                    _c['is-loaded ' + styles.imageIsLoaded] = loaded,
                    _c['ms-u-fadeIn400'] = loaded && shouldFadeIn,
                    _c['is-error'] = loadState === Image_Props_1.ImageLoadState.error,
                    _c['ms-Image-image--scaleWidth ' + styles.imageIsScaleWidth] = (imageFit === undefined && !!width && !height),
                    _c['ms-Image-image--scaleHeight ' + styles.imageIsScaleHeight] = (imageFit === undefined && !width && !!height),
                    _c['ms-Image-image--scaleWidthHeight ' + styles.imageIsScaleWidthHeight] = (imageFit === undefined && !!width && !!height),
                    _c)), ref: this._resolveRef('_imageElement'), src: src, alt: alt, role: role }))));
        var _b, _c;
    };
    Image.prototype._onImageLoaded = function (ev) {
        var _a = this.props, src = _a.src, onLoad = _a.onLoad;
        if (onLoad) {
            onLoad(ev);
        }
        this._computeCoverStyle(this.props);
        if (src) {
            this.setState({
                loadState: Image_Props_1.ImageLoadState.loaded
            });
        }
    };
    Image.prototype._checkImageLoaded = function () {
        var src = this.props.src;
        var loadState = this.state.loadState;
        if (loadState === Image_Props_1.ImageLoadState.notLoaded) {
            // testing if naturalWidth and naturalHeight are greater than zero is better than checking
            // .complete, because .complete will also be set to true if the image breaks. However,
            // for some browsers, SVG images do not have a naturalWidth or naturalHeight, so fall back
            // to checking .complete for these images.
            var isLoaded = src && (this._imageElement.naturalWidth > 0 && this._imageElement.naturalHeight > 0) ||
                (this._imageElement.complete && Image._svgRegex.test(src));
            if (isLoaded) {
                this._computeCoverStyle(this.props);
                this.setState({
                    loadState: Image_Props_1.ImageLoadState.loaded
                });
            }
        }
    };
    Image.prototype._computeCoverStyle = function (props) {
        var imageFit = props.imageFit, width = props.width, height = props.height;
        if (imageFit === Image_Props_1.ImageFit.cover || imageFit === Image_Props_1.ImageFit.contain) {
            if (this._imageElement) {
                // Determine the desired ratio using the width and height props.
                // If those props aren't available, measure measure the frame.
                var desiredRatio = void 0;
                if (!!width && !!height) {
                    desiredRatio = width / height;
                }
                else {
                    desiredRatio = this._frameElement.clientWidth / this._frameElement.clientHeight;
                }
                // Examine the source image to determine its original ratio.
                var naturalRatio = this._imageElement.naturalWidth / this._imageElement.naturalHeight;
                // Should we crop from the top or the sides?
                if (naturalRatio > desiredRatio) {
                    this._coverStyle = CoverStyle.landscape;
                }
                else {
                    this._coverStyle = CoverStyle.portrait;
                }
            }
        }
    };
    Image.prototype._onImageError = function (ev) {
        if (this.props.onError) {
            this.props.onError(ev);
        }
        this.setState({
            loadState: Image_Props_1.ImageLoadState.error
        });
    };
    return Image;
}(Utilities_1.BaseComponent));
Image.defaultProps = {
    shouldFadeIn: true
};
Image._svgRegex = /\.svg$/i;
__decorate([
    Utilities_1.autobind
], Image.prototype, "_onImageLoaded", null);
__decorate([
    Utilities_1.autobind
], Image.prototype, "_onImageError", null);
exports.Image = Image;
var _a, _b;

//# sourceMappingURL=Image.js.map


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    root: 'root_d90ca256',
    rootIsMaximizeFrame: 'rootIsMaximizeFrame_d90ca256',
    image: 'image_d90ca256',
    imageIsLoaded: 'imageIsLoaded_d90ca256',
    imageIsCenter: 'imageIsCenter_d90ca256',
    imageIsContain: 'imageIsContain_d90ca256',
    imageIsCover: 'imageIsCover_d90ca256',
    imageIsLandscape: 'imageIsLandscape_d90ca256',
    imageIsPortrait: 'imageIsPortrait_d90ca256',
    imageIsNone: 'imageIsNone_d90ca256',
    imageIsScaleWidthHeight: 'imageIsScaleWidthHeight_d90ca256',
    imageIsScaleWidth: 'imageIsScaleWidth_d90ca256',
    imageIsScaleHeight: 'imageIsScaleHeight_d90ca256',
};
load_themed_styles_1.loadStyles([{ "rawString": ".root_d90ca256{overflow:hidden}.rootIsMaximizeFrame_d90ca256{height:100%;width:100%}.image_d90ca256{display:block;opacity:0}.image_d90ca256.imageIsLoaded_d90ca256{opacity:1}.imageIsCenter_d90ca256,.imageIsContain_d90ca256,.imageIsCover_d90ca256{position:relative;top:50%}html[dir=ltr] .imageIsCenter_d90ca256,html[dir=ltr] .imageIsContain_d90ca256,html[dir=ltr] .imageIsCover_d90ca256{left:50%}html[dir=rtl] .imageIsCenter_d90ca256,html[dir=rtl] .imageIsContain_d90ca256,html[dir=rtl] .imageIsCover_d90ca256{right:50%}html[dir=ltr] .imageIsCenter_d90ca256,html[dir=ltr] .imageIsContain_d90ca256,html[dir=ltr] .imageIsCover_d90ca256{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}html[dir=rtl] .imageIsCenter_d90ca256,html[dir=rtl] .imageIsContain_d90ca256,html[dir=rtl] .imageIsCover_d90ca256{-webkit-transform:translate(50%,-50%);transform:translate(50%,-50%)}.imageIsContain_d90ca256.imageIsLandscape_d90ca256{width:100%;height:auto}.imageIsContain_d90ca256.imageIsPortrait_d90ca256{height:100%;width:auto}.imageIsCover_d90ca256.imageIsLandscape_d90ca256{height:100%;width:auto}.imageIsCover_d90ca256.imageIsPortrait_d90ca256{width:100%;height:auto}.imageIsNone_d90ca256{height:auto;width:auto}.imageIsScaleWidthHeight_d90ca256{height:100%;width:100%}.imageIsScaleWidth_d90ca256{height:auto;width:100%}.imageIsScaleHeight_d90ca256{height:100%;width:auto}" }]);
module.exports = styles;
/* tslint:enable */ 

//# sourceMappingURL=Image.scss.js.map


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
var load_themed_styles_1 = __webpack_require__(2);
var styles = {
    rootIsFixed: 'rootIsFixed_a96b8de4',
    content: 'content_a96b8de4',
};
load_themed_styles_1.loadStyles([{ "rawString": ".rootIsFixed_a96b8de4{position:fixed;z-index:1000000;top:0;left:0;width:100vw;height:100vh;visibility:hidden}.content_a96b8de4{visibility:visible}" }]);
module.exports = styles;
/* tslint:enable */ 

//# sourceMappingURL=Layer.scss.js.map


/***/ }),
/* 78 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
var Layer_1 = __webpack_require__(22);
var LayerHost = (function (_super) {
    __extends(LayerHost, _super);
    function LayerHost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayerHost.prototype.shouldComponentUpdate = function () {
        return false;
    };
    LayerHost.prototype.componentDidMount = function () {
        Layer_1.Layer.notifyHostChanged(this.props.id);
    };
    LayerHost.prototype.componentWillUnmount = function () {
        Layer_1.Layer.notifyHostChanged(this.props.id);
    };
    LayerHost.prototype.render = function () {
        return (React.createElement("div", __assign({}, this.props, { className: Utilities_1.css('ms-LayerHost', this.props.className) })));
    };
    return LayerHost;
}(Utilities_1.BaseComponent));
exports.LayerHost = LayerHost;

//# sourceMappingURL=LayerHost.js.map


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(22));
__export(__webpack_require__(78));

//# sourceMappingURL=index.js.map


/***/ }),
/* 80 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utilities_1 = __webpack_require__(1);
/**
 * This adds accessibility to Dialog and Panel controls
 */
var Popup = (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Popup.prototype.componentWillMount = function () {
        this._originalFocusedElement = Utilities_1.getDocument().activeElement;
    };
    Popup.prototype.componentDidMount = function () {
        this._events.on(this.refs.root, 'focus', this._onFocus, true);
        this._events.on(this.refs.root, 'blur', this._onBlur, true);
        if (Utilities_1.doesElementContainFocus(this.refs.root)) {
            this._containsFocus = true;
        }
    };
    Popup.prototype.componentWillUnmount = function () {
        if (this.props.shouldRestoreFocus &&
            this._originalFocusedElement &&
            this._containsFocus &&
            this._originalFocusedElement !== window) {
            // This slight delay is required so that we can unwind the stack, let react try to mess with focus, and then
            // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
            // to reset the focus back to the thing it thinks should have been focused.
            if (this._originalFocusedElement) {
                this._originalFocusedElement.focus();
            }
        }
    };
    Popup.prototype.render = function () {
        var _a = this.props, role = _a.role, className = _a.className, ariaLabelledBy = _a.ariaLabelledBy, ariaDescribedBy = _a.ariaDescribedBy;
        return (React.createElement("div", __assign({ ref: 'root' }, Utilities_1.getNativeProps(this.props, Utilities_1.divProperties), { className: className, role: role, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, onKeyDown: this._onKeyDown }), this.props.children));
    };
    Popup.prototype._onKeyDown = function (ev) {
        switch (ev.which) {
            case Utilities_1.KeyCodes.escape:
                if (this.props.onDismiss) {
                    this.props.onDismiss(ev);
                    ev.preventDefault();
                    ev.stopPropagation();
                }
                break;
        }
    };
    Popup.prototype._onFocus = function () {
        this._containsFocus = true;
    };
    Popup.prototype._onBlur = function () {
        this._containsFocus = false;
    };
    return Popup;
}(Utilities_1.BaseComponent));
Popup.defaultProps = {
    shouldRestoreFocus: true
};
__decorate([
    Utilities_1.autobind
], Popup.prototype, "_onKeyDown", null);
exports.Popup = Popup;

//# sourceMappingURL=Popup.js.map


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(80));

//# sourceMappingURL=index.js.map


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DirectionalHint_1 = __webpack_require__(3);
var Utilities_1 = __webpack_require__(1);
var RectangleEdge;
(function (RectangleEdge) {
    RectangleEdge[RectangleEdge["top"] = 0] = "top";
    RectangleEdge[RectangleEdge["bottom"] = 1] = "bottom";
    RectangleEdge[RectangleEdge["left"] = 2] = "left";
    RectangleEdge[RectangleEdge["right"] = 3] = "right";
})(RectangleEdge = exports.RectangleEdge || (exports.RectangleEdge = {}));
var SLIDE_ANIMATIONS = (_a = {},
    _a[RectangleEdge.top] = 'slideUpIn20',
    _a[RectangleEdge.bottom] = 'slideDownIn20',
    _a[RectangleEdge.left] = 'slideLeftIn20',
    _a[RectangleEdge.right] = 'slideRightIn20',
    _a);
var PositionData = (function () {
    function PositionData(calloutDirection, targetDirection, calloutPercent, targetPercent, beakPercent, isAuto) {
        this.calloutDirection = calloutDirection;
        this.targetDirection = targetDirection;
        this.calloutPercent = calloutPercent;
        this.targetPercent = targetPercent;
        this.beakPercent = beakPercent;
        this.isAuto = isAuto;
    }
    return PositionData;
}());
exports.PositionData = PositionData;
// Currently the beakPercent is set to 50 for all positions meaning that it should tend to the center of the target
var DirectionalDictionary = (_b = {},
    _b[DirectionalHint_1.DirectionalHint.topLeftEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.top, 0, 0, 50, false),
    _b[DirectionalHint_1.DirectionalHint.topCenter] = new PositionData(RectangleEdge.bottom, RectangleEdge.top, 50, 50, 50, false),
    _b[DirectionalHint_1.DirectionalHint.topRightEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.top, 100, 100, 50, false),
    _b[DirectionalHint_1.DirectionalHint.topAutoEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.top, 0, 0, 50, true),
    _b[DirectionalHint_1.DirectionalHint.bottomLeftEdge] = new PositionData(RectangleEdge.top, RectangleEdge.bottom, 0, 0, 50, false),
    _b[DirectionalHint_1.DirectionalHint.bottomCenter] = new PositionData(RectangleEdge.top, RectangleEdge.bottom, 50, 50, 50, false),
    _b[DirectionalHint_1.DirectionalHint.bottomRightEdge] = new PositionData(RectangleEdge.top, RectangleEdge.bottom, 100, 100, 50, false),
    _b[DirectionalHint_1.DirectionalHint.bottomAutoEdge] = new PositionData(RectangleEdge.top, RectangleEdge.bottom, 0, 0, 50, true),
    _b[DirectionalHint_1.DirectionalHint.leftTopEdge] = new PositionData(RectangleEdge.right, RectangleEdge.left, 0, 0, 50, false),
    _b[DirectionalHint_1.DirectionalHint.leftCenter] = new PositionData(RectangleEdge.right, RectangleEdge.left, 50, 50, 50, false),
    _b[DirectionalHint_1.DirectionalHint.leftBottomEdge] = new PositionData(RectangleEdge.right, RectangleEdge.left, 100, 100, 50, false),
    _b[DirectionalHint_1.DirectionalHint.rightTopEdge] = new PositionData(RectangleEdge.left, RectangleEdge.right, 0, 0, 50, false),
    _b[DirectionalHint_1.DirectionalHint.rightCenter] = new PositionData(RectangleEdge.left, RectangleEdge.right, 50, 50, 50, false),
    _b[DirectionalHint_1.DirectionalHint.rightBottomEdge] = new PositionData(RectangleEdge.left, RectangleEdge.right, 100, 100, 50, false),
    _b);
var CoverDictionary = (_c = {},
    _c[DirectionalHint_1.DirectionalHint.topLeftEdge] = new PositionData(RectangleEdge.top, RectangleEdge.top, 0, 0, 50, false),
    _c[DirectionalHint_1.DirectionalHint.topCenter] = new PositionData(RectangleEdge.top, RectangleEdge.top, 50, 50, 50, false),
    _c[DirectionalHint_1.DirectionalHint.topRightEdge] = new PositionData(RectangleEdge.top, RectangleEdge.top, 100, 100, 50, false),
    _c[DirectionalHint_1.DirectionalHint.topAutoEdge] = new PositionData(RectangleEdge.top, RectangleEdge.top, 0, 0, 50, true),
    _c[DirectionalHint_1.DirectionalHint.bottomLeftEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.bottom, 0, 0, 50, false),
    _c[DirectionalHint_1.DirectionalHint.bottomCenter] = new PositionData(RectangleEdge.bottom, RectangleEdge.bottom, 50, 50, 50, false),
    _c[DirectionalHint_1.DirectionalHint.bottomRightEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.bottom, 100, 100, 50, false),
    _c[DirectionalHint_1.DirectionalHint.bottomAutoEdge] = new PositionData(RectangleEdge.bottom, RectangleEdge.bottom, 0, 0, 50, true),
    _c[DirectionalHint_1.DirectionalHint.leftTopEdge] = new PositionData(RectangleEdge.left, RectangleEdge.left, 0, 0, 50, false),
    _c[DirectionalHint_1.DirectionalHint.leftCenter] = new PositionData(RectangleEdge.left, RectangleEdge.left, 50, 50, 50, false),
    _c[DirectionalHint_1.DirectionalHint.leftBottomEdge] = new PositionData(RectangleEdge.left, RectangleEdge.left, 100, 100, 50, false),
    _c[DirectionalHint_1.DirectionalHint.rightTopEdge] = new PositionData(RectangleEdge.right, RectangleEdge.right, 0, 0, 50, false),
    _c[DirectionalHint_1.DirectionalHint.rightCenter] = new PositionData(RectangleEdge.right, RectangleEdge.right, 50, 50, 50, false),
    _c[DirectionalHint_1.DirectionalHint.rightBottomEdge] = new PositionData(RectangleEdge.right, RectangleEdge.right, 100, 100, 50, false),
    _c);
var OppositeEdgeDictionary = (_d = {},
    _d[RectangleEdge.top] = RectangleEdge.bottom,
    _d[RectangleEdge.bottom] = RectangleEdge.top,
    _d[RectangleEdge.right] = RectangleEdge.left,
    _d[RectangleEdge.left] = RectangleEdge.right,
    _d);
function getRelativePositions(props, hostElement, calloutElement) {
    var beakWidth = !props.isBeakVisible ? 0 : props.beakWidth;
    var borderWidth = positioningFunctions._getBorderSize(calloutElement);
    var gap = positioningFunctions._calculateActualBeakWidthInPixels(beakWidth) / 2 + (props.gapSpace ? props.gapSpace : 0);
    var boundingRect = props.bounds ?
        positioningFunctions._getRectangleFromIRect(props.bounds) :
        new Utilities_1.Rectangle(0, window.innerWidth - Utilities_1.getScrollbarWidth(), 0, window.innerHeight);
    var targetRect = props.target ? positioningFunctions._getTargetRect(boundingRect, props.target) : positioningFunctions._getTargetRectDEPRECATED(boundingRect, props.targetElement, props.creationEvent, props.targetPoint, props.useTargetPoint);
    var positionData = positioningFunctions._getPositionData(props.directionalHint, targetRect, boundingRect, props.coverTarget);
    var positionedCallout = positioningFunctions._positionCalloutWithinBounds(positioningFunctions._getRectangleFromHTMLElement(calloutElement), targetRect, boundingRect, positionData, gap, props.coverTarget, props.directionalHintFixed);
    var beakPositioned = positioningFunctions._positionBeak(beakWidth, positionedCallout, targetRect, borderWidth);
    var finalizedCallout = positioningFunctions._finalizeCalloutPosition(positionedCallout.calloutRectangle, hostElement);
    return {
        calloutPosition: { top: finalizedCallout.top, left: finalizedCallout.left },
        beakPosition: { top: beakPositioned.top, left: beakPositioned.left, display: 'block' },
        directionalClassName: SLIDE_ANIMATIONS[positionedCallout.targetEdge],
        submenuDirection: positionedCallout.calloutEdge === RectangleEdge.right ? DirectionalHint_1.DirectionalHint.leftBottomEdge : DirectionalHint_1.DirectionalHint.rightBottomEdge
    };
}
exports.getRelativePositions = getRelativePositions;
/**
 * Get's the maximum height that a rectangle can have in order to fit below or above a target.
 * If the directional hint specifies a left or right edge (i.e. leftCenter) it will limit the height to the topBorder
 * of the target given.
 * If no bounds are provided then the window is treated as the bounds.
 */
function getMaxHeight(target, targetEdge, gapSpace, bounds) {
    if (gapSpace === void 0) { gapSpace = 0; }
    var mouseTarget = target;
    var elementTarget = target;
    var targetRect;
    var boundingRectangle = bounds ?
        positioningFunctions._getRectangleFromIRect(bounds) :
        new Utilities_1.Rectangle(0, window.innerWidth - Utilities_1.getScrollbarWidth(), 0, window.innerHeight);
    if (mouseTarget.stopPropagation) {
        targetRect = new Utilities_1.Rectangle(mouseTarget.clientX, mouseTarget.clientX, mouseTarget.clientY, mouseTarget.clientY);
    }
    else {
        targetRect = positioningFunctions._getRectangleFromHTMLElement(elementTarget);
    }
    return positioningFunctions._getMaxHeightFromTargetRectangle(targetRect, targetEdge, gapSpace, boundingRectangle);
}
exports.getMaxHeight = getMaxHeight;
var positioningFunctions;
(function (positioningFunctions) {
    /**
     * If max height is less than zero it returns the bounds height instead.
     */
    function _getMaxHeightFromTargetRectangle(targetRectangle, targetEdge, gapSpace, bounds) {
        var maxHeight = 0;
        switch (targetEdge) {
            case DirectionalHint_1.DirectionalHint.bottomAutoEdge:
            case DirectionalHint_1.DirectionalHint.bottomCenter:
            case DirectionalHint_1.DirectionalHint.bottomLeftEdge:
            case DirectionalHint_1.DirectionalHint.bottomRightEdge:
                maxHeight = bounds.bottom - targetRectangle.bottom - gapSpace;
                break;
            case DirectionalHint_1.DirectionalHint.topAutoEdge:
            case DirectionalHint_1.DirectionalHint.topCenter:
            case DirectionalHint_1.DirectionalHint.topLeftEdge:
            case DirectionalHint_1.DirectionalHint.topRightEdge:
                maxHeight = targetRectangle.top - bounds.top - gapSpace;
                break;
            default:
                maxHeight = bounds.bottom - targetRectangle.top - gapSpace;
                break;
        }
        return maxHeight > 0 ? maxHeight : bounds.height;
    }
    positioningFunctions._getMaxHeightFromTargetRectangle = _getMaxHeightFromTargetRectangle;
    function _getTargetRect(bounds, target) {
        var targetRectangle;
        if (target.preventDefault) {
            var ev = target;
            targetRectangle = new Utilities_1.Rectangle(ev.clientX, ev.clientX, ev.clientY, ev.clientY);
        }
        else {
            targetRectangle = _getRectangleFromHTMLElement(target);
        }
        if (!_isRectangleWithinBounds(targetRectangle, bounds)) {
            var outOfBounds = _getOutOfBoundsEdges(targetRectangle, bounds);
            for (var _i = 0, outOfBounds_1 = outOfBounds; _i < outOfBounds_1.length; _i++) {
                var direction = outOfBounds_1[_i];
                targetRectangle[RectangleEdge[direction]] = bounds[RectangleEdge[direction]];
            }
        }
        return targetRectangle;
    }
    positioningFunctions._getTargetRect = _getTargetRect;
    function _getTargetRectDEPRECATED(bounds, targetElement, ev, targetPoint, isTargetPoint) {
        var targetRectangle;
        if (isTargetPoint) {
            if (targetPoint) {
                targetRectangle = new Utilities_1.Rectangle(targetPoint.x, targetPoint.x, targetPoint.y, targetPoint.y);
            }
            else {
                targetRectangle = new Utilities_1.Rectangle(ev.clientX, ev.clientX, ev.clientY, ev.clientY);
            }
        }
        else {
            if (!targetElement) {
                if (ev && ev.target) {
                    targetRectangle = _getRectangleFromHTMLElement(ev.target);
                }
                targetRectangle = new Utilities_1.Rectangle();
            }
            else {
                targetRectangle = _getRectangleFromHTMLElement(targetElement);
            }
        }
        if (!_isRectangleWithinBounds(targetRectangle, bounds)) {
            var outOfBounds = _getOutOfBoundsEdges(targetRectangle, bounds);
            for (var _i = 0, outOfBounds_2 = outOfBounds; _i < outOfBounds_2.length; _i++) {
                var direction = outOfBounds_2[_i];
                targetRectangle[RectangleEdge[direction]] = bounds[RectangleEdge[direction]];
            }
        }
        return targetRectangle;
    }
    positioningFunctions._getTargetRectDEPRECATED = _getTargetRectDEPRECATED;
    function _getRectangleFromHTMLElement(element) {
        var clientRect = element.getBoundingClientRect();
        return new Utilities_1.Rectangle(clientRect.left, clientRect.right, clientRect.top, clientRect.bottom);
    }
    positioningFunctions._getRectangleFromHTMLElement = _getRectangleFromHTMLElement;
    function _positionCalloutWithinBounds(calloutRectangle, targetRectangle, boundingRectangle, directionalInfo, gap, coverTarget, directionalHintFixed) {
        if (gap === void 0) { gap = 0; }
        var estimatedRectangle = _moveRectangleToAnchorRectangle(calloutRectangle, directionalInfo.calloutDirection, directionalInfo.calloutPercent, targetRectangle, directionalInfo.targetDirection, directionalInfo.targetPercent, gap);
        if (_isRectangleWithinBounds(estimatedRectangle, boundingRectangle)) {
            return { calloutRectangle: estimatedRectangle, calloutEdge: directionalInfo.calloutDirection, targetEdge: directionalInfo.targetDirection, alignPercent: directionalInfo.calloutPercent, beakPercent: directionalInfo.beakPercent };
        }
        else {
            return _getBestRectangleFitWithinBounds(estimatedRectangle, targetRectangle, boundingRectangle, directionalInfo, gap, coverTarget, directionalHintFixed);
        }
    }
    positioningFunctions._positionCalloutWithinBounds = _positionCalloutWithinBounds;
    function _getBestRectangleFitWithinBounds(estimatedPosition, targetRectangle, boundingRectangle, directionalInfo, gap, coverTarget, directionalHintFixed) {
        var callout = {
            calloutRectangle: estimatedPosition,
            calloutEdge: directionalInfo.calloutDirection,
            targetEdge: directionalInfo.targetDirection,
            alignPercent: directionalInfo.calloutPercent,
            beakPercent: directionalInfo.beakPercent
        };
        // If it can't possibly fit within the bounds just put it into it's initial position.
        if (!_canRectangleFitWithinBounds(estimatedPosition, boundingRectangle)) {
            return callout;
        }
        if (!coverTarget && !directionalHintFixed) {
            callout = _flipRectangleToFit(callout, targetRectangle, directionalInfo.targetPercent, boundingRectangle, gap);
        }
        var outOfBounds = _getOutOfBoundsEdges(callout.calloutRectangle, boundingRectangle);
        for (var _i = 0, outOfBounds_3 = outOfBounds; _i < outOfBounds_3.length; _i++) {
            var direction = outOfBounds_3[_i];
            callout.calloutRectangle = _alignEdgeToCoordinate(callout.calloutRectangle, boundingRectangle[RectangleEdge[direction]], direction);
            var adjustedPercent = _recalculateMatchingPercents(callout.calloutRectangle, callout.targetEdge, targetRectangle, callout.targetEdge, directionalInfo.targetPercent);
            callout.alignPercent = adjustedPercent;
        }
        return callout;
    }
    positioningFunctions._getBestRectangleFitWithinBounds = _getBestRectangleFitWithinBounds;
    function _positionBeak(beakWidth, callout, targetRectangle, border) {
        var calloutRect = new Utilities_1.Rectangle(0, callout.calloutRectangle.width - border * 2, 0, callout.calloutRectangle.height - border * 2);
        var beakRectangle = new Utilities_1.Rectangle(0, beakWidth, 0, beakWidth);
        var recalculatedPercent = _recalculateMatchingPercents(callout.calloutRectangle, callout.calloutEdge, targetRectangle, callout.targetEdge, callout.beakPercent);
        var estimatedTargetPoint = _getPointOnEdgeFromPercent(calloutRect, callout.calloutEdge, recalculatedPercent);
        return _finalizeBeakPosition(beakRectangle, callout, estimatedTargetPoint, border);
    }
    positioningFunctions._positionBeak = _positionBeak;
    function _finalizeBeakPosition(beakRectangle, callout, estimatedTargetPoint, border) {
        var beakPixelSize = _calculateActualBeakWidthInPixels(beakRectangle.width) / 2;
        var innerRect = null;
        var beakPoint = { x: beakRectangle.width / 2, y: beakRectangle.width / 2 };
        if (callout.calloutEdge === RectangleEdge.bottom || callout.calloutEdge === RectangleEdge.top) {
            innerRect = new Utilities_1.Rectangle(beakPixelSize, callout.calloutRectangle.width - beakPixelSize - border * 2, 0, callout.calloutRectangle.height - border * 2);
        }
        else {
            innerRect = new Utilities_1.Rectangle(0, callout.calloutRectangle.width - border * 2, beakPixelSize, callout.calloutRectangle.height - beakPixelSize - border * 2);
        }
        var finalPoint = _getClosestPointOnEdgeToPoint(innerRect, callout.calloutEdge, estimatedTargetPoint);
        return _movePointOnRectangleToPoint(beakRectangle, beakPoint, finalPoint);
    }
    positioningFunctions._finalizeBeakPosition = _finalizeBeakPosition;
    function _getRectangleFromIRect(rect) {
        return new Utilities_1.Rectangle(rect.left, rect.right, rect.top, rect.bottom);
    }
    positioningFunctions._getRectangleFromIRect = _getRectangleFromIRect;
    function _finalizeCalloutPosition(calloutRectangle, hostElement) {
        var hostRect = _getRectangleFromHTMLElement(hostElement);
        var topPosition = calloutRectangle.top - hostRect.top;
        var leftPosition = calloutRectangle.left - hostRect.left;
        return new Utilities_1.Rectangle(leftPosition, leftPosition + calloutRectangle.width, topPosition, topPosition + calloutRectangle.height);
    }
    positioningFunctions._finalizeCalloutPosition = _finalizeCalloutPosition;
    /**
     * Finds the percent on the recalculateRect that matches the percent on the target rect based on position.
     */
    function _recalculateMatchingPercents(recalculateRect, rectangleEdge, targetRect, targetEdge, targetPercent) {
        var targetPoint = _getPointOnEdgeFromPercent(targetRect, targetEdge, targetPercent);
        var adjustedPoint = _getClosestPointOnEdgeToPoint(recalculateRect, rectangleEdge, targetPoint);
        var adjustedPercent = _getPercentOfEdgeFromPoint(recalculateRect, rectangleEdge, adjustedPoint);
        if (adjustedPercent > 100) {
            adjustedPercent = 100;
        }
        else if (adjustedPercent < 0) {
            adjustedPercent = 0;
        }
        return adjustedPercent;
    }
    positioningFunctions._recalculateMatchingPercents = _recalculateMatchingPercents;
    function _canRectangleFitWithinBounds(rect, boundingRect) {
        if (rect.width > boundingRect.width || rect.height > boundingRect.height) {
            return false;
        }
        return true;
    }
    positioningFunctions._canRectangleFitWithinBounds = _canRectangleFitWithinBounds;
    function _isRectangleWithinBounds(rect, boundingRect) {
        if (rect.top < boundingRect.top) {
            return false;
        }
        if (rect.bottom > boundingRect.bottom) {
            return false;
        }
        if (rect.left < boundingRect.left) {
            return false;
        }
        if (rect.right > boundingRect.right) {
            return false;
        }
        return true;
    }
    positioningFunctions._isRectangleWithinBounds = _isRectangleWithinBounds;
    /**
     * Gets all of the edges of a rectangle that are outside of the given bounds.
     * If there are no out of bounds edges it returns an empty array.
     */
    function _getOutOfBoundsEdges(rect, boundingRect) {
        var outOfBounds = new Array();
        if (rect.top < boundingRect.top) {
            outOfBounds.push(RectangleEdge.top);
        }
        if (rect.bottom > boundingRect.bottom) {
            outOfBounds.push(RectangleEdge.bottom);
        }
        if (rect.left < boundingRect.left) {
            outOfBounds.push(RectangleEdge.left);
        }
        if (rect.right > boundingRect.right) {
            outOfBounds.push(RectangleEdge.right);
        }
        return outOfBounds;
    }
    positioningFunctions._getOutOfBoundsEdges = _getOutOfBoundsEdges;
    /**
     * Returns a point on a edge that is x% of the way down it.
     */
    function _getPointOnEdgeFromPercent(rect, direction, percentOfRect) {
        var startPoint;
        var endPoint;
        switch (direction) {
            case RectangleEdge.top:
                startPoint = { x: rect.left, y: rect.top };
                endPoint = { x: rect.right, y: rect.top };
                break;
            case RectangleEdge.left:
                startPoint = { x: rect.left, y: rect.top };
                endPoint = { x: rect.left, y: rect.bottom };
                break;
            case RectangleEdge.right:
                startPoint = { x: rect.right, y: rect.top };
                endPoint = { x: rect.right, y: rect.bottom };
                break;
            case RectangleEdge.bottom:
                startPoint = { x: rect.left, y: rect.bottom };
                endPoint = { x: rect.right, y: rect.bottom };
                break;
            default:
                startPoint = { x: 0, y: 0 };
                endPoint = { x: 0, y: 0 };
                break;
        }
        return _calculatePointPercentAlongLine(startPoint, endPoint, percentOfRect);
    }
    positioningFunctions._getPointOnEdgeFromPercent = _getPointOnEdgeFromPercent;
    /**
     * Gets the percent down an edge that a point appears.
     */
    function _getPercentOfEdgeFromPoint(rect, direction, valueOnEdge) {
        switch (direction) {
            case RectangleEdge.top:
            case RectangleEdge.bottom:
                return rect.width !== 0 ? (valueOnEdge.x - rect.left) / rect.width * 100 : 100;
            case RectangleEdge.left:
            case RectangleEdge.right:
                return rect.height !== 0 ? (valueOnEdge.y - rect.top) / rect.height * 100 : 100;
        }
    }
    positioningFunctions._getPercentOfEdgeFromPoint = _getPercentOfEdgeFromPoint;
    /**
     * Percent is based on distance from left to right or up to down. 0% would be left most, 100% would be right most.
     */
    function _calculatePointPercentAlongLine(startPoint, endPoint, percent) {
        var x = startPoint.x + ((endPoint.x - startPoint.x) * percent / 100);
        var y = startPoint.y + ((endPoint.y - startPoint.y) * percent / 100);
        return { x: x, y: y };
    }
    positioningFunctions._calculatePointPercentAlongLine = _calculatePointPercentAlongLine;
    function _moveTopLeftOfRectangleToPoint(rect, destination) {
        return new Utilities_1.Rectangle(destination.x, destination.x + rect.width, destination.y, destination.y + rect.height);
    }
    positioningFunctions._moveTopLeftOfRectangleToPoint = _moveTopLeftOfRectangleToPoint;
    /**
     * Aligns the given edge to the target coordinate.
     */
    function _alignEdgeToCoordinate(rect, coordinate, direction) {
        switch (direction) {
            case RectangleEdge.top:
                return _moveTopLeftOfRectangleToPoint(rect, { x: rect.left, y: coordinate });
            case RectangleEdge.bottom:
                return _moveTopLeftOfRectangleToPoint(rect, { x: rect.left, y: coordinate - rect.height });
            case RectangleEdge.left:
                return _moveTopLeftOfRectangleToPoint(rect, { x: coordinate, y: rect.top });
            case RectangleEdge.right:
                return _moveTopLeftOfRectangleToPoint(rect, { x: coordinate - rect.width, y: rect.top });
        }
        return new Utilities_1.Rectangle();
    }
    positioningFunctions._alignEdgeToCoordinate = _alignEdgeToCoordinate;
    /**
     * Moves a point on a given rectangle to the target point. Does not change the rectangles orientation.
     */
    function _movePointOnRectangleToPoint(rect, rectanglePoint, targetPoint) {
        var leftCornerXDifference = rectanglePoint.x - rect.left;
        var leftCornerYDifference = rectanglePoint.y - rect.top;
        return _moveTopLeftOfRectangleToPoint(rect, { x: targetPoint.x - leftCornerXDifference, y: targetPoint.y - leftCornerYDifference });
    }
    positioningFunctions._movePointOnRectangleToPoint = _movePointOnRectangleToPoint;
    /**
     * Moves the given rectangle a certain number of pixels in the given direction;
     */
    function _moveRectangleInDirection(rect, moveDistance, direction) {
        var xModifier = 0;
        var yModifier = 0;
        switch (direction) {
            case RectangleEdge.top:
                yModifier = moveDistance * -1;
                break;
            case RectangleEdge.left:
                xModifier = moveDistance * -1;
                break;
            case RectangleEdge.right:
                xModifier = moveDistance;
                break;
            case RectangleEdge.bottom:
                yModifier = moveDistance;
                break;
        }
        return _moveTopLeftOfRectangleToPoint(rect, { x: rect.left + xModifier, y: rect.top + yModifier });
    }
    positioningFunctions._moveRectangleInDirection = _moveRectangleInDirection;
    /**
     * Moves the given rectangle to an anchor rectangle.
     */
    function _moveRectangleToAnchorRectangle(rect, rectSide, rectPercent, anchorRect, anchorSide, anchorPercent, gap) {
        if (gap === void 0) { gap = 0; }
        var rectTargetPoint = _getPointOnEdgeFromPercent(rect, rectSide, rectPercent);
        var anchorTargetPoint = _getPointOnEdgeFromPercent(anchorRect, anchorSide, anchorPercent);
        var positionedRect = _movePointOnRectangleToPoint(rect, rectTargetPoint, anchorTargetPoint);
        return _moveRectangleInDirection(positionedRect, gap, anchorSide);
    }
    positioningFunctions._moveRectangleToAnchorRectangle = _moveRectangleToAnchorRectangle;
    /**
     * Gets the closet point on an edge to the given point.
     */
    function _getClosestPointOnEdgeToPoint(rect, edge, point) {
        switch (edge) {
            case RectangleEdge.top:
            case RectangleEdge.bottom:
                var x = void 0;
                if (point.x > rect.right) {
                    x = rect.right;
                }
                else if (point.x < rect.left) {
                    x = rect.left;
                }
                else {
                    x = point.x;
                }
                return { x: x, y: rect[RectangleEdge[edge]] };
            case RectangleEdge.left:
            case RectangleEdge.right:
                var y = void 0;
                if (point.y > rect.bottom) {
                    y = rect.bottom;
                }
                else if (point.y < rect.top) {
                    y = rect.top;
                }
                else {
                    y = point.y;
                }
                return { x: rect[RectangleEdge[edge]], y: y };
        }
    }
    positioningFunctions._getClosestPointOnEdgeToPoint = _getClosestPointOnEdgeToPoint;
    // Since the beak is rotated 45 degrees the actual height/width is the length of the diagonal.
    // We still want to position the beak based on it's midpoint which does not change. It will
    // be at (beakwidth / 2, beakwidth / 2)
    function _calculateActualBeakWidthInPixels(beakWidth) {
        return Math.sqrt(beakWidth * beakWidth * 2);
    }
    positioningFunctions._calculateActualBeakWidthInPixels = _calculateActualBeakWidthInPixels;
    function _getBorderSize(element) {
        var styles = getComputedStyle(element, null);
        var topBorder = parseFloat(styles.borderTopWidth);
        var bottomBorder = parseFloat(styles.borderBottomWidth);
        var leftBorder = parseFloat(styles.borderLeftWidth);
        var rightBorder = parseFloat(styles.borderRightWidth);
        // If any of the borders are NaN default to 0
        if (isNaN(topBorder) || isNaN(bottomBorder) || isNaN(leftBorder) || isNaN(rightBorder)) {
            return 0;
        }
        // If all of the borders are the same size, any value;
        if (topBorder === bottomBorder && bottomBorder === leftBorder && leftBorder === rightBorder) {
            return topBorder;
        }
        // If the borders do not agree, return 0
        return 0;
    }
    positioningFunctions._getBorderSize = _getBorderSize;
    function _getPositionData(direction, target, boundingRect, coverTarget) {
        var directionalInfo = coverTarget ? CoverDictionary[direction] : DirectionalDictionary[direction];
        if (directionalInfo.isAuto) {
            var center = _getPointOnEdgeFromPercent(target, directionalInfo.targetDirection, 50);
            if (center.x <= boundingRect.width / 2) {
                directionalInfo.calloutPercent = 0;
                directionalInfo.targetPercent = 0;
            }
            else {
                directionalInfo.calloutPercent = 100;
                directionalInfo.targetPercent = 100;
            }
        }
        return directionalInfo;
    }
    positioningFunctions._getPositionData = _getPositionData;
    function _flipRectangleToFit(callout, targetRect, targetPercent, boundingRect, gap) {
        var directions = [RectangleEdge.left, RectangleEdge.right, RectangleEdge.top, RectangleEdge.bottom];
        var currentEdge = callout.targetEdge;
        // Make a copy to presever the original positioning.
        var positionedCallout = Utilities_1.assign({}, callout);
        // Keep switching sides until one is found with enough space. If all sides don't fit then return the unmodified callout.
        for (var i = 0; i < 4; i++) {
            var outOfBounds = _getOutOfBoundsEdges(positionedCallout.calloutRectangle, boundingRect);
            var index = outOfBounds.indexOf(currentEdge);
            var oppositeEdge = OppositeEdgeDictionary[currentEdge];
            if (index > -1) {
                directions.splice(directions.indexOf(currentEdge), 1);
                currentEdge = directions.indexOf(oppositeEdge) > -1 ? oppositeEdge : directions.slice(-1)[0];
                positionedCallout.calloutEdge = OppositeEdgeDictionary[currentEdge];
                positionedCallout.targetEdge = currentEdge;
                positionedCallout.calloutRectangle = _moveRectangleToAnchorRectangle(positionedCallout.calloutRectangle, positionedCallout.calloutEdge, positionedCallout.alignPercent, targetRect, positionedCallout.targetEdge, targetPercent, gap);
            }
            else {
                return positionedCallout;
            }
        }
        return callout;
    }
    positioningFunctions._flipRectangleToFit = _flipRectangleToFit;
})(positioningFunctions = exports.positioningFunctions || (exports.positioningFunctions = {}));
var _a, _b, _c, _d;

//# sourceMappingURL=positioning.js.map


/***/ }),
/* 83 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 84 */
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
/* 85 */
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
var BandListItem_1 = __webpack_require__(86);
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
/* 86 */
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
            React.createElement("i", { className: "ms-Icon ms-Icon--MusicNote" }),
            " ",
            this.props.Band.Title,
            " - ",
            this.props.Band.Category));
    };
    return BandListItem;
}(React.Component));
exports.default = BandListItem;
//<i className="ms-Icon ms-Icon--MusicNote"></i> 


/***/ }),
/* 87 */
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
var SharePointService_1 = __webpack_require__(23);
var Button_1 = __webpack_require__(45);
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
            React.createElement(Button_1.DefaultButton, { icon: 'Add', text: 'Add Band', type: "button", href: "javascript:void(0)", onClick: this.submit.bind(this) })));
    };
    return NewBand;
}(React.Component));
exports.default = NewBand;


/***/ }),
/* 88 */
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
/* 89 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = $pnp;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(5);
var SharePointData_1 = __webpack_require__(25);
ReactDOM.render(React.createElement(SharePointData_1.default, null), document.getElementById("bandApp"));


/***/ })
/******/ ]);