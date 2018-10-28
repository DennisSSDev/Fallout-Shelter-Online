
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.2 (Phaser v2.6.2)


class Menu extends Phaser.State {
	
	/**
	 * Menu.
	 */
	constructor() {
		
		super();
		
	}
	
	init() {
		
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		
	}
	
	preload () {
		
		this.load.pack('level', 'assets/pack.json');
		
	}
	
	create() {
		var _s_colored_desert = this.add.sprite(-4.0, -4.0, 'colored_desert');
		_s_colored_desert.scale.setTo(1.0104976500063336, 0.7569919450115183);
		
		var _startButton = this.add.group();
		
		this.add.button(450.0, 550.0, 'red_button01', function(){this.game.state.start("Level")}, this, null, null, null, null, _startButton);
		
		this.add.text(480.0, 560.0, 'Click to Start', {"font":"bold 20px Arial"}, _startButton);
		
		var _instructionsPanel = this.add.group();
		
		var _s_instructions_panel = this.add.sprite(250.0, 125.0, 'red_panel', null, _instructionsPanel);
		_s_instructions_panel.scale.setTo(6.0, 6.0);
		
		var _t_instructions = this.add.text(309.0, 177.0, 'Instructions:\n\n• Don\'t let your citizens die\n\nGood Luck Out there!', {"font":"bold 20px Arial"}, _instructionsPanel);
		
		var _b_instructions = new instructionButton(this.game, 815.0, 700.0);
		this.add.existing(_b_instructions);
		
		this.add.text(850.0, 710.0, 'Instructions	', {"font":"bold 20px Arial"});
		
		
		_b_instructions.setInstructionPanel(_s_instructions_panel, _t_instructions);
		
		
	}
	
	/* state-methods-begin */
	// -- user code here --
	//_b_instructions1.setInstructionPanel(_s_instructions_panel);
	/* state-methods-end */
	
}
/* --- end generated code --- */
	// -- user code here --