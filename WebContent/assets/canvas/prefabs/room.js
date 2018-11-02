//the room class that stores the stats that will be accounted to the power and housing bars
class room extends Phaser.Sprite {
	/**
	 * room
	 * @param {Phaser.Game} aGame A reference to the currently running game.
	 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
	 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
	 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
	 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
	 */
	constructor(aGame, aX, aY, aKey, aFrame) {
		super(aGame, aX, aY, aKey || 'energy_room', aFrame  == undefined || aFrame == null? null : aFrame);
		this.scale.setTo(0.369, 0.393);
		this.option_1 = null;
		this.option_2 = null;
		this.stats = 5;
		this.inputEnabled = true;
		this.room_key = aKey;
		//mose events
		this.events.onInputOver.add(this.onHover, this);
		this.events.onInputOut.add(this.onLeftHover, this);
		this.events.onInputUp.add(this.dispenceOptions, this);
		this.onHoverSound = this.game.add.audio("Hover_Build");
		this.onClick = this.game.add.audio("Hover_Click");
	}
	//if there are enough resources, upgrade the the stats
	upgrade(){
		this.stats += 5;
	}
	onHover(){
		this.onHoverSound.play();
		this.addTint();
	}
	onLeftHover(){
		this.removeTint();
	}
	dispenceOptions(){
		this.onClick.play();
		if(this.option_1 == null)
			this.createOptions();
		else
			this.removeOptions();
	}
	addTint(){
		this.tint = 0xff8000;
	}
	removeTint(){
		this.tint = 0xffffff;
	}
	createOptions(){
		this.option_1 = new Room_Creator(this.game,this.x+25, this.y+50,'shoppingBasket', null, this);
		this.option_2 = new Room_Creator(this.game, this.x+125, this.y+50, 'cross', null, this);
		this.game.add.existing(this.option_1);
		this.game.add.existing(this.option_2);
	}
	removeOptions(){
		this.option_1.destroy();
		this.option_2.destroy();
		this.option_1 = null;
		this.option_2 = null;
	}
}
