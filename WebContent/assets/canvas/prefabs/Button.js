

//Button that respond to mouse input (hovering, clicking)
class Button extends Phaser.Button {
	/**
	 * Button
	 * @param {Phaser.Game} aGame Current game instance.
	 * @param {Number} aX X position of the Button.
	 * @param {Number} aY Y position of the Button.
	 * @param {any} aKey The image key (in the Game.Cache) to use as the texture for this Button.
	 * @param {any} aCallback The function to call when this Button is pressed.
	 * @param {any} aCallbackContext The context in which the callback will be called (usually 'this').
	 * @param {any} aOverFrame The frame / frameName when the button is in the Over state.
	 * @param {any} aOutFrame The frame / frameName when the button is in the Out state.
	 * @param {any} aDownFrame The frame / frameName when the button is in the Down state.
	 * @param {any} aUpFrame The frame / frameName when the button is in the Up state.
	 */
	constructor(aGame, aX, aY, aKey, aCallback, aCallbackContext, aOverFrame, aOutFrame, aDownFrame, aUpFrame) {
		super(
			aGame, aX, aY,
			aKey || 'environments4',
			aCallback || function() {this.game.state.start("Level")},
			aCallbackContext /* || this */,
			aOverFrame == undefined || aOverFrame == null? null : aOverFrame,
			aOutFrame == undefined || aOutFrame == null? 'elementStone015' : aOutFrame,
			aDownFrame == undefined || aDownFrame == null? null : aDownFrame,
			aUpFrame == undefined || aUpFrame == null? null : aUpFrame
		);
		
	}
}
