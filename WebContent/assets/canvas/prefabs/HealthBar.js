class HealthBar extends Phaser.Group {
	/**
	 * HealthBar.
	 * @param {Phaser.Game} aGame A reference to the currently running game.
	 * @param {Phaser.Group} aParent The parent Group (or other {@link DisplayObject}) that this group will be added to.    If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
	 * @param {string} aName A name for this group. Not used internally but useful for debugging.
	 * @param {boolean} aAddToStage If true this group will be added directly to the Game.Stage instead of Game.World.
	 * @param {boolean} aEnableBody If true all Sprites created with {@link #create} or {@link #createMulitple} will have a physics body created on them. Change the body type with {@link #physicsBodyType}.
	 * @param {number} aPhysicsBodyType The physics body type to use when physics bodies are automatically added. See {@link #physicsBodyType} for values.
	 */
	constructor(aGame, aParent, aName, aAddToStage, aEnableBody, aPhysicsBodyType) {
		
		super(aGame, aParent, aName, aAddToStage, aEnableBody, aPhysicsBodyType);
		this.status = .617;
		var _blue_button = this.game.add.sprite(0.0, 0.0, 'blue_button13', null, this);
		_blue_button.scale.setTo(0.7, 0.7);
		
		var _blue_button1 = this.game.add.sprite(2.0, 1.0, 'blue_button01', null, this);
		_blue_button1.scale.setTo(0.6753336780964688, 0.6174401541810791);
		
		this.blueBar = _blue_button1;
		this.tick = true;
	}
	
	depleteBar(amount){
		this.status -= amount;
		this.clampScale();
		this.blueBar.scale.setTo(this.status, .617);
	}
	
	increaseBar(amount){
		this.status += amount;
		this.clampScale();
		this.blueBar.scale.setTo(this.status, .617);
	}
	
	setBar(val){
		this.status = val;
		this.clampScale();
		this.blueBar.scale.setTo(this.status, .617);
	}
	
	setTick(val){
		this.tick = val;
	}
	
	update(){
		if(this.tick){
			this.depleteBar(.00005);
		}
	}
	
	clampScale(){
		if(this.status > .674)
			this.status = .674;
		else if(this.status < 0)
			this.status = 0;
	}
	/* group-methods-begin */
	// -- user code here --
	/* group-methods-end */
}
/* --- end generated code --- */
// -- user code here --
