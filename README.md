## Introduction : 

Since this article is about redux, I expect you know about ReactJs. If you don't know about ReactJs, learn ReactJs first.

Redux is a state management library for javascript. It was mainly created to help manage the state of React applications. But you can use redux with other javascript libraries or frameworks such as [ANGULAR](https://angularjs.org/) or [VUE](https://vuejs.org/). I personally use Redux to manage the state of large react applications. I don’t recommend using redux for simple applications because react hooks do that job perfectly. 

For me when applications get bigger, managing state using react hooks seems pretty messy. That’s when I consider using Redux. If you’re creating a project that going to scale you should use Redux. By using the redux toolkit, it's very easy to do redux development. Redux toolkit is an official, opinionated, batteries-included toolset for efficient Redux development. It does a lot of the work in the background. Managing state is easier using the redux toolkit.

By creating a counting app, I will show you how to use the Redux and Redux toolkit. If you previously worked with (context and reducer) hooks in React Js these learning steps will be as easy as drinking coffee. Because I'm not going to explain those basic terms.

## Redux : 
### Create a new react app :

```
npx create-react-app counting-app
cd my-app
``` 
### Install redux :
Redux alone doesn't care about your react app. That's why we have to install react-redux. And also the redux-thunk middleware to work with asynchronous actions.

```
npm install redux react-redux redux-thunk
``` 
After installing, you will see those dependencies in your package.json file. Then create a folder in your src directory to store all of your state-related {logic/codes}. I will name this folder state. You can name it as you like.

After completing all these setups, the first thing we are going to do is create a reducer in Redux. Now we will create another folder called Reducers inside the State folder in which we will save all of our Reducers.

Now create a JavaScript file called CountingReducer.js inside the Reducer folder. You may have multiple reducer files for your application. But for this project, we will use only one reducer file.

### Reducer : 

The reducer is a simple javascript function that returns states based on action passed to the reducer. Reducer in Redux takes two parameters, the first one is the initial state and the second one is an action. To return state based on actions we will use a switch statement. You can also use if-else, but it's not recommended.

```
//created the function with parameters.
const reducer = (state = 0, action) => {
  // reads the action and returns a state.
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;
    case "DECREMENT":
      return state - action.payload;
    default:
      return state;
  }
};

//exporting the function.
export default reducer;
``` 
We have created our reducer 🎉. The next step is to combine our reducers. We don't have multiple reducers in this project, but we still have to combine reducers.

### Combine reducers :

To combine Reducers, we need to create another file inside the Reducers folder. I will name it combReducers.js.

First, import combineReducers from redux. After that, import reducers from reducer files. Next, pass a key-value pair to the combineReducers function for each reducer. 

For example, we would call the countingReducer "count". And the value of the count will be the value returned by the countingReducer.

```
// import combineReducers
import { combineReducers } from "redux";
// import countingReducer for countingReducer.js
import countingReducer from "./countingReducer";
const reducers = combineReducers({
  // key:     value
  count: countingReducer,
});
// exportin reducers
export default reducers;
``` 

### Store :

After combining the reducers. We will create a js file named store.js in the state folder. In store.js we have to import createStore from redux and reducers from combReducers.js.

CreateStore usually takes two parameters, the first one is reducers and the second one is a default state. Lastly, to work with async actions, we have to pass thunk middleware as the third parameter. To do that, we have to import applyMiddleware from redux and thunk middleware from redux-thunk. Then we will pass the applyMiddleware(thunk) as the third parameter.

```
// import createStore and applyMiddleware
import { createStore, applyMiddleware } from "redux";
// import reducers
import reducers from "./reducers/combReducers";
// import thunk middleware
import thunk from "redux-thunk";

// export the store.
export const store = createStore(reducers, {}, applyMiddleware(thunk));
``` 

### Provider :

To access our store from our react application, we need to wrap our whole application with a provider from react-redux. To do that, at the index.js file in the src folder, we have to import the provider from react-redux and the store from the store.js file. Then wrap the app component with the provider. Then specify the store to the provider.

```
// import provider and store.
import { Provider } from "react-redux";
import { store } from "./state/store";

ReactDOM.render(
  <React.StrictMode>
    {
      // wrap the app with the provider.
    }
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
``` 
Now we can access the state from anywhere in our react project. To access the store, at the App.js file in the src folder, we have to import useSelector from react-redux. Then we will create a variable called count and assign it to the useSelector. useSelector is going to take a function as a parameter that will return our state.

```
// import useSelector.
import { useSelector } from "react-redux";
// getting the state.
const count = useSelector((state) => state.count);
``` 
If you want to see the state you can log the count variable to the console.

### Action Creators :

Now, In order to increment or decrement, we have to create actions. And we are going to do that with action creators. To do that, inside the state folder we will create another folder called action-creators. This is the folder where all of our action creator files will be stored. Inside this folder, we are going to create a Js file named index.js. Action creator is a function that dispatches an action. Now we are going to create two action creators inside the index.js file, one for increment and another one for decrement.

```
export const increment = (ammount) => {
  return (dispatch) => {
    dispatch({
      type: "INCREMENT",
      payload: ammount,
    });
  };
};

export const decrement = (ammount) => {
  return (dispatch) => {
    dispatch({
      type: "DECREMENT",
      payload: ammount,
    });
  };
};

``` 
Now, we will export all of the action creators from a central file as actionCreators. For that, create a js file called index.js inside the state folder.

```
export * as actionCreators from "./action-creators/index";
``` 
Now, we can use actionCreators to increment and decrement from our App.js file. 

To use actionCreators, we will import actionCreators, useDispatch from react-redux, and bindActionCreators from redux. First, we are going to assign useDispatch to a variable. Then we will bind the actionCreatros using bindActionCreators and pass the dispatch into it. After that, we will destructure increment and decrement from bindActionCreators. Finally, we will show the count. And by using destructured actions in two buttons, we will be able to increment and decrement.

```
import "./App.css";
// import useSelector & useDispatch from react-redux
import { useSelector, useDispatch } from "react-redux";
// import bindActionCreators from redux
import { bindActionCreators } from "redux";
// import actionCreators
import { actionCreators } from "./state/index";

function App() {
  const count = useSelector((state) => state.count);
  // assigned useDispatch to dispatch variable.
  const dispatch = useDispatch();

  // destructuring increment and decrement actions
  const { increment, decrement } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="App">
      <h2>{count}</h2>
      <button onClick={() => increment(100)}>increment</button>
      <button onClick={() => decrement(100)}>decrement</button>
    </div>
  );
}

export default App;
``` 

### Final product :

If you followed along with me, you should have a counting app like this one.</br>
![redux.gif](https://cdn.hashnode.com/res/hashnode/image/upload/v1644513839594/GrzeWdxYf.gif)

[You will find this project in my GitHub repository.](https://github.com/devmdmamun/basic-redux)

## Redux Toolkit :

If you wish to use redux in your application, you should use the redux toolkit. This simplifies all the processes described above.

I also wanted to show, how this counting application can be created using the redux toolkit. But it is well shown in the [official documentation](https://redux.js.org/tutorials/quick-start). So I'm not going to repeat. If you're interested visit [official documentation](https://redux.js.org/tutorials/quick-start).

## References: 

[Official Redux documentation.](https://redux.js.org/tutorials/quick-start) </br>
[Youtube video by Laith Harb.](https://www.youtube.com/watch?v=9jULHSe41ls)


## Conclusion: 

I hope, this blog was helpful for you. If you have any recommendations, questions, or suggestions about this blog, please reach out to me on [Twitter](https://twitter.com/devmdmamun) or comment on this blog.
