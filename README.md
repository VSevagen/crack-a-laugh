<h1>Lights Out</h1>
<p>THis challenge is about verifying whether you've got a good hang of basic React concepts</p>
<br/>
<h2>The Game</h2>
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
