//defining variables
var testValues = [{row: ["k3tog","k2tog","p2tog","yo","rs","yo","k2tog","k","k","ns","ssk","ssp","p2tog","re","k2tog","yo","sk2p","yo"], inst: "Green blue stuff"},{row: ["k","k","yo","k","rs","yo","k","k","k","k","k","k","yo","re","k2tog","yo","k2tog","yo"], inst: "stuff"},{row: ["k","k","k","k","rs","yo","k2tog","k","k","k","k","k","yo","re","k2tog","yo","k2tog","yo"], inst: "cooooooool"},{row: ["k","k","k","k","rs","k","k2tog","k","k","k","k","yo","yo","re","k2tog","yo","k2tog","yo"], inst: "very good row"},{row: ["k","k","k","k","rs","yo","k2tog","k","k2tog","k","k","k2tog","yo","re","k2tog","yo","k2tog","yo"], inst: "Final instructions!"}];
var emptyArray = ["empty","empty","empty","empty","empty",'empty',"empty","empty",'empty','empty',"empty","empty","empty","empty","empty",'empty',"empty","empty",'empty','empty'];
var width = $(window).width();

//caching selectors
var lastItem = $('#last');
var currentItem = $('#current');
var nextItem = $('#next');
var rowCount = $('#rowCount');
    
var last = emptyArray;
var current = testValues[0].row;            //defining initial values of rows
var next = testValues[1].row;
var currentRow = 1;
    
var countLast = last.length;
var countCurrent = current.length;      //these are the length of the grid rows in number of stitches
var countNext = next.length;
var currentInstructions = testValues[currentRow - 1].inst;

var nonCurrentWidth = width * 0.7;      //defining the max widths of the individual rows
var currentWidth = width * 0.9;

//Jquery function for adding a image with designated input for creating the rows
(function( $ ){
   $.fn.addP = function(value) {
      this.append('<img src = "img/stitches/' + value + '.png"/>');
   }; 
})( jQuery );

//Drawing the three grids, "Last, Current, and Next"
function drawLast() {
    lastItem.empty();
    if(last[0] === "empty") {
        lastItem.addClass("empty");
    }   else {
        if (lastItem.hasClass('empty')) lastItem.removeClass('empty');
    }
    for (var i = 0; i < countLast; i++) {
        $('#last').addP(last[i]);
    }
    $('#last img').css('height', (nonCurrentWidth / countLast)*.96);
    $('#last img').css('width', (nonCurrentWidth / countLast)*.96);
}
function drawCurrent() {
    currentItem.empty();
    for (var i = 0; i < countCurrent; i++) {
        currentItem.addP(current[i]);
    }
    $('#current img').css('height', (currentWidth / countCurrent)*.96);
    $('#current img').css('width', (currentWidth / countCurrent)*.96);
}
function drawNext() {
    nextItem.empty();
    if(next[0] === "empty") {
        nextItem.addClass("empty");
    }   else {
        if (nextItem.hasClass('empty')) nextItem.removeClass('empty');
    }
    for (var i = 0; i < countNext; i++) {
        nextItem.addP(next[i]);
    }
    $('#next img').css('height', (nonCurrentWidth / countNext)*.96);
    $('#next img').css('width', (nonCurrentWidth / countNext)*.96);
}

//function that moves the current row through the list of variables "amount" passed in by action functions
function moveFocus(amount) {
    console.log("initiating move of" + amount);
    currentRow += amount;
    
    if (currentRow > testValues.length) {
        alert("You're already on the last row!");
        currentRow -= amount;
        return;
    } else if (currentRow < 1) {
        alert("You're already on the first row!");
        currentRow -= amount;
    }
    
    if (currentRow === 1) {
        last = emptyArray;
    } else {
        last = testValues[currentRow-2].row;
    }
    console.log(last);
    
    current = testValues[currentRow-1].row;
    console.log(current);
    
    if (currentRow === testValues.length) {
        next = emptyArray;
    } else {
        next = testValues[currentRow].row;
    }
    console.log(next);
    
    countLast = last.length;
    countCurrent = current.length;
    countNext = next.length;
    
    drawLast();
    drawCurrent();
    drawNext();
    
    currentInstructions = testValues[currentRow - 1].inst;
    rowCount.text(currentRow);
    $('#translation p').text(currentInstructions);
}

$(window).resize(function(){

    $('.centered').css({
        position:'absolute',
        top: ($(window).height() - $('.centered').outerHeight())/2,
        width: '100%'
    });

});

//first load drawings
$(document).ready(function(){
    //drawing the grids and sizing them appropriately
    drawLast();
    drawCurrent();
    drawNext();
    
    //placing the Counter    
    rowCount.css('height', width / 10);
    rowCount.css('width', width / 10);
    rowCount.css('margin-top', 0 - (width / 14));
    rowCount.css('margin-left', width / 20);
    rowCount.css('font-size', width / 10);
    
    //placing the nav buttons
    $('#nav img').css('height', width / 17);
    $('#nav img').css('width', width / 17);
    rowCount.text(currentRow);
    
    $('#translation p').text(currentInstructions);
    
    $(window).resize();
});

//when somenoe clicks on the "fwd" image, it moves the current row forward 1
$("#fwd").on("click", function() {
    moveFocus(1);
});

//when someone clicks on the "back" image, it moves the current row back 1
$("#back").on("click", function() {
    moveFocus(-1);
});