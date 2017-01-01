var animatePoints = function(){
    
    var points = document.getElementsByClassName('point');
    
    var revealPoint = function(index){
        points[index].style.opacity = 1;
        points[index].style.transform = "scaleX(1) traslateY(0)";
        points[index].style.msTransform = "scaleX(1) traslateY(0)";
        points[index].style.WebKitTransform = "scaleX(1) traslateY(0)";
    };
    
    var length = points.length;
    for(var i = 0; i < length; i++){
        revealPoint(i);
    }
};

