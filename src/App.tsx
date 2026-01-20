import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GiftOpening from "./pages/GiftOpening";
import Journey from "./pages/Journey";
import Songs from "./pages/Songs";
import Photos from "./pages/Photos";
import Letter from "./pages/Letter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Hardcoded credentials
const VALID_USERNAME = "weightloss";
const VALID_PASSWORD = "bike";

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading for smooth UX
    await new Promise(resolve => setTimeout(resolve, 800));

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      localStorage.setItem("isLoggedIn", "true");
      onLogin();
    } else {
      setError("Invalid Login Credentials");
      setIsLoading(false);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#f5f5f5] flex flex-col">
      {/* SBI-style Header */}
      <div className="bg-[#0c3d6e] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* SBI Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-10 h-10 bg-[#0c3d6e] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">GH</span>
                </div>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl tracking-wide">GOLDEN HOUR</h1>
                <p className="text-blue-200 text-xs">Personal Banking</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-white text-sm">
            <span className="hover:text-blue-200 cursor-pointer transition-colors">Help</span>
            <span className="hover:text-blue-200 cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#0c3d6e] to-[#1a5490] px-6 py-5 border-b-4 border-orange-500">
              <h2 className="text-white text-2xl font-semibold">Personal Banking Login</h2>
              <p className="text-blue-100 text-sm mt-1">Enter your credentials to continue</p>
            </div>

            {/* Card Body */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-[#0c3d6e] transition-colors text-gray-800 bg-white"
                    placeholder="Enter Username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-[#0c3d6e] transition-colors text-gray-800 bg-white"
                    placeholder="Enter Password"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-[#0c3d6e] hover:bg-[#0a3158] text-white font-semibold rounded shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide text-sm"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Please Wait...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <a href="#" className="text-[#0c3d6e] hover:underline font-medium">Forgot Password?</a>
                  <a href="#" className="text-[#0c3d6e] hover:underline font-medium">New User?</a>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-yellow-800 font-semibold text-sm">Security Notice</p>
                <p className="text-yellow-700 text-xs mt-1">
                  Do not share your login credentials with anyone. Always logout after your session.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-xs">
              © 2026 Golden Hour. All rights reserved. |
              <a href="#" className="text-[#0c3d6e] hover:underline ml-1">Privacy Policy</a> |
              <a href="#" className="text-[#0c3d6e] hover:underline ml-1">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GiftOpening />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/letter" element={<Letter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
