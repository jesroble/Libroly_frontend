import React, { useState, useRef, useEffect } from 'react';
import { DEMO_MODE, RECOMMENDATIONS_API_URL } from '../../config';
import { recommendBooks } from '../../demo/demoApi';

interface BookRecommendation {
  title: string;
  author: string;
  isbn?: string; 
  purchase_url?: string;
}

interface ChatMessage {
  type: 'bot' | 'user';
  text?: string; 
  inStockRecs?: BookRecommendation[]; 
  generalRecs?: BookRecommendation[]; 
}

const fetchRecommendations = async (userMessage: string) => {
  const microserviceUrl = `${RECOMMENDATIONS_API_URL}/recommend`;

  const response = await fetch(microserviceUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_input: userMessage }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error del microservicio: ${response.status} - ${errorData.detail || 'Error desconocido'}`);
  }

  return response.json();
};

// En modo demo las recomendaciones se calculan en el navegador con el catálogo de ejemplo.
const getRecommendations = DEMO_MODE ? recommendBooks : fetchRecommendations;

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: 'bot', text: '¡Hola! Soy Libroly, tu asistente de recomendación de libros. ¿En qué puedo ayudarte hoy?' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = inputValue.trim();
    setMessages((prevMessages) => [...prevMessages, { type: 'user', text: userMessage }]);
    setInputValue(''); 
    setIsLoading(true);

    try {
      const result = await getRecommendations(userMessage);
      console.log("Respuesta del microservicio:", result);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: 'bot',
          text: result.message,
          inStockRecs: result.in_stock_recommendations,
          generalRecs: result.general_recommendations,
        },
      ]);

    } catch (error: any) {
      console.error('Error al llamar al microservicio:', error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo más tarde.' },
      ]);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  const renderBotMessageContent = (message: ChatMessage) => {
    if ((message.inStockRecs && message.inStockRecs.length > 0) || (message.generalRecs && message.generalRecs.length > 0)) {
      return (
        <div>
          {message.text && <p className="text-sm mb-2">{message.text}</p>}
          {message.inStockRecs && message.inStockRecs.length > 0 && (
            <div className="mb-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs font-semibold text-blue-700 mb-1">📚 En Stock:</p>
              <ul className="list-none p-0 m-0 text-sm">
                {message.inStockRecs.map((rec, idx) => (
                  <li key={`in-stock-${idx}`} className="mb-1 last:mb-0">
                    {rec.purchase_url ? (
                      <a href={rec.purchase_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                        {rec.title} <span className="text-gray-600">Test({rec.author})</span>
                      </a>
                    ) : (
                      <span className="text-gray-800">{rec.title} <span className="text-gray-600">({rec.author})</span></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {message.generalRecs && message.generalRecs.length > 0 && (
            <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-600 mb-1">💡 Otras Sugerencias:</p>
              <ul className="list-none p-0 m-0 text-sm">
                {message.generalRecs.map((rec, idx) => (
                  <li key={`general-${idx}`} className="mb-1 last:mb-0">
                    <span className="text-gray-800">{rec.title} <span className="text-gray-600">({rec.author})</span></span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(!message.inStockRecs || message.inStockRecs.length === 0) &&
           (!message.generalRecs || message.generalRecs.length === 0) &&
           !message.text && (
            <p className="text-sm">No se encontraron recomendaciones en este momento.</p>
          )}
        </div>
      );
    }
    return <p className="text-sm">{message.text}</p>;
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-12 h-12 bg-rose-500 text-white rounded-full shadow-lg hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center z-[1100]"
        aria-label="Abrir chat de recomendaciones"
      >
        <i className="fas fa-book text-lg"></i>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-72 bg-white rounded-lg shadow-xl overflow-hidden z-[1100] flex flex-col max-h-[90vh]">
          <div className="bg-rose-500 text-white p-3 flex justify-between items-center rounded-t-lg">
            <h3 className="font-semibold text-sm">Libroly - Asistente de Lectura</h3>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
              aria-label="Cerrar chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto bg-gray-50 max-h-[calc(90vh-100px)]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start mb-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center text-white mr-2 flex-shrink-0">
                    <i className="fas fa-robot text-sm"></i>
                  </div>
                )}
                <div
                  className={`p-2.5 rounded-lg shadow max-w-[80%] ${
                    message.type === 'user'
                      ? 'bg-rose-100 text-gray-800 rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none'
                  }`}
                >
                  {renderBotMessageContent(message)}
                </div>
                {message.type === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 ml-2 flex-shrink-0">
                    <i className="fas fa-user text-sm"></i>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start mb-4 justify-start">
                <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center text-white mr-2 flex-shrink-0">
                  <i className="fas fa-robot text-sm"></i>
                </div>
                <div className="bg-white p-2.5 rounded-lg shadow max-w-[80%]">
                  <p className="text-sm text-gray-600 animate-pulse">Libroly está pensando...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                placeholder={isLoading ? "Libroly está pensando..." : "Escribe tu mensaje..."}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-l-lg focus:outline-none focus:border-rose-500 text-sm"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-1.5 bg-rose-500 text-white rounded-r-lg hover:bg-rose-600 transition-colors duration-300 disabled:opacity-50"
                disabled={isLoading || inputValue.trim() === ''}
              >
                <i className="fas fa-paper-plane text-sm"></i>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Las recomendaciones son generadas por IA.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
