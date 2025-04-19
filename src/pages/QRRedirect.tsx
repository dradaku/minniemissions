
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { getUserByAddress } from '@/data/mockData';
import { Loader2 } from 'lucide-react';

const QRRedirect = () => {
  const { userId, missionId } = useParams<{ userId: string; missionId?: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // In a real application, this would make an API call to track the scan
    const trackScan = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check if the user exists
        const user = getUserByAddress(userId || '');
        if (!user) {
          setError('Invalid referral code');
          return;
        }
        
        // In a real app, we would track this scan in the database
        console.log(`QR code scanned: User ${userId}, Mission ${missionId || 'general'}`);
        
        setSuccess(true);
      } catch (err) {
        console.error('Error tracking scan:', err);
        setError('Failed to process referral');
      } finally {
        setLoading(false);
      }
    };

    trackScan();
  }, [userId, missionId]);

  return (
    <Layout>
      <div className="max-w-md mx-auto text-center py-12">
        {loading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-minnie-purple animate-spin mb-4" />
            <h1 className="text-2xl font-bold mb-2">Processing Referral</h1>
            <p className="text-gray-600">Please wait while we verify this scan...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-minnie-purple to-minnie-blue text-white">
                Go to Homepage
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">Referral Recorded!</h1>
            <p className="text-gray-600 mb-6">
              This referral has been successfully recorded. Want to join Minniemissions and start earning rewards?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button className="bg-gradient-to-r from-minnie-purple to-minnie-blue text-white">
                  Join Now
                </Button>
              </Link>
              <Link to="/missions">
                <Button variant="outline">
                  View Missions
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QRRedirect;
