export const createNumberStringMale = (slidesNumber, word) => {
	const string = `${slidesNumber} ${word}`
	const lastDigit = slidesNumber % 10;
	const preLastDigit = Math.floor((slidesNumber % 100) / 10);
	if (preLastDigit === 1) {
		return `${string}ов`;
	} 

	switch(lastDigit) {
		case 1: 
			return string;
		case 2:
			return `${string}а`;
		case 3:
			return `${string}а`;
		case 4:
			return `${string}а`;
		default:
			return `${string}ов`;
	}
};

export const createNumberStringFemale = (slidesNumber, word) => {
	const string = `${slidesNumber} ${word}`
	const lastDigit = slidesNumber % 10;
	const preLastDigit = Math.floor((slidesNumber % 100) / 10);
	if (preLastDigit === 1) {
		return string;
	} 

	switch(lastDigit) {
		case 1: 
			return `${string}а`;
		case 2:
			return `${string}ы`;
		case 3:
			return `${string}ы`;
		case 4:
			return `${string}ы`;
		default:
			return string;
	}
};