var ship,shipImg,space,spaceImg;
var diamondImg,award,awardImg;
var burstImg,gameOver,gameOverImg;
var life,life2,life3,lifeImg,start,startImg,speed,speedImg;
var virusImg,laserImg,laserG;
var diamondG,virusG;
var live=3,score=0,mineral=0;
var gameState="play";
//var Play=1;
//var End=0;
var restart,restartImg;

function preload(){
shipImg=loadAnimation("image/plane.png");
spaceImg=loadImage("image/background.png");

diamondImg=loadImage("image/diamond.png");
awardImg=loadImage("image/award.png");

burstImg=loadAnimation("image/burstImg.png");
gameOverImg=loadImage("image/gameover.png");

lifeImg=loadImage("image/lifeline.png");
startImg=loadImage("image/startButton.png");
speedImg=loadImage("image/speed.png");

virusImg=loadImage("image/virus.png");
laserImg=loadImage("image/laser.png");

restartImg=loadImage("image/restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  space=createSprite(windowWidth,windowHeight);
  space.scale=2;
  space.addImage(spaceImg);
  space.y=space.height/2;

  ship=createSprite(300,300,20,20);
  ship.addAnimation("shooting",shipImg);
  ship.addAnimation("destroyed",burstImg);

  life=createSprite(10,50,10,10);
  life.addImage(lifeImg);
  life.scale=0.1;

  life2=createSprite(50,50,10,10);
  life2.addImage(lifeImg);
  life2.scale=0.1;

  life3=createSprite(90,50,10,10);
  life3.addImage(lifeImg);
  life3.scale=0.1;

  gameOver=createSprite(space.x-1060,space.y-200);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  
  restart=createSprite(space.x-1050,space.y-250);
  restart.addImage(restartImg);
  restart.scale=.039;
  
  virusG=createGroup();
  diamondG=createGroup();
  laserG=createGroup();
  
}

function draw() {
  
/*if(gameState==="wait"){
  background("black"); 
  text("Welcome players. Welcome to the future.",);
  text("Our world is in grave danger as our resources have been consumed for development.");
  text("Now for further development we need you to get the resources. Resources from space.");
  text("Press arrow keys to move around.");
  text("your enemy during this project would be viruses which can dissolve any metal.");
  text("To destroy them you have to press space key to kill them.");
  text("Now the future depend on you. GOOD LUCK!!!!");
}*/

  if(gameState==="play"){

    gameOver.visible=false;
    restart.visible=false;

    life.visible=true;
    life2.visible=true;
    life3.visible=true;

    space.velocityY= (1 + score/100);
    score=score+Math.round(getFrameRate()/80);

    if(diamondG.isTouching(ship)){
mineral=mineral+1;
diamondG.destroyEach();
    }

    if(keyDown("Left_arrow")){
      ship.x=ship.x-2;
    }

    if(keyDown("right_arrow")){
      ship.x=ship.x+2;
    }

    if(space.y>100){
space.y=0;
space.x=200;
    }

    if(keyWentDown("space")){
createLaser();
    }
    //creates virus on the canvas
    spawnVirus();

    //creates diamond on the canvas
    spawnDiamond();

    if(virusG.isTouching(ship)){
virusG.destroyEach();
live=live-1;
    }

    if(live<=2){
life3.visible=false;
    }

    if(live<=1){
      life2.visible=false;
    }

    if(live<=0){
      life.visible=false;
      gameState="end";
    }

    if(laserG.isTouching(virusG)){
virusG.destroyEach();
laserG.destroyEach();
    }

  }
  else if(gameState==="end"){
    gameOver.visible=true;
    restart.visible=true;

    ship.changeAnimation("destroyed",burstImg);
    ship.scale=0.4

    if(mousePressedOver(restart)){
reset();
    }

    space.velocityY=0;

    laserG.setVelocityYEach(0);
    virusG.setVelocityYEach(0);
    diamondG.setVelocityYEach(0);

    laserG.setLifetimeEach(-1);
    virusG.setLifetimeEach(-1);
    diamondG.setLifetimeEach(-1);
  }

drawSprites();
text("Score: "+score,2500,10);

  fill("gold");
  textSize(20);
  text("Mineral: "+mineral,500,70);

  fill("gold");
  textSize(20);
  text("Lives ",10,30);
console.log(space.velocityY);
}

function reset(){
 gameState="play";
  ship.changeAnimation("shooting",shipImg);
  ship.scale=1;
  ship.x=300;
  ship.y=300;
  
  life.visible=true;
  life2.visible=true;
  life3.visible=true;
 
  score=0;
  mineral=0;

  live=3;

  gameOver.visible=false;
  restart.visible=false;

  virusG.destroyEach();
  diamondG.destroyEach();
  laserG.destroyEach();
}

function spawnVirus(){
  if(frameCount % 100 === 0){
    var virus=createSprite(Math.round(random(10,500)),0,20,20);
    virus.addImage(virusImg);
    virus.velocityY = (2 + score/50);
    virus.lifetime=200;
    virus.scale=0.1;
    virusG.add(virus);
   }
}

function spawnDiamond(){
  if(frameCount % 150 === 0){
var diamond=createSprite(Math.round(random(10,300)),0,20,20);
diamond.addImage(diamondImg);
diamond.velocityY = (2 + score/50);
diamond.lifetime=200;
diamond.scale=.1;
diamondG.add(diamond);
  }
}

function createLaser(){
  var laser=createSprite(100,100,60,10);
  laser.addImage(laserImg);
  laser.scale=.1
  laser.x=ship.x;
  laser.y=ship.y-40;
  laser.velocityY=-4;
  laser.lifetime=200;
  laserG.add(laser);
  return laser;
}

function createLaser2(){
  var laser2=createSprite(100,100,60,10);
  laser2.addImage(laserImg);
  laser2.scale=.1
  laser2.x=ship.x+40;
  laser2.y=ship.y;
  laser2.velocityY=-4;
  laser2.lifetime=200;
  laserG.add(laser2);
  return laser2;
}

