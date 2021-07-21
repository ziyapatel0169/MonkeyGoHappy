var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver;
var Score;
var attempts=3;
var FoodGroup,bananaImg;
var obstaclesGroup,obstacle_img;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImg=loadImage("banana.png");
  obstacle_img=loadImage("stone.png");
  gameOver=loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup=new Group();
  obstaclesGroup=new Group();
  Score=0;

}

function draw() { 
  background(0);

  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+Score,550,50);
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(FoodGroup.isTouching(player)){
    FoodGroup.destroyEach();
    player.scale+=0.05;
    Score=Score+2;

  }
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacles();
    if(obstaclesGroup.isTouching(player)){
      gameState=END;

    }
  }
else if(gameState===END){
  backgr.velocityX=0;
  player.visible=false;
FoodGroup.destroyEach();
obstaclesGroup.destroyEach();
textSize(30);
fill("red");
text("GameOver",300,220);


}
  drawSprites();
}

function spawnFood(){
  if(frameCount%80===0){
    var banana=createSprite(600,250,40,10);
    banana.y=random(120,200);
    banana.addImage(bananaImg);
    banana.scale=0.06;
    banana.velocityX=-3;
    banana.lifeTime=300;
    player.depth=banana.depth+1;
    FoodGroup.add(banana);

  }
}

function spawnObstacles(){
  if(frameCount%300===0){
    var obstacle=createSprite(800,350,10,40);
    obstacle.velocityX=-(4+2*Score/100);
    obstacle.addImage(obstacle_img);
    obstacle.scale=0.2;
    obstaclke.lifeTime=300;
    obstaclesGroup.add(obstacle);

  }
}