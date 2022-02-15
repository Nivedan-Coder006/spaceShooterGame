var playerPlane,playerPlaneImg;
var obstacle,obstacleImg,obstacleGrp;
var bg,bg1,bg2;
var bullet,bulletImg,bulletGrp;
var r;
var gameState = "new";
var score;
var gameOver,gameOverImg
var title,button,input;
var inpval,md,fb,shootSound,spaceSound;
var reset,resetImage;
var obstacleVelocity;
var FeedBack,feedback;
var n;
var TotalBullets
function preload()
{
	playerPlaneImg = loadImage("simg.png")
	obstacleImg = loadImage("Meteor.png")
	bg = loadImage("backgroundImg.png");
	bulletImg = loadImage("bulletImg.png")
	gameOverImg = loadImage("gameOver.png")
	bg1 = loadImage("bg1.jpg")
	bg2 = loadImage("76YS.gif")
	shootSound = loadSound("shootingSound.mp3")
	spaceSound = loadSound("spaceE.wav")
	resetImage = loadImage("resetImage.png")
}

function setup() {
	createCanvas(windowWidth-4, windowHeight-4);
	
	playerPlane = createSprite(windowWidth/2,windowHeight-windowHeight/6)
	playerPlane.addImage(playerPlaneImg)
	playerPlane.scale = 0.5

	playerPlane.setCollider("circle",20,30,100)

	n = 0;
	obstacleGrp = new Group()
	bulletGrp = new Group();
	title = createElement("h2");
	input = createInput("Name")
	button = createButton("Start Game!")
	score = 0
	md = 0
	reset = createSprite(windowWidth-windowWidth/10,windowHeight-windowHeight+40);
	reset.addImage(resetImage);
	reset.scale = 0.15;
	obstacleVelocity = 3;
	FeedBack = "Nice Shot!"
	gameOver =createSprite(windowWidth-windowWidth+600,windowHeight-windowHeight+200)
	gameOver.addImage(gameOverImg)
	gameOver.visible = false;
	TotalBullets = 264
}


function draw() {

background("white")
if(gameState === "new"){
background(bg1)
	textSize(20)
	fill("white")
	stroke(2)
	strokeWeight(3)
	text("Instructions\n1.Enter Your Name And Press Play to start The Game!\n2.Press Space Key To Shoot Bullets\n3.Dont Touch the incoming Meteors\n4.Press Left And Right Arrow to Move",windowWidth-windowWidth+windowWidth/2-300,windowHeight-windowHeight/2+70)
	title.html("Space Shooter")
	
    title.position(windowWidth-windowWidth/2-50,windowHeight-windowHeight/2-325)
    
   input.position(windowWidth-windowWidth/2-90,windowHeight-windowHeight/2-150)
    
    button.position(windowWidth-windowWidth/2-50,windowHeight-windowHeight/2-75)
    button.mousePressed(()=>{
		inpval = input.value()
		button.hide()
		input.hide()
		gameState = "play"
    
    })
}
  if(gameState === "play"){
  background(bg1);

  createObstacle();
  title.hide()

  textSize(30)
  fill("darkgrey")
  stroke(4)

  text(inpval + "'s"+" Score: " + score,windowWidth-windowWidth,windowHeight-windowHeight+40);
  text("Bullet's Left: "+ (TotalBullets),windowWidth-windowWidth,windowHeight-windowHeight+80);

  
  if(keyDown("space")){
	  if(frameCount%5===0){
	  bullet = createSprite(playerPlane.x,playerPlane.y+10);
	  bullet.addImage(bulletImg);
	  bullet.scale = 0.1;
	  bullet.velocityY = -4;
	  bullet.lifeTime = 800; 
	  bulletGrp.add(bullet);
	  shootSound.play();
	  TotalBullets = TotalBullets-1
	  }
  }	
  if(keyDown("Left")){
	  playerPlane.x = playerPlane.x-4;
  }
  if(keyDown("right")){
	  playerPlane.x = playerPlane.x+5;
  }
  for (let i = 0; i < obstacleGrp.length; i++) {

	obstacleGrp[i].displace(obstacleGrp);
 }
 
 bulletGrp.collide(obstacleGrp, removeBlocks);
 
  
  if(playerPlane.isTouching(obstacleGrp)){
	  gameState = "end"
	  
  }

  drawSprites();
}
if(gameState === "end") {
	background(bg1)
	obstacleGrp.setVelocityYEach(0);
	obstacleGrp.destroyEach();
	playerPlane.destroy()
	gameOver.visible = true
	textSize(30)
	fill("White")
	stroke(2)
	strokeWeight(2)
	text("Space Shooter!\n\n\n\nYOUR STATS: \nYour Score: " +score+"\nNumber Of Meteors Destroyed: "+ md+"\nRemarks: "+fb,475,400)

	if(score<=15&&score>=5){
		fb = "You Can Still Improve. :D"
	}
	if(score>15 && score<=30){
		fb = "Nice Work. Keep It up"
	}
	if(score>=50){
		fb = "Outstanding! You Saved the earth"
	}
	if(score === 0){
		fb = "Ahh. Please Improve"
	}
	if(mousePressedOver(reset)){
		gameState = "play"
		playerPlane = createSprite(windowWidth/2,windowHeight-windowHeight/6)
		playerPlane.addImage(playerPlaneImg)
		playerPlane.scale = 0.5
	}

	drawSprites();
}

}
function createObstacle(){
	
	r = Math.round(random(50,1150))
	if(frameCount%65 === 0){
		obstacle = createSprite(r,100);
		obstacle.addImage(obstacleImg);
		obstacle.scale = 0.25;
		obstacle.lifeTime = 800;

		obstacle.setCollider("circle",50,50,100)
		obstacleGrp.add(obstacle);
		obstacleGrp.setVelocityYEach(3);

	}
}


function removeBlocks(sprite, obstacle){
	obstacle.remove();
	bulletGrp.destroyEach()
	score +=5
	md++
  }
