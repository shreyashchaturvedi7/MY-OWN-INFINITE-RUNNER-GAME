var runner, runnerimg, runner_stop;
var bg, bgimg, invisibleground;
var tiger, tigerimg, tiger_stop;
var obstacle, obstacleimg, obstaclegroup;
var gameState=1;
var PLAY=1;
var END=0;
var score=0;
var gameover, gameoverimg, reset, resetimg;

function preload(){
  runnerimg=loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png");
  bgimg=loadImage("bg.jpg");
  tigerimg=loadAnimation("1t.png", "2t.png", "3t.png", "4t.png", "5t.png", "6t.png", "7t.png",   "8t.png");
  obstacleimg=loadImage("obstacle.png");
  runner_stop=loadAnimation("5.png");
  tiger_stop=loadAnimation("5t.png");
  gameoverimg=loadImage("gameover.png");
  resetimg=loadImage("reset.png");
}

function setup() {
  createCanvas(900, 600)
  
  invisibleground=createSprite(450, 560, 900, 10);

  invisibleground.visible=false;
  
  
  bg=createSprite(0, 200, 900, 600);
  bg.addImage('jungle', bgimg);
  bg.scale=1;
  
  gameover=createSprite(450, 200, 50, 50);
  gameover.addImage("gameover", gameoverimg);
  
  
  reset=createSprite(450, 400, 50, 50);
  reset.addImage("reset", resetimg);
  reset.scale=0.2;
  
  runner=createSprite(500, 450, 10, 10);
  runner.addAnimation('runner', runnerimg);
  runner.addAnimation('runner_stop', runner_stop);
  runner.scale=0.6
  runner.setCollider("rectangle", 100, 50, 100, 250 );
  
  tiger=createSprite(800, 500, 10, 10);
  tiger.addAnimation('tiger', tigerimg);
  tiger.addAnimation('tiger_stop', tiger_stop);
  tiger.scale=0.4;
  tiger.setCollider("rectangle", 0, 0, 500, 350);
  
 
  
  obstaclegroup=new Group();
  
}

function draw() {
 background('white');
  runner.collide(invisibleground);
  tiger.collide(invisibleground)
  
 
  
  if(gameState===PLAY){
    
   bg.velocityX=8;
    if(bg.x>900){
    bg.x=450;
    }
    spawnObstacle()
    if(keyDown("space")&&runner.y>=400) {
      runner.velocityY=-12;
    }
    runner.velocityY=runner.velocityY+0.5;
    
    if(tiger.isTouching(obstaclegroup)){
      tiger.velocityY=-12
    }
     tiger.velocityY=tiger.velocityY+0.5;
    if(runner.isTouching(obstaclegroup)){
       gameState=END;
       }
    gameover.visible=false;
    reset.visible=false;
    
    score = score + Math.round(getFrameRate()/60);
    
  }
  if(gameState===END){
    bg.velocityX=0;
    runner.velocityY=0;
    tiger.velocityY=0;
    obstaclegroup.setVelocityXEach(0);
    runner.changeAnimation('runner_stop', runner_stop);
    tiger.changeAnimation('tiger_stop', tiger_stop);
    gameover.visible=true;
    reset.visible=true;
  }
  if(mousePressedOver(reset)&&gameState===END){
    restart();
  }
  drawSprites();
  fill('black');
  textSize(20);
  text("score="+score, 800, 50)
}

function restart(){
  gameState=PLAY;
    runner.changeAnimation("runner", runnerimg );
    tiger.changeAnimation("tiger", tigerimg);
   gameover.visible = false;
  reset.visible = false;
  obstaclegroup.destroyEach();
  score=0;
}

function spawnObstacle(){
  if(frameCount%200===0){
    obstacle=createSprite(0, 540, 10, 10);
    obstacle.addImage('obstacle', obstacleimg);
    obstacle.velocityX=8;
    obstacle.scale=0.5;
    obstaclegroup.add(obstacle);
    obstacle.setCollider("rectangle", 0, 0, 400, 100 );
    obstacle.lifetime=-1;
  }
}