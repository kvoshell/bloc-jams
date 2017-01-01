var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points){
    
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

window.onload = function() {
    
    if(window.innerHeight > 950) {
        animatePoints(pointsArray);
    }
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    window.addEventListener("scroll", function(event){
        if(document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance){
            animatePoints(pointsArray);
        }
        
    });
}
