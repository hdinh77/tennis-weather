# Tennis Weather App
 - Built using ReactJS, Javascript, and Open Weather Map API
 - See this project hosted on Heroku: https://tennis-weather-app.herokuapp.com/ 

<img src="https://github.com/hdinh77/tennis-weather/blob/master/images/homepage.JPG">
<img src="https://github.com/hdinh77/tennis-weather/blob/master/images/location.JPG">

## Front End with React and Weather API
 - using open API from openweathermap.org
 - to use this API, create a const variable in the App.js file with a key (API key) and base (url of the API location)
  - if you want to use this to get the weather, use a fetch function
```
   fetch(`${api.base}weather?q=${query}&units=metric&APPiD=${api.key}`)
        .then(res =>res.json())
        .then(result => setWeather(result));
```
 - sends an HTTP request to this base website and uses the API key to get put this endpoint
 - get json from the response and set the weather to this result
 ```onChange={e => setQuery(e.target.value)}```
 - include this onChange function in the search bar in order to call event when it is happening
 - need to check if the weather.main is defined and has been called
 - use the ternary operator and need to enclose all in a div tag
 ```{(typeof weather.main != "undefined") ? () : (' ')}```
 - can also update the background picture based on the weather with this class in the div returned
```
<div className={
   (typeof weather.main != "undefined")
       ? ((weather.main.temp > 16)
         ? 'App warm' 
         : 'App cold') 
       : 'App'}>
```
 - for time, can add a '0' to the beginning of the getTime() return value, then use .slice(-2) to get last two digits
## Back End with NodeJS and Express
 - also going to be using a backend server
 - npm install the express, mysql, nodemon, and body-parser
 - we'll be running this server on port 3001 instead of 3000
 - now instead of using npm start to run the application, we use
 ```node index.js```
 - here, we're also using the app.get to reach the home location, REST API
 - can configure nodemon so that it knows we're running the application and continuously update
 - in the scripts of the ```package.json``` set it so when you do start, it automatically runs node index.js
 - also add ```"devStart": "nodemon index.js"``` to run the server through nodemon
 - now, command: ```npm run devStart```
 - a lot of people actually use this so they don't need to re run the server when developing

## Database with MySQL
 - using MySQL to store the previous cities and their temperatures
 - access the MySQL database in the index.js of the server using this
```const mysql = require('mysql');```
 - then we need to create an instance from mysql with the same database name as the one in our local instance
```
   const db = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'tennis-weather-database'
   })
```
 - host is the address of the site; right now it's just localhost
 - root and password are defaults
 - to call a command and insert into the database, use the query function
 - query function takes in a string to pass to the table, so need to use the key words
 - instead of (req, res), can use (err, result) to see if there are errors and return whatever trying to query













## React Introduction Part I
 #### DOM and JSX
 - React uses a virtual DOM, which stands for document object model
 - basically, it creates the hierarchy virtually in the memory (RAM) and if it finds a difference between the virtual and the screen (UI) DOM, it updates automatically
 - so page does not need to be refreshed, it updates automatically
 - JSX is Javascript XML, similar to HTML
 - JSX allows you to return a block of XML to create HTML content
 - must have enclosing tags when returning (like returning a div instead of an 'a' and an 'h1' tag)
 - JavaScript expressions allows to insert JS into the JSX code
```{this.props.caption}```
 - index.js file contains the import of React, as well as rendering for the ReactDOM
 - when rendering, the App tag calls the App.js file
 - when you save, the virtual DOM automatically updates the website in localhost
 #### Functional components
 - functional components are static and don't really change, no states
 - React is just a framework for Javascript, so need to import it in every file
 - once you define a component and it returns something (like an image in a div) need to export it
```export default BannerImage;```
 - need to import the image and include the location of it in the files into App.js
 - to include the component which renders the code, use the self closing tag of the component
 - in the JSX, use ```<BannerImage />```
 - when importing, if it is a JS extension, don't need to specify; but for css and others, you do
 - instead of adding class="" in the tag, for JSX need to use className=""
 #### Class-based components
 - class based components are dynamic and better for things that have to change
 - props, short for properties, can be passed into the components
