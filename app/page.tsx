"use client";
import { useState } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const { answer } = await res.json();
    setResponses([...responses, { query: userInput, answer }] as any);
    setUserInput("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>
        {responses.map((res: any, index) => (
          <div key={index}>
            <p>
              <strong>You:</strong> {res?.query}
            </p>
            <p>
              <strong>AI:</strong> {res?.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
