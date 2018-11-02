//A hover window that will be used to spawn icons for power and housing
class Creator_HoverWindow extends Phaser.Sprite {
	/**
	 * Creator_HoverWindow
	 * @param {Phaser.Game} aGame A reference to the currently running game.
	 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
	 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
	 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
	 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
	 */
	constructor(aGame, aX, aY, aKey, aFrame) {
		super(aGame, aX, aY, aKey || 'glassPanel', aFrame  == undefined || aFrame == null? null : aFrame);
		this.scale.setTo(2.354166190595366, 1.8541666476614074);
		this.alpha = 0;
		//the power and housing options
		this.option_1 = null;
		this.option_2 = null;
		//cache for the created option
		this.created_option_1 = false;
		this.created_option_2 = false;
		this.inputEnabled = true;
		//events for user input (mouse)
		this.events.onInputOver.add(this.onHover, this);
		this.events.onInputOut.add(this.onLeftHover, this);
		this.events.onInputUp.add(this.dispenceOptions, this);
		this.onHoverSound = this.game.add.audio("Hover_Build");
		this.onClick = this.game.add.audio("Hover_Click");
	}
	//callback for hovering over the window
	onHover(){
		this.onHoverSound.play();
		this.addTint();
	}
	//callback for leaving the hover area of the window
	onLeftHover(){
		this.removeTint();
	}
	//callback for when you click on the window
	dispenceOptions(){
		this.onClick.play();
		//create the 2 option icons
		if(this.option_1 == null)
			this.createOptions();
		else
			this.removeOptions();
	}
	//tint the hover window orange
	addTint(){
		this.alpha = .5;
		this.tint = 0xff8000;
	}
	removeTint(){
		this.alpha = 0;
		this.tint = 0xffffff;
	}
	//on click create the house icon and the power icon and cache them
	createOptions(){
		this.option_1 = new Room_Creator(this.game,this.x+25, this.y+50,'home', null, this);
		this.option_2 = new Room_Creator(this.game, this.x+125, this.y+50, 'power', null, this);
		this.game.add.existing(this.option_1);
		this.game.add.existing(this.option_2);
	}
	//if you click on the hover window again, destroy the options, remove the cache
	removeOptions(){
		this.option_1.destroy();
		this.option_2.destroy();
		this.option_1 = null;
		this.option_2 = null;
	}
}
