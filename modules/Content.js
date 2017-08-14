
const UNKNOWN_MODE = 0;
const INSERT_MODE = 1;
const DELETE_MODE = 2;


/*
	format {
		oldText: string,
		newText: string,
		index: number,
		mode: replaceMode
	}
*/
const REPLACE_MODE = 3;

// TODO maybe combine updates later
class Content {



    // VersionVerfified
    constructor(text) {
        this.text = "";
        /*
         [number] = version {
            // what was appended or deleted
            text: string,
            // where does the change begin
			index: number,
			// mode
			mode: number

         }
        */
        this.updates = [];
        this.mode = UNKNOWN_MODE;
		this.updateText(text);
		this.undoneUpdates = [];
		this.confirmedUpdate = 0;
		
		// Since we do not need every update every made on the file
		// We write down the number to remember when we joined the file
		this.joinedOnUpdate = 0;
	}

	cut(str, cutStart, cutEnd) {
		return str.substring(0, cutStart) +
		str.substring(cutEnd+1);
	}

	replace(str, index, oldText, newText) {
		// console.log()


		return str.substring(0, index) +
		newText +
		str.substring(index + oldText.length);
	}

	performUpdate(update) {
		if(update.mode == REPLACE_MODE) {
			console.log("Perform update", update);

			this.text = this.replace(this.text,
				update.index,
				update.oldText,
				update.text)
		} else {
			throw "perform update only supports replace mode";
		}
	}

	redo() {
		if(this.undoneUpdates.length == 0) {
			return false;
		}

		var update = this.undoneUpdates.pop();

		this.performUpdate(update);

		return true;
	}

	undo() {
		if(this.updates.length == 0) {
			return false;
		}
		var update = this.updates.pop();

		if(update.mode === REPLACE_MODE) {
			console.log("UNDO UPDATE", update);
			this.text = this.replace(this.text, update.index, update.text, update.oldText);
		} else {
			throw "undo does not support anything but replace yet"
		}
		this.undoneUpdates.push(update);

		return true;
	}

	lastUpdate() {
		if(this.updates.length == 0) return null; 
		return this.updates[this.updates.length -1];
	}

    updateText(text) {
        var startIndex = this.findFirstDifference(text);
		if(startIndex == -1) {
			// if startIndex returned -1 then nothing changed
			return;
		}

		this.undoneUpdates = [];

		var endIndex = this.findLastDifference(text)

		var correctedLastIndex = -endIndex + 1;
		if(correctedLastIndex == 0) {
			// if last index is 0 then return undefined instead
			correctedLastIndex = undefined;
		}

		var removedContent = this.text.slice(startIndex, correctedLastIndex);
		var insertedContent = text.slice(startIndex, correctedLastIndex);

		this.updates.push({
			oldText: removedContent,
			text: insertedContent,
			index: startIndex,
			mode: REPLACE_MODE
		});
		console.log("updates", this.updates);
		var lastChanged;
        this.text = text;
    }

    // intended to be run on the client side since it expects every update to be instant
    findFirstDifference(text) {
        function slowFindDifference(a, b) {
            var max = Math.max(a.length, b.length);
            for(var i = 0; i < max; i++) {
                if(a[i] !== b[i]) return i;
            }
            return -1;
        }
        return slowFindDifference(this.text, text);
    }

    findLastDifference(text) {
		var min = Math.min(text.length, this.text.length);
		for(var i = 1/*start at one to not go out of range*/; i < min; i++) {
			if(text[text.length - i] !== this.text[this.text.length - i])
				return i;
		}
		return -1;
    }


    getVersion() {
        return updates.length;
    }


}

module.exports = Content;