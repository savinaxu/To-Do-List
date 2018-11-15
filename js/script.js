let dosList = ["Study jQuery UI", "Celebrate Nil's Birthday", "Solve 10 Problems from LeetC"];

$(document).ready(function() {
  renderDosList()
  setupInput()
});

function setupInput() {
  $(".material-icons").click(function() {
    addNewDos($("#add-dos").val())
  });

  $("#add-dos").keypress(function(event) {
    if (event.which === 13) {
      addNewDos($("#add-dos").val())
    }
  });
}

// for fullcalendar gets draggable events
function initDosDraggable() {
  $("#dos-list .dos-list-item").each(function() {
    $(this).data("event", {
      title: $.trim($(this).text()),
      stick: true
    });

    $(this).draggable({
      zIndex: 999,
      revert: true,
      revertDuration: 0
    });
  });
}

function renderDosList() {
  $("#dos-list").empty() // make sure there is no hidden completed li
  for (let element of dosList) {
    $("#dos-list").append("<li class='dos-list-item'>" + element + "</li>");
  }
  initDosDraggable()
}

function addNewDos(dosInput) {
  if (dosInput !== "" && !dosList.includes(dosInput)) {
    dosList.push(dosInput)
    renderDosList()
    $("#add-dos").val("");
    initDosDraggable()
  }
}

$("#dos-list").on("click", ".dos-list-item", function() {
  $(this).toggleClass("completed").fadeOut("slow");
});

/*
	------- initialize the calendar -------
*/
$(function() {
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,list'
    },
    editable: true,
    droppable: true,
    dragRevertDuration: 0,

    eventDragStop: function(event, jsEvent, ui, view) {
      if (isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
        $('#calendar').fullCalendar('removeEvents', event._id);
        addNewDos(event.title)
        initDosDraggable()
      }
    }
  });

  let isEventOverDiv = function(x, y) {
    let dos_list = $('#dos-list');
    let offset = dos_list.offset();
    offset.right = dos_list.width() + offset.left;
    offset.bottom = dos_list.height() + offset.top;

    if (x >= offset.left &&
      y >= offset.top &&
      x <= offset.right &&
      y <= offset.bottom) {
      return true;
    }
    return false;
  }
});
