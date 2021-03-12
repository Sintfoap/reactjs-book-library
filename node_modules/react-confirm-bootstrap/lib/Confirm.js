(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'react-bootstrap/lib/Button', 'react-bootstrap/lib/Modal'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('react-bootstrap/lib/Button'), require('react-bootstrap/lib/Modal'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.React, global.PropTypes, global.Button, global.Modal);
        global.Confirm = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _Button, _Modal) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Confirm = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _Button2 = _interopRequireDefault(_Button);

    var _Modal2 = _interopRequireDefault(_Modal);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Confirm = function (_React$Component) {
        _inherits(Confirm, _React$Component);

        function Confirm(props) {
            _classCallCheck(this, Confirm);

            var _this = _possibleConstructorReturn(this, (Confirm.__proto__ || Object.getPrototypeOf(Confirm)).call(this, props));

            _this.state = {
                isOpened: props.visible
            };
            _this.onButtonClick = _this.onButtonClick.bind(_this);
            _this.onClose = _this.onClose.bind(_this);
            _this.onConfirm = _this.onConfirm.bind(_this);
            return _this;
        }

        _createClass(Confirm, [{
            key: 'onButtonClick',
            value: function onButtonClick() {
                // Since the modal is inside the button click events will propagate up.
                if (!this.state.isOpened) {
                    this.setState({
                        isOpened: true
                    });
                }
            }
        }, {
            key: 'onClose',
            value: function onClose(event) {
                if (event) {
                    event.stopPropagation();
                }
                this.setState({
                    isOpened: false
                });

                if (typeof this.props.onClose === 'function') {
                    this.props.onClose();
                }
            }
        }, {
            key: 'onConfirm',
            value: function onConfirm(event) {
                event.stopPropagation();
                this.setState({
                    isOpened: false
                });
                this.props.onConfirm();
            }
        }, {
            key: 'render',
            value: function render() {
                var cancelButton = this.props.showCancelButton ? _react2.default.createElement(
                    _Button2.default,
                    { bsStyle: 'default', onClick: this.onClose },
                    this.props.cancelText
                ) : null;
                var modal = _react2.default.createElement(
                    _Modal2.default,
                    { show: this.state.isOpened, onHide: this.onClose,
                        className: this.props.className, dialogClassName: this.props.dialogClassName,
                        keyboard: this.props.keyboard, backdrop: this.props.backdrop,
                        enforceFocus: this.props.enforceFocus
                    },
                    _react2.default.createElement(
                        _Modal2.default.Header,
                        null,
                        _react2.default.createElement(
                            _Modal2.default.Title,
                            null,
                            this.props.title
                        )
                    ),
                    _react2.default.createElement(
                        _Modal2.default.Body,
                        null,
                        this.props.body
                    ),
                    _react2.default.createElement(
                        _Modal2.default.Footer,
                        null,
                        cancelButton,
                        _react2.default.createElement(
                            _Button2.default,
                            { bsStyle: this.props.confirmBSStyle, onClick: this.onConfirm },
                            this.props.confirmText
                        )
                    )
                );
                var content;
                if (this.props.children) {
                    var btn = _react2.default.Children.only(this.props.children);
                    content = _react2.default.cloneElement(btn, {
                        onClick: this.onButtonClick,
                        style: this.props.style
                    }, btn.props.children, modal);
                } else {
                    content = _react2.default.createElement(
                        _Button2.default,
                        { onClick: this.onButtonClick, style: this.props.style },
                        this.props.buttonText,
                        modal
                    );
                }
                return content;
            }
        }]);

        return Confirm;
    }(_react2.default.Component);

    Confirm.propTypes = {
        body: _propTypes2.default.node.isRequired,
        buttonText: _propTypes2.default.node,
        cancelText: _propTypes2.default.node,
        className: _propTypes2.default.string,
        confirmBSStyle: _propTypes2.default.string,
        confirmText: _propTypes2.default.node,
        dialogClassName: _propTypes2.default.string,
        keyboard: _propTypes2.default.bool,
        backdrop: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
        enforceFocus: _propTypes2.default.bool,
        onConfirm: _propTypes2.default.func.isRequired,
        onClose: _propTypes2.default.func,
        showCancelButton: _propTypes2.default.bool.isRequired,
        title: _propTypes2.default.node.isRequired,
        visible: _propTypes2.default.bool
    };

    Confirm.defaultProps = {
        cancelText: 'Cancel',
        confirmText: 'Confirm',
        confirmBSStyle: 'danger',
        showCancelButton: true
    };

    exports.Confirm = Confirm;
    exports.default = Confirm;
});