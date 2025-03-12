import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../components/ui/use-toast";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Mail, LockKeyhole, LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Mock user data
  const users = [
    { email: "faculty@nitc.edu", password: "password", role: "faculty" },
    { email: "admin@nitc.edu", password: "password", role: "admin" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address",
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", user.role);
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${email}!`,
        });
        
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Simulate Google Authentication
    setTimeout(() => {
      // Mock successful Google login
      const googleEmail = "user@gmail.com";
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", googleEmail);
      localStorage.setItem("userRole", "faculty"); // Default role for Google login
      
      toast({
        title: "Google login successful",
        description: `Welcome, ${googleEmail}!`,
      });
      
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <div className="w-full max-w-md">
        <Card className="border border-gray-200 shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
            <CardTitle className="text-2xl font-bold text-white">Student Details Visualization System</CardTitle>
            <CardDescription className="text-gray-200">Enter your credentials to sign in</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Button variant="link" className="p-0 h-auto text-xs text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>
              
              {error && (
                <div className="bg-red-100 p-3 rounded-md text-sm text-red-600 animate-fade-in">
                  {error}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="w-full space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in with Email"}
                  <LogIn className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="relative w-full my-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300"></span>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-gray-50 px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700"
                  disabled={isLoading}
                  onClick={handleGoogleLogin}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                    <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25526 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                    <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                    <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                    <path d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25537 21.31 7.3104 24 12.0004 24Z" fill="#34A853" />
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <div className="text-gray-600">
            Demo credentials: <span className="font-medium">admin@school.edu</span> / <span className="font-medium">password</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;