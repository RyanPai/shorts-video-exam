
import React, { useRef , useEffect, useState} from 'react';
import {Slider, SliderTrack, SliderThumb, SliderFilledTrack ,Box, IconButton } from '@chakra-ui/react'
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { FaPlay } from "react-icons/fa";
import useOnScreen from '../hooks/useOnScreen';

const Video = (props) => {
  const { data } = props;
  const videoNode = useRef(null);
  const isOnScreen = useOnScreen(videoNode);
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState('')
  const [percentage, setPercentage] = useState(0);
  const [player, setPlayer] = useState(null);

  const playOptions = {
    fill: true,
    fluid: true,
    autoplay: false,
    controls: false,
    preload: "metadata",
    sources: [
      {
        src: data.play_url
      }
    ]
  };


  const onPause = () => {
    player.pause();
  }

  const onPlay = () => {
    player.play();
  }

  const onReady = (_player) => {
    _player.on('timeupdate',(event) => {
      const {currentTime, duration} = event.target.player.cache_;
    const percentage = ( currentTime / duration ) * 100;
    setPercentage(percentage)
    })
    _player.on('play', (event) => {
      setStatus('play')
    })
    _player.on('pause', (event) => {
      setStatus('pause')
    });
   
    setPlayer(_player);
    setIsReady(true)
  }

  useEffect(() => {
    let timeoutPaly = null;
    if(isReady) {
      clearTimeout(timeoutPaly)
      if(isOnScreen) {
        timeoutPaly = setTimeout(() => {
          onPlay()
        }, 1000)
        
      } else {
        onPause()
      }
    }
    
  }, [isOnScreen, isReady])

  useEffect(() => {
    if (videoNode.current) {
      const _player = videojs(videoNode.current, playOptions, () => {
        onReady(_player)
      });
    }
  }, []);

  return (
      <Box position="relative" overflow="hidden" height="100%" onClick={() => {
        if(status == 'play') {
          onPause()
        } else {
          onPlay()
        }
      }} >
      <video muted style={{
      objectFit: 'cover',
      height: '100%',
    }} poster={data.cover} ref={videoNode} className="video-js" playsInline>
      </video>
      
      {
        status != 'play' &&
        <Box position="absolute" zIndex={10} display="flex" alignItems="center" top={0} justifyContent="center" transform={'translate(calc(50vw - 20px),calc(50vh - 20px))'}>
          <IconButton onClick={onPlay} colorScheme='blue' aria-label='play video' icon={<FaPlay/>} />
        </Box>
      }
      <Box position="absolute" width="100%" bottom={0} overflow="hidden">
      <Slider aria-label='slider-ex-1' value={percentage} onChange={(e) => {
          if(status === 'pause') {
            setPercentage(e)
            player.currentTime(player.cache_.duration * (e / 100))
          }
        }}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          {
            status === 'pause' &&
            <SliderThumb />
          }
        </Slider>
      </Box>
      
    </Box>
    
  );
};

export default Video;