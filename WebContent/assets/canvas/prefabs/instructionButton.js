
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.2 (Phaser v2.6.2)


class instructionButton extends Phaser.Button {
	/**
	 * instructionButton
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
			aKey || 'red_button01',
			aCallback || null,
			aCallbackContext /* || this */,
			aOverFrame == undefined || aOverFrame == null? null : aOverFrame,
			aOutFrame == undefined || aOutFrame == null? 'red_button01' : aOutFrame,
			aDownFrame == undefined || aDownFrame == null? null : aDownFrame,
			aUpFrame == undefined || aUpFrame == null? null : aUpFrame
		);
		
		this.instructionPanel = null;		
	}
	
	/* sprite-methods-begin */
	// -- user code here --
	// this.instructionPanel = null;	
	setInstructionPanel(p_panel){
		this.instructionPanel = p_panel;
		//console.log(this.instructionPanel);
		this.onInputDown.add(this.showHideInstructions, this);
	}

	showHideInstructions(){
		console.log(this.instructionPanel);
		if(this.instructionPanel.alpha == 0.0){
			this.instructionPanel.alpha = 1.0;
		}
		else {
			this.instructionPanel.alpha = 0.0;
		}
	}
	/* sprite-methods-end */
}
/* --- end generated code --- */
// -- user code here --