```<PhotoEntry src="berlin.jpg" location="Location" />	// src and location parameters```
 - to access these parameters in the component React js file, use this.props.{parameter} where props is for specific property
```this.props.caption or this.props.location```
 - when including Javascript, or a variable in the JSX, need to use {} around it
 - when including and image as the src, need to include the specific path, like ".../images/" + this.props.src
 - otherwise, can just use the this.props expression
 - can create a "wrapper-like" component that just hard codes some instances of another component
 #### JSON
 - instead of creating hardcoding the parameters, can use JSON to create them dynamically
 - can import the json file by doing ```import NAME_OF_OBJECT from './data/JSON_FILE'```
 - when commenting, JSX has to think it is JavaScript so need to enclose the comment in braces {/**/}
 - example of using the JSON file:
```
{
  entries.itemlist.map((photo) => {
    return <PhotoEntry key={photo.src} src={photo.src} location={photo.location} caption={caption} />
  )
}
```
 - photo is the current element in the entries list, getting the properties from it
 - adding in a 'key' property helps React update the DOM quickly
 - ```debugger;``` triggers a breakpoint in the code and pauses execution in the code


## React Introduction Part II
 #### Props and States
 - class-based components have states and lifestyles
 - props are something from the outside that are passed into the React component
 - on the other hand, state is internal and component keeps it for itself, can only be changed by the component itself
 - state determines whether component is re-rendered or not
 - set and get a state:
```this.setState({x: y})	this.state.attribute```
 - call the constructor with ```constructor(props) {}``` and super(props) to initialize with parent constructor
 - initialize the state by doing ```this.state = {userID: "", userName: ""};``` where it contains key/value pairs
 #### Controlled components
 - controlled components help with maintaining the state
 - when someone types something in a box, it triggers the onChange event and it saves the new value on each keystroke into the state
 - so now you read what is in the state, not in the text box
 - everytime there is a keystroke, onChange calls a function that takes in an event
 - to get the value of the event that was passed in, (the userIdFieldValue that was typed in the text box) use ```event.target.value```
 - use ```let``` keyword to declare a variable
 #### Render props
 - render prop is when you use a component to create a prop that can be used where the component was called
 ```<UserManager showMessageArea={ userInfo => (<MessageArea userInfo={userInfo} />)} />```
 - this returns a prop called showMessageArea that takes in an argument...can use it with ```this.props.showMessageArea(this.state)```
 #### Context
 - context means when you create a context component, any component below in the hierarchy will have access to the data in the context
 - in context, doesn't need to be passed as a prop all the way down, can just be accessed
 - each context has a provider (provides the values) and consumers (use the values); need to import the context
 - in the render, enclose the tags in a provider tag and return it; the value is whatever you want the components inside the tags to be able to access it
```<ContentAreaContext.Provider value={{userIs: this.state.userId}}> </ContentAreaContext.Provider>```
 - when you want to consume the values of the context, go into the file, import context, and create a ```static contextType = ContentAreaContext;```
 - use the context by calling this.context.VALUE_NAME_HERE (different from the contextType) 
 - when class components get created and destroyed, they go through stages and cycles of their lives
 #### Lifecycle Hooks
 - these are all methods that you can call in the component or in the App.js
 - Mounting methods (component created)
    - constructor- actual creation of component 
    - render- displays component to the screen
    - componentDidMount- stage when all the component and its children have already been rendered
 - Update methods (component being updated)
    - shouldComponentUpdate- passes you old and new state, and can decide to re-render
    - render
    - componentDidUpdate- after the state changes
 - Unmounting methods (component destroyed)
    - componentWillUnmount- can do some cleanup before the component is destroyed
 #### Observer Path
 - used to transfer data between different branches of the app
 - in the component you want to get data from, you have an event with an observer list that contains the components that you want to notify when the event happens
 - "subscribed" components in this list will get notified upon event
 - can check if the state has been changed using the componentDidUpdate() function, and call ALL event listeners in the subscribe list