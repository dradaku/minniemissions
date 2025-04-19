
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mission, MissionCategory } from "@/data/mockData";
import { formatDistanceToNow } from "date-fns";

interface MissionCardProps {
  mission: Mission;
  onComplete: (missionId: string) => void;
  isCompleted?: boolean;
  requiresWallet?: boolean;
}

export const MissionCard = ({ 
  mission, 
  onComplete, 
  isCompleted = false,
  requiresWallet = false 
}: MissionCardProps) => {
  const handleComplete = () => {
    onComplete(mission.id);
  };

  // Format category badge
  const getCategoryColor = (category: MissionCategory) => {
    switch (category) {
      case MissionCategory.SOCIAL:
        return "bg-blue-100 text-blue-800";
      case MissionCategory.EVENT:
        return "bg-purple-100 text-purple-800";
      case MissionCategory.CONTENT:
        return "bg-green-100 text-green-800";
      case MissionCategory.REFERRAL:
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden border border-border hover:shadow-md transition-shadow duration-300">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={mission.imageUrl} 
          alt={mission.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge 
            className={`${getCategoryColor(mission.category)} font-medium`}
          >
            {mission.category}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{mission.title}</h3>
          <div className="font-semibold text-minnie-purple flex items-center">
            <span className="mr-1">⚡</span>
            {mission.reward} VP
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{mission.description}</p>
        <div className="mt-3 text-xs text-muted-foreground">
          Created {formatDistanceToNow(new Date(mission.createdAt), { addSuffix: true })}
        </div>
        {mission.expiresAt && (
          <div className="mt-1 text-xs text-rose-600">
            Expires {formatDistanceToNow(new Date(mission.expiresAt), { addSuffix: true })}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isCompleted ? (
          <Button 
            variant="outline" 
            className="w-full" 
            disabled
          >
            Completed
          </Button>
        ) : (
          <Button 
            variant="default" 
            className={`w-full ${
              requiresWallet 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-gradient-to-r from-minnie-purple to-minnie-blue text-white hover:opacity-90'
            }`}
            onClick={handleComplete}
          >
            {requiresWallet ? 'Connect Wallet to Complete' : 'Complete Mission'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

