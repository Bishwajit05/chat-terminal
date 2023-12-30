"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plane, SendIcon } from "lucide-react";

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
    <div className="w-full h-[100vh] flex justify-center items-end p-10 bg-black">
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
      <form
        className="w-full flex gap-4 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          value={userInput}
          className="w-1/2"
          onChange={(e: any) => setUserInput(e.target.value)}
        />
        <Button className="px-4 py-4 bg-blue-600" type="submit">
          Send
          <SendIcon className="ml-2" />
        </Button>
      </form>
    </div>
  );
}
