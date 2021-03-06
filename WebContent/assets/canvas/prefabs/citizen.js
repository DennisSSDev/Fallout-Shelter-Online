

//the human ai that you need to keep alive
//has multiple behavior states for walking around
//has animation states
//has a weapon to protect itself
class Citizen extends Phaser.Sprite {
	/**
	 * citizen
	 * @param {Phaser.Game} aGame A reference to the currently running game.
	 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
	 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
	 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
	 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
	 */
	constructor(aGame, aX, aY, aKey, aFrame) {
		super(aGame, aX, aY, aKey || 'adventurer_tilesheet', aFrame  == undefined || aFrame == null? 0 : aFrame);
		this.scale.setTo(0.7, 0.7);
		//animations setup
		this.animations.add('walk', [9, 10], 6, true);
		this.animations.add('attack', [13, 14, 11, 12], 7, true);
		var _anim_dead = this.animations.add('dead', [19], 1, false);
		_anim_dead.killOnComplete = true;
		this.animations.add('jump', [1], 1, true);
		this.animations.add('idle', [0, 23], 3, true);
		//the looping timer. Used for saving performance
		this.timer = this.game.time.create(false);
		this.timer.loop(250, this.updateState, this);
		//weapon setup
		this.weapon = this.game.add.weapon(3, 'cursor_pointer3D');
		this.weapon.bulletLifespan = 2500;
		this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN ;
	    this.weapon.bulletSpeed = 150;
	    this.weapon.fireRate = 1;
		//stats setup and init executing_command bool
		this.executing_command = false;
		this.health = this.getRandomInt(3, 8);
		this.skill = this.getRandomInt(0, 10);
		this.panicScale = this.getRandomInt(0, 10);
		this.resistance = this.getRandomInt(0,3);
		this.personalEmote = null;
		this.spawnedEmote = false;
		
		this.cost = 1;//all of the citizens on spawn should start with a cost of 1
		//citizen states
		this.AI_STATES = Object.freeze({
			"IDLE": 0,
			"EMOTE": 1,
			"MOVE": 2,
			"UNDER_ATTACK": 3,
			"DEAD": 4
		});
		this.CURRENT_STATE = 0;
		//original position to reuse in case the ai moves too far out
		this.og_position = {"x": this.x, "y": this.y};
		//initialize the basic physics
		//remove the unnecessary collision checks for performance
		this.game.physics.arcade.enable(this);
		this.body.checkCollision.up = false;
		this.body.checkCollision.down = false;
		this.body.checkCollision.right = false;
		//start the update timer
		this.timer.start();
	}
	//update the ai state as long as there are no active actions to complete
	//if there are no commands, enter into the correct state and execute command associated with the state
	updateState(){
		if(this.CURRENT_STATE != this.AI_STATES.DEAD){
			if(!this.executing_command){
				if(this.CURRENT_STATE === this.AI_STATES.IDLE){
					this.animations.play('idle');
					this.og_position.x = this.body.x;
					this.og_position.y = this.body.y;
				}
				else if(this.CURRENT_STATE === this.AI_STATES.EMOTE){
					this.animations.play('jump');
					this.executing_command = true;
				}
				else if(this.CURRENT_STATE === this.AI_STATES.MOVE){
					this.animations.play('walk');
					let rand = Math.random();
					let rand_amount = this.getRandomInt(25, 150);
					if(rand <= .5){
						this.body.moveTo(2000, rand_amount, Phaser.ANGLE_RIGHT);
						this.invertToRight();
					}
					else{
						this.body.moveTo(2000, rand_amount, Phaser.ANGLE_LEFT);
						this.invertToLeft();
					}
					this.executing_command = true;
				}
				else if(this.CURRENT_STATE === this.AI_STATES.UNDER_ATTACK){
					this.executing_command = true;
				}
			}
		}
		else{//play death animation if collided with enemy
			this.animations.play('dead');
		}
		if(this.executing_command){//command execution after the state assignment
			if(this.CURRENT_STATE === this.AI_STATES.EMOTE){
				if(!this.spawnedEmote){
					this.spawnedEmote = true;
					let key_;
					if(Math.random() > .5)
						key_ = 'blob_home';
					else
						key_ = 'blob_power';
					this.personalEmote = new Emote(this.game, this.x+50, this.y-30, key_, null, this);
					this.game.add.existing(this.personalEmote);	
				}
				else if(this.spawnedEmote && this.personalEmote == null){
					this.spawnedEmote = false;
					this.executing_command = false;
					this.CURRENT_STATE = this.AI_STATES.IDLE;
				}
			}
			else if(this.CURRENT_STATE === this.AI_STATES.MOVE){
				if(this.x < 400 || this.x > 1100){
					this.body.velocity.x = 0;
					if(this.x < 400)
						this.x = 400;
					else
						this.x = 1100;
					this.executing_command = false;
					this.CURRENT_STATE = this.AI_STATES.IDLE;
				}
				else if(this.body.velocity.x == 0){
					this.executing_command = false;
					this.CURRENT_STATE = this.AI_STATES.IDLE;
				} 
			}
			else if(this.CURRENT_STATE === this.AI_STATES.UNDER_ATTACK){
				this.invertToLeft();
				this.respondToAttack();
				//the ai manager must reset the ai state of under attack, not the ai
			}
		}
	}
	//random int getter
	getRandomInt(min, max) {
		  min = Math.ceil(min);
		  max = Math.floor(max);
		  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}
	//the function for responding to an enemy round
	//shoot the AI's gun, if did not panic
	respondToAttack(){
		let panic = this.getRandomInt(0,10);
		panic += this.panicScale;
		panic -= this.resistance;
		if(panic >= 15){
			this.animations.play('panic');//need panic anmation
			this.executing_command = true;
		}
		else{
			this.game.world.bringToTop(this.weapon.bullets);
			let angle = this.getRandomInt(145 + this.skill, 250 - this.skill);
			this.weapon.fireAngle = angle;
			this.weapon.fireFrom.x = this.x;
			this.weapon.fireFrom.y = this.y+50;
			this.weapon.fire();
			this.animations.play('attack');
			this.executing_command = true;
		}
	}
	//if the AI needs to turn left, invert the scale
	invertToLeft(){
		if(this.scale.x > 0){
			this.anchor.setTo(1,0);
			this.scale.x *= -1;
		}
	}
	//if the AI needs to turn right, invert the scale
	invertToRight(){
		if(this.scale.x < 0){
			this.anchor.setTo(0,0);
			this.scale.x *= -1;
		}
	}
}
