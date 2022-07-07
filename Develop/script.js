var main = $(".schedule-block");
var m = moment().format("dddd, MMMM Do, YYYY, h:mm a");
var clickCount = 0;
var initialDiv = undefined;
var i = 0;
var tasksArr = [];

// TIMER
$(".date").text(m);
var currentM = moment().hour();

// $(".half-hours")[1].css("background-color", "yellow"); // jQuery way not working
// $(".half-hours")[1].style.backgroundColor = "red"; // JS way working

// // COLORING BEFORE/DURING/AFTER TIME SLOTS WIH MOMENT.JS.
function colorTimeSlots(hour){

    for(var i = 9; i < 18; i++){ // For as long as the ours in a work day (military time)...
        // Establish the current timeBlock
        var timeBlock = $("section#" + i + "");
        // Access timeBlock id num
        var timeBlockNum = parseInt(timeBlock[0].id);
        // Compare id num to current time num and color accordingly
        if(timeBlockNum < currentM){
            $(timeBlock).addClass("bg-secondary text-light");
        }
        else if(timeBlockNum === currentM){
            $(timeBlock).addClass("bg-success text-light");
        }
        else if(timeBlockNum > currentM){
            $(timeBlock).addClass("bg-warning");
        }
    }
}

function retrieveTasks(){
    // Retrieve localStorage as an array, if any. If not, create a new array
    var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for(var i = 0; i < savedTasks.length; i++){
        // The target block parent is match via time/id nums
        var targetBlockParent = $("section#" + savedTasks[i][1] + "");
        // The first-half-hr time slot is targeted
        var targetBlock = $(targetBlockParent).children().first();
        // THe text is placed in the first-half-hr time slot
        if($(targetBlock.text())){
            $(targetBlock).text(savedTasks[i][0]).attr("class", "half-hour first-half-hr value-true border border-bottom-0 p-2 py-3");
        }
        else{
            $(targetBlock).text(savedTasks[i][0]).attr("class", "half-hour first-half-hr value-true border border-bottom-0 p-2 py-1")
        }
        
    }
}

function saveTasks(task, timeBlockNum){
    // Retrieve localStorage as an array, if any. If not, create a new array
    var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // create an array for task and timeBlock
    var taskAndTime = [task, timeBlockNum];    
    // Push new task to your array
    savedTasks.push(taskAndTime);
    // Then push the updated array to localStorage as a string
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

retrieveTasks();
colorTimeSlots();

// WHEN A TIME BLOCK IS CLICKED...
$("main").on("click", ".first-half-hr", function(e){
    console.log("TARGET: ", e.target);
    // Save the inital empty div
    initialDiv = e.target;
    // Save target with text trim
    var trim = $(e.target).text().trim();
    // Create a input element
    var textInput = $("<input>").val(trim).attr("class", "col-12 input-to-div");
    // Replace div with input for user to type in
    $(initialDiv).replaceWith(textInput);
    // Autofocus on new textInput
    $(textInput).focus();
});

// WHEN AN OFF-CLICK (aka "BLUR") OCCURS...
$("main").on("blur", "input", function(){
    // Trim the input value
    var text = $(this).val().trim();
    // If user inputs nothing...
    if(!$(".input-to-div").val()){
        // Clear text and replace input with div
        $(initialDiv).text("");
        $(this).replaceWith(initialDiv);
        // If there was a value in there previously...
        if($(initialDiv).hasClass("value-true")){
            console.log("value was true. Removing value");
            // Remove the "value-true" class
            $(initialDiv).attr("class", "half-hr first-half-hr border border-bottom-0 px-2 py-3");
            
            var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            var initialDivParent = $(initialDiv).parent().attr("id");
            for(var i = 0; i < savedTasks.length; i++){
                if(initialDivParent === savedTasks[i][1]){
                    console.log("Matching values. Deleting old value");
                    // Remove the item that matched
                    $(savedTasks).splice(i, 1);
                    console.log(savedTasks);
                    debugger;
                    localStorage.setItem
                }
            }
        }
    }
    else{
        // Add the input value to initialDiv
        $(initialDiv).text(text);
        // Replace initial div with 
        $(this).replaceWith(initialDiv);
        // Reassign classes
        if($(initialDiv).hasClass("first-half")){
            $(initialDiv).attr("class", "half-hr first-half-hr value-true border border-bottom-0 px-2 py-1");
        }
        else{
            $(initialDiv).attr("class", "half-hr second-half-hr value-true border px-2 py-1");
        }
    }
    // Save changes

    saveTasks($(initialDiv).text(), $(initialDiv).parent().attr("id"));
});



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