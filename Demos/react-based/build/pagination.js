"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Pagination = exports.Pagination = React.createClass({
  displayName: "Pagination",

  getDefaultProps: function getDefaultProps() {
    return {
      labelPrev: "prev",
      labelNext: "next",
      current: 0,
      total: 0,
      onBrowse: function onBrowse() {}
    };
  },
  clickHandler: function clickHandler(direction) {
    var requestedPage = this.props.current + direction;
    if (requestedPage >= 0 && requestedPage <= this.props.total) {
      this.props.onBrowse(requestedPage);
    }
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "pagination" },
      React.createElement(
        "button",
        {
          disabled: this.props.current === 0,
          onClick: this.clickHandler.bind(this, -1) },
        this.props.labelPrev
      ),
      this.props.current + 1,
      " / ",
      this.props.total || 1,
      React.createElement(
        "button",
        {
          disabled: this.props.current + 1 === this.props.total,
          onClick: this.clickHandler.bind(this, 1) },
        this.props.labelNext
      )
    );
  }
});