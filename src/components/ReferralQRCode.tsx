
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { generateQRCode } from '@/utils/qrCodeGenerator';
import { Loader2 } from 'lucide-react';

interface ReferralQRCodeProps {
  userId: string;
  missionId?: string;
  title?: string;
  description?: string;
}

export const ReferralQRCode = ({
  userId,
  missionId,
  title = 'Your Referral Code',
  description = 'Share this QR code to earn Vibe Points when friends complete missions.',
}: ReferralQRCodeProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQR = async () => {
      try {
        setIsLoading(true);
        const dataUrl = await generateQRCode({ 
          userId,
          missionId,
          size: 250,
          color: {
            dark: '#8B5CF6', // Purple
            light: '#FFFFFF', // White
          }
        });
        setQrCodeUrl(dataUrl);
        setError(null);
      } catch (err) {
        setError('Failed to generate QR code');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    generateQR();
  }, [userId, missionId]);

  const handleDownload = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `minniemissions-qr-${userId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        {isLoading ? (
          <div className="h-64 w-64 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-minnie-purple" />
          </div>
        ) : error ? (
          <div className="h-64 w-64 flex items-center justify-center bg-gray-100 rounded-lg">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        ) : (
          <img 
            src={qrCodeUrl || ''} 
            alt="Referral QR Code" 
            className="h-64 w-64 rounded-lg shadow-md"
          />
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleDownload}
          disabled={isLoading || !qrCodeUrl}
          className="w-full bg-gradient-to-r from-minnie-purple to-minnie-blue text-white"
        >
          Download QR Code
        </Button>
      </CardFooter>
    </Card>
  );
};
