//this game state is for matching the letter with the word that starts with the same letter
var WordState = {

  //executed after everything is loaded
  create: function() {
    this.qst =this.game.add.audio('qst');
    this.rightAnswer =this.game.add.audio('right');
    this.wrongAnswer =this.game.add.audio('no');
    //create a sprite for the background
     this.background = this.game.add.sprite(0, 0, 'mainbackground');
     //create a sprite for the white board
     this.board= this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 10, 'board');
     this.board.anchor.setTo(0.5);
     this.board.scale.setTo(0.7);
/**
    this.option1 = this.game.add.sprite(this.game.world.centerX - 150,this.game.world.centerY + 30,'1Word');
    this.option1.anchor.setTo(0.5);
    this.option1.scale.setTo(2);
    this.option1.inputEnabled = true;
    this.option1.events.onInputDown.add(this.destroySprite,this);
 **/

    //Showing letters in the screen

    var letterData =[];

    //Contains 28 words each starts with different arabic letter
    var wordData = [];

    //Contains 28 array each array is an array that contains 3 options : 
    //eatch option is a distinct combination of integer number from 0 to 27 
    // each elmement n must have as fst option the value of the  number n and the other 
    //two options are an integer number from 0 to 27 and different to n 
    //the options represents the index of the wordData array
    var wordDataIndex =[];

    //Contains 28 array each array is an array that contains 3 randomized options : 
    //eatch option is a word from wordData 
    // each elmement n must have an option a word n from wordData and the other 
    //two options are words from wordData with index 0 to 27 and different to n
    this.randomizedWordDataGroup =[];


//adding letter elements to letterData 
//adding word elements to wordData 
    var n = 28;
    for(var j = 0; j < n; j++) {
      letterData.push({key: j +'', audio : j +'Sound'});
      wordData.push({key: j +'Word', audio : j + 'WordSound', begin: j +''});
    }


// Adding elements to wordDataIndex

  wordDataIndex.push([0, game.rnd.integerInRange(1, 14), game.rnd.integerInRange(15, 27)]);
  wordDataIndex.push([1, game.rnd.integerInRange(2, 14), game.rnd.integerInRange(15, 27)]);
  wordDataIndex.push([2, game.rnd.integerInRange(3, 14), game.rnd.integerInRange(15, 27)]);
  for (var i = 3; i < 25; i++) {
    wordDataIndex.push([i, game.rnd.integerInRange(0, i - 1), game.rnd.integerInRange(i + 1, 27)]);
  }
  wordDataIndex.push([25, game.rnd.integerInRange(1, 14), game.rnd.integerInRange(15, 24)]);
  wordDataIndex.push([26, game.rnd.integerInRange(1, 14), game.rnd.integerInRange(15, 25)]);
  wordDataIndex.push([27, game.rnd.integerInRange(1, 14), game.rnd.integerInRange(15, 26)]);


// randomize wordDataIndex and add words from wordData to randomizedWordDataGroup
for (var i = 0; i < 28; i++) {
    var arr = [];
    //random distinct number from 1 to 3
    while(arr.length < 3){
      var randomnumber=Math.ceil(Math.random()*3)
      var found=false;
      for(var j=0;j<arr.length;j++){
      if(arr[j]==randomnumber){found=true;break}
      }
      if(!found)arr[arr.length]=randomnumber;
    }
    var x= arr[0] - 1;
    var y= arr[1] - 1;  
    var z= arr[2] - 1;
    //console.log(this.wordDataIndex[i]);
    var indexX = wordDataIndex[i][x];
    var indexY = wordDataIndex[i][y];
    var indexZ = wordDataIndex[i][z];
 
    this.randomizedWordDataGroup.push([wordData[indexX], wordData[indexY], wordData[indexZ]]);
  
 }

  // Creating the group of arabic letters to move right or left
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
    this.currentLetter.position.set(this.game.world.centerX,this.game.world.centerY - 80);

    this.currentLetter.scale.setTo(0.7);

   // Creating the group of arabic word as fst option if it match the currentletter

    this.fstOptions = this.game.add.group();
    var option1;
    this.sndOptions = this.game.add.group();
    var option2;
    this.thrdOptions = this.game.add.group();
    var option3;

    this.randomizedWordDataGroup.forEach(function(element){

      option1= self.fstOptions.create(-1000,self.game.world.centerY + 30, element[0].key);
      option1.customParams = {sound: self.game.add.audio(element[0].audio), letterBegin: element[0].begin};
      option1.anchor.setTo(0.5); 
      option1.inputEnabled = true;
      option1.events.onInputDown.add(self.checkMatch,self);
       
       //option1.events.onInputDown.add(self.animateLetter,self);
      //console.log(element[0].key);

      option2= self.sndOptions.create(-1000,self.game.world.centerY + 30, element[1].key); 
      option2.customParams = {sound: self.game.add.audio(element[1].audio), letterBegin: element[1].begin};
      option2.anchor.setTo(0.5); 
      option2.inputEnabled = true;
      option2.events.onInputDown.add(self.checkMatch,self);
      
       //option2.events.onInputDown.add(self.animateLetter,self);
      //console.log(element[1].key);

      option3= self.thrdOptions.create(-1000,self.game.world.centerY + 30, element[2].key);
      option3.customParams = {sound: self.game.add.audio(element[2].audio), letterBegin: element[2].begin};
      option3.anchor.setTo(0.5); 
      option3.inputEnabled = true;
      option3.events.onInputDown.add(self.checkMatch,self);
      
      // option3.events.onInputDown.add(self.animateLetter,self);
      //console.log(element[2].key);

    });
    this.currentFstOption = this.fstOptions.next();
    this.currentFstOption.position.set(this.game.world.centerX - 150,this.game.world.centerY + 30);
    //this.currentFstOption.scale.setTo(2);

    this.currentSndOption = this.sndOptions.next();
    this.currentSndOption.position.set(this.game.world.centerX ,this.game.world.centerY + 30);
    //this.currentSndOption.scale.setTo(2);

    this.currentThrdOption = this.thrdOptions.next();
    this.currentThrdOption.position.set(this.game.world.centerX + 150,this.game.world.centerY + 30);
    //this.currentThrdOption.scale.setTo(2);



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
      if(this.isPlayingSound){
      return false;
    }
      this.state.start('MenuState');
    }, this);

