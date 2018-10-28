
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.2 (Phaser v2.6.2)


class Level extends Phaser.State {
	
	/**
	 * Level.
	 */
	constructor() {
		
		super();
		
	}
	
	init() {
		
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
		
	}
	
	preload () {
		
		this.load.pack('level', 'assets/pack.json');
		
	}
	
	create() {
		var _colored_grass = this.add.sprite(4.149428320943116E-7, -6.710414709232282E-6, 'colored_grass');
		_colored_grass.scale.setTo(1.0, 0.7579720125550314);
		
		var _Bar_Icons = this.add.group();
		_Bar_Icons.position.setTo(75.0, -8.0);
		_Bar_Icons.scale.setTo(0.8753967560946416, 0.8385930934384439);
		
		var _gear = this.add.sprite(-5.0, 25.0, 'gear', null, _Bar_Icons);
		_gear.scale.setTo(0.799708714809293, 0.799708714809293);
		
		var _power = this.add.sprite(249.0, 25.0, 'power', null, _Bar_Icons);
		_power.scale.setTo(0.79, 0.79);
		
		var _home = this.add.sprite(535.0, 25.0, 'home', null, _Bar_Icons);
		_home.scale.setTo(0.79, 0.79);
		
		var _singleplayer = this.add.sprite(817.0, 25.0, 'singleplayer', null, _Bar_Icons);
		_singleplayer.scale.setTo(0.79, 0.79);
		
		var _Bar = this.add.group();
		
		var _blue_button = this.add.sprite(143.0, 31.0, 'blue_button13', null, _Bar);
		_blue_button.scale.setTo(0.7, 0.7);
		
		var _blue_button1 = this.add.sprite(145.0, 32.0, 'blue_button01', null, _Bar);
		_blue_button1.scale.setTo(0.6753336780964688, 0.6174401541810791);
		
		
		
		
	}
	
	/* state-methods-begin */
	// -- user code here --
	/* state-methods-end */
	
}
/* --- end generated code --- */
// -- user code here --