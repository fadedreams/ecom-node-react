// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Adjust import path if needed
import Footer from './components/Footer'; // Adjust import path if needed
import Login from './components/Login'; // Adjust import path if needed

function Home() {
    return <h1>Home Page</h1>;
}

function About() {
    return <h1>About Page</h1>;
}

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />

            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
