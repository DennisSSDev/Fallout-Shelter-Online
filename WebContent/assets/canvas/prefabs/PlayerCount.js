//A simple class to keep track of the total citizens in the game
class PlayerCount extends Phaser.Text {
	/**
	 * PlayerCount
	 * @param {Phaser.Game} aGame Current game instance.
	 * @param {Number} aX X position of the new text object.
	 * @param {Number} aY Y position of the new text object.
	 * @param {String} aText The actual text that will be written.
	 * @param {Object} aStyle The style properties to be set on the Text.
	 */
	constructor(aGame, aX, aY, aText, aStyle) {
		super(aGame, aX, aY,
			aText || '-1',
			aStyle || 
			
				{"font": "bold 125px Arial"}
			);
		this.width -= 60;
		this.height -= 80;
		this.updateCount(3);
		
	}
	//change th count of the citizens in the level
	updateCount(newNum){
		this.text = newNum;
	}
}
