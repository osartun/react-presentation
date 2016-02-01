"use strict";

var Pagination = React.createClass({
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

var TodoList = React.createClass({
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
    if (props.items != this.props.items) {
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

var TodoFilters = React.createClass({
  displayName: "TodoFilters",

  getDefaultProps: function getDefaultProps() {
    return {
      filters: {
        "all": "All",
        "active": "Active",
        "completed": "Completed"
      },
      filter: "all",
      onFilterChange: function onFilterChange() {}
    };
  },
  clickHandler: function clickHandler(e) {
    if (e.target.value in this.props.filters) {
      this.props.onFilterChange(e.target.value);
    }
  },
  render: function render() {
    var _this2 = this;

    var filters = this.props.filters;
    return React.createElement(
      "div",
      { className: "todo-filers filter-" + this.props.filter },
      Object.keys(filters).map(function (filter) {
        var text = filters[filter];
        return React.createElement(
          "button",
          {
            key: "filter-" + filter,
            value: filter,
            className: "btn-filter btn-filter-" + filter,
            onClick: _this2.clickHandler },
          text
        );
      })
    );
  }
});

var TodoApp = React.createClass({
  displayName: "TodoApp",

  getInitialState: function getInitialState() {
    return {
      items: this.props.items || [],
      inputText: "",
      filter: "all"
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(props) {
    if (props.items && props.items.length) {
      this.setState({
        items: this.state.items.concat(props.items)
      });
    }
  },
  submitHandler: function submitHandler(e) {
    e.preventDefault();
    this.createTodo(this.state.inputText, false);
    this.setState({
      inputText: ""
    });
  },
  inputHandler: function inputHandler(e) {
    this.setState({
      inputText: e.target.value
    });
  },
  doneHandler: function doneHandler(index) {
    var items = this.state.items.slice();
    items[index].done = !items[index].done;
    this.setState({
      items: items
    });
  },
  filterHandler: function filterHandler(filter) {
    this.setState({
      filter: filter
    });
  },
  createTodo: function createTodo(todoText, done) {
    var items = this.state.items.slice();
    items.push({
      text: todoText,
      done: !!done
    });
    this.setState({
      items: items
    });
  },
  getItems: function getItems(filter) {
    if (filter == "active" || filter == "completed") {
      return this.state.items.filter(function (item, i) {
        return filter == "active" && !item.done || filter == "completed" && item.done;
      });
    }
    return this.state.items;
  },
  clearDone: function clearDone() {
    this.setState({
      items: this.getItems("active")
    });
  },
  render: function render() {
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
        React.createElement("input", { value: this.state.inputText,
          onChange: this.inputHandler }),
        React.createElement("input", { type: "submit" })
      ),
      React.createElement(TodoList, {
        pagination: true,
        items: this.getItems(this.state.filter),
        onChange: this.doneHandler }),
      React.createElement(
        "span",
        { className: "todo-count" },
        this.getItems("active").length,
        " items left ",
        React.createElement("br", null),
        this.getItems("completed").length,
        " items done"
      ),
      React.createElement(TodoFilters, {
        filter: this.state.filter,
        onFilterChange: this.filterHandler }),
      React.createElement(
        "button",
        { onClick: this.clearDone },
        "Clear completed"
      )
    );
  }
});

var initialTodos = [{
  "text": "My Todo",
  "done": true
}, {
  "text": "Next Todo",
  "done": false
}, {
  "text": "Walk the dog",
  "done": true
}, {
  "text": "Take out garbage",
  "done": true
}, {
  "text": "More Todos",
  "done": false
}, {
  "text": "ABC",
  "done": false
}];
ReactDOM.render(React.createElement(TodoApp, { items: initialTodos }), document.body);