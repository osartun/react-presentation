"use strict";

var TodoList = React.createClass({
  displayName: "TodoList",

  getDefaultProps: function getDefaultProps() {
    return {
      items: [],
      onChange: function onChange() {}
    };
  },
  changeHandler: function changeHandler(index) {
    this.props.onChange(index);
  },
  render: function render() {
    var _this = this;

    return React.createElement(
      "ul",
      null,
      this.props.items.map(function (item, i) {
        return React.createElement(
          "li",
          { key: "todo" + i, className: item.done ? "done" : "" },
          React.createElement("input", { type: "checkbox", onChange: _this.changeHandler.bind(_this, i) }),
          item.text
        );
      })
    );
  }
});

var TodoApp = React.createClass({
  displayName: "TodoApp",

  getInitialState: function getInitialState() {
    return {
      items: [],
      inputText: ""
    };
  },
  inputHandler: function inputHandler(e) {
    this.setState({
      inputText: e.target.value
    });
  },
  submitHandler: function submitHandler(e) {
    e.preventDefault();
    this.createTodo(this.state.inputText, false);
    this.setState({
      inputText: ""
    });
  },
  doneHandler: function doneHandler(index) {
    var items = this.state.items.slice();
    items[index].done = !items[index].done;
    this.setState({
      items: items
    });
  },
  createTodo: function createTodo(text, done) {
    var items = this.state.items.slice();
    items.push({
      text: text,
      done: done
    });
    this.setState({
      items: items
    });
  },
  render: function render() {
    console.log(this.state);
    return React.createElement(
      "div",
      { className: "todo-app" },
      React.createElement(
        "h1",
        null,
        "TODO List"
      ),
      React.createElement(
        "form",
        { onSubmit: this.submitHandler },
        React.createElement("input", { value: this.state.inputText, onChange: this.inputHandler }),
        React.createElement("input", { type: "submit" })
      ),
      React.createElement(TodoList, { items: this.state.items, onChange: this.doneHandler })
    );
  }
});

ReactDOM.render(React.createElement(TodoApp, null), document.body);