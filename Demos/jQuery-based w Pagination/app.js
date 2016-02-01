$(document).ready(function () {
  var input = $("#input");
  var currentPage = 0;
  var maxItemsPerPage = 5;
  $("#form").on("submit", function (e) {
    e.preventDefault();
    $("#list").append("<li><input type='checkbox' />" +
      input.val() + "</li>");
    input.val("");
    updateItemCount();
    updatePage();
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
    updatePage(true);
  });
  $("button#clear").click(function (e) {
    $("li.done").remove();
    updateItemCount();
    updatePage(true);
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

  function updatePage(reset) {
    if (reset) {
      currentPage = 0;
    }
    var li = $("li"),
    start = currentPage * maxItemsPerPage,
    end = Math.min(start + maxItemsPerPage, li.length),
    pageTotal = Math.ceil(li.length / maxItemsPerPage)|0;

    li.hide().slice(start, end).show();

    $("#prev")
    .attr("disabled", currentPage === 0);
    $("#next")
    .attr("disabled", pageTotal - 1 === currentPage);
    $("#page-count")
    .text((currentPage + 1) + " / " + pageTotal);
  }
  updatePage();

  $("#prev, #next").click(function (e) {
    if ($(this).attr("disabled")) return;
    if ($(this).attr("id") === "prev") {
      currentPage--;
    } else {
      currentPage++;
    }
    updatePage();
  });
});
