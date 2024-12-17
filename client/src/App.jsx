import React from 'react'
import { BrowserRouter, Routes, Navigate, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import PageNotFound from './pages/PageNotFound';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import Favourites from './pages/Favourites';




export default function App() {
  // const location = useLocation(); // Access the current route
  // console.log('location', location);
  
  // const isSignInPage = location.pathname === '/sign-in';


  return (
    <BrowserRouter>
    <ScrollToTop />
    <ConditionalHeader />
    {/* Render Header conditionally */}
    {/* 
    {!isSignInPage && <Header />} */}
    {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />

        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/favourites' element={<Favourites />} />

        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>

        

        <Route path="*" element={<PageNotFound />} />
        <Route path='/post/:postSlug' element={<PostPage />} />

        


      </Routes>
    
    
    </BrowserRouter>
  )
}

function ConditionalHeader() {
  const location = useLocation(); // Safely use useLocation within the BrowserRouter context
  const excludeHeaderRoutes = ['/sign-in', '/sign-up'];
  const shouldDisplayHeader = !excludeHeaderRoutes.includes(location.pathname);

  return shouldDisplayHeader ? <Header /> : null;
}
