import React, { useState, useEffect } from "react";
import { translateText, getTranslationHistory } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Translator = () => {
  const [text, setText] = useState(""); 
  const [translatedText, setTranslatedText] = useState(""); 
  const [history, setHistory] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await getTranslationHistory(token);
      setHistory(response);
    } catch (error) {
      console.error("Error fetching translation history:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchHistory();
    }
  }, [token]);

  const handleTranslate = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const response = await translateText(text, token); 
      setTranslatedText(response.translatedText); 
      fetchHistory();
    } catch (error) {
      console.error("Error translating text:", error.message);
    }
  };

  return (
    <div className="translator-container">
      <div className="form-container">
        <h2>Translate English to French</h2>
        <form onSubmit={handleTranslate}>
          <textarea
            placeholder="Enter text in English..."
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            required
          />
          <button type="submit">Translate</button>
        </form>

        {translatedText && (
          <div className="translated-text">
            <h3>Translated Text:</h3>
            <p>{translatedText}</p>
          </div>
        )}

        <div className="history-container">
          <h3>Translation History</h3>
          {loading ? (
            <p>Loading history...</p>
          ) : history.length > 0 ? (
            <ul>
              {history.map((user) => ( 
                <li key={user._id}>
                  <strong>Original:</strong> {user.originalText} <br /> {/* Fixed reference */}
                  <strong>French:</strong> {user.translatedText} {/* Fixed reference */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No translation history found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Translator;
