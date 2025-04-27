
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export const WebsiteCrawler = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('https://www.easya.io');
  const [isLoading, setIsLoading] = useState(false);
  const [crawlResult, setCrawlResult] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');

  const handleCrawl = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Firecrawl API key",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setCrawlResult(null);

    try {
      toast({
        title: "Crawling Started",
        description: "Fetching data from " + url
      });
      
      const response = await fetch('https://api.firecrawl.ai/v0/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          url: url,
          pageOptions: {
            onlyMainContent: true,
            extractMetadata: true
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to crawl website');
      }

      const data = await response.json();
      
      // Format the content for better readability
      let formattedContent = '';
      if (data.title) formattedContent += `Title: ${data.title}\n\n`;
      if (data.description) formattedContent += `Description: ${data.description}\n\n`;
      if (data.content) formattedContent += `Content:\n${data.content}`;
      
      setCrawlResult(formattedContent || 'No content found');
      
      toast({
        title: "Success",
        description: "Website content retrieved successfully"
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setCrawlResult(`Error: ${errorMessage}`);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Website Crawler</CardTitle>
        <CardDescription>
          Get accurate information about EasyA from their website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Firecrawl API Key</Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Firecrawl API key"
              className="font-mono"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="flex space-x-2">
              <Input 
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL"
                className="flex-grow"
              />
              <Button 
                onClick={handleCrawl} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Crawling...
                  </>
                ) : (
                  'Crawl'
                )}
              </Button>
            </div>
          </div>
          
          {crawlResult && (
            <div className="space-y-2">
              <Label htmlFor="result">Crawled Content</Label>
              <Textarea 
                id="result"
                value={crawlResult}
                readOnly
                className="w-full min-h-[400px] font-mono text-sm"
              />
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            <p>Note: You need a Firecrawl API key to use this feature. Visit <a href="https://firecrawl.ai" className="underline" target="_blank" rel="noopener noreferrer">firecrawl.ai</a> to get one.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
