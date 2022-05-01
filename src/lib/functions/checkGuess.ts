interface unusedLetters {
	[key: string]: number;
}

export const checkGuess = (guess: string, answer: string): string => {
	const answerKey = Array(guess.length);
	const unusedLetters: unusedLetters = {};
	for (let i = 0; i < guess.length; i++) {
		if (guess[i] === answer[i]) answerKey[i] = 'c';
		else if (answer[i] in unusedLetters) unusedLetters[answer[i]]++;
		else unusedLetters[answer[i]] = 1;
	}

	for (let i = 0; i < answerKey.length; i++) {
		if (answerKey[i] === 'c') continue;
		if (guess[i] in unusedLetters && unusedLetters[guess[i]] > 0) {
			unusedLetters[guess[i]]--;
			answerKey[i] = 'p';
		} else answerKey[i] = 'x';
	}

	return answerKey.join('');
};
