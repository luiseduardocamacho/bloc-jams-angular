(function(){
    function AlbumCtrl(Fixtures){
      this.albumDetails = Fixtures.getAlbum()

      this.albumData = [];
        for (var i=0; i < this.albumDetails.songs.length; i++){
          this.albumData.push(this.albumDetails.songs[i]);
          }
      }

    angular
      .module('blocJams')
      .controller('AlbumCtrl', ['Fixtures',AlbumCtrl]);
})();
