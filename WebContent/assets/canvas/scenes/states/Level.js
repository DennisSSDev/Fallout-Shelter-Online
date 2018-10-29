
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.2 (Phaser v2.6.2)


class Level extends Phaser.State {
	
	/**
	 * Level.
	 */
	constructor() {
		
		super();
		this.cursors = null;
		this.keyEventScaleIn = null;
		this.keyEventScaleOut = null;
	}
	
	init() {
		
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
		
	}
	
	preload () {	
		this.load.pack('level_only', 'assets/pack.json');
	}
	
	create() {
		var _colored_grass = this.add.sprite(-212.0, -379.0, 'colored_grass');
		_colored_grass.scale.setTo(1.3922020086315436, 1.3922020086315436);
		
		var _Bar_Icons = this.add.group();
		_Bar_Icons.position.setTo(75.0, -8.0);
		_Bar_Icons.scale.setTo(0.8753967560946416, 0.8385930934384439);
		
		var _gear = this.add.sprite(-5.0, 25.0, 'gear', null, _Bar_Icons);
		_gear.scale.setTo(0.799708714809293, 0.799708714809293);
		
		var _power = this.add.sprite(266.0, 25.0, 'power', null, _Bar_Icons);
		_power.scale.setTo(0.79, 0.79);
		
		var _home = this.add.sprite(535.0, 25.0, 'home', null, _Bar_Icons);
		_home.scale.setTo(0.79, 0.79);
		
		var _singleplayer = this.add.sprite(817.0, 25.0, 'singleplayer', null, _Bar_Icons);
		_singleplayer.scale.setTo(0.79, 0.79);
		
		var _the_map = this.add.sprite(-104.0, -230.0, 'the_map');
		_the_map.scale.setTo(0.6980467016225123, 0.6980467016225123);
		
		var _resources_bar = new HealthBar(this.game);
		_resources_bar.position.setTo(140.0, 34.50000762939453);
		
		var _power_bar = new HealthBar(this.game);
		_power_bar.position.setTo(381.0, 35.0);
		
		var _housing_bar = new HealthBar(this.game);
		_housing_bar.position.setTo(618.0, 33.0);
		
		this.add.sprite(143.0, 91.0, 'metalPanel_blue');
		
		this.add.sprite(329.0, 91.0, 'metalPanel_green');
		
		this.add.sprite(536.0, 91.0, 'metalPanel_red');
		
		this.add.sprite(709.0, 91.0, 'metalPanel_yellow');
		
		
		var _Total_Count = new PlayerCount(this.game, 895.0, 13.0);
		this.add.existing(_Total_Count);
		
		var _glassPanel = new Creator_HoverWindow(this.game, 414.0, 284.0);
		this.add.existing(_glassPanel);
		
		var _glassPanel_2 = new Creator_HoverWindow(this.game, 661.0, 285.0);
		this.add.existing(_glassPanel_2);
		
		var _glassPanel_3 = new Creator_HoverWindow(this.game, 907.0, 283.0);
		this.add.existing(_glassPanel_3);
		
		var _glassPanel_4 = new Creator_HoverWindow(this.game, 414.0, 489.0);
		this.add.existing(_glassPanel_4);
		
		var _glassPanel_5 = new Creator_HoverWindow(this.game, 661.0, 489.0);
		this.add.existing(_glassPanel_5);
		
		var _glassPanel_6 = new Creator_HoverWindow(this.game, 907.0, 487.0);
		this.add.existing(_glassPanel_6);
		
		var _dragBomb = new dragItem(this.game, 170, 105);
		this.add.existing(_dragBomb);
		
		/*
		var _adventurer_tilesheet = new citizen(this.game, 420.0, 386.0);
		this.add.existing(_adventurer_tilesheet);
		*/
		var _AI_manager = new AI_manager(this.game, 0, 0, null, null, 3);
		this.add.existing(_AI_manager);
		
		this.game.AI_MANAGER = _AI_manager // global access
		console.log(this.game.AI_MANAGER);
		
		//this.add.existing();
		this.game.world.setBounds(-150, -150, 1400, 1100);
		this.setupInput();
	}
	
	/* state-methods-begin */
	// -- user code here --
	
	setupTick(){
		//init the ticks of the bars here
	}
	
	
	setupInput(){
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.keyEventScaleIn = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.keyEventScaleIn.onDown.add(this.scaleWorldIn, this);
		
		this.keyEventScaleOut = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.keyEventScaleOut.onDown.add(this.scaleWorldOut, this);
	}
	
	scaleWorldIn(){
		this.game.world.scale.x += 0.05;
		this.game.world.scale.y += 0.05;
		if(this.game.world.scale.x > 1.5){
			this.game.world.scale.x = 1.5;
			this.game.world.scale.y = 1.5;
		}
		
	}
	
	scaleWorldOut(){
		this.game.world.scale.x -= 0.05;
		this.game.world.scale.y -= 0.05;
		if(this.game.world.scale.x < .75){
			this.game.world.scale.x = .75;
			this.game.world.scale.y = .75;
		}
	}
	
	update() {
	
	    if (this.cursors.up.isDown)
	    {
	        this.game.camera.y -= 4;
	    }
	    if (this.cursors.down.isDown)
	    {
	        this.game.camera.y += 4;
	    }
	    if (this.cursors.left.isDown)
	    {
	        this.game.camera.x -= 4;
	    }
	    if (this.cursors.right.isDown)
	    {
	        this.game.camera.x += 4;
	    }
	}
	/* state-methods-end */
	
}
/* --- end generated code --- */
// -- user code here --
