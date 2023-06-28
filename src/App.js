import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider,Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './App.css'

import Home from './pages/Home';

const StyledTabs = styled(Tabs)`
height: 100%;
display: flex;
flex-direction: column;
justify-content: flex-end;
`;

const StyledTabPanels = styled(TabPanels)`
flex: 1;
height: 100%;
`;

const StyledTabPanel = styled(TabPanel)`

  padding: 0;
  height: 100%;
`;

const StyledTabList = styled(TabList)`
  border-top: 1px solid #000;
  & > * {
    width: 100%
  }
`;

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Box sx={{
          width: '100vw',
          height: '100%',
        }}>
          <StyledTabs defaultIndex={0}>
            <StyledTabPanels>
              <StyledTabPanel>
                <Home/>
              </StyledTabPanel>
              <StyledTabPanel>
              </StyledTabPanel>
            </StyledTabPanels>
            <StyledTabList>
              <Tab>Home</Tab>
              <Tab isDisabled>Discover</Tab>
            </StyledTabList>
          </StyledTabs>
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
