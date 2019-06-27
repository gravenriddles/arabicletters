  var HomeState = {

  create: function() {
      this.game.add.sprite(0,0,'mainbackground');
      
      this.backgroundsound = this.game.add.audio('backgroundsound');
      this.backgroundsound.volume =0.1;
      this.backgroundsound.loop =false;   
      this.backgroundsound.play();
      
     var music = this.backgroundsound;




    var musicSpriteData =[{key :'musicOn',soundState:true},{key :'musicOff',soundState:false}];
    this.musicSprites = this.game.add.group();
    var musicSprite;
    var self = this;
    


    //  var starthorouf = this.add.sprite(this.game.world.centerX , this.game.world.centerY + 80,'chooseholder');
    //   starthorouf.anchor.setTo(0.5);
    //   starthorouf.scale.setTo(1,1.2);
    //  var starthorouftext = this.add.sprite(this.game.world.centerX , this.game.world.centerY + 80,'starttext');
    //  starthorouftext.anchor.setTo(0.5);
    //  starthorouf.inputEnabled = true;


    // starthorouf.events.onInputDown.add(function(){
    //   this.state.start('MenuState',true,false,music);
    // }, this);

    var play = this.add.sprite(this.game.world.centerX , this.game.world.centerY + 60,'play');
    play.scale.setTo(1,0.5);
    play.anchor.setTo(0.5);
    play.inputEnabled = true;
    play.events.onInputDown.add(function(){
      this.state.start('MenuState',true,false,music);
    }, this);


  

  }

  


};