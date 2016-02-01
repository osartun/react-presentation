"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TodoList = exports.TodoList = React.createClass({
  displayName: "TodoList",

  getInitialState: function getInitialState() {
    return {
      currentPage: 0
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      pagination: false,
      maxItemsPerPage: 5,
      items: [],
      onChange: function onChange() {}
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(props) {
    if (props.items && props.items.length < this.props.items.length) {
      this.setState({
        currentPage: 0
      });
    }
  },
  changeHandler: function changeHandler(index) {
    var listId = index + this.state.currentPage * this.props.maxItemsPerPage;
    this.props.onChange(listId);
  },
  browseHandler: function browseHandler(pageIndex) {
    this.setState({
      currentPage: pageIndex
    });
  },
  getItems: function getItems() {
    if (this.props.pagination && this.props.items.length > this.props.maxItemsPerPage) {
      var start = this.state.currentPage * this.props.maxItemsPerPage;
      var end = start + this.props.maxItemsPerPage;
      return this.props.items.slice(start, end);
    }
    return this.props.items;
  },
  render: function render() {
    var _this = this;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "ul",
        { className: "todo-list" },
        this.getItems().map(function (item, i) {
          return React.createElement(
            "li",
            { key: "todo-" + i,
              className: item.done ? "done" : "not-done" },
            React.createElement("input", {
              type: "checkbox",
              checked: item.done,
              onChange: _this.changeHandler.bind(_this, i) }),
            item.text
          );
        })
      ),
      this.props.pagination ? React.createElement(Pagination, {
        current: this.state.currentPage,
        total: Math.ceil(this.props.items.length / this.props.maxItemsPerPage),
        onBrowse: this.browseHandler }) : ""
    );
  }
});