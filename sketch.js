  var trex, trex_running, trex_collided;
  var ground, invisibleGround, groundImage;
  var cloud, cloudImage;
  var score = 0;
  var obs1, obs2, obs3, obs4, obs5, obs6;
  var obstaclesGroup;
  var gameOver, gameOverImage, restart, restartImage; 
  var jump, die, checkpoint;
  var highscore = 0;
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

function preload() {
  trex_running = loadAnimation("cave1.png", "cave2.png", "cave3.png","cave4.png");
  trex_collided = loadImage("cave1.png");

  groundImage = loadImage("ground2.png");
  
  
  
   obs1 = loadImage("obstacle1.png");
  
   obs2 = loadImage("obstacle2.png");
  
   obs3 = loadImage("obstacle3.png");
  
   obs4 = loadImage("obstacle4.png");
  
   obs5 = loadImage("obstacle5.png");
  
   obs6 = loadImage("obstacle6.png");
  
   gameOverImage = loadImage("gameOver.png");
  
   restartImage = loadImage("restart.png");

   bg = loadImage("bg.png")
  
   jump = loadSound("jump.mp3");
  
   die = loadSound("die.mp3");
  
   checkpoint = loadSound("checkPoint.mp3");
}


function setup() {
  createCanvas(1530, 700);
  obstaclesGroup = new Group();
  
  
  trex = createSprite(50,550,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
 
  
  
  ground = createSprite(300,680,1200,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.x = camera.x;
 
  
  invisibleGround = createSprite(300,640,600,5);
  invisibleGround.visible = false;
  
  gameOver = createSprite(100,100);
  gameOver.addImage("gameover", gameOverImage);
  gameOver.scale = 2;
  gameOver.visible = false;
  
  restart = createSprite(100,330);
  restart.addImage("restart", restartImage);
  restart.scale = 02;
  restart.visible = false;
}

function draw() {
  camera.x = trex.x;
  background(bg);
  fill(0);
  textSize(15);
  text("Score :"+score, 480 ,50);
  textSize(15);
  text("HIGH SCORE :"+highscore,300,50);
  
  if(gameState ==PLAY) {
     ground.velocityX = -(6+3*score/100) ;
      score = score+Math.round(getFrameRate()/60);
      if(score%100==0 && score>0 ){
        checkpoint.play();
      }
    if (keyDown("space") && trex.y>=559) {
      trex.velocityY = -10;
      jump.play();
    }
  trex.velocityY = trex.velocityY + 0.7
    if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
  spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
      die.play();
      
    }
  }
 else if(gameState == END){
     ground.velocityX = 0 ;
     trex.velocityY = 0;
     obstaclesGroup.setVelocityXEach(0);
     
     obstaclesGroup.setLifetimeEach(-1);
     
     trex.changeAnimation("collided", trex_collided);
     gameOver.visible = true;
     restart.visible = true;
  }
  if(mousePressedOver(restart)){
    reset();
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

f
function spawnObstacles(){
  if(frameCount%60 ==0){
    var obstacle = createSprite(600,645,10,40);
    obstacle.velocityX = -(6+3*score/100);
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obs1);
        break;
      case 2: obstacle.addImage(obs2);
        break;
      case 3: obstacle.addImage(obs3);
        break;
      case 4: obstacle.addImage(obs4);
        break;
      case 5: obstacle.addImage(obs5);
        break;
      case 6: obstacle.addImage(obs6);
        break;
      default :break;
    }
    obstacle.scale = 1;
    obstacle.lifetime = 130;
    trex.depth = trex.depth+1;
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation ("running", trex_running);
  if(highscore<score){
    highscore = score;
  }
  score = 0;
}