import React from "react";
import { Route, Routes } from "react-router";
import './App.css';
import AddPracticeQuestion from "./components/AddPracticeQuestion/AddPracticeQuestion";
import AddPracticeSet from "./components/AddPracticeSet/AddPracticeSet";
import AdminLogin from "./components/AdminRegisteration/AdminLogin";
import AdminRegister from "./components/AdminRegisteration/AdminRegister";
import Home from "./components/Home/Home"
import Navbar from "./components/Navbar/Navbar";
import PracticeQuestions from "./components/PracticeQuestions/PracticeQuestions";
import PracticeSet from "./components/PracticeSet/PracticeSet";
import AddQuizQuestion from "./components/Quiz Section/Add Quiz Question/AddQuizQuestion";
import AddQuiz from "./components/Quiz Section/AddQuiz/AddQuiz";
import QuizPage from "./components/Quiz Section/Quiz Page/QuizPage";
import QuizSets from "./components/Quiz Section/Quiz Sets/QuizSets";
import RankList from "./components/Quiz Section/Rank List/RankList";
import Score from "./components/Quiz Section/Score/Score";
import UserCheck from "./components/Quiz Section/User Check/UserCheck";
import TopicList from "./components/TopicList/TopicList";
import Error from "./components/Error/Error";




function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/navbar" element={<Navbar/>} />
      <Route path="/login" element={<AdminLogin/>} />
      <Route path="/register" element={<AdminRegister/>} />
      <Route path="/addpracticeset" element={<AddPracticeSet/>} />
      <Route path="/addpracticeset" element={<AddPracticeSet/>} />
      <Route path="addpracticeset/addpracticequestion" element={<AddPracticeQuestion/>} />
      <Route path="/practiceset" element={<PracticeSet/>} />
      <Route path="/practiceset/topiclist" element={<TopicList/>} />
      <Route path="/practiceset/topiclist/practicequestions" element={<PracticeQuestions/>} />
      <Route path="/addquiz" element={<AddQuiz/>} />
      <Route path="/addquiz/addquizquestion" element={<AddQuizQuestion/>} />
      <Route path="/addquizquestion" element={<AddQuizQuestion/>} />
      <Route path="/quizsets/quizpage" element={<QuizPage/>} />
      <Route path="/score" element={<Score/>} />
      <Route path="/quizsets" element={<QuizSets/>} />
      <Route path="/usercheck" element={<UserCheck/>} />
      <Route path="/usercheck/quizpage" element={<QuizPage/>} />
      <Route path="/usercheck/quizpage/score" element={<Score/>} />
      <Route path="/rank" element={<RankList/>} />
      <Route path="/error" element={<Error/>} />
      
      
      </Routes>
    </div>
  );
}

export default App;
