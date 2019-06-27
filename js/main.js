//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('LetterState', LetterState);
game.state.add('NumberState', NumberState);
game.state.add('ColorState', ColorState);
game.state.add('FormState', FormState);
game.state.add('WordState', WordState);
game.state.add('ZooState', ZooState);
game.state.add('MenuState', MenuState);
game.state.add('HomeState', HomeState);
game.state.add('PreloadState', PreloadState);
game.state.add('BootState', BootState);
game.state.start('BootState');
