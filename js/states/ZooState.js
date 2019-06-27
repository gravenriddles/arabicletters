//this game will have only 1 state
var ZooState = {
  //load the game assets before the game starts

  //executed after everything is loaded
  create: function() {

    this.ladid = this.game.add.audio('ladid');
    this.ssayi2 = this.game.add.audio('ssayi2');
    this.meaty = this.game.add.audio('carnivorous');
    this.herby = this.game.add.audio('herbivorous');
    this.nomeat = this.game.add.audio('nomeat');
    this.noherb = this.game.add.audio('noherb');
    this.freshy = this.game.add.audio('fresh');
    this.qst_animal = this.game.add.audio('qst_animal');
    //create a sprite for the background

     this.zooyard = this.game.add.sprite(0, 0, 'zooyard');
     this.zooyard.inputEnabled = true;
     this.zooyard.events.onInputDown.add(this.placeItem,this);

//Add Animal groups

var animalData =[
      
    ];
/**
    var n = 28;

    for(var j = 0; j < n; j++) {
      animalData.push({key:'lion', audio : j +'Sound'});
    }
**/
  
  animalData.push({key:'fox', audio : 'foxname',food :'carnivorous'});
  animalData.push({key:'giraffe', audio : 'giraffename',food :'herbivorous'});
  animalData.push({key:'hippo', audio : 'hipponame',food :'herbivorous'});
  animalData.push({key:'sheep', audio : 'sheepname',food :'herbivorous'});
  animalData.push({key:'turtle', audio : 'turtlename',food :'herbivorous'});
  animalData.push({key:'wolf', audio : 'wolfname',food :'carnivorous'});
  animalData.push({key:'zebra', audio : 'zebraname',food :'herbivorous'});

    this.animals = this.game.add.group();
    var animal;
    var self = this;
    animalData.forEach(function(element){

       animal= self.animals.create(-1000,self.game.world.centerY, element.key);
       
       animal.customParams = {sound: self.game.add.audio(element.audio), type: element.food};
      // letter.customParams = {sound: self.game.add.audio('alif')};
       animal.anchor.setTo(0.5); 
       animal.inputEnabled = true;
       animal.events.onInputDown.add(self.animateLetter,self);
       animal.animations.add('yammy', [1,2,3,2,1],7,false);
       animal.animations.add('yakky', [1,2,3,4],7,false);
    });

    this.currentAnimal = this.animals.next();
    this.currentAnimal.position.set(this.game.world.centerX,this.game.world.centerY); 
    this.currentAnimal.customParams.sound.play();
    //End of animal group


//here uncomment 3
      //this.animal = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+50, 'pet');
      //this.animal.anchor.setTo(0.5);
      //this.currentAnimal.animations.add('yammy', [1,2,3,2,1],7,false);

     //Left Arrow
     //this.leftArrow= this.game.add.sprite(60,this.game.world.centerY,'rightarrow');
      this.leftArrow= this.game.add.sprite(26,this.game.world.centerY - 28,'markHolder');
      this.leftArrowArrow= this.game.add.sprite(55,this.game.world.centerY,'left');
     //this.leftArrow.scale.setTo(-1, 1);
      this.leftArrowArrow.anchor.setTo(0.5, 0.5);
      this.leftArrow.customParams= {direction : -1};

      //Left arrow allow user input
      this.leftArrow.inputEnabled = true;
      this.leftArrow.events.onInputDown.add(this.switchLetter,this);


     //Right Arrow
     //this.rightArrow= this.game.add.sprite(580,this.game.world.centerY,'rightarrow');
     this.rightArrow = this.game.add.sprite(550,this.game.world.centerY - 28,'markHolder');
     this.rightArrowArrow= this.game.add.sprite(580,this.game.world.centerY,'left');
     this.rightArrowArrow.scale.setTo(-1, 1);
    this.rightArrowArrow.anchor.setTo(0.5, 0.5);
      this.rightArrow.customParams= {direction : 1};

      //Right arrow allow user input
      this.rightArrow.inputEnabled = true;
      this.rightArrow.events.onInputDown.add(this.switchLetter,this);


    this.herb = this.game.add.sprite(406, 330, 'herb');
    this.herb.anchor.setTo(0.5);
    this.herb.inputEnabled = true;
    this.herb.events.onInputDown.add(this.pickItem, this);

    this.meat = this.game.add.sprite(458, 330, 'meat');
    this.meat.anchor.setTo(0.5);
    this.meat.inputEnabled = true;
    this.meat.events.onInputDown.add(this.pickItem, this);

    this.water = this.game.add.sprite(500, 330, 'water');
    this.water.anchor.setTo(0.5);
    this.water.inputEnabled = true;
    this.water.events.onInputDown.add(this.pickItem, this);

//Qst Button
    var qstholder = this.game.add.sprite(592,330,'markHolder');
    qstholder.scale.setTo(0.7);
    qstholder.anchor.setTo(0.5);
    var qst = this.add.sprite(592,330,'qstmark');
    qst.anchor.setTo(0.5);
    qstholder.inputEnabled = true;
    qstholder.events.onInputDown.add(function(){
      this.qst_animal.play();
    }, this);

//Back to menu state arrow Button
    var backholder = this.game.add.sprite(55,330,'markHolder');
    backholder.scale.setTo(0.7);
    backholder.anchor.setTo(0.5);
    var back = this.add.sprite(55, 330,'backarrow');
    back.anchor.setTo(0.5);
    backholder.inputEnabled = true;
    backholder.events.onInputDown.add(function(){
      this.state.start('MenuState');
    }, this);

    this.buttons = [this.herb, this.meat, this.water];

    //nothing is selected
    this.selectedItem = null;

    //the user interface (UI) is not blocked at the start
    this.uiBlocked = false;
    
  },

  pickItem: function(sprite, event){

        //if the UI is blocked we can't pick an item
    if(!this.uiBlocked) {
      //console.log('pick item');

      this.clearSelection();

      //alpha to indicate selection
      sprite.alpha = 0.4;

      this.selectedItem = sprite;
      }

  },

  clearSelection : function(){
         //remove transparency from all buttons
    this.buttons.forEach(function(element, index){
      element.alpha = 1;
    });

    //we are not selecting anything now
    this.selectedItem = null;

  },
  placeItem : function(sprite,event){

      if(this.selectedItem && !this.uiBlocked) {
      var x = event.position.x;
      var y = event.position.y;
      //var myAnimalX = this.animal.position.x;
      //var myAnimalY = this.animal.position.y;     
      this.newItem = this.game.add.sprite(x, y, this.selectedItem.key);
      this.newItem.anchor.setTo(0.5);

      this.uiBlocked = true;
     // if (y > 215){
        //move the pet towards the item
        //here this.animal
        var animalMovement = this.game.add.tween(this.currentAnimal);
        animalMovement.to({x: x, y: y}, 700);
        animalMovement.onComplete.add(this.destroyItem, this);      
        
        //start the tween animation
        animalMovement.start();
        //console.log("picked");
        //console.log(this.newItem.key);
     // }else{

        //game.time.events.add(Phaser.Timer.SECOND * 0.4,this.destroyItem , this);
        //console.log("missed");

     // }

      

  }
},
destroyItem: function(){

this.eatmeat = this.currentAnimal.customParams.type =='carnivorous' && this.newItem.key == 'meat';
this.eatherb = this.currentAnimal.customParams.type =='herbivorous' && this.newItem.key == 'herb';
this.drink = this.newItem.key == 'water';
  this.newItem.destroy();
  if(this.eatmeat || this.eatherb || this.drink) {
      this.currentAnimal.animations.play('yammy');
      if(this.drink){
        this.freshy.play();
      }else{
        this.ladid.play();
        var qstDur1= this.ladid.totalDuration;
        game.time.events.add(Phaser.Timer.SECOND * qstDur1, this.animalou1, this);
      }

  }else{
      this.currentAnimal.animations.play('yakky');
      this.ssayi2.play();
      var qstDur2= this.ladid.totalDuration;
      game.time.events.add(Phaser.Timer.SECOND * qstDur2, this.animalou2, this);
  }
  
  this.uiBlocked= false;
},
animalou1 : function(){

  if(this.eatherb){
    this.herby.play();
  }else if(this.eatmeat){
    this.meaty.play();
  }

},

animalou2 : function(){

  if( this.newItem.key == 'herb'){
    this.noherb.play();
  }else if( this.newItem.key == 'meat'){
    this.nomeat.play();
  }

},

switchLetter : function(sprite , event){


    if(this.isMoving){
      return false;
    }
    this.isMoving = true;

    var newAnimal, endX;
    if(sprite.customParams.direction > 0){

      newAnimal = this.animals.next();
      newAnimal.x = -newAnimal.width/2;
      endX =640 + this.currentAnimal.width/2;

    } 
    else
    {

      newAnimal = this.animals.previous();
      newAnimal.x = 640 + newAnimal.width/2;
      endX = -this.currentAnimal.width/2;
    }

    var newAnimalMovement = this.game.add.tween(newAnimal);
    newAnimalMovement.to({x: this.game.world.centerX, y: this.game.world.centerY}, 1000);
    newAnimalMovement.onComplete.add(
        function(){
          this.isMoving= false;
        }, this
      );
    newAnimalMovement.start();

    var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
    currentAnimalMovement.to({x: endX}, 1000);
    currentAnimalMovement.start();
/**
    this.currentLetter.x = endX;
    newLetter.x = this.game.world.centerX;

    **/
    this.currentAnimal = newAnimal;
    this.currentAnimal.customParams.sound.play();

  },

  animateLetter : function(sprite , event){

    sprite.customParams.sound.play();
  }

  

};

