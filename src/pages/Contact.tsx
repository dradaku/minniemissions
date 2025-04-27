import React, { useState } from 'react';
import { Layout } from "@/components/Layout";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { sportsTeams } from "@/data/sportsTeams";
import { fandoms } from "@/data/fandoms";
import { FandomAI } from "@/components/FandomAI";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  fandom: z.string().min(2, { message: "Please specify your fandom." }),
  university: z.string().optional(),
  favoriteTeam: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  feedback: z.string().optional()
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [openTeamCombobox, setOpenTeamCombobox] = useState(false);
  const [customFandom, setCustomFandom] = useState('');
  const [showAIAssistance, setShowAIAssistance] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      fandom: "",
      university: "",
      favoriteTeam: "",
      message: "",
      feedback: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: values.name,
          email: values.email,
          fandom: values.fandom,
          university: values.university || null,
          favorite_team: values.favoriteTeam || null,
          message: values.message,
          feedback: values.feedback || null
        });

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "Your message has been submitted successfully.",
        variant: "default"
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your message. Please try again.",
        variant: "destructive"
      });
      console.error('Contact form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Minniemissions</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fandom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fandom</FormLabel>
                  <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Input
                          placeholder="Search for a fandom or type your own..." 
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setCustomFandom(e.target.value);
                          }}
                        />
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start">
                      <Command>
                        <CommandInput 
                          placeholder="Search fandoms or type your own..." 
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setCustomFandom(value);
                          }}
                        />
                        <CommandList>
                          <CommandEmpty>
                            Continue typing to add your custom fandom
                          </CommandEmpty>
                          <CommandGroup>
                            {fandoms.map((fandom) => (
                              <CommandItem
                                key={fandom.name}
                                value={fandom.name}
                                onSelect={(value) => {
                                  if (value === "Other") {
                                    field.onChange(customFandom);
                                  } else {
                                    field.onChange(value);
                                  }
                                  setOpenCombobox(false);
                                }}
                              >
                                {fandom.artist === "Custom" ? (
                                  "Other - Add your own fandom"
                                ) : (
                                  `${fandom.artist} - ${fandom.fanbase}`
                                )}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    field.value === fandom.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Tell us which artist or community you'd like to see on Minniemissions
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your university" {...field} />
                  </FormControl>
                  <FormDescription>
                    Let us know which university you attend or attended
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="favoriteTeam"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite Sports Team (Optional)</FormLabel>
                  <Popover open={openTeamCombobox} onOpenChange={setOpenTeamCombobox}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Input
                          placeholder="Select your favorite team..."
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          onClick={() => setOpenTeamCombobox(true)}
                        />
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search teams..." />
                        <CommandList>
                          <CommandEmpty>No team found</CommandEmpty>
                          <CommandGroup heading="Football Teams">
                            {sportsTeams
                              .filter(team => team.sport === 'football')
                              .map((team) => (
                                <CommandItem
                                  key={team.name}
                                  value={team.name}
                                  onSelect={(value) => {
                                    field.onChange(value);
                                    setOpenTeamCombobox(false);
                                  }}
                                >
                                  {team.name}
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      field.value === team.name
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                          <CommandGroup heading="Basketball Teams">
                            {sportsTeams
                              .filter(team => team.sport === 'basketball')
                              .map((team) => (
                                <CommandItem
                                  key={team.name}
                                  value={team.name}
                                  onSelect={(value) => {
                                    field.onChange(value);
                                    setOpenTeamCombobox(false);
                                  }}
                                >
                                  {team.name}
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      field.value === team.name
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select your favorite football or basketball team
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What would you like to tell us?" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any suggestions or feedback for Minniemissions?" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Help us improve by sharing your thoughts
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center mb-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowAIAssistance(!showAIAssistance)}
                className="w-full max-w-xs"
              >
                {showAIAssistance ? 'Hide AI Assistance' : 'Get AI Help Crafting Your Message'}
              </Button>
            </div>

            {showAIAssistance && form.watch('fandom') && (
              <FandomAI fandom={{ 
                name: form.watch('fandom'), 
                fanbase: form.watch('fandom'), 
                artist: form.watch('fandom') 
              }} />
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default Contact;
