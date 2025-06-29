import React, { useState } from 'react';
import './Header.css';
import topics from '../../data/topics.jsx';

export default function Header({ currentTopic, onBack, onNext, onTopicClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedParts, setExpandedParts] = useState([]);

  const topicsByPart = [
    { part: "Часть 1. Введение", topics: topics.slice(0, 9) },
    { part: "Часть 2. Моделирование", topics: topics.slice(9, 24) },
    { part: "Часть 3. Цивилизация", topics: topics.slice(24, 36) },
    { part: "Часть 4. Однородные системы", topics: topics.slice(36, 49) },
    { part: "Часть 5. Язык", topics: topics.slice(49, 54) },
    { part: "Заключение", topics: topics.slice(54) }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const togglePart = (index) =>
    setExpandedParts((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

  return (
    <>
      <div className="header">
        <div className="burger-button" onClick={toggleMenu}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>

        <div className="current-topic">{currentTopic}</div>

        <div className="navigation-buttons">
          <button className="nav-button" onClick={onBack}>← Назад</button>
          <button className="nav-button" onClick={onNext}>Вперед →</button>
        </div>
      </div>

      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-menu-button" onClick={closeMenu}>✕</button>
        <div className="menu-header">
          <h2>Содержание</h2>
        </div>
        <div className="parts-list">
          {topicsByPart.map((partData, partIndex) => (
            <div key={partIndex} className="part-item">
              <div className="part-title" onClick={() => togglePart(partIndex)}>
                {partData.part}
                <span className="toggle-icon">
                  {expandedParts.includes(partIndex) ? '−' : '+'}
                </span>
              </div>
              {expandedParts.includes(partIndex) && (
                <div className="topics-list">
                  {partData.topics.map((topic, index) => {
                    const globalIndex = topics.indexOf(topic);
                    return (
                      <div
                        key={index}
                        className="topic-item"
                        onClick={() => {
                          onTopicClick(globalIndex);
                          closeMenu();
                        }}
                      >
                        {topic.title}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </>
  );
}
