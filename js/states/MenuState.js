var MenuState = {

 init: function(music){

    this.backgroundMusic = music;
 },
	//load the game assets before the game starts
  create: function() {

//Menu Background
    this.game.add.sprite(0,0,'mainbackground');
    this.game.add.sprite(0,0,'purpleboard');



    var bookhorouf = this.add.sprite(this.game.world.centerX + 140, this.game.world.centerY - 80 ,'letterbook');
    bookhorouf.anchor.setTo(0.5);
    bookhorouf.inputEnabled = true;
    bookhorouf.events.onInputDown.add(function(){
        //this.backgroundMusic .stop();
      this.state.start('LetterState');
    }, this);


    var bookkalimat = this.add.sprite(this.game.world.centerX , this.game.world.centerY - 80 ,'wordbook');
    bookkalimat.anchor.setTo(0.5);
    bookkalimat.inputEnabled = true;  
    bookkalimat.events.onInputDown.add(function(){
        //this.backgroundMusic .stop();
      this.state.start('WordState');
    }, this);

     
    var bookhayawanat = this.add.sprite(this.game.world.centerX - 140, this.game.world.centerY - 80 ,'zoobook');
    bookhayawanat.anchor.setTo(0.5);
    bookhayawanat.inputEnabled = true;
    bookhayawanat.events.onInputDown.add(function(){
        //this.backgroundMusic .stop();
      this.state.start('ZooState');
    }, this);


    var booknumbers = this.add.sprite(this.game.world.centerX + 140, this.game.world.centerY +80 ,'numberbook');
    booknumbers.anchor.setTo(0.5);
    booknumbers.inputEnabled = true;
    booknumbers.events.onInputDown.add(function(){
        //this.backgroundMusic .stop();
      this.state.start('NumberState');
    }, this);
   


    var bookcolors = this.add.sprite(this.game.world.centerX , this.game.world.centerY +80 ,'colorbook');
    bookcolors.anchor.setTo(0.5);
    bookcolors.inputEnabled = true;
    bookcolors.events.onInputDown.add(function(){
        //this.backgroundMusic .stop();
      this.state.start('ColorState');
    }, this);


    var bookforms = this.add.sprite(this.game.world.centerX - 140 , this.game.world.centerY + 80 ,'formbook');
    bookforms.anchor.setTo(0.5);
    bookforms.inputEnabled = true;
    bookforms.events.onInputDown.add(function(){
        //this.backgroundMusic .stop();
      this.state.start('FormState');
    }, this);
  }

};