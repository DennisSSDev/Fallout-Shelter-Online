//Main class for supervising anything related to the AI in the game (collisions, behavior, spawning, etc)
//It can be globally accessible by other classes in order to validate some piece of data, i.e are 2 AI characters colliding
//AI_Manager is also responsible to update the stats bars as the citizens direct;y impact the cost of the housing ans power bars

class AI_manager extends Phaser.Sprite {
	/**
	 * AI_manager
	 * @param {Phaser.Game} aGame A reference to the currently running game.
	 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
	 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
	 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
	 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
	 * @param {Number} startingOutCharacterCount is given the initial count of the citizens to start out with
	 */
	constructor(aGame, aX, aY, aKey, aFrame, startingOutCharacterCount) {
		super(aGame, aX, aY, aKey || 'share2', aFrame  == undefined || aFrame == null? null : aFrame);
		this.renderable = false;//this is a background script, it doesn't need to be rendered
		this.validFloors = {'0': 392, '1': 596};//secretly there should only be 2 valid floors
		this.round = 0;
		this.requestKillAll = false;
		//different possible types of citizens in the game
		this.citizenTypes = Object.seal({
			'0': 'adventurer_tilesheet',
			'1': 'female_tilesheet',
			'2': 'player_tilesheet',
			'3': 'soldier_tilesheet'
		});
		//different possible types of monsterin the game
		this.monsterTypes = Object.seal({
			'0': 'alienBeige',
			'1': 'alienBlue',
			'2': 'alienGreen',
			'3': 'alienYellow'
		});
		this.alarm = this.game.add.audio("FoS_Alarm");//audio to play when the round starts
		this.battleMusic = this.game.add.audio("Under_Attack");//ambient sound to play until the round ends
		this.citizenDeathSound = this.game.add.audio("groan");//sound to play once a monster and human collide
		this.newMemberSound = this.game.add.audio("new_member");//sound to play once a new member arrives
		//all of the alive citizens at the active game
		this.aliveCitizens = [];
		//all of the alive enemies for the speicifc round
		this.aliveEnemies = [];
		//all of the weapons of all the citizens
		this.weapons = []
		//all of the bullets that are being exerted by the weapons array
		this.allBullets = [];
		this.stateRandomizer = -1;
		this.gameOver = false;
		//initialize the first few citizens
		this.spawnCitizen(startingOutCharacterCount);
		//initialize the total enemy count 
		this.totalEnemyCount = startingOutCharacterCount;
		//using a timer for the update ai loop in order to save performance
		game.time.events.loop(Phaser.Timer.QUARTER, this.ai_Update, this);
		//every 40 seconds check whether the citizens are doing wel or not. If they're doing great, more will arive
		game.time.events.loop(40000, this.checkCitizenStatus, this);
	}
	//the loop for checking the desired behavior for the citizens ai
	//assign a command to them and don't bother until they execute it
	//once executing is complete, determine the next logical move
	//repeat
	//don't do anything if the ai is dead, under attack or executing a command
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
	//function to call every 40 seconds to check up on the humans
	//if both power and housing are in good shape -> spawn more humans
	//if the bars are average, don't do anything
	//if the bars are doing poorly or below average, kill off one random human :)
	checkCitizenStatus(){
		if(!this.gameOver){
			if(this.game.power_bar.status < .224 || this.game.housing_bar.status < .224){
				//pick an random citizen and kill him
				let pick_citizen = this.getRandomInt(0, this.aliveCitizens.length);
				this.aliveCitizens[pick_citizen].kill();
				this.citizenDeathSound.play();
				this.aliveCitizens.splice(pick_citizen, 1);
			}
			else if(this.game.power_bar.status >= .400 && this.game.housing_bar.status >= .400){
				//add a new citizen or increase the cost of a citizen, but add skill to him
				this.newMemberSound.play();
				if(this.aliveCitizens.length < 7){
					this.spawnCitizen(1);
				}
				else{
					let pick_citizen = this.getRandomInt(0, this.aliveCitizens.length);
					this.aliveCitizens[pick_citizen].cost += this.getRandomInt(1,6);
					this.aliveCitizens[pick_citizen].skill += this.getRandomInt(1,9);
				}	
			}
			this.game.totalPlayerCount.updateCount(this.aliveCitizens.length);
		}
	}
	//call this everytime the player manages to sustain an attack
	//increase the round count
	//increase enemy count for next round
	//wait for a bit for the player to prepare for next round
	//once done, sound the alarm and start the enemies pouring in
	//alert all of the citizens
	beginRound(){
		this.round++;
		this.totalEnemyCount = this.round*2;
		this.totalEnemyCount = this.clamp(this.totalEnemyCount, 1, 9);
		setTimeout(()=>{
			this.game.background_music.fadeOut(2000);
			this.alarm.fadeIn(1000);
			this.battleMusic.fadeIn(2000);
			this.spawnEnemies(this.totalEnemyCount);
			this.game.alertMessage.alpha = 1;
			this.alertCitizens();// make all alive payers alarmed
		}, 10000);
	}
	//change the status of all the citizens to UNDER_ATTACK
	alertCitizens(){
		this.aliveCitizens.forEach(c => {c.CURRENT_STATE = c.AI_STATES.UNDER_ATTACK});
	}
	/**
	 * @param {Number} amount is the total count of enemies to spawn 
	 * this method deals with randomizing all the enemies and which floor they will appear
	 * once added calculate them all -> add to the world
	*/
	spawnEnemies(amount){
		this.aliveEnemies = [];
		let randXpos = -1;
		for(let i = 0; i < amount; i++)
		{
			randXpos = this.getRandomInt(-350, 80);
			this.aliveEnemies.push(new Enemy(this.game, randXpos, this.validFloors[this.getRandomValidFloor()], this.monsterTypes[this.getRandomInt(0,4)], null, this.getRandomInt(3500, 6500), this.round + this.getRandomInt(1, 7), this.round));//randomize stats
		}
		this.aliveEnemies.forEach(c => {this.game.add.existing(c)});
	}
	/**
	 * @param {Number} amount is the total count of humans to spawn
	 * randomize the skin
	 * randomize the floor
	 * randomize the skill and health
	 * spawn and add them to the world
	*/
	spawnCitizen(amount) {
		let selectedSkin = '';
		let randSkin = -1;
		let randXpos = -1;
		for(let i = 0; i < amount; i++)
		{
			randSkin = this.getRandomInt(0, 4);
			randXpos = this.getRandomInt(401, 1199);
			this.aliveCitizens.push(new Citizen(this.game, randXpos, this.validFloors[this.getRandomValidFloor()], this.citizenTypes[this.getRandomInt(0,4)]));
		}
		this.aliveCitizens.forEach(c => {this.game.add.existing(c); this.weapons.push(c.weapon);});
	}
	/**
	 * @param {Number} min inclusive minimum
	 * @param {Number} max none inclusive maximum
	 * 
	 * getRandomInt retrieves a random number betweem min and max
	*/
	getRandomInt(min, max) {
		  min = Math.ceil(min);
		  max = Math.floor(max);
		  return Math.floor(Math.random() * (max - min)) + min;
	}
	//50/50 percent of picking either 0 or 1
	getRandomValidFloor(){
		let randFloor = Math.random();
		if(randFloor < .5)
			randFloor = 1;
		else
			randFloor = 0;
		return randFloor;
	}
	//update method that manages everything related to ai and it's affect on the world
	//make sure to remove ai if it's out of bounds on the right
	//if the total enemy count is 0 -> update the citizens and restore to idle state
	//return to idling
	//otherwise continue to calculate collisions between citizens and monsters and bullets agains monsters
	//update the status bars
	update(){
		if(!this.gameOver){
			this.aliveEnemies.forEach(e => {//if out of bounds -> destroy
				if(e != null){
					if(e.x > 1200){
						e.x = -100;
						e.kill();
						this.totalEnemyCount--;
						e = null;
					}
				}
			});	
			if(this.totalEnemyCount <= 0){//done with the round heres
				this.requestKillAll = false;
				this.game.alertMessage.alpha = 0;
				this.aliveCitizens.forEach(c => {
					c.CURRENT_STATE = c.AI_STATES.IDLE;
					c.executing_command = false;
				});
				this.game.background_music.fadeIn(2000);
				this.battleMusic.fadeOut(2500);
				this.beginRound();
			}
			else{//calculate collisions here
				this.allBullets = [];
				this.weapons.forEach(c => {
					this.allBullets = this.allBullets.concat(c.bullets);
				});
				this.game.physics.arcade.collide(this.aliveCitizens, this.aliveEnemies, this.collisionCallback, null, this);
				this.game.physics.arcade.collide(this.allBullets, this.aliveEnemies, this.bulletCollisionCallback, null, this);
				if(this.game.globalBlocker != undefined)
					this.game.physics.arcade.collide(this.aliveEnemies, this.game.globalBlocker);
			}
			if(this.aliveCitizens.length <= 0){//if you don't have anymore citizens -> game over
				this.gameOver = true;
				this.game.gameOverScreen.alpha = 1;
				this.game.world.bringToTop(this.game.gameOverScreen);
				this.game.gameOverScreen.children[0].input.enabled = true;
				this.game.gameOverScreen.x = this.game.camera.x;
				this.game.gameOverScreen.y = this.game.camera.y;
			}
			
			this.calculateBars();//upate the numbers on the bars
		}
	}
	//function that calculates the total contribution between the rooms and citizens
	//add or remove bar points accordingly
	calculateBars(){
		let energy_room_gen = 0;
		let housing_room_gen = 0;
		let citizen_cost = 0;
		
		if(this.game.all_rooms.length > 0){
			this.game.all_rooms.forEach(r => {
				if(r.room_key == 'energy_room'){
					energy_room_gen += r.stats;
				}
				else if(r.room_key == 'housing_room'){
					housing_room_gen += r.stats;
				}
			});
			this.aliveCitizens.forEach(c => {
				citizen_cost += c.cost;
			});
			let housing_total_cost = housing_room_gen - citizen_cost;
			let energy_total_cost = energy_room_gen - citizen_cost;
			//assign costs
			this.game.power_bar.increaseBar(energy_total_cost/15000); 
			this.game.housing_bar.increaseBar(housing_total_cost/15000);
		}
	}
	/**
	 * @param {Number} location is an x value that is found along the x axis of the canvas
	 * this function can be called to destroy an x amount of enemies that are within a certain range to the location
	 */
	destroyAll(location){
		this.aliveEnemies.forEach( e => {
				if(Math.abs(e.x - location) < 55){
					if(e != null){	
						e.x = -100;
						e.kill();
						this.totalEnemyCount--;
						e = null;
					}
				}
			}
		);
	}
	/** 
	 * @param {Object} c is a citizen that has collided with e
	 * @param {Object} e is an enemy that has collided with c
	 * collision callback between the citizen and the enemy
	 * destroy the citizen and slow down the monster for a bit
	 * play the death sound effect
	 */
	collisionCallback(c,e){//c for citizen, e for enemy
		c.CURRENT_STATE = c.AI_STATES.DEAD;
		let index = this.aliveCitizens.indexOf(c);
		c.kill();
		this.citizenDeathSound.play();
		this.aliveCitizens.splice(index, 1);
		e.body.velocity.x = 0;
		this.game.totalPlayerCount.updateCount(this.aliveCitizens.length);
	}
	/**
	 * @param {Object} e is the enemy that collided with b
	 * @param {Object} b is the bullet that collided with e
	 * collision callback when an enemy collided with a bullet that a citizen has shot
	 * remove the bullet and deduct the health from the enemy
	 * if the health is low enough, remove the enemy from the level and deduct the totalenemycount
	 */
	bulletCollisionCallback(e, b){// b for bullet, e for enemy
		b.kill();
		e.hit();
		if(e.health <= 0){
			e.spawnLoot();
			e.kill();
			this.totalEnemyCount--;
		}
	}
	/**
	 * @param {Number} num is the number to clamp
	 * @param {Number} min number that will be the lower end of the clamp
	 * @param {Number} max number that will be the higher end of the clamp
	 * set the boundary of a number between min and max 
	 */
	clamp(num, min, max) {
		  return num <= min ? min : num >= max ? max : num;
	}	
}
