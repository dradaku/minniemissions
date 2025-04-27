
import React, { useState } from 'react';
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

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  fandom: z.string().min(2, { message: "Please specify your fandom." }),
  university: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  feedback: z.string().optional()
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with react-hook-form and zod
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      fandom: "",
      university: "",
      message: "",
      feedback: ""
    }
  });

  // Handle form submission
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
          message: values.message,
          feedback: values.feedback || null
        });

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "Your message has been submitted successfully.",
        variant: "default"
      });

      // Reset the form after successful submission
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
                <FormControl>
                  <Input placeholder="Which artist/community are you a fan of?" {...field} />
                </FormControl>
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
  );
};

export default Contact;
