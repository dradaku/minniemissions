import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { fandoms } from "@/data/fandoms";
import { FandomAI } from "@/components/FandomAI";
import { MeetupStaking } from "@/components/MeetupStaking";

const Fandoms = () => {
  const { toast } = useToast();
  const { connected, vibePoints } = useWallet();
  const [selectedFandom, setSelectedFandom] = useState<string | null>(null);

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Explore Fandoms</h1>
        <p className="text-center mb-8 text-gray-600 max-w-2xl mx-auto">
          Learn about your favorite fandoms, create meetups, and connect with like-minded fans.
          Stake your vibe points to fund community events and earn rewards!
        </p>

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="explore">Explore Fandoms</TabsTrigger>
            <TabsTrigger value="meetups">MinnieSquad Meetups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {fandoms.filter(fandom => fandom.name !== "Other").map((fandom) => (
                <Card key={fandom.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{fandom.fanbase}</CardTitle>
                    <CardDescription>{fandom.artist}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Learn about the {fandom.fanbase} and connect with other fans.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setSelectedFandom(fandom.name)}
                        >
                          Explore {fandom.fanbase}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>About {fandom.fanbase}</DialogTitle>
                          <DialogDescription>
                            Learn everything about {fandom.artist}'s fandom
                          </DialogDescription>
                        </DialogHeader>
                        <FandomAI fandom={fandom} />
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="meetups">
            <MeetupStaking vibePoints={vibePoints} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Fandoms;
