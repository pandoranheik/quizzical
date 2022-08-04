export default function Quiz(props) {
	const answers = props.answers.map((answer) => {
		let cleanAnswer = props.cleanText(answer.answer);

		function setCheck() {
			if (props.correct === answer.answer && props.check) {
				return { backgroundColor: "rgba(52, 255, 25, 0.5)" };
			} else if (props.correct !== answer.answer && props.check) {
				return { backgroundColor: "rgba(255, 46, 46, 0.5)" };
			}
		}

		const checkStyles = setCheck();
	

		const chosenStyles = {
			backgroundColor: answer.on ? "rgb(0, 140, 200, 0.5)" : null,
		};

		return (
			<button
				type="button"
				className="chosen"
				style={props.check ? checkStyles : chosenStyles}
				value={answer.answer}
                id={answer.id}
				key={answer.answer}
				onClick={(event) => props.handleClick(event, props.id, answer.id)}
			>
				{cleanAnswer}
			</button>
		);
	});

	return (
		<div className="container-quiz">
			<div className="container-quiz-question">
				<p>{props.question}</p>
			</div>
			<div className="container-quiz-answers">{answers}</div>
		</div>
	);
}
