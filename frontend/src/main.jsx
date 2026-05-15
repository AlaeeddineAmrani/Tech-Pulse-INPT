import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Visualisation from './pages/Visualisation.jsx'
import PageRecherche from './pages/PageRecherche.jsx'
import PageComparaison from './pages/PageComparaison.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>    
            <Route path="/" element={<Layout />}>
              <Route index element={<App />}></Route>
              <Route path="/recherche/:motCle" element={< PageRecherche/>}></Route>
              <Route path="/espace-visualisation/:nomProjet" element={<Visualisation />}></Route>
              <Route path="/compare" element={<PageComparaison />}></Route>
            </Route>
        </Routes>
      </BrowserRouter>
    
  </StrictMode>,
)

/*<Route path="/about" element={<About/>}></Route>*/