interface answerKey {
	answer: string;
	key: { [key: string]: number };
	guesses: number;
}

let answerKey: answerKey;

const numberOfGuesses = (answer: string): number => {
	const length = answer.length;
	let num: number;
	if (length < 5) num = 5;
	else if (length < 8) num = 6;
	else num = 7;
	return num;
};

export const createAnswerKey = (answer: string): answerKey => {
	const guesses: number = numberOfGuesses(answer);
	const key: answerKey['key'] = {};
	Array.from(answer).forEach((letter: string) => {
		if (key[letter]) {
			key[letter]++;
		} else {
			key[letter] = 1;
		}
	});
	answerKey = { answer, key, guesses };

	return answerKey;
};
