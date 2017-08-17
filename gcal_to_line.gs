var lineToken = "my token";
var notifyAPI = "notifyapi";

function getSchedule() {
  var calendars = CalendarApp.getAllCalendars();
  var schedules = Utilities.formatDate(new Date(), 'JST', 'yyyy/MM/dd') + "\n";

  for(i in calendars) {
    var myCal = calendars[i];
    var events = myCal.getEventsForDay(new Date());

    if( events.length > 0 ) {
      schedules +=  myCal.getName() + "\n";
    }

    for(j in events) {
      var event = events[j];
      var title = event.getTitle();
      var start = toTime(event.getStartTime());
      var end = toTime(event.getEndTime());
      schedules += start + ' - ' + end + " " + title;
    }

    if( events.length > 0 ) {
      schedules += "\n";
    }
  }

  sendToLine(schedules);
}

function sendToLine(text){
  var token = lineToken;
  var options =
   {
     "method"  : "post",
     "payload" : "message=" + text,
     "headers" : {"Authorization" : "Bearer "+ token}

   };
   UrlFetchApp.fetch(notifyAPI, options);
}

function toTime(str){
  return Utilities.formatDate(str, 'JST', 'HH:mm');
}