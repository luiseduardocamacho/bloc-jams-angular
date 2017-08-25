(function(){
  function SongPlayer(){
    var SongPlayer = {};
    var currentSong = null;

    /**
    * @desc Buzz object audio file
    * @type {object}
    */
    var currentBuzzObject = null;

    /**
    - Why do we use var setSong instead of SongPlayer.setSong?
    - Is that what makes the function private?
    - Is it just a naming convention to call functions a method that's private and method a public method?
    * @function setSong
    * @desc Stops currently playing son and loads new audio files as currentBuzzObject
    * @param {object} song
    */
    var setSong = function(song){
      if(currentBuzzObject){
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl,{
        formats:['mp3'],
        preload: true
      });
      currentSong = song;
    };

    /**
    * @function setSong
    * @desc plays the song in the currentBuzzObject
    */
    var playSong = function(){
      currentBuzzObject.play();
      song.playing = true;
    }

    SongPlayer.play = function(song){
      if (currentSong !== song){
        setSong(song)
        playSong();
      }
      else if (currentSong === song) {
        if (currentBuzzObject.isPaused()){
          playSong();
        }
      };
    };

    SongPlayer.pause = function(song){
      currentBuzzObject.pause();
      song.playing = false;
    };

  return SongPlayer;
  };


  angular
    .module('blocJams')
    .factory('SongPlayer',SongPlayer);
})();
