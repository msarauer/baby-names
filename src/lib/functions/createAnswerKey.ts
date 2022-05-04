let answerKey: AnswerKey;

const numberOfGuesses = (answer: string): number => {
	const length = answer.length;
	let num: number;
	if (length < 5) num = 5;
	else if (length < 8) num = 6;
	else num = 7;
	return num;
};

export const createAnswerKey = (answer: string): AnswerKey => {
	const guesses: number = numberOfGuesses(answer);

	answerKey = { answer, guesses };

	return answerKey;
};
