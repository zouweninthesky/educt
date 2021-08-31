const scriptsLoaded = (newScripts) => {
	return {
		type: 'SCRIPTS_LOADED',
		payload: newScripts
	}
};

const scriptsRequested = () => {
	return {
		type: 'SCRIPTS_REQUESTED'
	}
};

const scriptsError = (error) => {
	return {
		type: 'SCRIPTS_ERROR',
		payload: error
	}
};

const scriptChosen = (script) => {
	return {
		type: 'SCRIPT_CHOSEN',
		payload: script
	}
}

export {
	scriptsLoaded,
	scriptsRequested,
	scriptsError,
	scriptChosen
};