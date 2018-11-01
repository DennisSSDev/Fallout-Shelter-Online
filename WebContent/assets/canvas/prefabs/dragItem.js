
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.2 (Phaser v2.6.2)


class dragItem extends Phaser.Sprite {
	/**
	 * dragItem
	 * @param {Phaser.Game} aGame A reference to the currently running game.
	 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
	 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
	 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
	 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
	 */
	constructor(aGame, aX, aY, aKey, aFrame) {
		super(aGame, aX, aY, aKey || 'bomb', aFrame  == undefined || aFrame == null? null : aFrame);
		if(aKey == undefined)
			this.scale.setTo(0.27857276114138735, 0.27857276114138735);
		else if(aKey == 'shoppingBasket'){
			this.onClickSound_upgrade = this.game.add.audio("upgrade");
			this.scale.setTo(.8,.8);
			this.x -= 20;
			this.item_type = aKey;
		}
		else if(aKey == 'block'){
			this.scale.setTo(.25,.25);
			this.x += 12;
			this.y += 15;
			this.item_type = aKey;
			this.timer = null;
		}
		else if(aKey == 'increase_fire_rate'){
			this.scale.setTo(.4,.4);
			this.y += 10;
			this.item_type = aKey;
			this.timer = null;
		}
		this.inputEnabled = true;
		this.input.enableDrag();
		this.events.onDragStart.add(this.bringToFront, this);
		this.events.onDragStop.add(this.activateEffect, this);
		if(aKey == undefined){
			this.emitter = game.add.emitter(0, 0, 100);
			this.emitter.makeParticles('explosion01');
			this.emitter.gravity = 100;
			this.item_type = 'bomb';
			this.timer = this.game.time.events.loop(Phaser.Timer.QUARTER, this.bombLanding, this);
			this.explosionSound = this.game.add.audio("Explosion");
		}
	}
	
	bringToFront(){
		this.game.world.bringToTop(this);
	}
	
	activateEffect(){
		switch(this.item_type){
		case 'bomb':
			this.inputEnabled = false;
			this.game.physics.arcade.enable(this);
			this.body.gravity.y = 700;
			break;
		case 'shoppingBasket':
			if(this.game.latest_room != undefined){
				this.onClickSound_upgrade.play();
				this.inputEnabled = false;
				this.game.latest_room.upgrade();
				this.kill();
			}
			break;
		case 'block':
			this.inputEnabled = false;
			this.game.physics.arcade.enable(this);
			this.game.globalBlocker = this;
			this.body.immovable = true;
			this.timer = this.game.time.events.loop(6000, this.removeBlock, this);
			break;
		case 'increase_fire_rate':
			this.game.AI_MANAGER.aliveCitizens.forEach(
					c => {
						c.weapon.fireLimit = 50;
						c.weapon.fireRate = 50;
						c.weapon.bulletLifespan = 1000;
						c.weapon.bulletSpeed = 400;
					}
				);
			this.timer = this.game.time.events.loop(5000, this.resetFireRate, this);
			this.kill();
			break;
		default: console.log("no valid effects");
			break;
		}
	}
	
	resetFireRate(){
		this.game.AI_MANAGER.aliveCitizens.forEach(
				c => {
					c.weapon.fireLimit = 25;
					c.weapon.fireRate = 25;
					c.weapon.bulletLifespan = 2500;
					c.weapon.bulletSpeed = 150;
				}
			);
		this.game.time.events.remove(this.timer);
	}
	
	bombLanding(){
		if(this.y > 596){
			//Spawn particle
			this.emitter.x = this.x;
			this.emitter.y = this.y;
			this.emitter.start(true, 2000, null, 10);
			this.game.AI_MANAGER.destroyAll(this.x);
			this.explosionSound.play();
			this.kill();
			this.game.time.events.remove(this.timer);
		}
	}
	removeBlock(){
		this.game.time.events.remove(this.timer);
		this.game.globalBlocker = null;
		this.kill();
	}
}
