var BootState = {
	//initiate some game-level settings
  init: function() {
    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  preload: function() {
  	this.load.image('mainbackground', 'assets/images/mainbackground.png');
  	this.load.image('loadbarholder', 'assets/images/loadbarholder.png');
    this.load.image('loadbarprogress', 'assets/images/loadbarprogress.png');
  },
  create: function() {
  	//this.game.stage.backgroundColor = '#fff';

  	this.state.start('PreloadState');
  }
};