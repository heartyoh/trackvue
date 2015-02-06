#!/bin/sh
# $1 : INPUT_VIDEO
# $2 : OUTPUT_FOLDER

if [ ! -e $2 ]; then
  mkdir $2
fi

ffmpeg -y -i $1 -vn $2/audio.mp3 -map 0:1 $2/front.mp4 -map 0:2 $2/rear.mp4
