export default function handleClick(event, questionId, trivia, setTrivia) {
    const { id } = event.target;
    const tempArray = [];
    trivia.map((question) => {
        if (questionId === question.id) {
            const newList = question.answerList.map((answer) => {
                return answer.id === id
                    ? { ...answer, on: true }
                    : { ...answer, on: false };
            });
            tempArray.push({ ...question, answerList: newList });
        } else {
            tempArray.push(question);
        }
        return tempArray;
    });

    setTrivia((prev) => {
        return tempArray;
    });
}