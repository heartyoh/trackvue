#!/bin/sh
# $1 : INPUT_VIDEO
# $2 : OUTPUT_FOLDER

if [ ! -e $2 ]; then
  mkdir $2
fi

nohup ffmpeg -y -i $1 -map 0:0 -vcodec copy $2/audio.mp3 -map 0:1 -vcodec copy $2/front.mp4 -map 0:2 -vcodec copy $2/rear.mp4 &
