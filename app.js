
var scores, roundScore, activePlayer, setFinalScore;

init();
console.log(activePlayer);
document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-hold').addEventListener('click', function() 
{
    scores[0] += roundScore;
		setEnd();
		
        if (scores[0] >= setFinalScore) 
        {
            document.querySelector('#name-0').textContent = 'Winner!';
            document.querySelector('.player-0-panel').classList.add('winner');
            document.querySelector('.player-0-panel').classList.remove('active');
        } 
		else 
        {
			activePlayer = 0;
         	nextPlayer(activePlayer);
        }
		return document.querySelector('#score-0').textContent = scores[0];
		});

function init() 
{
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;  
    // document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'CPU';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    alert (
    "The object of this game is to get to the set score (Default = 50) by rolling the dice and adding the sum of each roll to your score. " +
    "You may Roll the dice as many times as you'd like, but if you roll doubles you lose your turn and all the points you acrued. " + 
    "Hit the hold button to bank your score which will give the next player their turn. " + 
    "First player to the set score wins. " + 
    "You can change the set score in the bottom text field.");
	
}


function nextPlayer(activePlayer) 
{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    roundScore = 0;
    
    var CPUrollCount = 0;
    var CPUroundScore = 0;
    var CPUrollLimit = Math.floor(Math.random() * 6) + 1;
   
    document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = 'CPU';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    if (activePlayer === 1) 
    {
    AI_INIT(CPUrollCount,CPUrollLimit,CPUroundScore,scores[1],activePlayer);
    } 
	else 
	{
	activePlayer=0;
    }
}



function setEnd()
{
    setFinalScore = document.getElementById("userScore").value;
    if (!setFinalScore)
        {
      setFinalScore = 50;  
        };
}


document.querySelector('.btn-roll').addEventListener('click', function() 
    {
		if (activePlayer === 0)
		{
		
		console.log(activePlayer);
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice1 == dice2) 
        {
            alert("You Rolled doubles. Loss of Turn");
			activePlayer = 0;
            nextPlayer(activePlayer);
            //Add score
        } 
		else 
        {
//       setTimeout(alert("ROLLED a " + dice1 + " and " + dice2), 1000);
        roundScore += dice1 + dice2;
        document.querySelector('#current-0').textContent = roundScore;
	
        } 
		} 
    });


function AI_INIT(CPUrollCount,CPUrollLimit,CPUroundScore,activePlayer)
{
		if (activePlayer=1)
		{
		console.log(activePlayer);
		var CPUdice1 = Math.floor(Math.random() * 6) + 1;
        var CPUdice2 = Math.floor(Math.random() * 6) + 1;
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + CPUdice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + CPUdice2 + '.png';

		
	if (CPUdice1 === CPUdice2)
	{
		 alert("CPU Rolled doubles. It's Your Turn");
		 activePlayer = 1;
         nextPlayer(activePlayer);
	}
	else 
    {
        CPUroundScore += CPUdice1 + CPUdice2;
        document.querySelector('#current-1').textContent = CPUroundScore;
		
        setTimeout(alert("CPU ROLLED a " + CPUdice1 + " and " + CPUdice2 + " CPU ROUND SCORE = " + CPUroundScore), 1000);
		CPUrollCount++;
		
		if (CPUrollCount == CPUrollLimit)
		{
		setEnd();
		scores[1] += CPUroundScore;
		document.querySelector('#score-1').textContent = scores[1];
			
			if (scores[1] >= setFinalScore) 
            {
            document.querySelector('#name-1').textContent = 'Winner!';
            document.querySelector('.player-1-panel').classList.add('winner');
            document.querySelector('.player-1-panel').classList.remove('active');
            }
			else
			{
            activePlayer = 1;
         	nextPlayer(activePlayer);  
            }
		}
		else
		{ 
		AI_INIT(CPUrollCount,CPUrollLimit,CPUroundScore,activePlayer);
		}
    }
		}
}


