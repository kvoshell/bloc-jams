var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

var albumMercury = {
     title: 'A Data Learn the Language',
     artist: 'The Mercury Program',
     label: 'Tiger Style',
     year: '2002',
     albumArtUrl: 'assets/images/album_covers/tmp.jpeg',
     songs: [
         { title: 'Tequesta', duration: '7:38' },
         { title: 'Fragile or Possibly Extinct', duration: '7:19' },
         { title: 'Slightly Drifting', duration: '6:24'},
         { title: 'Egypt', duration: '4:52' },
         { title: 'To/From Iceland', duration: '5:41'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

var setCurrentAlbum = function(album) {
    
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     albumSongList.innerHTML = '';
 
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
    
 };


var switchAlbum = function () {
    var selectedArtist = document.getElementsByClassName('album-view-artist')[0].textContent;
        switch (selectedArtist){
            case "The Mercury Program":
                setCurrentAlbum(albumPicasso);
                break;
            case "Pablo Picasso":
                setCurrentAlbum(albumMarconi);
                break;
            case "Guglielmo Marconi":
                setCurrentAlbum(albumMercury);
                break;
        }
};

 
 window.onload = function() {
     setCurrentAlbum(albumMercury);
     document.getElementsByClassName('album-cover-art')[0].addEventListener("click", function(){
         switchAlbum();
     });                                                                          
 };