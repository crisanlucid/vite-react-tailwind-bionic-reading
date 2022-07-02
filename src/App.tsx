import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { NotificationsProvider } from '@mantine/notifications'
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core'

import './App.css'
import { Layout } from './components/Layout'
import { NotFound } from './components/NotFound'
import './translations/i18n'
import { Home } from './pages/Home'
import { BionicReaderPage } from './components/BionicReaderPage'
import { AboutPage } from './pages/About'

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  const aboutContent = {
    title: 'Integrate effortlessly with any technology stack',
    description:
      'Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon.',
  }
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme, primaryColor: 'green' }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position="top-right" zIndex={2077}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="playground" element={<BionicReaderPage />} />
                <Route path="about" element={<AboutPage {...aboutContent} />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
