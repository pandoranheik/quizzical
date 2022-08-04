export default function makeAnswerList(result, nanoid) {
	const newArray = [];
	result.incorrect_answers.map((answer) => {
		return newArray.push({ answer: answer, on: false, id: nanoid() });
	});
	newArray.push({ answer: result.correct_answer, on: false, id: nanoid() });

	const shuffled = newArray.sort((a, b) => 0.5 - Math.random());
	return shuffled;
}
