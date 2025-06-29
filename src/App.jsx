import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import TopicPage from './Components/TopicPage.jsx';
import topics from './data/topics.jsx'; 
import './App.css';
function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  const topicIndex = parseInt(location.pathname.replace('/topic/', ''), 10) || 0;

  const goToTopic = (index) => {
    if (index >= 0 && index < topics.length) {
      navigate(`/topic/${index}`);
    }
  };

  return (
    <>
      <Header 
        currentTopic={topics[topicIndex]?.title} 
        onBack={() => goToTopic(topicIndex - 1)}
        onNext={() => goToTopic(topicIndex + 1)}
        onTopicClick={goToTopic}
      />

      <main className="content">
        <Routes>
          <Route path="/topic/:id" element={<TopicPage topics={topics} />} />
          <Route path="*" element={<TopicPage topics={topics} />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
