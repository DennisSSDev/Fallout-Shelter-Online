window.onload = function() {
	var game = new Phaser.Game(1024, 768, Phaser.AUTO, '', null, false, true, {"arcade":true});

	// Add the States your game has.
	// game.state.add("Boot", Boot);
	// game.state.add("Menu", Menu);
	// game.state.add("Preload", Preload);
	game.state.add("Level", Level);

	game.state.start("Level");
};
