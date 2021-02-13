const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;

var treeObj, stoneObj,groundObject, launcherObject;
var mango1,mango2,mango3,mango4,mango5;
var world,boy;
var stone;
var slingShot;

function preload(){
	boy=loadImage("images/boy.png");
	stone=loadImage("images/stone.png");
  }

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1=new mango(1100,100,30);
	mango2=new mango(1030,170,30);
	mango3=new mango(1150,200,30);
	mango4=new mango(1020,80,30);
	mango5=new mango(950,220,30);

	treeObj=new tree(1050,580);
	groundObject=new ground(width/2,600,width,20);

	stone=new Stone(235,420,60,40);

	slingShot = new Slingshot(stone.body,{x:235,y:420});
	
	Engine.run(engine);

}

function draw() {

  background(230);
  text("Press SPACE for another chance to play!",50,50);
  image(boy ,200,340,200,300);

  
  treeObj.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();

  groundObject.display();

  stone.display();

  slingShot.display();

  detectCollision(stone,mango1);
  detectCollision(stone,mango2);
  detectCollision(stone,mango3);
  detectCollision(stone,mango4);
  detectCollision(stone,mango5);
}

function mouseDragged() {
  Matter.Body.setPosition(stone.body,{x:mouseX,y:mouseY});
}

function mouseReleased(){
  slingShot.fly();
}

function detectCollision(stone,mango){
  mangoBodyPosition=mango.body.position
  stoneBodyPosition=stone.body.position
  
  var distance=dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y)
    if(distance<=mango.r+stone.width)
    {
      Matter.Body.setStatic(mango.body,false);
    }
}

function keyPressed() {
  if (keyCode === 32) {
    Matter.Body.setPosition(stone.body, {x:235,y:420})
    slingShot.attach(stone.body);
  }
}