
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.2 (Phaser v2.6.2)


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
	constructor(aGame, aParent, aName, aAddToStage, aEnableBody, aPhysicsBodyType, stat = 0.67) {
		
		super(aGame, aParent, aName, aAddToStage, aEnableBody, aPhysicsBodyType);
		this.status = stat;
		var _blue_button = this.game.add.sprite(0.0, 0.0, 'blue_button13', null, this);
		_blue_button.scale.setTo(0.7, 0.7);
		
		var _blue_button1 = this.game.add.sprite(2.0, 1.0, 'blue_button01', null, this);
		_blue_button1.scale.setTo(0.6753336780964688, 0.6174401541810791);
		
		this.depleteBar(.3);
		
	}
	
	depleteBar(amount){
		this.status -= amount;
		_blue_button1.scale.setTo(this.status, .617);
	}
	increaseBar(amount){
		this.status += amount;
		_blue_button1.scale.setTo(this.status, .617);
	}
	
	/* group-methods-begin */
	// -- user code here --
	/* group-methods-end */
}
/* --- end generated code --- */
// -- user code here --
