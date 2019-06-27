var PreloadState = {
	//load the game assets before the game starts
  preload: function() {

    this.mainbackground = this.add.sprite(0,0,'mainbackground');
    this.loadbarholder = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 80,'loadbarholder');
    this.loadbarholder.anchor.setTo(0.5);


    this.loadbarprogress = this.add.sprite(this.game.world.centerX -150, this.game.world.centerY -22 + 80, 'loadbarprogress');

    this.load.setPreloadSprite(this.loadbarprogress);


//Assets used in home state
    this.load.image('chooseholder', 'assets/images/chooseholder.png');
    //this.load.image('starttext', 'assets/images/starttext.png');
    this.load.audio( 'backgroundsound', ['assets/audio/backgroundsound.ogg', 'assets/audio/backgroundsound.mp3']);
    this.load.image('play', 'assets/images/play.png');

//Assets used in menu state

    this.load.image('letterbook', 'assets/images/letterbook.png');
    this.load.image('wordbook', 'assets/images/wordbook.png');
    this.load.image('zoobook', 'assets/images/zoobook.png');
    this.load.image('numberbook', 'assets/images/numberbook.png');
    this.load.image('colorbook', 'assets/images/colorbook.png');
    this.load.image('formbook', 'assets/images/formbook.png');
    this.load.image('purpleboard', 'assets/images/purpleboard.png');
    //this.load.image('choosetext', 'assets/images/choosetext.png');


//Assets used in Letter State
    this.load.image('board', 'assets/images/board.png');
    this.load.image('markHolder', 'assets/images/markHolder.png');
    this.load.image('left', 'assets/images/left.png');
    this.load.image('backarrow', 'assets/images/backarrow.png');
    this.load.image('qstmark', 'assets/images/qstmark.png');
    this.load.audio('qst_letter', ['assets/audio/qst_letter.ogg', 'assets/audio/qst_letter.mp3']);

    var n = 28;

    for(var j = 0; j < n; j++) {

      this.load.image( j, 'assets/images/letter/'+ j +'.png');
      this.load.image( j + 'Word', 'assets/images/word/'+ j +'Word.png');
      this.load.audio(j + 'Sound', ['assets/audio/'+ j+ 'Sound.ogg', 'assets/audio/'+ j+ 'Sound.mp3']);
      this.load.audio(j + 'WordSound', ['assets/audio/wordSound/'+ j+ 'WordSound.ogg', 'assets/audio/WordSound/'+ j+ 'WordSound.mp3']);
    }



//Assets used in Word State
    this.load.audio('right', ['assets/audio/right.ogg', 'assets/audio/right.mp3']);
    this.load.audio('no', ['assets/audio/no.ogg', 'assets/audio/no.mp3']);
    this.load.audio('qst', ['assets/audio/qst.ogg', 'assets/audio/qst.mp3']);

//Assets used in Zoo State
  this.load.image('zooyard', 'assets/images/zoo/zooyard.png');
  this.load.image('meat', 'assets/images/zoo/apple.png');
  this.load.image('herb', 'assets/images/zoo/candy.png');
  this.load.image('water', 'assets/images/zoo/rubber_duck.png');       
  //Animals graphics
  this.load.spritesheet('fox', 'assets/images/zoo/fox.png', 85, 85, 5); 
  this.load.spritesheet('giraffe', 'assets/images/zoo/giraffe.png', 85, 85, 5); 
  this.load.spritesheet('hippo', 'assets/images/zoo/hippo.png', 85, 85, 5); 
  this.load.spritesheet('sheep', 'assets/images/zoo/sheep.png', 85, 85, 5); 
  this.load.spritesheet('turtle', 'assets/images/zoo/turtle.png', 85, 85, 5); 
  this.load.spritesheet('wolf', 'assets/images/zoo/wolf.png', 85, 85, 5); 
  this.load.spritesheet('zebra', 'assets/images/zoo/zebra.png', 85, 85, 5); 
  //Sounds
  this.load.audio('foxname', ['assets/audio/animalSound/ta3lab.ogg', 'assets/audio/animalSound/ta3lab.mp3']);
  this.load.audio('giraffename', ['assets/audio/animalSound/zarafa.ogg', 'assets/audio/animalSound/zarafa.mp3']);
  this.load.audio('hipponame', ['assets/audio/animalSound/farassnahr.ogg', 'assets/audio/animalSound/farassnahr.mp3']);
  this.load.audio('sheepname', ['assets/audio/animalSound/kharouf.ogg', 'assets/audio/animalSound/kharouf.mp3']);
  this.load.audio('turtlename', ['assets/audio/animalSound/sola7fat.ogg', 'assets/audio/animalSound/sola7fat.mp3']);
  this.load.audio('wolfname', ['assets/audio/animalSound/di2b.ogg', 'assets/audio/animalSound/di2b.mp3']);
  this.load.audio('zebraname', ['assets/audio/animalSound/himar.ogg', 'assets/audio/animalSound/himar.mp3']);
  this.load.audio('ladid', ['assets/audio/animalSound/ladid.ogg', 'assets/audio/animalSound/ladid.mp3']);
  this.load.audio('ssayi2', ['assets/audio/animalSound/ssayi2.ogg', 'assets/audio/animalSound/ssayi2.mp3']);
  this.load.audio('nomeat', ['assets/audio/animalSound/nola7m.ogg', 'assets/audio/animalSound/nola7m.mp3']);
  this.load.audio('noherb', ['assets/audio/animalSound/no3ochb.ogg', 'assets/audio/animalSound/no3ochb.mp3']);
  this.load.audio('fresh', ['assets/audio/animalSound/mon3ich.ogg', 'assets/audio/animalSound/mon3ich.mp3']);
  this.load.audio('herbivorous', ['assets/audio/animalSound/achib.ogg', 'assets/audio/animalSound/achib.mp3']);
  this.load.audio('carnivorous', ['assets/audio/animalSound/la7im.ogg', 'assets/audio/animalSound/la7im.mp3']);
  this.load.audio('qst_animal', ['assets/audio/animalSound/qst_animal.ogg', 'assets/audio/animalSound/qst_animal.mp3']);

//Assets used in Number State
    for(var j = 0; j < 10; j++) {

      this.load.image( "number"+j, 'assets/images/numbers/number'+ j +'.png');
      this.load.audio(j + 'numberSound', ['assets/audio/numberSound/'+ j+ '.ogg', 'assets/audio/numberSound/'+ j+ '.mp3']);
      
    }
    this.load.audio('qst_number', ['assets/audio/numberSound/qst_number.ogg', 'assets/audio/numberSound/qst_number.mp3']);


//Assets used in Color State
    for(var j = 1; j < 9; j++) {

      this.load.image( "color"+j, 'assets/images/colors/'+ j +'.png');
      this.load.audio(j + 'colorSound', ['assets/audio/colorSound/'+ j+ '.ogg', 'assets/audio/colorSound/'+ j+ '.mp3']);
      
    }
    this.load.audio('qst_color', ['assets/audio/colorSound/qst_color.ogg', 'assets/audio/colorSound/qst_color.mp3']);


//Assets used in Form State
    for(var j = 0; j < 7; j++) {

      this.load.image( "form"+j, 'assets/images/forms/'+ j +'.png');
       this.load.audio(j + 'formSound', ['assets/audio/formSound/'+ j+ '.ogg', 'assets/audio/formSound/'+ j+ '.mp3']);
      
    }
    this.load.audio('qst_form', ['assets/audio/formSound/qst_form.ogg', 'assets/audio/formSound/qst_form.mp3']);
  },
  create: function() {
    this.state.start('HomeState');
  }
};