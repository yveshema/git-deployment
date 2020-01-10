"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ContactForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ContactForm, _React$Component);

  function ContactForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ContactForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ContactForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (e) {
      e.preventDefault();
      var email = document.getElementById('email').value;
      var message = document.getElementById('message').value;
      axios({
        method: "POST",
        url: "/send",
        data: {
          email: email,
          message: message
        }
      }).then(function (response) {
        if (response.data.msg === 'success') {
          _this.displayFeedback(true);

          _this.resetForm();
        } else if (response.data.msg === 'fail') {
          _this.displayFeedback(false);

          console.log('Message failed to send.');
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "displayFeedback", function (value) {
      var feedbackWrapper = document.getElementById('form-feedback');
      var feedback = '';

      if (value) {
        feedback = 'Thank you for your message!';
        feedbackWrapper.classList.add('form-success');
      } else {
        feedback = 'Oops! Looks like something went wrong. Please try again later.';
        feedbackWrapper.classList.add('form-error');
      }

      feedbackWrapper.innerHTML = feedback;
    });

    _defineProperty(_assertThisInitialized(_this), "resetForm", function () {
      return document.getElementById('contact-form').reset();
    });

    return _this;
  }

  _createClass(ContactForm, [{
    key: "render",
    value: function render() {
      return React.createElement("form", {
        id: "contact-form",
        onSubmit: this.handleSubmit,
        method: "POST"
      }, React.createElement("div", {
        id: "form-feedback"
      }), React.createElement("div", {
        className: "input-field"
      }, React.createElement("i", {
        className: "material-icons prefix"
      }, "email"), React.createElement("input", {
        type: "email",
        id: "email",
        required: true
      }), React.createElement("label", {
        htmlFor: "email"
      }, "Your Email")), React.createElement("div", {
        className: "input-field"
      }, React.createElement("i", {
        className: "material-icons prefix"
      }, "message"), React.createElement("textarea", {
        name: "message",
        id: "message",
        className: "materialize-textarea",
        required: true
      }), React.createElement("label", {
        htmlFor: "message"
      }, "Your message")), React.createElement("div", {
        className: "input-field center"
      }, React.createElement("button", {
        className: "btn"
      }, "Submit")));
    }
  }]);

  return ContactForm;
}(React.Component);

ReactDOM.render(React.createElement(ContactForm, null), document.getElementById('contact-root'));