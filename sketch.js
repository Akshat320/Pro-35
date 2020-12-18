//Create variables here
var dog, happyDog, foodS, foodStock, dogHappy, dogSitting;
var database, fedTime, lastFed, foodObj;

function preload()
{
  //load images here
  dogSitting = loadImage("Dog.png"); 
  dogHappy = loadImage("happydog.png");

}

function setup() {

  database = firebase.database();
  createCanvas(1000, 500);
  dog = createSprite(700, 250, 20, 20);
  dog.addImage(dogSitting);
  dog.scale = 0.15;


  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  textSize(20);

  feed  = createButton("Feed The Dog");
  feed.position(850, 70);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(970, 70);
  addFood.mousePressed(addFoods);

  //fedTime = database.ref
  
}


function draw() {  

  background(46, 139, 87);


  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  fill("white");
  textSize(12);
  text("Food Remaining: " + foodS, 400, 100);

  fill(255,255, 254);
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed: "+ lastFed%12 + " PM", 280, 35);
  }else if(lastFed==0)
  {
    text("LastFeed: 12 AM", 280, 35);
  }else{
    text("Last Feed: "+lastFed + " AM", 280, 35);
  }


  drawSprites();

  //fill(255, 255, 254);
  //stroke("black")
  //textSize(13);
  //text("Food Remaining: " + foodS, 180, 100);
  //text("Press UP_ARROW Key to Feed the Drago Milk", 120, 20);
  //add styles here

}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
    if (x<=0)
    {
      x=0;
    }  
    else{
      x = x-1
    }
    

    if(x<1)
    {
      database.ref('/').update({
        Food: 20
      })
    }

    else{
    database.ref('/').update({
    Food: x
  })
}
}

function feedDog()
{

  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){

  foodS++;
  database.ref('/'.update({
    Food: foodS
  }))
}

