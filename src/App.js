import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import cleanText from "./services/cleanText";
import handleClick from "./services/handleClick";
import makeAnswerList from "./services/makeAnswerList";
import BarLoader from "react-spinners/BarLoader";
import Quiz from "./components/quiz/Quiz";

export default function App() {
	const [start, setStart] = useState(false);
	const [checkedAnswers, setCheckAnswers] = useState(true);
	const [trivia, setTrivia] = useState([]);
	const [wins, setWins] = useState(0);
	const [displayYell, setDisplayYell] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getData();
		// eslint-disable-next-line
	}, []);

	console.log(trivia);
	
	function startGame() {
		setStart((prevStart) => {
			return !start;
		});
	}

	async function getData() {
		setLoading(true);

		const res = await fetch(
			"https://opentdb.com/api.php?amount=5&type=multiple"
		);

		const data = await res.json();

		setTrivia(
			data.results.map((result, i) => {
				return {
					...result,
					id: nanoid(),
					idTrue: nanoid(),
					answerList: makeAnswerList(data.results[i], nanoid),
				};
			})
		);
		setLoading(false);
		setCheckAnswers((prevCheck) => {
			return !prevCheck;
		});
	}

	function score() {
		const checkUnanswered = trivia.map((question) => {
			return question.answerList.some((answer) => {
				return answer.on === true;
			});
		});

		const answeredAll = checkUnanswered.every((answer) => answer);

		if (answeredAll) {
			let points = 0;

			trivia.map((question) => {
				return question.answerList.map((answer) => {
					if (answer.on && answer.answer === question.correct_answer) {
						return points++;
					} else {
						return null;
					}
				});
			});

			setWins(points);

			setCheckAnswers((prevCheck) => {
				return !prevCheck;
			});
		} else {
			setDisplayYell(() => <p>{`Not all questions answered`}</p>);
			setTimeout(() => {
				setDisplayYell("");
			}, 2000);
		}
	}

	// Make Quiz Questions
	const quizQuestions = trivia.map((question) => {
		const newQuestion = cleanText(question.question);

		return (
			<Quiz
				key={question.id}
				question={newQuestion}
				id={question.id}
				answers={question.answerList}
				handleClick={(event, questionId) =>
					handleClick(event, questionId, trivia, setTrivia)
				}
				correct={question.correct_answer}
				cleanText={cleanText}
				check={checkedAnswers}
			/>
		);
	});

	// Make App
	function makeApp() {
		if (loading) {
			return (
				<>
					<div className="container-load">
						<BarLoader color="#003c5e" loading={loading} size={150} />
					</div>
					<span className="circle-1 circle"></span>
					<span className="circle-2 circle"></span>
				</>
			);
		} else {
			return (
				<>
					{start ? (
						<div className="container">
							<h1>Quizzical</h1>
							{quizQuestions}
							<div className="container-options">
								{checkedAnswers ? (
									<p>{`You scored ${wins}/${trivia.length} correct answers`}</p>
								) : (
									displayYell
								)}
								<button
									type="button"
									className="button menu-button"
									onClick={checkedAnswers ? getData : score}
								>
									{checkedAnswers ? "Play again" : "Check Answers"}
								</button>
							</div>
						</div>
					) : (
						<div className="start-screen">
							<h1>Quizzical</h1>
							<p>Welcome to Quizzical, press the button to begin!</p>
							<button type="button" className="button" onClick={startGame}>
								Start Quiz
							</button>
						</div>
					)}
					<span className="circle-1 circle"></span>
					<span className="circle-2 circle"></span>
				</>
			);
		}
	}

	const main = makeApp();

	return main;
}
