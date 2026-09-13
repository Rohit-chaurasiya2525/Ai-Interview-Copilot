import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UploadResume from "./pages/UploadResume";
import About from "./pages/About";
import AIQuestions from "./pages/AIQuestions";
import Interview from "./pages/Interview";

import HRInterviewSection from "./pages/HRInterviewSection";
import JJ from "./pages/JJ";
import MicTest from "./pages/MicTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<AIQuestions />} />
        <Route path="/interview" element={<Interview />} />
        {/* <Route path="/interviewCategory" element={<InterviewCategories/>}/>*/}
        <Route path="/HrInterview" element={<HRInterviewSection />} />
        <Route path="/hr-interview" element={ <JJ/>} />
  


      </Routes>
  
    </BrowserRouter>
  
  );
}

export default App;


