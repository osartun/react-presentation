var Pagination = React.createClass({
  getDefaultProps: function () {
    return {
      labelPrev: "prev",
      labelNext: "next",
      current: 0,
      total: 0,
      onBrowse: function () {}
    };
  },
  clickHandler: function (direction) {
    var requestedPage = this.props.current + direction;
    if (requestedPage >= 0 && requestedPage <= this.props.total) {
      this.props.onBrowse(requestedPage);
    }
  },
  render: function () {
    return (
      <div className="pagination">
        <button
          disabled={this.props.current === 0}
          onClick={this.clickHandler.bind(this, -1)}>
          {this.props.labelPrev}
        </button>
        {this.props.current + 1} / {this.props.total || 1}
        <button
          disabled={this.props.current + 1 === this.props.total}
          onClick={this.clickHandler.bind(this, 1)}>
          {this.props.labelNext}
        </button>
      </div>
    );
  }
});

var TodoList = React.createClass({
  getInitialState: function () {
    return {
      currentPage: 0
    };
  },
  getDefaultProps: function () {
    return {
      pagination: false,
      maxItemsPerPage: 5,
      items: [],
      onChange: function () {}
    };
  },
  componentWillReceiveProps: function (props) {
    if (props.items != this.props.items) {
      this.setState({
        currentPage: 0
      });
    }
  },
  changeHandler: function (index) {
    var listId = index + this.state.currentPage * this.props.maxItemsPerPage;
    this.props.onChange(listId);
  },
  browseHandler: function (pageIndex) {
    this.setState({
      currentPage: pageIndex
    });
  },
  getItems: function () {
    if (this.props.pagination &&
      this.props.items.length > this.props.maxItemsPerPage) {
      var start = this.state.currentPage * this.props.maxItemsPerPage;
      var end = start + this.props.maxItemsPerPage;
      return this.props.items.slice(start, end);
    }
    return this.props.items;
  },
  render: function () {
    return (
      <div>
        <ul className="todo-list">
          {this.getItems().map((item, i) => {
            return (
              <li key={"todo-" + i}
                className={item.done ? "done" : "not-done"}>
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={this.changeHandler.bind(this, i)} />
                {item.text}
              </li>
            );
          })}
        </ul>
        {this.props.pagination ? (
          <Pagination
            current={this.state.currentPage}
            total={Math.ceil(this.props.items.length / this.props.maxItemsPerPage)}
            onBrowse={this.browseHandler} />
        ) : ""}
      </div>
    );
  }
});

var TodoFilters = React.createClass({
  getDefaultProps: function () {
    return {
      filters: {
        "all": "All",
        "active": "Active",
        "completed": "Completed"
      },
      filter: "all",
      onFilterChange: function () {}
    };
  },
  clickHandler: function (e) {
    if (e.target.value in this.props.filters) {
      this.props.onFilterChange(e.target.value);
    }
  },
  render: function () {
    var filters = this.props.filters;
    return (
      <div className={"todo-filers filter-" + this.props.filter}>
        {Object.keys(filters).map((filter) => {
          var text = filters[filter];
          return (
            <button
              key={"filter-" + filter}
              value={filter}
              className={"btn-filter btn-filter-" + filter}
              onClick={this.clickHandler}>
              {text}
            </button>
          );
        })}
      </div>
    );
  }
});

var TodoApp = React.createClass({
  getInitialState: function () {
    return {
      items: this.props.items || [],
      inputText: "",
      filter: "all"
    };
  },
  componentWillReceiveProps: function (props) {
    if (props.items && props.items.length) {
      this.setState({
        items: this.state.items.concat(props.items)
      });
    }
  },
  submitHandler: function (e) {
    e.preventDefault();
    this.createTodo(this.state.inputText, false);
    this.setState({
      inputText: ""
    });
  },
  inputHandler: function (e) {
    this.setState({
      inputText: e.target.value
    });
  },
  doneHandler: function (index) {
    var items = this.state.items.slice();
    items[index].done = !items[index].done;
    this.setState({
      items: items
    });
  },
  filterHandler: function (filter) {
    this.setState({
      filter: filter
    });
  },
  createTodo: function (todoText, done) {
    var items = this.state.items.slice();
    items.push({
      text: todoText,
      done: !!done
    });
    this.setState({
      items: items
    });
  },
  getItems: function (filter) {
    if (filter == "active" || filter == "completed") {
      return this.state.items.filter((item, i) => {
        return filter == "active" && !item.done ||
          filter == "completed" && item.done;
      });
    }
    return this.state.items;
  },
  clearDone: function () {
    this.setState({
      items: this.getItems("active")
    });
  },
  render: function () {
    return (
      <div className="todo-app">
        <h1>TODO List</h1>
        <form onSubmit={this.submitHandler}>
          <input value={this.state.inputText}
            onChange={this.inputHandler} />
          <input type="submit" />
        </form>
        <TodoList
          pagination={true}
          items={this.getItems(this.state.filter)}
          onChange={this.doneHandler} />
        <span className="todo-count">
          {this.getItems("active").length} items left <br />
          {this.getItems("completed").length} items done
        </span>
        <TodoFilters
          filter={this.state.filter}
          onFilterChange={this.filterHandler} />
        <button onClick={this.clearDone}>
          Clear completed
        </button>
      </div>
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
ReactDOM.render(
  <TodoApp items={initialTodos} />,
  document.body
);
