
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useWallet } from '@/contexts/WalletContext';
import { Pencil, Upload } from 'lucide-react';

interface ProfileData {
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  favorite_artist: string | null;
}

export const ProfileEditor = () => {
  const { toast } = useToast();
  const { account } = useWallet();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: '',
    avatar_url: null,
    bio: '',
    favorite_artist: ''
  });

  const fetchProfile = async () => {
    if (!account) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, bio, favorite_artist')
        .eq('id', account)
        .maybeSingle();

      if (error) throw error;
      if (data) setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to fetch profile data",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [account]);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!account) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
      }

      if (file.size > maxSize) {
        throw new Error('File is too large. Maximum size is 5MB.');
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${account}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', account);

      if (updateError) throw updateError;

      setProfileData(prev => ({ ...prev, avatar_url: publicUrl }));
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload profile picture",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (!account) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          bio: profileData.bio,
          favorite_artist: profileData.favorite_artist
        })
        .eq('id', account);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src={profileData.avatar_url || undefined} />
            <AvatarFallback>
              {profileData.full_name?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <Input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              className="hidden"
              id="avatar-upload"
              onChange={handleAvatarUpload}
              disabled={loading}
            />
            <Label
              htmlFor="avatar-upload"
              className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </Label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={profileData.full_name || ''}
              onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
              placeholder="Your display name"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="favorite-artist">Favorite Artist/Brand</Label>
            <Input
              id="favorite-artist"
              value={profileData.favorite_artist || ''}
              onChange={(e) => setProfileData(prev => ({ ...prev, favorite_artist: e.target.value }))}
              placeholder="Who's your favorite artist or brand?"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio || ''}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself and your interests..."
              className="min-h-[100px]"
              disabled={loading}
            />
          </div>

          <Button
            className="w-full"
            onClick={handleProfileUpdate}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
