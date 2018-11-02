//The monster that will be spawned in during the start of each round
//move to the right until reached the very end of the screen, destroy self
//if collide wih human, slow down a bit and move along
class enemy extends Phaser.Sprite {
	/**
	 * enemy
	 * @param {Phaser.Game} aGame A reference to the currently running game.
	 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
	 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
	 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
	 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
	 * @param {Number} timeToTakeToMove is passed in to specify how long to take to cover the speicifed distance
	 * @param {Number} health is how much damage the enemy can take
	 * @param {Number} round is the current round that the player is going through. This number will be used as a multiplier for the enmy stats 
	 */
	constructor(aGame, aX, aY, aKey, aFrame, timeToTakeToMove, health, round) {
		//if the enemy iis of certain health value, change the scale
		
		super(aGame, aX, aY, aKey || 'alienBlue', aFrame  == undefined || aFrame == null? 0 : aFrame);
		this.round = round;
		if(this.round != undefined){//randomize the enemy's scale based on the round
			if(this.round > 3){
				let rand_store = Math.random();
				if(rand_store < .6){
					this.scale.setTo(0.9+rand_store, 0.9+rand_store);
					if(this.round > 5){
						let rand_double = Math.random()*2;
						this.scale.setTo(0.9+rand_store + rand_double, 0.9+rand_store + rand_double);
					}
				}
				else{
					this.scale.setTo(0.9, 0.9);
				}
			}
		}
		this.moveTime = timeToTakeToMove;
		this.health = health;
		//setup Physics
		this.game.physics.arcade.enable(this);
		this.body.checkCollision.down = false;
		this.body.checkCollision.left = false;
		//loop timer to keep the enemy to go to the right
		this.timer = this.game.time.create(false);
		this.timer.loop(300, this.updateState, this);
		this.timer.start();
		this.movingRight = false;
		this.targetLoc = this.x + 500;
		//they must move to the right regardless of colliding with anything (aside from the block item)
		this.body.stopVelocityOnCollide = false;
		this.inputEnabled = true;
		//bind the hit function and the sounds for tapping the enemy
		this.events.onInputUp.add(this.hit, this);
		this.hitSound = this.game.add.audio("hit_sound");
		//assign a loot drop for the enemy. It will be dropped on death
		this.loot = new Resource(this.game, this.x, this.y, );
		this.emitter = game.add.emitter(0, 0, 100);//emitter for tapping the enemy
		this.emitter.makeParticles('explosion01');
		this.emitter.gravity = 100;
		this.emitter.minParticleScale = .01;
	    this.emitter.maxParticleScale = .05;
	}
	//continuosly make the AI move to the right
	updateState(){
		this.body.moveTo(this.moveTime, this.targetLoc, Phaser.ANGLE_RIGHT);
	}
	//callback for hitting or tapping the enemy
	//Spawn an emitter and remove health from the enemy
	hit(){
		//instantiate a particle effect
		this.emitter.x = this.x + 45;
		this.emitter.y = this.y + 35;
		this.emitter.start(true, 1000, null, 10);
		this.emitter.particleBringToTop = true; 
		this.game.world.bringToTop(this.emitter);
		this.hitSound.play();
		this.health--;
	}
	//function to call when the AI is killed
	spawnLoot(){
		this.loot.x = this.x;
		this.loot.y = this.y;
		this.game.add.existing(this.loot);
	}
}
