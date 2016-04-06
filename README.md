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
  questionType: either 'track', 'album' or 'artist' (type string),
  questionString: randomly generated and asks for the right track/album/artist (type string),
  rightAnswer: generated using questionstype and the current index's track (type string),
  wrongAnswer1: generated using questiontype and another index's track (type string),
  wrongAnswer2: same as wrongAnswer1,
  wrongAnswer3: same as wrongAnswer1,
  chosenAnswer: '' until one is clicked,then between says either 'rightAnswer' or 'wrongAnswer1/2/3' (type string);
  id: ;
}
```
