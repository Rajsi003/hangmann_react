import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './components/helpers/helpers';

import './App.css';

const words = [
  "ability", "able", "about", "above", "accept", "according", "account",
  "across", "action", "activity", "actually", "add", "address", "administration",
  "admit", "adult", "affect", "after", "again", "against", "age", "agency",
  "agent", "agree", "agreement", "ahead", "allow", "almost", "alone", "along",
  "already", "also", "although", "always", "American", "among", "amount",
  "analysis", "and", "animal", "another", "answer", "anyone", "anything", 
  "appear", "apply", "approach", "area", "argue", "arm", "around", "arrive",
  "art", "article", "artist", "as", "ask", "assume", "at", "attack", "attempt",
  "attention", "attorney", "audience", "author", "authority", "available",
  "avoid", "away", "baby", "back", "bad", "bag", "ball", "bank", "bar", 
  "base", "be", "beat", "beautiful", "because", "become", "bed", "before", 
  "begin", "behavior", "behind", "believe", "benefit", "best", "better",
  "between", "beyond", "big", "bill", "billion", "bit", "black", "blood",
  "blue", "board", "body", "book", "born", "both", "box", "boy", "break",
  "bring", "brother", "budget", "build", "building", "business", "but",
  "buy", "by", "call", "camera", "campaign", "can", "cancer", "candidate",
  "capital", "car", "card", "care", "career", "carry", "case", "catch",
  "cause", "cell", "center", "central", "century", "certain", "certainly",
  "chair", "challenge", "chance", "change", "character", "charge", "check",
  "child", "choice", "choose", "church", "citizen", "city", "civil", "claim",
  "class", "clear", "clearly", "close", "coach", "cold", "collection", "college",
  "color", "come", "commercial", "common", "community", "company", "compare",
  "computer", "concern", "condition", "conference", "Congress", "consider",
  "consumer", "contain", "continue", "control", "cost", "could", "country",
  "couple", "course", "court", "cover", "create", "crime", "cultural", 
  "culture", "cup", "current", "customer", "cut", "dark", "data", "daughter",
  "day", "dead", "deal", "death", "debate", "decade", "decide", "decision",
  "deep", "defense", "degree", "democratic", "describe", "design", "despite",
  "detail", "determine", "develop", "development", "difference", "different",
  "difficult", "dinner", "direction", "director", "discover", "discuss", 
  "disease", "do", "doctor", "dog", "door", "down", "draw", "dream", "drive",
  "drop", "drug", "during", "each", "early", "east", "easy", "economic",
  "economy", "edge", "education", "effect", "effort", "eight", "either",
  "election", "else", "employee", "end", "energy", "enjoy", "enough", "enter",
  "entire", "environment", "environmental", "especially", "establish", "even",
  "evening", "event", "ever", "every", "everyone", "everything", "evidence",
  "exactly", "example", "executive", "exist", "expect", "experience",
  "expert", "explain", "face", "fact", "factor", "fail", "fall", "family",
  "far", "fast", "father", "fear", "federal", "feel", "feeling", "few", "field",
  "fight", "figure", "fill", "film", "final", "finally", "financial", "find",
  "fine", "finger", "finish", "fire", "firm", "first", "fish", "five", "floor",
  "fly", "focus", "follow", "food", "foot", "for", "force", "foreign", "forget",
  "form"]

let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;