//the loot drop for the player to collect
//this is the only way to increase the resources bar
class Resource extends Phaser.Sprite {
	/**
	 * Resource
	 * @param {Phaser.Game} aGame A reference to the currently running game.
	 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
	 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
	 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
	 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
	 */
	constructor(aGame, aX, aY, aKey, aFrame) {
		super(aGame, aX, aY, aKey || 'environments4', aFrame  == undefined || aFrame == null? 'elementStone007' : aFrame);
		this.scale.setTo(0.6790204717571736, 0.6790204717571736);
		this.inputEnabled = true;
		this.events.onInputUp.add(this.pickup, this);
		this.onClickSound = this.game.add.audio("pickup");
	}
	//callback to use when the player click on the loot
	pickup(){
		this.onClickSound.play();
		this.game.resource_bar.increaseBar(this.getRandomFloat(.02, .06));//increase the bar amount for the resources
		this.kill();
	}
	//used this function for randomizing the total reward the player gets from this loot
	getRandomFloat(min, max) {
		  return (Math.random() * (max - min)) + min;
	}
}
