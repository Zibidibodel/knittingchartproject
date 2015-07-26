//defining variables
var testValues = [["k","k2tog","k","yo","rs","yo","k2tog","k","k","k","k","k","yo","re","k2tog","yo","k2tog","yo"],["k","k","yo","k","rs","yo","k","k","k","k","k","k","yo","re","k2tog","yo","k2tog","yo"],["k","k","k","k","rs","yo","k2tog","k","k","k","k","k","yo","re","k2tog","yo","k2tog","yo"],["k","k","k","k","rs","k","k2tog","k","k","k","k","yo","yo","re","k2tog","yo","k2tog","yo"],["k","k","k","k","rs","yo","k2tog","k","k2tog","k","k","k2tog","yo","re","k2tog","yo","k2tog","yo"]];
var emptyArray = ["empty","empty","empty","empty","empty",'empty',"empty","empty",'empty','empty',"empty","empty","empty","empty","empty",'empty',"empty","empty",'empty','empty'];
var width = $(window).width();
    
var last = emptyArray;
var current = testValues[0];            //defining initial values of rows
var next = testValues[1];
var currentRow = 1;
    
var countLast = last.length;
var countCurrent = current.length;      //these are the length of the grid rows in number of stitches
var countNext = next.length;

var nonCurrentWidth = width * 0.7;      //defining the max widths of the individual rows
var currentWidth = width * 0.9;

//Jquery function for adding a paragraph with designated input for creating the rows
(function( $ ){
   $.fn.addP = function(value) {
      this.append('<p><img src = "img/stitches/' + value + '.gif"/> </p>');
   }; 
})( jQuery );

//Drawing the three grids, "Last, Current, and Next"
function drawLast() {
    $('#last').empty()
    for (var i = 0; i < countLast; i++) {
        $('#last').addP(last[i]);
    }
    $('#last p img').css('height', (nonCurrentWidth / countLast)*.96);
    $('#last p img').css('width', (nonCurrentWidth / countLast)*.96);
};
function drawCurrent() {
    $('#current').empty()
    for (var i = 0; i < countCurrent; i++) {
        $('#current').addP(current[i]);
    }
    $('#current p img').css('height', (currentWidth / countCurrent)*.96);
    $('#current p img').css('width', (currentWidth / countCurrent)*.96);
}
function drawNext() {
    $('#next').empty()
    for (var i = 0; i < countNext; i++) {
        $('#next').addP(next[i]);
    }
    $('#next p img').css('height', (nonCurrentWidth / countNext)*.96);
    $('#next p img').css('width', (nonCurrentWidth / countNext)*.96);
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
        alert("You're already on the first row!")
        currentRow -= amount;
    }
    
    if (currentRow === 1) {
        last = emptyArray;
    } else {
        last = testValues[currentRow-2];
    }
    console.log(last);
    
    current = testValues[currentRow-1];
    console.log(current);
    
    if (currentRow === testValues.length) {
        next = emptyArray;
    } else {
        next = testValues[currentRow];
    }
    console.log(next);
    
    countLast = last.length;
    countCurrent = current.length;
    countNext = next.length;
    
    drawLast();
    drawCurrent();
    drawNext();
    
    $('#rowCount').text(currentRow);
}

//first load drawings
$(document).ready(function(){
    //drawing the grids and sizing them appropriately
    drawLast();
    drawCurrent();
    drawNext();
    
    //placing the Counter    
    $('#rowCount').css('height', width / 10);
    $('#rowCount').css('width', width / 10);
    $('#rowCount').css('margin-top', 0 - (width / 14));
    
    //placing the nav buttons
    $('#nav img').css('height', width / 14);
    $('#nav img').css('width', width / 14);
    $('#rowCount').text(currentRow);
});

//when somenoe clicks on the "fwd" image, it moves the current row forward 1
$("#fwd").on("click", function() {
    moveFocus(1);
});

//when someone clicks on the "back" image, it moves the current row back 1
$("#back").on("click", function() {
    moveFocus(-1);
});