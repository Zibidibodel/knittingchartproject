//set variables
var numOfStitches = 10; //default number of stitches set to 10
var currentRow = 1;
var width = $(window).width();
var currentWidth = width * 0.9;

var editRow = $('#stitchSelectors');

//Jquery function for adding a image with designated input for creating the rows
(function( $ ){
   $.fn.addP = function(value) {
      this.append('<img src = "img/stitches/' + value + '.png"/>');
   }; 
})( jQuery );

//Jquery function for cycling through the different options in each block
(function( $ ){
   $.fn.cycle = function() {
      switch(this.attr("src")) {
        case "img/stitches/k.png" :
            this.attr("src", "img/stitches/k2tog.png");
            this.addClass("k2tog");
            this.removeClass("k");
            break;
        
        case "img/stitches/k2tog.png" :
            this.attr("src", "img/stitches/k3tog.png");
            this.addClass("k3tog");
            this.removeClass("k2tog");
            break;
            
        case "img/stitches/k3tog.png" :
            this.attr("src", "img/stitches/ns.png");
            this.addClass("ns");
            this.removeClass("k3tog");
            break;    
        
        case "img/stitches/ns.png" :
            this.attr("src", "img/stitches/p.png");
            this.addClass("p");
            this.removeClass("ns");
            break;
            
        case "img/stitches/p.png" :
            this.attr("src", "img/stitches/p2tog.png");
            this.addClass("p2tog");
            this.removeClass("p");
            break;
            
        case "img/stitches/p2tog.png" :
            this.attr("src", "img/stitches/s2kp.png");
            this.addClass("s2kp");
            this.removeClass("p2tog");
            break;
        
        case "img/stitches/s2kp.png" :
            this.attr("src", "img/stitches/sk2p.png");
            this.addClass("sk2p");
            this.removeClass('s2kp');
            break;
        
        case "img/stitches/sk2p.png" :
            this.attr("src", "img/stitches/ssk.png");
            this.addClass("ssk");
            this.removeClass("sk2p");
            break;
        
        case "img/stitches/ssk.png" :
            this.attr("src", "img/stitches/ssp.png");
            this.addClass("ssp");
            this.removeClass("ssk");
            break;    
            
        case "img/stitches/ssp.png" :
            this.attr("src", "img/stitches/yo.png");
            this.addClass("yo");
            this.removeClass("ssp");
            break;
        
        case "img/stitches/yo.png" :
            this.attr("src", "img/stitches/re.png");
            this.addClass("re");
            this.removeClass("yo");
            break;
            
        case "img/stitches/re.png" :
            this.attr("src", "img/stitches/rs.png");
            this.addClass("rs");
            this.removeClass("re");
            break;
            
        case "img/stitches/rs.png" :
            this.attr("src", "img/stitches/k.png");
            this.addClass("k");
            this.removeClass("rs");
            break;
      }
   }; 
})( jQuery );

//create editor block
function drawEditor() {
    editRow.empty();
    for (var i = 0; i < numOfStitches; i++) {
        editRow.addP('k');
    }
    $('#stitchSelectors img').css('height', (currentWidth / numOfStitches)*.96);
    $('#stitchSelectors img').css('width', (currentWidth / numOfStitches)*.96);
}

$(window).resize(function(){
    $('.centered').css({
        position:'absolute',
        top: ($(window).height() - $('.centered').outerHeight())/2,
        width: '100%'
    });
});

$('#stitchSelectors img').click(function() {
    this.cycle();
});

drawEditor();