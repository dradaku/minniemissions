
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Fandom } from "@/data/fandoms";
import { supabase } from "@/integrations/supabase/client";

interface FandomAIProps {
  fandom: Fandom;
}

export const FandomAI: React.FC<FandomAIProps> = ({ fandom }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAIResponse = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question about the fandom");
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('fandom-ai', {
        body: { fandom, question },
      });

      if (error) {
        console.error("Error calling fandom-ai function:", error);
        throw new Error(error.message || 'Failed to generate response');
      }

      if (data.error) {
        console.error("Error in AI response:", data.error);
        throw new Error(data.error || 'Failed to process your question');
      }

      setAnswer(data.response);
    } catch (error) {
      console.error("Error generating AI response:", error);
      toast.error("Failed to generate response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-medium mb-2">Ask AI about {fandom.fanbase}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Learn more about {fandom.artist}'s fandom, history, famous moments, or anything else you're curious about.
        </p>
        <Textarea
          placeholder={`E.g., What makes ${fandom.fanbase} unique? When was this fandom established?`}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-3 min-h-24"
        />
        <Button 
          onClick={generateAIResponse} 
          disabled={loading || !question.trim()}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating response...
            </>
          ) : (
            "Get AI Response"
          )}
        </Button>
      </div>

      {answer && (
        <div className="p-4 bg-white border rounded-md">
          <h3 className="text-lg font-medium mb-2">AI Response</h3>
          <div className="whitespace-pre-line text-sm">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};
