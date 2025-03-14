"use client";

import React from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Apple, Github, ChromeIcon as Google } from "lucide-react";
import { 
  SignIn, SignUp, ClerkLoaded, ClerkProvider, useUser 
} from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <LoginContent />
    </ClerkProvider>
  );
}

function LoginContent() {
  const { user } = useUser();

  const createClerkPasskey = async () => {
    try {
      if (user) {
        const response = await user.createPasskey();
        console.log("Passkey Created:", response);
      }
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        
        {/* App Logo & Heading */}
        <div className="flex flex-col space-y-2 text-center">
          <div className="mb-4 flex items-center justify-center">
            <BarChart3 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">FitTrack</h1>
          <p className="text-sm text-muted-foreground">
            Your personal health and fitness companion
          </p>
        </div>

        {/* Login & Register Tabs */}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Sign in to your account to continue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ClerkLoaded>
                  <SignIn redirectUrl="/" signUpUrl="#register" />
                </ClerkLoaded>

                {/* Separator */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                {/* OAuth Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <OAuthButton provider="google" icon={<Google className="mr-2 h-4 w-4" />} />
                  <OAuthButton provider="apple" icon={<Apple className="mr-2 h-4 w-4" />} />
                  <OAuthButton provider="github" icon={<Github className="mr-2 h-4 w-4" />} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Form */}
          <TabsContent value="register" id="register">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>Sign up to get started with FitTrack</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ClerkLoaded>
                  <SignUp redirectUrl="/" signInUrl="#login" />
                </ClerkLoaded>

                {/* Separator */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                {/* OAuth Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <OAuthButton provider="google" icon={<Google className="mr-2 h-4 w-4" />} />
                  <OAuthButton provider="apple" icon={<Apple className="mr-2 h-4 w-4" />} />
                  <OAuthButton provider="github" icon={<Github className="mr-2 h-4 w-4" />} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-xs text-muted-foreground">
                  By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Passkey Button */}
        <ClerkLoaded>
          {user && user.passkeys?.length === 0 && (
            <div className="mt-4">
              <Button 
                onClick={createClerkPasskey}
                className="w-full bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
              >
                Create a passkey now
              </Button>
            </div>
          )}
        </ClerkLoaded>
      </div>
    </div>
  );
}

/** OAuth Button Component */
function OAuthButton({ provider, icon }: { provider: string; icon: React.ReactNode }) {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => {
        const button = document.querySelector(`[data-oauth-button-${provider}]`) as HTMLElement;
        button?.click();
      }}
    >
      {icon} {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </Button>
  );
}
