
// Supabase Edge Function to generate AI responses about fandoms using OpenAI
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FandomQuestion {
  fandom: {
    name: string;
    fanbase: string;
    artist: string;
  };
  question: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('Missing OpenAI API key');
    }

    // Parse the request body
    const { fandom, question } = await req.json() as FandomQuestion;
    
    if (!fandom || !question) {
      throw new Error('Missing required parameters: fandom and question');
    }

    console.log(`Processing question about ${fandom.fanbase} (${fandom.artist}): ${question}`);
    
    // Construct a prompt that will help OpenAI generate relevant information
    const systemPrompt = `You are a knowledgeable expert on music fandoms, fan culture, and artist communities.
    Focus on providing accurate, respectful information about "${fandom.fanbase}", which is the fanbase of "${fandom.artist}".
    Include relevant information about the fandom's history, notable moments, traditions, online presence, and community values.
    Keep your answers concise (under 250 words), informative, and engaging.
    If you don't have specific information about this fandom, provide general insights about similar fan communities while being transparent about limitations.
    Do not make up false information or fabricate specific events that didn't happen.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using a cost-effective model that's still powerful
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        max_tokens: 500, // Limit response length
        temperature: 0.7, // Balanced between creativity and accuracy
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Return the AI-generated response
    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fandom-ai function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        suggestion: 'If this persists, please check the OpenAI API key configuration.'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
