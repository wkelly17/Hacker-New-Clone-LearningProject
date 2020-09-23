import Story from "../components/Story.js";
import view from "../utils/view.js";
import baseUrl from "../utils/baseUrl.js";
import store from "../store.js";
import checkFavorite from "../utils/checkFavorite.js";

export default async function Stories(path) {
  const { favorites } /* destructured from store */ = store.getState();
  const stories = await getStories(path);
  const hasStories = stories.length > 0;
  //This puts the stories on the page and checks the array to see if there are stories
  view.innerHTML = `<div>
  ${
    hasStories
      ? stories
          .map((story, i) =>
            Story({
              ...story,
              index: i + 1,
              isFavorite: checkFavorite(favorites, story),
            })
          )
          .join("")
      : "No stories"
  }
  </div>`;

  document.querySelectorAll(".favorite").forEach((favoriteButton) => {
    favoriteButton.addEventListener("click", async function () {
      const story = JSON.parse(this.dataset.story);  
      const isFavorited = checkFavorite(favorites, story);
      store.dispatch({type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: {favorite: story}})

     //#====  //#Longer method vs. ternary   =======
/*     if (isFavorited) {
        store.dispatch({
          type: "REMOVE_FAVORITE",
          payload: { favorite: story },
        });
      } else {
        store.dispatch({ type: "ADD_FAVORITE", payload: { favorite: story } });
      } */

      await Stories(path);
    });
  });
}
//% Notes on above
/* i is being used as an index to display each story number.  Reember, the api data "stories" is an array, but each "story" is an object in that array.  hence, you map
  # (an array method), but can destructure  the object passed into the Story function. We are then creating the index spreading in the object story and setting i to i+1 */
// Story(story) is a function in components folder used to render nicely the api data.
// .join takes away the comma separating array items.

/* ------- THIS IS THE API FETCH REQUEST ------ */

async function getStories(path) {
  const isHomeRoute = path === "/";
  const isNewRoute = path === "/new"; //don't need a var for ask and show since the html path and the api are the same.
  if (isHomeRoute) {
    path = "/news";
  } else if (isNewRoute) {
    path = "/newest";
  }
  const response = await fetch(`${baseUrl}${path}`);
  const stories = await response.json();
  return stories;
}
