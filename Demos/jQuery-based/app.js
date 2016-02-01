$(document).ready(function () {
  var input = $("#input")
  $("#form").on("submit", function (e) {
    e.preventDefault();
    $("#list").append("<li><input type='checkbox' />" +
      input.val() + "</li>");
    input.val("");
    updateItemCount();
  });
  $(document.body).on("change", ":checkbox", function (e) {
    var li = $(e.target).parent();
    if (li.hasClass("done")) {
      li.removeClass("done");
    } else {
      li.addClass("done");
    }
    updateItemCount();
  });
  $("#selection").click(function (e) {
    var listItems = $("li").hide();
    var what = $(e.target).text();
    switch (what) {
      case "All":
        listItems.show();
        break;
      case "Active":
        listItems.not(".done").show();
        break;
      case "Completed":
        listItems.filter(".done").show();
        break;
    }
  });
  $("button#clear").click(function (e) {
    $("li.done").remove();
    updateItemCount();
  });
  function updateItemCount () {
    var countDone = $("li.done").length;
    var countLeft = $("li:not(.done)").length;
    var textDone = countDone +
      (countDone == 1 ? " item" : " items") + " done";
    var textLeft = countLeft +
      (countLeft == 1 ? " item" : " items") + " left";
    $("#count").html(textLeft + "<br />" + textDone);
  }
  updateItemCount();
});
