
var airplaneImg, airplane;
var rockImg, rock, rocksGroup;
var skyImg, sky;
var score=0;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";


function preload(){
airplaneImg=loadImage("airplane.png");
rockImg=loadImage("rock.png");
skyImg=loadImage("sky.png");
}

function setup() {
 createCanvas(450,450);
 sky=createSprite(230,270);
 sky.addImage("sky", skyImg);
 sky.velocityY=1;

rocksGroup=new Group();
invisibleBlockGroup=new Group();

airplane=createSprite(200,200,50,50);
airplane.scale=0.2;
airplane.addImage("airplane", airplaneImg);
airplane.setCollider("rectangle",0,0,airplane.width,airplane.height);
  airplane.debug = false;
}

function draw() {
 background(225);
 stroke("black");
 fill("black");
 textSize(15);
 text("Puntuación: " + score, 330,40);
 
 if(sky.y>400){
     sky.y=300
 }

 if(gameState==="play"){
   score = score + Math.round(getFrameRate()/60);
    
  if(keyDown("left_arrow")){
    airplane.x=airplane.x-3;  
 }

 if(keyDown("right_arrow")){
    airplane.x=airplane.x+3;
 }

 if(keyDown("space")){
    airplane.velocityY=-10;
 }

 airplane.velocityY=airplane.velocityY + 0.8;

spawnRocks();

if(rocksGroup.isTouching(airplane)){
   airplane.velocityY=0;
}
if(invisibleBlockGroup.isTouching(airplane) || airplane.y>450){
   airplane.destroy();
   gameState="end"
}

drawSprites();
 }

 if(gameState=== "end"){
   stroke("red");
   fill("red");
   textSize(35);
   text("End Game", 150,230)
 }
}

function spawnRocks()
{
   if(frameCount % 240===0) {
      var rock=createSprite(200,-50);
      var invisibleBlock=createSprite(200,15);
      invisibleBlock.width=rock.width;
   invisibleBlock.height=2;

   rock.x=Math.round(random(120,400));
   invisibleBlock.x=rock.x;
   rock.addImage(rockImg);

   rock.velocityY=1;
   rock.scale=0.2;
   invisibleBlock.velocityY=1;

   airplane.depth=rock.depth;
   airplane.depth+=1;

   rock.lifetime=800;
   invisibleBlock.lifetime=800;
   
   rocksGroup.add(rock);
   invisibleBlock.debug=false;
   invisibleBlockGroup.add(invisibleBlock);
   invisibleBlock.visible = false;
   }
}