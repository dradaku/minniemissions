
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Get started by creating an account or signing in to access all features.
        </p>
        <Button 
          size="lg" 
          onClick={() => navigate("/auth")}
          className="bg-primary hover:bg-primary/90"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
