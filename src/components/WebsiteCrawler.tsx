
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from 'lucide-react';

export const WebsiteCrawler = () => {
  const [url, setUrl] = useState('https://www.easya.io');
  const [isLoading, setIsLoading] = useState(false);
  const [crawlResult, setCrawlResult] = useState<string | null>(null);

  const handleCrawl = async () => {
    setIsLoading(true);
    setCrawlResult(null);

    try {
      const response = await fetch('https://api.firecrawl.ai/v0/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_FIRECRAWL_API_KEY}`
        },
        body: JSON.stringify({
          url: url,
          pageOptions: {
            onlyMainContent: true
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to crawl website');
      }

      const data = await response.json();
      setCrawlResult(data.content || 'No content found');
    } catch (error) {
      setCrawlResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Website Crawler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input 
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
        {crawlResult && (
          <Textarea 
            value={crawlResult}
            readOnly
            className="w-full min-h-[300px]"
          />
        )}
      </CardContent>
    </Card>
  );
};
