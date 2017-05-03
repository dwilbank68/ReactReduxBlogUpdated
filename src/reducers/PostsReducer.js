import _ from 'lodash';

import {CREATE_POST, DELETE_POST, FETCH_POST, FETCH_POSTS} from '../actions';

let defaultState = {

}

var postsReducer = (state=defaultState, action) => {
    switch(action.type){
        case DELETE_POST:
            return _.omit(state, action.payload);

        case FETCH_POST:
            return {
                ...state,
                [action.payload.data.id]: action.payload.data
            };

        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        default: return state;
    };
};

export default postsReducer;

////////// paste this in index.js - PostsReducer //////////////

// import postsReducer from './PostsReducer';

// PostsReducer: postsReducer

//////////// paste this in test ///////////////

// var expect = require("expect");
// var df = require('deep-freeze-strict');

// var reducers = require("reducers");

// describe('postsReducer', () => {
//    it('should ', () => {
//        var action = {
//            type: DO_IT
//        }
//        var res = reducers.postsReducer(df(), df(action));
//        expect(res).toEqual();
//    });
// });

