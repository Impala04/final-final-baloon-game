var balloon,database,height;
var bgImage,balloonImage2;
function preload(){
    balloonImage2=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
    bgImage=loadImage("Hot Air Ballon-01.png")
}
function setup(){
    createCanvas(500,500);
    createSprite(400, 200, 50, 50);
    database=firebase.database()
    balloon = createSprite(250,250,10,10);
    balloon.shapeColor = "red";

    var balloonheight =database.ref("balloon/height")
    balloonheight.on("value",readHeight,showError)
}
 
function draw(){
    background(bgImage);
    if(keyDown(LEFT_ARROW)){
       balloon.x=balloon.x-10;
    }
     if(keyDown(RIGHT_ARROW)){
        balloon.x=balloon.x+10
    }
     if(keyDown(UP_ARROW)){
       updateHeight (0,-10);
       balloon.addAnimation("hotAirBalloon",balloonImage2)
       balloon.scale=balloon.scale-0.01;
    }
     if(keyDown(DOWN_ARROW)){
        balloon.y=balloon.y+10
    }
    drawSprites();
}

function updateHeight(x,y){
   // balloon.x = balloon.x + x;
    //balloon.y = balloon.y + y;
    database.ref("balloon/height").set({
        "x":height.x+x  ,
        "y":height.y+y  
    })
}

function showError(){
 console.log("there is an error")
}

function readHeight(data){
height= data.val()
balloon.x=height.x
balloon.y=height.y
 
}

