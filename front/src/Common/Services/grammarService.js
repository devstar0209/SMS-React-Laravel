class GrammarService {
	static removeUnderScore(string) {
		const removeUnderScore = string.replace('_', ' ');
		return removeUnderScore.charAt(0).toUpperCase() + removeUnderScore.slice(1).toLowerCase();
	}

	static capitalFirstletter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}
}

export default GrammarService;
