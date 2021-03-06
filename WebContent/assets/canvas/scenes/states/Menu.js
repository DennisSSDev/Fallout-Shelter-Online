//-- user code here --
// Jordan Machalek
/* --- start generated code --- */

//Generated by  1.5.2 (Phaser v2.6.2)


class Menu extends Phaser.State {
	
	/**
	 * Menu.
	 */
	constructor() {
		
		super();
		this.doOnce = true;
	}
	
	init() {
		
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		
	}
	
	preload () {
		if(this.doOnce){
			this.load.pack('level', 'assets/pack.json');
			this.doOnce = false;
		}	
	}
	
	create() {
		// Background image
		var _s_colored_desert = this.add.sprite(-4.0, -4.0, 'colored_desert');
		_s_colored_desert.scale.setTo(1.0104976500063336, 0.7569919450115183);
		
		// Title
		this.add.text(250.0, 210.0, 'Bunker Defender', {"font":"bold 70px Arial"});
		
		// Start button
		var _startButton = this.add.group();
		
		this.add.button(450.0, 550.0, 'red_button01', function(){this.game.sound.stopAll();this.game.state.start("Level");}, this, null, null, null, null, _startButton);
		
		this.add.text(480.0, 560.0, 'Click to Start', {"font":"bold 20px Arial"}, _startButton);
		
		// Instructions
		var _instructionsPanel = this.add.group();
		
		var _s_instructions_panel = this.add.sprite(230.0, 125.0, 'red_panel', null, _instructionsPanel);
		_s_instructions_panel.scale.setTo(6.0, 6.0);
		_s_instructions_panel.alpha = 0.0;
		
		var _t_instructions_panel = this.add.text(300.0, 160.0, 'You are in charge of leading a small group of \nsurvivors in an underground bunker. Your orders are as follows:\n\n• Construct new facilities to sustain your citizens\n• Use the tools at your disposal to help protect \n  your citizens against mutants\n• Improve the bunker\'s facilities using building \n  materials you collect from mutants\n• Do not allow all of your citizens to perish from\n  either lack of resources or mutant attacks\n\nFurther notes:\n\n• Your starting materials are limited - use them wisely!\n• Citizens will use up resources over time, the\n  facilities you build will help replenish them\n\nControls:\n\n• Mouse - interact with the bunker and use tools\n• Arrow Keys - pan up/down/left/right\n• A - zoom camera in, S - zoom camera out\n\nGood luck down there!', {"font":"bold 14px Arial"}, _instructionsPanel);
		_t_instructions_panel.alpha = 0.0;
		
		// Button to show/hide instructions
		var _b_instructions = new InstructionButton(this.game, 815.0, 700.0);
		this.add.existing(_b_instructions);
		
		this.add.text(850.0, 710.0, 'Instructions	', {"font":"bold 20px Arial"});
				
		// Byline
		this.add.text(10.0, 740.0, 'A game by Dennis Slavinsky and Jordan Machalek', {"font":"bold 20px Arial"});
		
		// Set data for instructionButton
		_b_instructions.setInstructionPanel(_s_instructions_panel, _t_instructions_panel);
		
		// Setup audio
		let _backgroundMusic = this.game.add.audio("Idle1");
		_backgroundMusic.loop = true;
		_backgroundMusic.play();		
	}
	
	/* state-methods-begin */
	// -- user code here --
	//_b_instructions.setInstructionPanel(_s_instructions_panel, _t_instructions_panel);
	//_s_instructions_panel.alpha = 0.0;
	//_t_instructions_panel.alpha = 0.0;
	//let _backgroundMusic = this.game.add.audio("Idle1");
	//_backgroundMusic.loop = true;
	//_backgroundMusic.play();
	/* state-methods-end */
	
	
}
/* --- end generated code --- */
	// -- user code here --