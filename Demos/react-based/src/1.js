var TodoList = React.createClass({
  getDefaultProps: function () {
    return {
      items: [],
      onChange: function () {}
    };
  },
  changeHandler: function (index) {
    this.props.onChange(index);
  },
  render: function () {
    return (
      <ul>
        {this.props.items.map((item, i) => {
          return <li key={"todo" + i} className={item.done ? "done" : ""}>
            <input type="checkbox" onChange={this.changeHandler.bind(this, i)} />
              {item.text}
            </li>;
        })}
      </ul>
    );
  }
});

var TodoApp = React.createClass({
  getInitialState: function () {
    return {
      items: [],
      inputText: ""
    };
  },
  inputHandler: function (e) {
    this.setState({
      inputText: e.target.value
    });
  },
  submitHandler: function (e) {
    e.preventDefault();
    this.createTodo(this.state.inputText, false);
    this.setState({
      inputText: ""
    });
  },
  doneHandler: function (index) {
    var items = this.state.items.slice();
    items[index].done = !items[index].done;
    this.setState({
      items: items
    });
  },
  createTodo: function (text, done) {
    var items = this.state.items.slice();
    items.push({
      text: text,
      done: done
    });
    this.setState({
      items: items
    });
  },
  render: function () {
    console.log(this.state);
    return (
      <div className="todo-app">
        <h1>TODO List</h1>
        <form onSubmit={this.submitHandler}>
          <input value={this.state.inputText} onChange={this.inputHandler} />
          <input type="submit" />
        </form>
        <TodoList items={this.state.items} onChange={this.doneHandler} />
      </div>
    );
  }
});

ReactDOM.render(
  <TodoApp />,
  document.body
);