var qstholder = this.game.add.sprite(540,this.game.world.centerY + 95,'markHolder');
qstholder.scale.setTo(0.7);
 //var qst = this.add.sprite(530, this.game.world.centerY + 100,'qst');
 var qst = this.add.sprite(550, this.game.world.centerY + 100,'qstmark');
 qst.inputEnabled = true;
qst.events.onInputDown.add(this.playQst, this);
this.playQst();


  },

  //this is executed multiple times per second
  update: function() {

  },

  playQst: function(){
    if(this.isPlayingSound){
      return false;
    }
     this.isPlayingSound = true;
      this.qst.play();
      var qstDur = this.qst.totalDuration;
      game.time.events.add(Phaser.Timer.SECOND * qstDur, this.playCurrentLetter, this);
    },

  switchLetter : function(sprite , event){
    //this.qst.play();
    if(this.isPlayingSound){
      return false;
    }

    if(this.isMoving){
      return false;
    }
    this.isMoving = true;

    var newLetter, endX;
    var newFstOption, endXFstOption;
    var newSndOption, endXSndOption;
    var newThrdOption, endXThrdOption;

    if(sprite.customParams.direction > 0){

      newLetter = this.letters.next();
      newLetter.x = -newLetter.width/2;
      newLetter.y = this.game.world.centerY - 80;
      endX =640 + this.currentLetter.width/2;

      newFstOption = this.fstOptions.next();
      newFstOption.x = - newFstOption.width/2 ;
      newFstOption.y = this.game.world.centerY +30;
      endXFstOption = 640 +this.currentFstOption.width/2;

      newSndOption = this.sndOptions.next();
      newSndOption.x = - newSndOption.width/2;
      newSndOption.y = this.game.world.centerY +30;
      endXSndOption = 640 +this.currentSndOption.width/2;

      newThrdOption = this.thrdOptions.next();
      newThrdOption.x = - newThrdOption.width/2;
      newThrdOption.y = this.game.world.centerY +30;
      endXThrdOption = 640 +this.currentThrdOption.width/2;

    } 
    else
    {

      newLetter = this.letters.previous();
      newLetter.x = 640 + newLetter.width/2;
      newLetter.y = this.game.world.centerY - 80;
      endX = -this.currentLetter.width/2;

      newFstOption = this.fstOptions.previous();
      newFstOption.x = 640 + newFstOption.width/2;
      newFstOption.y = this.game.world.centerY +30;
      endXFstOption = -this.currentFstOption.width/2;

      newSndOption = this.sndOptions.previous();
      newSndOption.x = 640 + newSndOption.width/2;
      newSndOption.y = this.game.world.centerY +30;
      endXSndOption = -this.currentSndOption.width/2;

      newThrdOption = this.thrdOptions.previous();
      newThrdOption.x = 640 + newThrdOption.width/2;
      newThrdOption.y = this.game.world.centerY +30;
      endXThrdOption = -this.currentThrdOption.width/2;
    }

    var newLetterMovement = this.game.add.tween(newLetter);
    newLetterMovement.to({x: this.game.world.centerX , y: this.game.world.centerY - 80}, 1000);
    newLetterMovement.onComplete.add(
       function(){
         this.isMoving= false;
       }, this
      );
    newLetterMovement.start();
    //newLetter.position.set(this.game.world.centerX,this.game.world.centerY - 80);

    var currentLetterMovement = this.game.add.tween(this.currentLetter);
    currentLetterMovement.to({x: endX, y: this.game.world.centerY - 80}, 1000);
    currentLetterMovement.start();

   //this.currentLetter.position.set(endX,this.game.world.centerY - 80);

 var newFstOptionMovement = this.game.add.tween(newFstOption);
    newFstOptionMovement.to({x: this.game.world.centerX -150 , y: this.game.world.centerY +30}, 1000);
    newFstOptionMovement.start();
    //newLetter.position.set(this.game.world.centerX,this.game.world.centerY - 80);
    var currentFstOptionMovement = this.game.add.tween(this.currentFstOption);
    currentFstOptionMovement.to({x: endXFstOption, y: this.game.world.centerY +30}, 1000);
    currentFstOptionMovement.start();


 var newSndOptionMovement = this.game.add.tween(newSndOption);
    newSndOptionMovement.to({x: this.game.world.centerX , y: this.game.world.centerY +30}, 1000);
    newSndOptionMovement.start();
    //newLetter.position.set(this.game.world.centerX,this.game.world.centerY - 80);
    var currentSndOptionMovement = this.game.add.tween(this.currentSndOption);
    currentSndOptionMovement.to({x: endXSndOption, y: this.game.world.centerY +30}, 1000);
    currentSndOptionMovement.start();

var newThrdOptionMovement = this.game.add.tween(newThrdOption);
    newThrdOptionMovement.to({x: this.game.world.centerX + 150, y: this.game.world.centerY +30}, 1000);
    newThrdOptionMovement.start();
    //newLetter.position.set(this.game.world.centerX,this.game.world.centerY - 80);
    var currentThrdOptionMovement = this.game.add.tween(this.currentThrdOption);
    currentThrdOptionMovement.to({x: endXThrdOption, y: this.game.world.centerY +30}, 1000);
    currentThrdOptionMovement.start();


/**
    this.currentLetter.x = endX;
    newLetter.x = this.game.world.centerX;

    **/
    this.currentLetter = newLetter;
    this.currentLetter.scale.setTo(0.7);

    this.currentFstOption = newFstOption;
    //this.currentFstOption.scale.setTo(2);

    this.currentSndOption = newSndOption;
    //this.currentSndOption.scale.setTo(2);

    this.currentThrdOption = newThrdOption;
    //this.currentThrdOption.scale.setTo(2);
    this.isPlayingSound = true;
      this.playCurrentLetter();
    //this.isPlayingSound = true;
     // this.qst.play();
     // var qstDur = this.qst.totalDuration;
      //game.time.events.add(Phaser.Timer.SECOND * qstDur, this.playCurrentLetter, this);
    },


  animateLetter : function(sprite , event){

     if(this.isPlayingSound){
      return false;
    }
    this.isPlayingSound = true;
    sprite.customParams.sound.play();
    var r = sprite.customParams.sound.totalDuration;
    game.time.events.add(Phaser.Timer.SECOND * r, this.allowPlaynigSound, this);
  },

  //Check if the word begin whith the current letter
  checkMatch: function(sprite , event){
     if(this.isPlayingSound){
      return false;
    }
    this.isPlayingSound = true;
        var answer =sprite.customParams.sound;
        answer.play();
        var dur =answer.totalDuration;
        this.x =sprite.customParams.letterBegin;
       
        game.time.events.add(Phaser.Timer.SECOND * dur, this.correctAnswer, this);

  },

  correctAnswer: function(){

   // console.log(this.x);
   // console.log(this.currentLetter.key);
    var durRight = this.rightAnswer.totalDuration;
    var durWrong = this.wrongAnswer.totalDuration;
     if(this.x == this.currentLetter.key){
      this.rightAnswer.play();
       game.time.events.add(Phaser.Timer.SECOND * durRight, this.allowPlaynigSound, this);

       // console.log('good! it is!');
        
       
      }else{
        this.wrongAnswer.play();
        game.time.events.add(Phaser.Timer.SECOND * durWrong, this.allowPlaynigSound, this);
        //console.log('bad! it is not!');
       //this.wrongAnswer.play();
       
      }
 
  },

  allowPlaynigSoundRight: function(){

    this.isPlayingSound = false;
  },
   allowPlaynigSound: function(){
 
    this.isPlayingSound = false;
  },
  playCurrentLetter: function(){
    this.currentLetter.customParams.sound.play();
    var d =this.currentLetter.customParams.sound.totalDuration;
    game.time.events.add(Phaser.Timer.SECOND * d, this.allowPlaynigSound, this);
  }

  
};

