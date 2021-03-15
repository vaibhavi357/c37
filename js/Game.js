class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100, 200);
    car2 = createSprite(300, 200);
    car3 = createSprite(500, 200);
    car4 = createSprite(700, 200);
    cars = [car1, car2, car3, car4]
  }

  play(){
    form.hide();
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      // index for each player in all players array
      var index = 0;
      // x and y position of the cars
      var x = 0, y
      for(var plr in allPlayers){
        // increase the index by 1 for every player
        index = index + 1;
        // place the car away from each other in the x direction
        x = x + 200
        // calculate the y position fo the car taking distance from the database
        y = displayHeight - allPlayers[plr].distance;
        // place the car on x and y position 
        cars[index - 1].x = x;
        cars[index - 1].y = y;
        if (index === player.index)
          {
            //active car in red color
            cars[index - 1].shapeColor = "red";
            // add the camera to see the game in different angles
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index - 1].y;
          }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();
  }
}
