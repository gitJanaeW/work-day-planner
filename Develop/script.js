var main = $(".schedule-block");
var m = moment().format("dddd, MMMM Do, YYYY");
var clickCount = 0;
var startTime = undefined;
var endTime = undefined;
console.log(m);

$(".date").text(m);


// Event delegation
// $("main").on("click", ".first-half-hr, .second-half-hr", function(e){
//     console.log(e.target);
//     var trim = $(e.target).text().trim();
//     var textInput = $("<input>").val(trim).attr("class", "col-12").trigger("focus");
//     $(e.target).replaceWith(textInput);
// });

function setTimeSpan(){}
$("main").on("click", ".first-half-hr, .second-half-hr", function(e){
    var targetEl = $(e.target);
    var trim = $(targetEl).text().trim();
    var textInput = $("<p>").val(trim).attr("class", "m-0, py-0").text("Select an end-time");
    targetEl.attr("class", "bg-success text-light").append(textInput).removeClass("py-3");
    clickCount++;
    console.log(targetEl);
    if(clickCount === 1){
        startTime = targetEl;
    }
    else if(clickCount === 2){
        endTime = targetEl;
        showModal();
    }
});

function showModal(){
    // On click, show modal
    $(".modal-btn").click(function(){
        $(".modal").modal("show");
    });
}