import { useState, useEffect } from 'react';
import Parser from 'rss-parser';

export default function Chat() {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    async function fetchHeadline() {
      const parser = new Parser();
      const feed = await parser.parseURL('https://www.nhk.or.jp/news/easy/news-list.json');
      // NHK JSON endpoint for headlines (not RSS)
      const today = Object.values(feed)[0];
      const firstHeadline = today[0].title;
      setMessages([
        {
          sender: 'Chie',
          text: `こんにちは！今日のチャレンジはこの見出しです：「${firstHeadline}」。英語に翻訳してください。`
        }
      ]);
    }
    fetchHeadline();
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages = messages.concat([{ sender: 'You', text: input }]);
    setMessages(newMessages);

    setTimeout(() => {
      setMessages((prev) => prev.concat(
        [
          {
            sender: 'Chie',
            text: `Your score: 85% ✅ Correct: "A typhoon is approaching." Great job! Keep it up!`
          }
        ]
      ));
    }, 1000);

    setInput('');
  };

  return (
    <div className="flex flex-col h-[80vh] border rounded-lg shadow bg-orange-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[70%] ${msg.sender === 'Chie'
              ? 'bg-orange-200 self-start'
              : 'bg-blue-200 self-end'
              }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 bg-white flex gap-2 border-t">
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your translation..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

