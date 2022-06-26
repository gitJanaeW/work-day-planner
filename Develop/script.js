var main = $(".schedule-block");

var rowDiv = $("div").addClass("row").append(main);


var m = moment(date, "LLL").format("dddd, MMMM Do YYYY");
console.log(m);


$(".date").text() = m;
