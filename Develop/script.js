// NOTES:
// Click and blur both don't seem to be working
// Struggling with moment.js time blocks

var main = $(".schedule-block");
var m = moment().format("dddd, MMMM Do, YYYY, h:mm a");
var clickCount = 0;
var initialDiv = undefined;

// TIMER
$(".date").text(m);
moment().hour

// WHEN A TIME BLOCK IS CLICKED...
$("main").on("click", ".first-half-hr, .second-half-hr", function(e){
    console.log(e.target);
    // Save the inital empty div
    initialDiv = e.target;
    // Save target with text trim
    var trim = $(e.target).text().trim();
    // Create a input element
    var textInput = $("<input>").val(trim).attr("class", "col-12 input-to-div").trigger("focus");
    // Replace div with input for user to type in
    $(e.target).replaceWith(textInput);
});

// WHEN AN OFF-CLICK (aka "BLUR") OCCURS...
$("main").on("blur", "input", function(){
    console.log("It works");
    // If user inputs nothing...
    if(!$(this).val()){
        $(this).replaceWith(initialDiv);
        return;
    }
    else{
        // Trim the input value
        var text = $(this).val().trim();
        // Add the input value to initialDiv
        $(initialDiv).text(text);
        console.log("initialDiv", initialDiv);
        // Replace initial div with 
        $(this).replaceWith(initialDiv);
        // Reassign classes
        if($(initialDiv).hasClass("first-half")){
            $(initialDiv).attr("class", "half-hr first-half-hr border border-bottom-0 px-2 py-1");
        }
        else{
            $(initialDiv).attr("class", "half-hr second-half-hr border px-2 py-1");
        }
    }
        
    // Color before/during/after time slots with Moment.js
    timeBlock = $(e.target).parent().dataset("time");
    colorTimeSlots(e.target);
});

// COLORING BEFORE/DURING/AFTER TIME SLOTS WIH MOMENT.JS.
function colorTimeSlots(timeBlock){
    debugger;
    timeBlock = timeBlock.parent().dataset("time");
    // If the time block has been passed
    if(timeBlock < moment().hour()){
        console.log("before");
    }// If the time block is active
    else if(timeBlock === moment().hour()){
        console.log("during");
    }// If the time block has not been passed
    else{
        console.log("after");
    }

}







//  E X T R A   F E A T U R E S //
// SET TIME SPAN WITH TWO CLICKS
// function setTimeSpan(){}
// $("main").on("click", ".first-half-hr, .second-half-hr", function(e){
//     if(clickCount > 2){
//         return;
//     }
//     var targetEl = $(e.target);
//     var trim = $(targetEl).text().trim();
//     var textInput = $("<p>").val(trim).attr("class", "mb-0, py-2 pl-1");
//     clickCount++;
//     if(clickCount === 1){
//         textInput.text("Select an end-time");
//         startTime = targetEl;
//     }
//     else if(clickCount === 2){
//         textInput.text("Title the event");
//         endTime = targetEl;
//         targetTimeRange();
//     }
//     targetEl.attr("class", "bg-success text-light").append(textInput).removeClass("py-3");
// });


// COLOR IN INBETWEEN HOURS OF TIME RANGE
// function targetTimeRange(){
//     // target time range 
//     var startTimeHrNum = startTime.parent().data("time");
//     var endTimeHrNum = endTime.parent().data("time");
//     var hourCounter = startTimeHrNum + 1;
//     var hourBlock = $(".half-hours");
//     var hourBlockNum = parseInt(hourBlock[startTimeHrNum + 1].dataset.time);    

//     hourBlock.each(function(){
//         if($(this).data("time") > startTimeHrNum && $(this).data("time") < endTimeHrNum){
//             // color in between hours
//             debugger;
//             $(this).addClass("class", "bg-success");
//             console.log("worked")
//             hourCounter++;
//         }
//     });

    // while(hourBlock > startTimeHrNum && hourBlock < endTimeHrNum){
    //     // color the hrs between start & end times
    //     var hoursBetween = $(".half-hours")[hourCounter];
    //     hoursBetween.addClass("class", "bg-success");
    //     console.log("worked")
    //     hourCounter++;
    // }

//     hourCounter = 0;
// }

// MODAL FOR MORE OPTIONS
// function showModal(){
//     // On click, show modal
//     $(".modal-btn").click(function(){
//         $(".modal").modal("show");
//     });
// }