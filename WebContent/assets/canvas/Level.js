
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
		
	}
	
	preload () {
		
		this.load.pack('level', 'assets/pack.json');
		
	}
	
	create() {
		var _bg = this.add.sprite(-7.259316916180637, -0.2943999082628306, 'bg');
		_bg.scale.setTo(0.774608753836485, 1.0276480894429418);
		
		this.add.sprite(38.0, 452.0, 'environ', 'ground-0');
		
		this.add.sprite(166.0, 452.0, 'environ', 'ground-1');
		
		this.add.sprite(294.0, 452.0, 'environ', 'ground-2');
		
		this.add.sprite(265.0, 398.0, 'environ', 'grass-1');
		
		var _tree_ = this.add.sprite(10.0, 127.0, 'environ', 'tree-1');
		_tree_.scale.setTo(2.0687500039674838, 2.072000037051153);
		
		var _dino = new Dino(this.game, 113.0, 259.0);
		this.add.existing(_dino);
		
		this.add.sprite(453.0, 306.0, 'environ', 'bridge');
		
		var _coins = this.add.group();
		
		var _coins0 = new Coin(this.game, 488.0, 170.0);
		_coins.add(_coins0);
		
		var _coins1 = new Coin(this.game, 424.0, 170.0);
		_coins.add(_coins1);
		
		var _coins2 = new Coin(this.game, 552.0, 170.0);
		_coins.add(_coins2);
		
		
		
		// fields
		
		this.fDino = _dino;
		this.fCoins0 = _coins0;
		this.fCoins1 = _coins1;
		this.fCoins2 = _coins2;
		// my creation user code
		this.initObjects();
		
	}
	
	/* state-methods-begin */
	
	initObjects() {
		// this.fDino.fAnim_walk.play();
	}
	
	/* state-methods-end */
	
}
/* --- end generated code --- */
// -- user code here --
