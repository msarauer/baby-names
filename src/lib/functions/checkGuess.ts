interface unusedLetters {
	[key: string]: number;
}

export const checkGuess = (guess: string, answer: string): ResultKey => {
	const answerKey = Array(guess.length);
	const unusedLetters: unusedLetters = {};
	let correct = true;
	for (let i = 0; i < guess.length; i++) {
		//if current letter is correct
		if (guess[i] === answer[i]) {
			answerKey[i] = '3';
			//otherwise take the current letter in the answer and add it to object to track amount of that letter in answer
		} else if (answer[i] in unusedLetters) unusedLetters[answer[i]]++;
		else unusedLetters[answer[i]] = 1;
	}

	for (let i = 0; i < answerKey.length; i++) {
		//if the answerkey already has a 3 in this spot, go to the next spot
		if (answerKey[i] === '3') continue;
		//if one letter is not correct, mark correct as false
		correct = false;
		//if the current letter is somewhere in the answer, and not used up already
		if (guess[i] in unusedLetters && unusedLetters[guess[i]] > 0) {
			unusedLetters[guess[i]]--;
			answerKey[i] = '2';
		} else {
			answerKey[i] = '1';
		}
	}
	return { key: answerKey.join(''), correct };
};
