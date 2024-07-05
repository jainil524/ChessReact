import './css/index.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import IndexRoute from './Routes/IndexRoute'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<IndexRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
