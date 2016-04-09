Interaction Programing - Lab assignment - HTML
=================================================

This project contains the startup code for HTML version of the Interaction Programing course lab assignment. For more details on how to complete the assignment follow the instructions on the [course website](https://www.kth.se/social/course/DH2641).


Structure
================================================
1. playlist
  * an object created from what you input in the `home.html` which is then saved, via `homeCtrl.js`, in the service as `this.playlist` (can be accessed by using `Quiz.playlist` in controllers)
  * you can get a track by using `Quiz.playlist.tracks.items[i]` where `i` is the index of the track in the playlist.
  * for information what a typical playlist looks like follow the link https://developer.spotify.com/web-api/object-model/#playlist-object-full  

1. question
  * an object created when you start the game (via `gameCtrl.js`) and looks like
```javascript
{
  questionType: /*either 'track', 'album' or 'artist' (type string)*/,
  questionStr: /*randomly generated and asks for the right track/album/artist (type string)*/,
  correctAnswer: /*generated using questionstype and the current index's track (type string)*/,
  answerAlternatives: /* an array with all the answer alternatives in random order */,
  answered: /* boolean (true/false) if the questions has been answered or not*/,
  chosenAnswer: /*'' until one is clicked,then between says either 'rightAnswer' or 'wrongAnswer1/2/3' (type string)*/,
  lastQuestion: /* boolean (true/false). true for the last question in the list /*,
  id: /*from 1-20 (type number)*/;

}
```
  * a question is reached from the view with ' {{question()}} '
  * a question's attributes are reached from the view with ' {{question().questionStr}} '
  * a question's answer alternatives are reached from the view with ' {{question().answerAlternatives[0]}} '
  

scoreboard
```javascript
{
  correct: /* 1 if the answer was correct, 0 if the answer was incorrect*/,
  correctAnswer: /* string of the correct answer */,
  questionNumber: /*the id of the question */,
  userAnswer: /* string of user's answer */ 
}
```
