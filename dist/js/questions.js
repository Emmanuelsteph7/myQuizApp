(function (global) {
	const questions = [
		{
			question:
				"What will a 3 x 5 matrix multiplied by a 5 x 7 matrix produce?",
			answers: [
				{ text: "3 x 7 matrix", correct: true },
				{ text: "7 x 7 matrix", correct: false },
				{ text: "3 x 5 matrix", correct: false },
				{ text: "7 x 5 matrix", correct: false },
			],
		},
		{
			question: "What is sin 45?",
			answers: [
				{ text: "0.8660", correct: false },
				{ text: "0.7071", correct: true },
				{ text: "0.5", correct: false },
				{ text: "0.4500", correct: false },
			],
		},
		{
			question: "Loss of value of money is called?",
			answers: [
				{ text: "Compound Interest", correct: false },
				{ text: "Taxation", correct: false },
				{ text: "Depreciation", correct: false },
				{ text: "Inflation", correct: true },
			],
		},
		{
			question:
				"The first term of an AP is 1, the common difference is 2. What is the 10th term?",
			answers: [
				{ text: "18", correct: false },
				{ text: "3", correct: false },
				{ text: "19", correct: true },
				{ text: "29", correct: false },
			],
		},
		{
			question:
				"Given P = $2000, R = 10% and T = 2 years, calculate the simple interest",
			answers: [
				{ text: "$4", correct: true },
				{ text: "$34", correct: false },
				{ text: "$28", correct: false },
				{ text: "$8", correct: false },
			],
		},
		{
			question:
				"The amount a company decides to pay from its profits to its shareholders is called?",
			answers: [
				{ text: "Dividend", correct: true },
				{ text: "Shares", correct: false },
				{ text: "Opportunity cost", correct: false },
				{ text: "Annuity", correct: false },
			],
		},
		{
			question: "Given 2x - 5y = 27, what is the gradient?",
			answers: [
				{ text: "2", correct: false },
				{ text: "27/2", correct: false },
				{ text: "2/5", correct: true },
				{ text: "-1", correct: false },
			],
		},
		{
			question: "Convert 85 in base ten to base 2",
			answers: [
				{ text: "1111", correct: false },
				{ text: "11000", correct: false },
				{ text: "1010101", correct: true },
				{ text: "231110", correct: false },
			],
		},
		{
			question: "Find the range for the values of x for which 1 - 6x > 5",
			answers: [
				{ text: "x > 5/8", correct: false },
				{ text: "x < -2/3", correct: true },
				{ text: "x = 8/3", correct: false },
				{ text: "x < 0", correct: false },
			],
		},
		{
			question:
				"In an isosceles triangle, what are the base angles if the other angle is 80 deg?",
			answers: [
				{ text: "100 deg", correct: false },
				{ text: "80 deg", correct: false },
				{ text: "180 deg", correct: false },
				{ text: "50 deg", correct: true },
			],
		},
	];

	global.$questions = questions;
})(window);
