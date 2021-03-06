//the class of the icon that was created by the hover window or room itself
//it will be used to make a new room, destroy a room or uograde the room
class Room_Creator extends Phaser.Sprite {
	/**
	 * Room_Creator
	 * @param {Phaser.Game} aGame A reference to the currently running game.
	 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
	 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
	 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
	 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
	 * @param {Object} obj_creator -> parent
	 */
	constructor(aGame, aX, aY, aKey, aFrame, obj_creator) {
		super(aGame, aX, aY, aKey || 'share2', aFrame  == undefined || aFrame == null? null : aFrame);
		this.scale.setTo(0.75, 0.75);
		this.obj_creator =  obj_creator;
		this.inputEnabled = true;
		this.assigned_key = aKey;
		//callback for mouse input
		this.events.onInputOver.add(this.addTint, this);
		this.events.onInputOut.add(this.removeTint, this); 
		this.events.onInputUp.add(this.construct, this);
		this.room_type = null;
		this.stat = 0;//will be populated by based on creations for increasing the stats of the game
		this.onClickSound = this.game.add.audio("build");
		this.onClickSound_upgrade = this.game.add.audio("upgrade");
		if(this.game.latest_room === undefined){
			this.game.latest_room = null;
		}
		//emitter to spawn when upgrade the room or create a room
		this.emitter = game.add.emitter(0, 0, 120);
		this.emitter.makeParticles('blackSmoke00');
		this.emitter.gravity = 400;
		this.emitter.minParticleScale = .2;
	    this.emitter.maxParticleScale = .4;
	}
	//do this on hover
	addTint(){
		this.tint += 0x00ff00;
	}
	//do this on stop hover
	removeTint(){
		this.tint = 0xffffff;
	}
	//once clicked on the room_creator determine what time of room creator and spawn the correct room for the type
	construct(){
		if(this.assigned_key == "shoppingBasket"){
			//upgrade the parent and spawn particle
			if(this.allowConstruct(this.game.resource_bar, .05)){
				this.game.resource_bar.depleteBar(.2);
				this.onClickSound_upgrade.play();
				this.obj_creator.upgrade();
				this.emitter.x = this.obj_creator.x + 100;
				this.emitter.y = this.obj_creator.y + 50;
				this.emitter.start(true, 3000, null, 10);
				this.emitter.particleBringToTop = true; 
			}
		}
		else if(this.assigned_key == "cross"){
			//remove the parent and destroy self
			this.onClickSound_upgrade.play();
			this.room_type = new Creator_HoverWindow(this.game, this.obj_creator.x, this.obj_creator.y);
			this.game.add.existing(this.room_type);
			this.game.resource_bar.increaseBar(.05);
			if(this.obj_creator != null || this.obj_creator != undefined){
				let res_index = this.game.all_rooms.indexOf(this.obj_creator);
				this.game.all_rooms.splice(res_index, 1);
			}
			this.selfDestruct();
		}
		else if(this.assigned_key == "home"){
			//build new home and destroy the hover window
			if(this.allowConstruct(this.game.resource_bar, .05)){
				this.onClickSound.play();
				this.room_type = new Room(this.game, this.obj_creator.x, this.obj_creator.y, "housing_room");
				this.game.add.existing(this.room_type);
				this.bringCharToFront();
				this.game.latest_room = this.room_type;
				this.game.all_rooms.push(this.room_type);
				this.game.resource_bar.depleteBar(.25);
				this.emitter.x = this.obj_creator.x + 100;
				this.emitter.y = this.obj_creator.y + 50;
				this.emitter.particleBringToTop = true; 
				this.emitter.start(true, 3000, null, 10);
				this.game.world.bringToTop(this.emitter);
				this.selfDestruct();
			}
		}
		else if(this.assigned_key == "power"){
			//build new home and destroy the hoer window
			if(this.allowConstruct(this.game.resource_bar, .05)){
				this.onClickSound.play();
				this.room_type = new Room(this.game, this.obj_creator.x, this.obj_creator.y, "energy_room");
				this.game.add.existing(this.room_type);
				this.game.latest_room = this.room_type;
				this.game.all_rooms.push(this.room_type);
				this.bringCharToFront();
				this.game.resource_bar.depleteBar(.27);// cost is a bit higher than housing
				this.emitter.x = this.obj_creator.x + 100;
				this.emitter.y = this.obj_creator.y + 50;
				this.emitter.particleBringToTop = true; 
				this.emitter.start(true, 3000, null, 10);
				this.game.world.bringToTop(this.emitter);
				this.selfDestruct();
			}
		}
		else{
			console.log("was unable to construct a room");
		}
	}
	//once the an action has been taken and it was valid, destroy this icon
	selfDestruct(){
		if(this.assigned_key == "power" || this.assigned_key == "cross")
			this.obj_creator.option_1.destroy();
		else
			this.obj_creator.option_2.destroy();
		this.obj_creator.destroy();
		this.destroy();
	}
	//check if there is enough resources to build the speicified room
	allowConstruct(bar, amount){
		if(bar.status - amount < 0)
			return false;
		else
			return true;
	}
	//once the room is constructed, the characters around need to be pushed to the front
	bringCharToFront(){
		this.game.AI_MANAGER.aliveCitizens.forEach(c => this.game.world.bringToTop(c));
		this.game.AI_MANAGER.aliveEnemies.forEach(c => this.game.world.bringToTop(c));
	}
}

