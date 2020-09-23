// A common global data (state) storage section is typically called a store.  Common to react, angular, vue and others. This patter is used by ngrx and redux.

// We will do this by using a reducer

function createStore(reducer) {
	let currentState = reducer(undefined, {});
	return {
		getState: () => currentState,
		dispatch: (action) => {
			currentState = reducer(currentState, action);
		} 
	}
}

//State managed by reducers are almost always obj's in serious applications.  An array of obj's really.
const initialState = {
	favorites: []
}

//initial state is set a default parameter here in case state is empty or not provided.
function favoritesReducer (state = initialState, action) {
	switch(action.type) {
		case "ADD_FAVORITE": {
			const addedFavorite = action.payload.favorite;
			const favorites = [...state.favorites, addedFavorite];
			return { favorites };
		}
		case "REMOVE_FAVORITE": {
			const removedFavorite = action.payload.favorite;
			const favorites = state.favorites.filter((favorite) => favorite.id !== removedFavorite.id)
			return { favorites };
		}
		default:
			return state;
	}
}

// const action = {type: "ADD_FAVORITE", payload: {favorite: {title: "Story1", id: 1 } } };

const store = createStore(favoritesReducer);
// store.dispatch(action);
// console.log(store.getState());

export default store;