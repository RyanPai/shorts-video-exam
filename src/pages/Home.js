
import React, { useRef , useEffect, useState} from 'react';
import {Slider, SliderTrack, SliderThumb, SliderFilledTrack ,Box, IconButton, ButtonGroup, Button, Divider, Fade } from '@chakra-ui/react'
import styled from '@emotion/styled'
import {useFollowingList, useForYouList} from '../services/examQuery';
import Video from '../components/Video';
const VideoList = styled(Box)`
  height: 100%;
  overflow: auto;
  scroll-snap-type: y mandatory;
  & > * {
    scroll-snap-align: start;
    height: 100%;
    overflow: hidden
  }
`



const Home = () => {
  const { data:followingListData, isFetched } = useFollowingList();
  const { data:ForYouListData }= useForYouList()
  const [listName, setListName] = useState('following');
  return (
    <Box height="100%">
      <Box position="absolute" top={0} zIndex={1} display={'flex'} justifyContent={'center'} width={'100%'} py={2}>
        <ButtonGroup size='sm' variant='ghost'>
          <Button isDisabled={listName == 'following'}  onClick={()=> setListName('following')}>Following</Button>
          <Divider orientation='vertical' />
          <Button isDisabled={listName == 'foryou'} onClick={()=> setListName('foryou')}>For You</Button>
        </ButtonGroup>
      </Box>
      <VideoList>
        
          {
            listName == 'following' && followingListData.map((item) => {
            return (
              <Box key={item.title} height="100%">
                <Video data={item} />
              </Box>
            )
          })
        }
     
          {
            listName == 'foryou' && ForYouListData.map((item) => {
            return (
              <Box key={item.title} height="100%">
                <Video data={item} />
              </Box>
            )
          })
        }
      </VideoList>
    </Box>
  )
}

export default Home