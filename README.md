<h1>Lights Out</h1>

<p>THis challenge is about verifying whether you've got a good hang of basic React concepts as well as Django and GraphQL in overall</p>

<h2>Stages</h2>
<p>This challenge consists of 2 stages</p>
<ul>
<li>First Stage - Get the LightsOut Game working - use the lights-out folder only</li>
<li>Second Stage - Render a leaderboard in lights-out but fetch the data from backend in django folder. Use GraphQL for querying</li>
</ul>

<br/>
<h2>The Game - First Stage</h2>
<p>Lights Out is a logic game played on a grid of individual lights, which can either be lit or unlit. The puzzle is won when all the lights are turned off.</p>
<p>You can click on each individual cell to toggle that light - but its also toggles the light above it, left of it, right and below of it.</p>

<h2>Code</h2>
<p>This game will be built from 3 components</p>
<h2>Component Design</h2>
<h3>App</h3>
<p>As often, this is a very simple component. It just renders the Board component</p>
<h3>Board</h3>
<p>The parent component, in this case Board, will hold the state that represents the in-memory grid of true
/false for lights on/off. Since the state for the board lives in here, this is also where <strong>setState() </strong>
calls will need to go - and there all functions that call <strong>setState()</strong></p>
<h3>Cell</h3>
<p>A simple component. This will simple render a <strong>div</strong> where the CSS classes will indicate whether this cell is lit or unlit. This is what the user clicks on -- but it will need to call a function its receives from <strong>Board</strong> since that will need to update the state.</p>

<h1>Overview</h1>
<p>The game should be able to satisfy the following functions</p>
<p>The overall board should look like the following image. Don't worry about the styles, it's not required for you to replicate what I did but the same functionality should be there. You'll need to guess where to add the classNames</p>
<img src="./public/Overview.png"></img>

<p>Please find the "LightsOutTryout.mp4" video in the public directory to refer the basic functionality of the app. I gave a default number of moves of 20 ( this can be changed if you want) and everytime the user tries/clicks a cell, the number of tries decreases my 1. When it reaches 0, the game is over :)</p>

<p>When the user wins, the board component should be replaced with the following image. The choice of making it a component or not is yours.</p>

<img src="./public/youWon.png"></img>

<h2>Django - Second Stage</h2>
<p>Use the provided django starter code in the django folder to set up your project and GraphQL</p>
<p>I've left some comments/notes in certain files to help you but in the end, the following functions should be there in your PR</p>
<ul>
<li>Data in lights-out/src/Leaderboard.jsx should be fetch from django server aka http://localhost:8000/graphql/</li>
<li>Model should conists of 3 fields (name, wins, loses) where wins and loses are integers initialized as 0</li>
<li>localhost:8000/graphql/ should be working and you should be able to test your queries
</ul>

<p>In the end, after fetching the data, leaderboard should be displayed when you win or lose. Basically at the end of the game</p>

<img src="./public/SecondStage.png"></img>
