$(document).ready(function () {
  var data = {
    items: [],
    show: "All"
  };

  var countTmpl = Handlebars.compile("{{leftNr}} " +
    "{{leftWord}} left <br />{{doneNr}} " +
    "{{doneWord}} done");
  Handlebars.registerHelper("countText", function () {
    var leftNr = getItems("Active").length;
    var doneNr = getItems("Completed").length;
    return new Handlebars.SafeString(countTmpl({
      leftNr: leftNr,
      leftWord: leftNr == 1 ? "item" : "items",
      doneNr: doneNr,
      doneWord: doneNr == 1 ? "item" : "items"
    }));
  });

  var src = $("#tmpl").html();
  var tmpl = Handlebars.compile(src);
  var target = $("#tmpl-canvas").html(tmpl(data));

  function getItems(which) {
    if (which == "All") {
      return data.items.slice();
    } else {
      return data.items.filter(function (item) {
        return which == "Active" && !item.done ||
          which == "Completed" && item.done;
      });
    }
  }

  function render() {
    target.html(tmpl({
      items: getItems(data.show),
      show: data.show
    }));
  }

  $("#form").submit(function (e) {
    e.preventDefault();
    data.items.push({
      text: $("#input").val(),
      done: false
    });
    $("#input").val("");
    render();
  });

  $(document.body).on("change", ":checkbox", function (e) {
    var index = $(e.target).data("id");
    var item = data.items[index]
    if (item) {
      item.done = !item.done;
    }
    render();
  });

  $(document.body).on("click", "#selection button", function (e) {
    data.show = $(e.target).text();
    render();
  });

  $(document.body).on("click", "#clear", function (e) {
    data.items = getItems("Active");
    render();
  });
})
