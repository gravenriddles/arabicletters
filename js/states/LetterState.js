//this game will have only 1 state
var LetterState = {
  //load the game assets before the game starts

  //executed after everything is loaded
  create: function() {

    
    //create a sprite for the background
    //this.background = this.game.add.sprite(0, 0, 'gamebackground');
     this.background = this.game.add.sprite(0, 0, 'mainbackground');
     this.board= this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 10, 'board');
     this.board.anchor.setTo(0.5);
     this.board.scale.setTo(0.7);
     this.qst_letter = this.game.add.audio('qst_letter');
   
    //Showing letters in the screen

var letterData =[

       /**
       {key: '3' , audio: 'taSound'} 
      {key: '1' , audio: 'alifSound'},
      {key: '2' , audio: 'baSound'} 
     **/
      
    ];

    var n = 28;

    for(var j = 0; j < n; j++) {
      letterData.push({key:'' + j , audio : j +'Sound'});
    }



    this.letters = this.game.add.group();
    var letter;
    var self = this;
    letterData.forEach(function(element){

       letter= self.letters.create(-1000,self.game.world.centerY, element.key);
       
       letter.customParams = {sound: self.game.add.audio(element.audio)};
      // letter.customParams = {sound: self.game.add.audio('alif')};
       letter.anchor.setTo(0.5); 
       letter.inputEnabled = true;
       letter.events.onInputDown.add(self.animateLetter,self);
    });

    this.currentLetter = this.letters.next();
    this.currentLetter.position.set(this.game.world.centerX,this.game.world.centerY);



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
      this.qst_letter.play();
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

    var newLetter, endX;
    if(sprite.customParams.direction > 0){

      newLetter = this.letters.next();
      newLetter.x = -newLetter.width/2;
      endX =640 + this.currentLetter.width/2;

    } 
    else
    {

      newLetter = this.letters.previous();
      newLetter.x = 640 + newLetter.width/2;
      endX = -this.currentLetter.width/2;
    }

    var newLetterMovement = this.game.add.tween(newLetter);
    newLetterMovement.to({x: this.game.world.centerX}, 1000);
    newLetterMovement.onComplete.add(
        function(){
          this.isMoving= false;
        }, this
      );
    newLetterMovement.start();

    var currentLetterMovement = this.game.add.tween(this.currentLetter);
    currentLetterMovement.to({x: endX}, 1000);
    currentLetterMovement.start();
/**
    this.currentLetter.x = endX;
    newLetter.x = this.game.world.centerX;

    **/
    this.currentLetter = newLetter;

  },

  animateLetter : function(sprite , event){

    sprite.customParams.sound.play();
  }
  

};

