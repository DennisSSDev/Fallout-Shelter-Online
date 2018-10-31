
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.2 (Phaser v2.6.2)


class AI_manager extends Phaser.Sprite {
	/**
	 * AI_manager
	 * @param {Phaser.Game} aGame A reference to the currently running game.
	 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
	 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
	 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
	 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
	 */
	constructor(aGame, aX, aY, aKey, aFrame, startingOutCharacterCount) {
		super(aGame, aX, aY, aKey || 'share2', aFrame  == undefined || aFrame == null? null : aFrame);
		this.renderable = false;
		this.validFloors = {'0': 392, '1': 596};//secretly there should only be 2 valid floors for now
		this.round = 0;
		this.citizenTypes = Object.seal({
			'0': 'adventurer_tilesheet',
			'1': 'female_tilesheet',
			'2': 'player_tilesheet',
			'3': 'soldier_tilesheet'
		});
		this.monsterTypes = Object.seal({
			'0': 'alienBeige',
			'1': 'alienBlue',
			'2': 'alienGreen',
			'3': 'alienYellow'
		});
		
		this.aliveCitizens = [];
		this.aliveEnemies = [];
		this.weapons = []
		this.allBullets = [];
		this.stateRandomizer = -1;
		this.spawnCitizen(startingOutCharacterCount);
		this.totalEnemyCount = startingOutCharacterCount;
		game.time.events.loop(Phaser.Timer.QUARTER, this.ai_Update, this);
		setTimeout(()=>{
			this.beginRound();
		}, 2000);
	}
	ai_Update(){
		this.aliveCitizens.forEach(
				c => {
					if(c.CURRENT_STATE != c.AI_STATES.DEAD 
							&& c.CURRENT_STATE == c.AI_STATES.IDLE 
							&& c.CURRENT_STATE != c.AI_STATES.UNDER_ATTACK 
							&& !c.executing_command)
					{
						let outRand = this.getRandomInt(0,101);
					
						if(outRand <= 40){
							outRand = 0;
						}
						else if(outRand > 40 && outRand <= 90){
							outRand = 2;
						}
						else if(outRand > 90){
							outRand = 1
						}
						else{
							outRand = 0;
						}
						c.CURRENT_STATE = outRand;
					}
				}
		);
	}
	
	beginRound(){
		console.log("I'm spawning enemies");
		this.round++;
		this.totalEnemyCount = this.round*2;
		
		this.totalEnemyCount = this.clamp(this.totalEnemyCount, 1, 9);
		setTimeout(()=>{
			this.spawnEnemies(this.totalEnemyCount);//add roud into this later
			this.game.alertMessage.alpha = 1;
			this.alertCitizens();
		}, 10000);
		// make all alive payers alarmed
	}
	
	alertCitizens(){
		this.aliveCitizens.forEach(c => {c.CURRENT_STATE = c.AI_STATES.UNDER_ATTACK});
	}
	
	spawnEnemies(amount){
		this.aliveEnemies = [];
		let randXpos = -1;
		for(let i = 0; i < amount; i++)
		{
			randXpos = this.getRandomInt(-350, 80);
			this.aliveEnemies.push(new enemy(this.game, randXpos, this.validFloors[this.getRandomValidFloor()], this.monsterTypes[this.getRandomInt(0,4)], null, this.getRandomInt(3500, 6500), this.round + this.getRandomInt(1, 7)));//randomize stats
		}
		this.aliveEnemies.forEach(c => {this.game.add.existing(c)});
	}
	
	spawnCitizen(amount) {
		let selectedSkin = '';
		let randSkin = -1;
		let randXpos = -1;
		for(let i = 0; i < amount; i++)
		{
			randSkin = this.getRandomInt(0, 4);
			randXpos = this.getRandomInt(401, 1199);
			this.aliveCitizens.push(new citizen(this.game, randXpos, this.validFloors[this.getRandomValidFloor()], this.citizenTypes[this.getRandomInt(0,4)]));
		}
		this.aliveCitizens.forEach(c => {this.game.add.existing(c); this.weapons.push(c.weapon);});
	}
	
	getRandomInt(min, max) {
		  min = Math.ceil(min);
		  max = Math.floor(max);
		  return Math.floor(Math.random() * (max - min)) + min;
	}
	
	getRandomValidFloor(){
		let randFloor = Math.random();
		if(randFloor < .5)
			randFloor = 1;
		else
			randFloor = 0;
		return randFloor;
	}
	
	update(){
		this.allBullets = [];
		this.weapons.forEach(c => {
			this.allBullets = this.allBullets.concat(c.bullets);
		});
		this.game.physics.arcade.collide(this.aliveCitizens, this.aliveEnemies, this.collisionCallback, null, this);
		this.game.physics.arcade.collide(this.allBullets, this.aliveEnemies, this.bulletCollisionCallback, null, this);
		
		this.aliveEnemies.forEach(e => {
			if(e != null){
				if(e.x > 1200){
					e.x = -100;
					e.kill();
					this.totalEnemyCount--;
					e = null;
				}
			}
		});
		
		
		if(this.totalEnemyCount <= 0){
			this.game.alertMessage.alpha = 0;
			this.aliveCitizens.forEach(c => {
				c.CURRENT_STATE = c.AI_STATES.IDLE;
				c.executing_command = false;
			});
			this.beginRound();
		}
		if(this.aliveCitizens.length <= 0){
			this.game.gameOverScreen.alpha = 1;
			this.game.world.bringToTop(this.game.gameOverScreen);
			this.game.gameOverScreen.children[0].input.enabled = true;
			this.game.gameOverScreen.x = this.game.camera.x;
			this.game.gameOverScreen.y = this.game.camera.y;
		}
	}
	
	collisionCallback(c,e){//c for citizen, e for enemy
		c.CURRENT_STATE = c.AI_STATES.DEAD;
		let index = this.aliveCitizens.indexOf(c);
		c.kill();
		this.aliveCitizens.splice(index, 1);
		e.body.velocity.x = 0;
	}
	bulletCollisionCallback(e, b){// b for bullet, e for enemy
		b.kill();
		e.hit();
		if(e.health <= 0){
			e.spawnLoot();
			e.kill();
			this.totalEnemyCount--;
		}
	}
	clamp(num, min, max) {
		  return num <= min ? min : num >= max ? max : num;
	}
}
/* --- end generated code --- */
// -- user code here --
