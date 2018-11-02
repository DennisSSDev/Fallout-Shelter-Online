//a simple emote class that will be spawned when the citizen decides that they need to emote
//after 2 seconds of spawn, delete self
class emote extends Phaser.Sprite {
	/**
	 * emote
	 * @param {Phaser.Game} aGame A reference to the currently running game.
	 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
	 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
	 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
	 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
	 */
	constructor(aGame, aX, aY, aKey, aFrame, call_obj) {
		super(aGame, aX, aY, aKey || 'blob', aFrame  == undefined || aFrame == null? null : aFrame);
		this.scale.setTo(0.2352942404610561, 0.2352942404610561);	
		this.call_obj = call_obj;
		setTimeout(()=>{
			this.destroySelf();
		}, 2000);
	}
	
	destroySelf(){
		this.call_obj.personalEmote = null;
		this.destroy();
	}
}