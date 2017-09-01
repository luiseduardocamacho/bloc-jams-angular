(function(){
  function SongPlayer($rootScope, Fixtures){
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
        stopSong();
    }

      currentBuzzObject = new buzz.sound(song.audioUrl,{
        formats:['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function(){
          $rootScope.$apply(function(){
            SongPlayer.currentTime = currentBuzzObject.getTime();
          });
      });

      SongPlayer.currentSong = song;
    };

    var stopSong = function(song){
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }
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

    SongPlayer.currentTime = null;

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
        stopSong();
      }
      else{
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    }

    SongPlayer.next = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong)
      currentSongIndex++

      if(currentSongIndex >= currentAlbum.songs.length){
        stopSong();

      }
      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }

    }

      SongPlayer.setCurrentTime = function (time){
        if (currentBuzzObject){
          currentBuzzObject.setTime(time);
        }
      };

  return SongPlayer;
  };


  angular
    .module('blocJams')
    .factory('SongPlayer',['$rootScope', 'Fixtures', SongPlayer]);
})();
