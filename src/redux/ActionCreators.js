import * as ActionTypes from './ActionTypes';
//la Action es un objeto que contiene por obligacion un campo type, este se pasa al reducer correspondiente por medio
//del dispatch.
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});