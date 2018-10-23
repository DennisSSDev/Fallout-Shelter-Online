
window.onload = function() {
	var game = new Phaser.Game(1024, 768, Phaser.AUTO, '', null, false, true, {"arcade":true});

	game.state.add("Menu", Menu);
	game.state.add("Level", Level);
	//game.state.add("Gameover", Gameover);

	game.state.start("Menu");
};

