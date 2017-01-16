var setSong = function (songNumber) {
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberedCell = function (number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
    var $row = $(template);
    
    var clickHandler = function() {
        
        var songNumber = parseInt($(this).attr('data-song-number')); 
        
        if(currentlyPlayingSongNumber !== null) {
            var currentlyPlayingCell = getSongNumberedCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        
        if (currentlyPlayingSongNumber !== parseInt(songNumber)) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            updatePlayerBarSong();
            
        } else if (currentlyPlayingSongNumber === parseInt(songNumber)) {
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            setSong(null);
        }
    };
    
    var onHover = function(event) {       
        var songNumberElement = $(this).find('.song-item-number');
        var songNumber = songNumberElement.attr('data-song-number');    
        if(parseInt(songNumber) !== currentlyPlayingSongNumber) {
            songNumberElement.html(playButtonTemplate);
        } 
        
    };
    
    var offHover = function(event) {
        var songNumberElement = $(this).find('.song-item-number');
        var songNumber = songNumberElement.attr('data-song-number');
        if(parseInt(songNumber) !== currentlyPlayingSongNumber) {
            songNumberElement.html(songNumber);
        }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
 };

var setCurrentAlbum = function(album) {
    
     currentAlbum = album;
    
     var $albumTitle = $('album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
 
     $albumSongList.empty();
 
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
    
};

var changeSong = function() {
    
    var buttonName = this.className;
    var songIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    
    var lastSong = function(index) {
        if (buttonName == 'next'){   
            return index == 0 ? currentAlbum.songs.length : index;
        } else if (buttonName == 'previous') {
            return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
        }
    };
    
    if (buttonName == 'next') {    
        songIndex++;
        songIndex >= currentAlbum.songs.length ? songIndex = 0 : songIndex;  
    } else if (buttonName == 'previous') { 
        songIndex--;
        songIndex < 0 ? songIndex = currentAlbum.songs.length - 1 : songIndex;
    }
    
    setSong(songIndex + 1);
    
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + ' - ' + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var songBefore = lastSong(songIndex);
    var $LastSongDisplay = getSongNumberedCell(songBefore);
    var $songDisplay = getSongNumberedCell(currentlyPlayingSongNumber);
    
    $songDisplay.html(pauseButtonTemplate);
    $LastSongDisplay.html(songBefore);
};

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + ' - ' + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next')

$(document).ready (function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(changeSong);
    $nextButton.click(changeSong);
 });

