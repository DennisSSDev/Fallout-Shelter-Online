
//Main level of the game
//Any time you see a var followed up with an _name -> generated using Phaser Editor
//Use this for the initialization of the AI_MANAGER (globally stored)
//Initialize stats, bars, UI, main game loop
class Level extends Phaser.State {
	constructor() {
		super();
		this.cursors = null;//keyboard keys stored here
		this.keyEventScaleIn = null;//keys for scaling
		this.keyEventScaleOut = null;
		this.doOnce = true;
	}
	//setup canvas and physics
	init() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
	}
	//load assets for the main level
	preload () {	
		if(this.doOnce){
			this.load.pack('level_only', 'assets/pack.json');
			this.doOnce = false;
		}
		
	}
	//additional setup
	create() {
		//add audio
		let background_music = this.game.add.audio("Idle");
		
		//a lot of generated sprites from the Phaser Editor
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
		
		//the resource, power and housing bars that will keep track of your citizens' housing and power needs
		//resources used to build the other 2
		var _resources_bar = new HealthBar(this.game);
		_resources_bar.position.setTo(140.0, 34.50000762939453);
		this.game.resource_bar = _resources_bar;
		_resources_bar.setTick(false);
		
		var _power_bar = new HealthBar(this.game);
		_power_bar.position.setTo(381.0, 35.0);
		this.game.power_bar = _power_bar;
		
		var _housing_bar = new HealthBar(this.game);
		_housing_bar.position.setTo(618.0, 33.0);
		this.game.housing_bar = _housing_bar;
		
		//background for the special items
		this.add.sprite(143.0, 91.0, 'metalPanel_blue');
		
		this.add.sprite(329.0, 91.0, 'metalPanel_green');
		
		this.add.sprite(536.0, 91.0, 'metalPanel_red');
		
		this.add.sprite(709.0, 91.0, 'metalPanel_yellow');
		
		//total citizen count
		var _Total_Count = new PlayerCount(this.game, 895.0, 13.0);
		this.add.existing(_Total_Count);
		this.game.totalPlayerCount = _Total_Count;
		
		//hoverable panels, from which you'll be able to build your rooms
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
		
		//special items
		var _dragBomb = new DragItem(this.game, 170, 105);
		this.add.existing(_dragBomb);
		
		var _dragFreeUpgrade = new DragItem(this.game, 356, 105, 'shoppingBasket');
		this.add.existing(_dragFreeUpgrade);
		
		var _dragRateOfFire = new DragItem(this.game, 542, 105, 'block');
		this.add.existing(_dragRateOfFire);
		
		var _dragBarrier = new DragItem(this.game, 728, 105, 'increase_fire_rate');
		this.add.existing(_dragBarrier);
		
		//init ai manager and add it as a property to the game as it's going to be passed all around for validating AI data
		var _AI_manager = new AI_manager(this.game, 0, 0, null, null, 3);
		this.add.existing(_AI_manager);
		this.game.AI_MANAGER = _AI_manager // global access
		
		this.game.all_rooms = [];//global access to all the rooms
		
		//game over menu which will start off invisible, and appears as soon as you lose all of your citizens
		var _group = this.add.group();
		_group.position.setTo(-45.0, -54.0);
		var _red_button = this.add.button(333.0, 406.0, 'red_button00', function(){this.game.state.start("Menu"); this.game.sound.stopAll();}, this, null, null, null, null, _group);
		_red_button.scale.setTo(2.4641176784208874, 2.9396432652201105);
		this.add.text(429.0, 431.0, 'Game Over', {"font":"bold 50px Arial"}, _group);
		this.add.text(485.0, 478.0, 'Return to menu\n', {"font":"bold 20px Arial"}, _group);
		_group.alpha = 0;
		_group.children[0].input.enabled = false;
		this.game.gameOverScreen = _group;
		
		//simle UI menu that will be shown as soo as a round of enemies come in
		var _group1 = this.add.group();
		this.add.sprite(402.0, 213.5, 'red_button02', null, _group1);
		this.add.text(415.0, 221.0, 'Wave Incoming!!!\n', {"font":"bold 20px Arial"}, _group1);
		_group1.alpha = 0.0;
		
		this.game.alertMessage = _group1;//global access to the alert message
		
		//begin playing the background music
		this.game.background_music = background_music;
		background_music.play();
		
		//the world bounds. Mainly used to prevent the player camera from moving too far out
		this.game.world.setBounds(-150, -150, 1400, 1100);
		this.setupInput();
		
		//instructions group that appears right at the beginning of the game
		var _group2 = this.add.group();
		
		var _Vault_Boy = this.add.sprite(600.0, 504.0, 'Vault_Boy', null, _group2);
		_Vault_Boy.angle = -26.117541748949453;
		_Vault_Boy.scale.setTo(2.0961280604718544, 2.0961280604718544);
		
		var _red_button2 = this.add.sprite(204.90742886809534, 24.0, 'red_button02', null, _group2);
		_red_button2.scale.setTo(1.9951577312702693, 3.144001044249095);
		
		var _red_button2_3 = this.add.sprite(420.0, 401.75048226275095, 'red_button02', null, _group2);
		_red_button2_3.scale.setTo(1.5077897443430743, 3.7041490425513484);
		
		var _red_button2_2 = this.add.sprite(80.0, 302.28078962484426, 'red_button02', null, _group2);
		_red_button2_2.scale.setTo(1.7511579175693275, 2.9697536660369717);
		
		var _red_button2_1 = this.add.sprite(660.9631856051001, 120.0, 'red_button02', null, _group2);
		_red_button2_1.scale.setTo(1.8867370080044426, 3.625216280924546);
		
		var _cursor_pointer3D_3 = this.add.sprite(600.0, 168.0, 'cursor_pointer3D', null, _group2);
		_cursor_pointer3D_3.angle = 150.06533957655066;
		_cursor_pointer3D_3.scale.setTo(3.37599971486704, 3.8200003270551264);
		
		var _cursor_pointer3D_2 = this.add.sprite(820.0, 48.0, 'cursor_pointer3D', null, _group2);
		_cursor_pointer3D_2.angle = -10.574803337355705;
		_cursor_pointer3D_2.scale.setTo(3.37599971486704, 3.8200003270551264);
		
		var _cursor_pointer3D_1 = this.add.sprite(80.0, 504.0, 'cursor_pointer3D', null, _group2);
		_cursor_pointer3D_1.angle = 230.11120406146873;
		_cursor_pointer3D_1.scale.setTo(3.37599971486704, 3.8200003270551264);
		
		var _cursor_pointer3D = this.add.sprite(700.0, 600.0, 'cursor_pointer3D', null, _group2);
		_cursor_pointer3D.angle = 133.4873025856373;
		_cursor_pointer3D.scale.setTo(3.37599971486704, 3.8200003270551264);
		
		var _text4 = this.add.text(240.0, 40.0, 'Special items:\n- Bomb: kill everything\n- Cart: Free upgrade\n- Block: stop enemies from reaching you\n- Paper Planes: increase rate of fire', {"font":"bold 20px Arial"}, _group2);
		_text4.scale.setTo(0.7700840211142294, 0.7700840211142294);
		
		var _text3 = this.add.text(680.0, 144.0, 'Stats:\n- Gear: resources to spend on buildings\n- Power: sustain power of the vault\n- House: sustain housing for dwellers\n\nKeep your stats in check or your people will die', {"font":"bold 20px Arial"}, _group2);
		_text3.scale.setTo(0.7281119083900458, 0.7281119083900458);
		
		var _text5 = this.add.text(100.0, 336.0, 'Enemies come from here\n\nTap on them to help the citizens', {"font":"bold 20px Arial"}, _group2);
		_text5.scale.setTo(0.9391548357058136, 0.9391548357058136);
		
		var _text6 = this.add.text(440.0, 430.0, 'Your dwellers live here\n\nListen to their suggestions\n\nThey might help', {"font":"bold 20px Arial"}, _group2);
		_text6.scale.setTo(0.8650090348910621, 0.8650090348910621);
		
		//button to press to hid all of the help menus
		var _red_button3 = this.add.button(440.0, 303.8571434867789, 'red_button01', function(){_group2.alpha = 0; this.game.AI_MANAGER.beginRound(); _red_button3.kill()}, this, null, null, null, null, _group2);
		_red_button3.scale.setTo(1.0, 1.326530607037762);
		this.game.pause_label = _red_button3;
		this.add.text(480.0, 325.0, 'Hide Window', {"font":"bold 20px Arial"}, _group2);
	}
	//assign the appropriate keys to scale the windows
	//callback assignment of the funcstions to scale in and scale out the camera view
	setupInput(){
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.keyEventScaleIn = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.keyEventScaleIn.onDown.add(this.scaleWorldIn, this);
		
		this.keyEventScaleOut = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.keyEventScaleOut.onDown.add(this.scaleWorldOut, this);
	}
	//scale in the camera's view
	scaleWorldIn(){
		this.game.world.scale.x += 0.05;
		this.game.world.scale.y += 0.05;
		if(this.game.world.scale.x > 1.5){
			this.game.world.scale.x = 1.5;
			this.game.world.scale.y = 1.5;
		}
		
	}
	//scale out the camera's view
	scaleWorldOut(){
		this.game.world.scale.x -= 0.05;
		this.game.world.scale.y -= 0.05;
		if(this.game.world.scale.x < .75){
			this.game.world.scale.x = .75;
			this.game.world.scale.y = .75;
		}
	}
	//update and respond to the arrow keys and move the camera accordingly
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
	
}
