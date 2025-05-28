import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Loader2 } from 'lucide-react'; // Example: if a loading spinner icon is desired

// Define the form schema using Zod
const formSchema = z.object({
  username: z.string()
    .min(1, { message: 'Username is required.' })
    .max(50, { message: 'Username must be 50 characters or less.' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(100, { message: 'Password must be 100 characters or less.'}),
});

type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  className?: string;
  onLoginSuccess?: (data: LoginFormValues) => void;
  onSignUpClick?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onLoginSuccess, onSignUpClick }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    console.log('Login form submitted:', data);
    // Simulate API call for demonstration
    // In a real application, replace this with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      // Example of handling API response:
      // const response = await api.login(data);
      // if (response.success) {
      //   if (onLoginSuccess) onLoginSuccess(data);
      // } else {
      //   form.setError("root.serverError", { type: "manual", message: response.error || "Login failed" });
      // }
      if (onLoginSuccess) { // Assuming success for this example
        onLoginSuccess(data);
      }
    } catch (error) {
      console.error("Login error:", error);
      // Example of handling unexpected errors:
      // form.setError("root.serverError", { type: "manual", message: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = React.useCallback(() => {
    if (onSignUpClick) {
      onSignUpClick();
    } else {
      console.log('Sign up clicked. Implement navigation or modal.');
      // Example: navigate('/signup') or setModalOpen(true)
    }
  }, [onSignUpClick]);

  // Layout requirement: mainContent uses gap-4. Form elements and sign-up link are part of mainContent.
  const internalFormGap = "space-y-4"; // For spacing between form items
  const signUpLinkMarginTop = "mt-4";    // For spacing above the sign-up link

  return (
    // Card fulfills the "mainContent" styling requirements:
    // bg-surface (via bg-card), p-6 (via CardHeader/CardContent), rounded-md, shadow-md
    <Card className={cn('w-full', className)}>
      <CardHeader>
        {/* Title: "Log in", large, bold, left-aligned as per image */}
        <CardTitle className="text-2xl font-bold text-card-foreground">
          Log in
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={internalFormGap}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  {/* Visually hidden label for accessibility, placeholder acts as visual cue */}
                  <FormLabel className="sr-only">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Username" // Placeholder visible as per image
                      {...field}
                      disabled={isLoading}
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* Visually hidden label for accessibility, placeholder acts as visual cue */}
                  <FormLabel className="sr-only">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password" // Placeholder visible as per image
                      {...field}
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Display server-side or other root errors here */}
            {form.formState.errors.root?.serverError && (
                <FormMessage className="text-destructive">
                    {form.formState.errors.root.serverError.message}
                </FormMessage>
            )}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                  Logging in...
                </>
              ) : (
                'Log in'
              )}
            </Button>
          </form>
        </Form>
        {/* Sign up link, styled as per image, with spacing matching gap-4 requirement */}
        <div className={cn("text-center", signUpLinkMarginTop)}>
          <Button
            variant="link"
            className="text-sm text-muted-foreground hover:text-primary px-0 h-auto py-1"
            onClick={handleSignUpClick}
            type="button" // Important to prevent form submission if this button were inside the <form>
            disabled={isLoading}
          >
            or, sign up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
