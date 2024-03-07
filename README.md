# Music Player Website

This is a dynamic music player website where you can play songs from different albums. The website automatically detects folders containing albums and their metadata from a `.json` file. Each album includes a name, description, cover photo, and list of songs.

## Features

- Display all albums on the homepage.
- Click on an album to view and play songs from that album.
- Control buttons for play, pause, next, and previous.
- Volume control and mute functionality.
- Display the current time and duration of the song.
- Seek bar to navigate through the song.
- Responsive design that works on different screen sizes.

## How to Use

1. Open the website.
2. You will see a list of albums on the homepage.
3. Click on an album to view the songs in that album.
4. Click on a song to start playing it.
5. Use the control buttons to play, pause, go to the next song, or go to the previous song.
6. Use the volume control to adjust the volume or mute the song.
7. Use the seek bar to navigate through the song.
8. Click on the hamburger icon to open the sidebar, and click on the close icon to close the sidebar.

## Code Overview

The JavaScript code for this website includes several functions:

- `SecondsToTimeFormat(seconds)`: Converts seconds to a time format (minutes:seconds).
- `getSongs(folder)`: Fetches the songs from a specified folder.
- `playMusic(track, playing = true)`: Plays a specified track.
- `displayAlbums()`: Displays all albums on the homepage.
- `main()`: The main function that calls other functions and adds event listeners.

This project provides a seamless music listening experience with dynamic album detection and playback controls.
