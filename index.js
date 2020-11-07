var color=["green","red","yellow","blue"];
var gamePattern= [];
var userClickPattern=[];
var start=true;
var level=0;

$(document).on("keypress",function(){
    if(start)
    {
      nextSequence();
      start=false;
    }
});
$(".btn").click(function(){
  var clickColor=$(this).attr("id");
  userClickPattern.push(clickColor);
  buttonAnimation(clickColor);
  playSound(clickColor);
  checkPattern(userClickPattern.length-1);

});
function checkPattern(currentColor)
{

  if(userClickPattern[currentColor]==gamePattern[currentColor])
  {
    if(userClickPattern.length==gamePattern.length)
    {
      setTimeout(function(){nextSequence();},1000);
    }
  }
  else
    {
      $("h1").text("GameOver,Press Any Key to Restart");
      $("body").addClass("game-over");
      playSound("wrong");
      setTimeout(function(){$("body").removeClass("game-over")},200);
      gamePattern=[];
      level=0;
      start=true;
    }
}
function nextSequence()
{
  userClickPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var displayColor=color[randomNumber];
  console.log(displayColor);
  gamePattern.push(displayColor);
  console.log(gamePattern);
  $("#"+displayColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(displayColor);
}
function buttonAnimation(displayColor)
{
  var colorToDisplay=displayColor;
  $("#"+colorToDisplay).addClass("pressed");
  setTimeout(function(){$("#"+colorToDisplay).removeClass("pressed");},100);
}

function playSound(clickColor)
{
  var clickColor=clickColor;
  var audio=new Audio("sounds/"+clickColor+".mp3");
  audio.play();
}
