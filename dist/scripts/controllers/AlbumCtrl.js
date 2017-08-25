(function(){
    function AlbumCtrl(Fixtures, SongPlayer){
      this.albumDetails = Fixtures.getAlbum()
      //potentially refactor in Fixtures, ask Shannon. 
      this.albumData = [];
        for (var i=0; i < this.albumDetails.songs.length; i++){
          this.albumData.push(this.albumDetails.songs[i]);
          }

      this.SongPlayer = SongPlayer;
      }

    angular
      .module('blocJams')
      .controller('AlbumCtrl', ['Fixtures','SongPlayer',AlbumCtrl]);
})();
