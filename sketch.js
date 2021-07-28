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
	createCanvas(1200, 800);
	
	playerPlane = createSprite(600,700)
	playerPlane.addImage(playerPlaneImg)
	playerPlane.scale = 0.5

	obstacleGrp = new Group()
	bulletGrp = new Group();
	title = createElement("h2");
	input = createInput("Name")
	button = createButton("Start Game!")
	score = 0
	md = 0
	reset = createSprite(1150,50);
	reset.addImage(resetImage);
	reset.scale = 0.15;
	obstacleVelocity = 3;
	FeedBack = "Nice Shot!"
}


function draw() {

background("white")
if(gameState === "new"){
background(bg1)
	textSize(24)
	fill("white")
	stroke(2)
	strokeWeight(3)
	text("Instructions\n1.Enter Your Name And Press Play to start The Game!\n2.Press Space Key To Shoot Bullets\n3.Dont Touch the incoming Meteors\n4.Press Left And Right Arrow to Move",325,500)
	title.html("Space Shooter")
	
    title.position(535,100)
    
   input.position(535,300)
    
    button.position(550,350)

    button.mousePressed(()=>{
		inpval = input.value()
		button.hide()
		input.hide()
		gameState = "play"
    
    })
}
  if(gameState === "play"){
  background(bg);

  createObstacle();

  textSize(20)
  fill("blue")
  text(inpval + "'s"+" Score: " + score,100,100);
  
  if(keyDown("space")){
	  if(frameCount%5===0){
	  bullet = createSprite(playerPlane.x,700);
	  bullet.addImage(bulletImg);
	  bullet.scale = 0.1;
	  bullet.velocityY = -4;
	  bullet.lifeTime = 800; 
	  bulletGrp.add(bullet);
	  shootSound.play();
	  }
  }	
  if(keyDown("Left")){
	  playerPlane.x = playerPlane.x-4;
  }
  if(keyDown("right")){
	  playerPlane.x = playerPlane.x+5;
  }
  if(obstacleGrp.isTouching(bulletGrp)){
	  score +=5
	  bulletGrp.destroyEach()
	  obstacleGrp[0].destroy();
	  md++

  }
  if(playerPlane.isTouching(obstacleGrp)){
	  gameState = "end"
	  
  }

  drawSprites();
}
if(gameState === "end") {
	background(bg2)
	obstacleGrp.setVelocityYEach(0);
	obstacleGrp.destroyEach();
	playerPlane.destroy()

	textSize(30)
	fill("White")
	stroke(2)
	strokeWeight(2)
	text("Space Shooter!\n\n\n\nYOUR STATS: \nYour Score: " +score+"\nNumber Of Meteors Destroyed: "+ md+"\nRemarks: "+fb,475,200)

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
		playerPlane = createSprite(600,700)
		playerPlane.addImage(playerPlaneImg)
		playerPlane.scale = 0.5
	}

	drawSprites();
}

}
function createObstacle(){
	r = Math.round(random(50,1150))
	if(frameCount%80 === 0){
		obstacle = createSprite(r,100);
		obstacle.addImage(obstacleImg);
		obstacle.scale = 0.25;
		obstacle.lifeTime = 800;

		obstacle.setCollider("circle",50,50,100)
		obstacleGrp.add(obstacle);
		obstacleGrp.setVelocityYEach(3);
	}
}

