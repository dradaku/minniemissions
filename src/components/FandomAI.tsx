
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Fandom } from "@/data/fandoms";

interface FandomAIProps {
  fandom: Fandom;
}

export const FandomAI: React.FC<FandomAIProps> = ({ fandom }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock AI response for now
  const generateAIResponse = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question about the fandom");
      return;
    }

    setLoading(true);
    
    try {
      // In a real implementation, this would call an API endpoint to fetch AI response
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      const fandomInfo: Record<string, string> = {
        "BeyHive": `The BeyHive is the dedicated fanbase of Beyoncé, known for their organization and fierce loyalty. 
                   They are passionate about defending Beyoncé's artistry and legacy, often mobilizing on social media.
                   The BeyHive originated around 2011 after Beyoncé's 4 album release and has grown into one of the most powerful fan communities.`,
                   
        "Swifties": `Swifties are Taylor Swift's dedicated fanbase, known for their detective skills and attention to details in Taylor's music.
                    They often analyze lyrics, music videos, and social media posts for hidden messages and Easter eggs.
                    Swifties are extremely supportive of Taylor's rerecordings and have helped her break numerous records.`,
                    
        "ARMY": `ARMY (Adorable Representative M.C. for Youth) is BTS's global fanbase, known for their digital organization and charity work.
                They have helped BTS break countless records and are known for their social activism and philanthropic projects.
                ARMY often coordinates streaming efforts and social media campaigns to support BTS.`,
                
        "Vibestars": `Vibestars are the passionate fans of Dr. Adaku, known for their positive energy and community-focused initiatives.
                     This growing fanbase celebrates wellness, mindfulness, and cultural heritage through music and social engagement.
                     Vibestars often participate in community service and wellness events inspired by Dr. Adaku's teachings.`,
                     
        "30BG": `30 Billion Gang (30BG) is Davido's loyal fanbase, named after his catchphrase referencing wealth and success.
               They are known for their unwavering support and defense of Davido across social media platforms.
               30BG fans celebrate Davido's charitable works and contributions to Afrobeats' global recognition.`,
               
        "Wizkid FC": `Wizkid FC is the devoted fanbase of Nigerian superstar Wizkid, operating like a football club with fierce loyalty.
                     They've supported Wizkid's evolution from local star to global icon and his pioneering role in Afrobeats.
                     Wizkid FC celebrates his international collaborations and Grammy recognition that have elevated African music.`
      };
      
      // Provide specific fandom info if available, or generate a generic response
      if (fandomInfo[fandom.name]) {
        setAnswer(`${fandomInfo[fandom.name]}\n\nSpecific answer to your question "${question}":\n
        This is a simulated AI response. In the full implementation, this would connect to an AI service to generate relevant information about ${fandom.fanbase} based on your specific questions.`);
      } else {
        setAnswer(`${fandom.fanbase} are the dedicated fans of ${fandom.artist}. They are known for their passion and support.\n\n
        This is a simulated AI response. In the full implementation, this would connect to an AI service to generate relevant information about ${fandom.fanbase} based on your specific questions.`);
      }
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
