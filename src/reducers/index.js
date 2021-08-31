const initialState = {
	scripts: [],
	chosenScript: null,
	loading: true,
	error: null
};

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case 'SCRIPTS_LOADED':
			return {
				...state,
				scripts: action.payload,
				loading: false,
				error: null
			}

		case 'SCRIPTS_REQUESTED':
			return {
				...state,
				loading: true
			}

		case 'SCRIPTS_ERROR': 
			return {
				...state,
				scripts: [],
				loading: false,
				error: action.payload
			};

		case 'SCRIPT_CHOSEN': {
			const [chosenScipt] = state.scripts.filter((script) => script.id === action.payload);
			return {
				...state,
				chosenScript: chosenScipt
			}

		}
			
		default:
			return state;
	}
};

export default reducer;