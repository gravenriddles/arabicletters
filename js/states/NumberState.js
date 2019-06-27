//this game will have only 1 state
var NumberState = {
  //load the game assets before the game starts

  //executed after everything is loaded
  create: function() {

    
    //create a sprite for the background
    //this.background = this.game.add.sprite(0, 0, 'gamebackground');
     this.background = this.game.add.sprite(0, 0, 'mainbackground');
     this.board= this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 10, 'board');
     this.board.anchor.setTo(0.5);
     this.board.scale.setTo(0.7);
     this.qst_number = this.game.add.audio('qst_number');
   
    //Showing numbers in the screen

var letterData =[

       /**
       {key: '3' , audio: 'taSound'} 
      {key: '1' , audio: 'alifSound'},
      {key: '2' , audio: 'baSound'} 
     **/
      
    ];

    var n = 10;

    for(var j = 0; j < n; j++) {
      letterData.push({key:'number' + j , audio : j +'numberSound'});
    }



    this.numbers = this.game.add.group();
    var number;
    var self = this;
    letterData.forEach(function(element){

       number= self.numbers.create(-1000,self.game.world.centerY, element.key);
       
       number.customParams = {sound: self.game.add.audio(element.audio)};
      // number.customParams = {sound: self.game.add.audio('alif')};
       number.anchor.setTo(0.5); 
       number.inputEnabled = true;
       number.events.onInputDown.add(self.animateLetter,self);
    });

    this.currentNumber = this.numbers.next();
    this.currentNumber.position.set(this.game.world.centerX,this.game.world.centerY);



/**
    //center of the world
    this.alif = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'alif');
    
    //place a sprite by it's center, not the top-left corner
    this.alif.anchor.setTo(0.5, 0.5); // or just this.chicken.anchor.setTo(0.5)

    this.alif.inputEnabled = true;
    this.alif.events.onInputDown.add(this.animateLetter,this);
**/

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


    var backholder = this.game.add.sprite(55,this.game.world.centerY + 95,'markHolder');
    backholder.scale.setTo(0.7);
 //var back = this.add.sprite(60, this.game.world.centerY + 100,'back');
 var back = this.add.sprite(60, this.game.world.centerY + 100,'backarrow');

    backholder.inputEnabled = true;

    backholder.events.onInputDown.add(function(){
      this.state.start('MenuState');
    }, this);



 var qstholder = this.game.add.sprite(540,this.game.world.centerY + 95,'markHolder');
    qstholder.scale.setTo(0.7);
    
    var qst = this.add.sprite(550,this.game.world.centerY + 100,'qstmark');
   
    qstholder.inputEnabled = true;
    qstholder.events.onInputDown.add(function(){
      this.qst_number.play();
    }, this);



  },
  //this is executed multiple times per second
  update: function() {
  },

  switchLetter : function(sprite , event){

    if(this.isMoving){
      return false;
    }
    this.isMoving = true;

    var newNumber, endX;
    if(sprite.customParams.direction > 0){

      newNumber = this.numbers.next();
      newNumber.x = -newNumber.width/2;
      endX =640 + this.currentNumber.width/2;

    } 
    else
    {

      newNumber = this.numbers.previous();
      newNumber.x = 640 + newNumber.width/2;
      endX = -this.currentNumber.width/2;
    }

    var newNumberMovement = this.game.add.tween(newNumber);
    newNumberMovement.to({x: this.game.world.centerX}, 1000);
    newNumberMovement.onComplete.add(
        function(){
          this.isMoving= false;
        }, this
      );
    newNumberMovement.start();

    var currentNumberMovement = this.game.add.tween(this.currentNumber);
    currentNumberMovement.to({x: endX}, 1000);
    currentNumberMovement.start();
/**
    this.currentNumber.x = endX;
    newNumber.x = this.game.world.centerX;

    **/
    this.currentNumber = newNumber;

  },

  animateLetter : function(sprite , event){

    sprite.customParams.sound.play();
  }
  

};

