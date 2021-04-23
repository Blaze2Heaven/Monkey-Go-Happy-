

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime
var ground
var backImage,back
var gameover,gameoverImage
var restart,restartImage
function preload(){
monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  obstaclesGroup =new Group();
    FoodGroup =new Group();
  backImage=loadImage("jungle.jpg")
  gameoverImage=loadImage("gameOver.png")
  restartImage=loadImage ("restart.png")
}



function setup() {
 createCanvas(600,600)
ground=createSprite(600,600,1400,40)



  
  monkey=createSprite(100,520)
  monkey.addAnimation("run",monkey_running)
  monkey.scale=0.2;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug =false
  score=0;
  survivalTime=0;
  
gameover=createSprite(300,300)
gameover.addImage("over",gameoverImage)
  gameover.scale=0.5;
  restart=createSprite(300,390)
restart.addImage("over",restartImage)
  restart.scale=0.3;

back=createSprite(300,300)
  back.addImage("back",backImage)
  back.velocityX=-1;
  if(back.y>600){
    back.y=300;
  }      
  
}


function draw() {
background(0)
 if (back.x < 0){
      back.x = back.width/2;
    }
  
  text("Score: "+ score, 500,50);
  survivalTime=Math.ceil(frameCount/frameRate())
   text("SurvivalTime: "+ survivalTime, 400,50);

monkey.depth=monkey.depth+1 
   
        spawnObstacles();
 spawnbanana();

  ground.visible=false;
  if (backImage.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    monkey.velocityY = monkey.velocityY + 0.8
   }
  if(mousePressedOver(restart)) {
     gameover.visible=false;
restart.visible=false;
obstaclesGroup.destroyEach();
FoodGroup.destroyEach();
survivalTime=0;
  score=0;
    back.velocityX=-1;
}
  gameover.depth=gameover.depth+1
  restart.depth=restart.depth+1
 gameover.visible=false;
restart.visible=false;
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground )
  
if(obstaclesGroup.isTouching(monkey)){
   FoodGroup.setVelocityXEach(0)
  obstaclesGroup.setVelocityXEach(0)
   
      back.velocityX=0;

   obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.scale=0.2;
  monkey.velocityY=0;
 gameover.visible=true;
restart.visible=true;

} 
  
  if(monkey.isTouching(FoodGroup)){
    score=score+2;
  FoodGroup.destroyEach()
  }        
switch(score){
    case 10:monkey.scale=0.12
    break;
    case 20:monkey.scale=0.14
    break;
    case 30:monkey.scale=0.16
    break;
    case 40:monkey.scale=0.18
    break;
    default:  break;
}  

 
drawSprites(); 
 
}

function spawnObstacles(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(600,550,10,40);
   obstacle.velocityX= -6 
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.2;
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
       
              
     
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale=0.3;
    obstacle.lifetime = 300;
   
  
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,550,10,40);
    banana.y = Math.round(random(300,300));
    banana.addImage(bananaImage);
       banana.velocityX = -(6 + score/100);
    banana.scale = 0.2;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    
              
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}




