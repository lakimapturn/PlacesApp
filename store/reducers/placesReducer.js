import Place from "../../models.js/place";
import { ADD_PLACE, SET_PLACES } from "../actions/placesActions";

const initialState = {
  places: [],
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES: {
      return Object.assign({}, state, {
        places: action.payload.places,
        // we can even transform data by: action.payload.places.map(pl => new Place(pl.id.toString(), pl.title, pl.imageUri))
      });
    }

    case ADD_PLACE: {
      const newPlace = new Place(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.image,
        action.payload.address,
        action.payload.coords.latitude,
        action.payload.coords.longitude
      );
      return Object.assign({}, state, {
        places: state.places.concat(newPlace),
      });
      //   return {
      //     places: state.places.concat(newPlace),
      //   };
    }
    default:
      return state;
  }
};

export default placesReducer;
