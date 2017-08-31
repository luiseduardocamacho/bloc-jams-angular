(function(){
  function SongPlayer(Fixtures){
    var SongPlayer = {};

    var currentAlbum = Fixtures.getAlbum();

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
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl,{
        formats:['mp3'],
        preload: true
      });
      SongPlayer.currentSong = song;
    };

    /**
    * @function setSong
    * @desc plays the song in the currentBuzzObject
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    }

    var getSongIndex = function(song){
      return currentAlbum.songs.indexOf(song);
    }

    SongPlayer.currentSong = null;

    SongPlayer.play = function(song){
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song){
        setSong(song)
        playSong(song);
      }
      else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()){
          playSong(song);
        }
      };
    };

    SongPlayer.pause = function(song){
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    SongPlayer.previous = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong)
      currentSongIndex--

      if (currentSongIndex < 0){
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
      else{
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    }

  return SongPlayer;
  };


  angular
    .module('blocJams')
    .factory('SongPlayer',['Fixtures', SongPlayer]);
})();
