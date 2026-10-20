import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import { useTokenStore } from "./store/services/token-store";
import Orders from "./pages/orders/orders";
import PagesLayoutWrapper from "./Layouts/PagesLayoutWrapper";



const queryClient = new QueryClient();

const App = () => {
  const { token } = useTokenStore();
  const isAuthenticated = !!token;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<PagesLayoutWrapper />}>
              <Route path="/" element={isAuthenticated ? <Navigate to="/orders" /> : <Login />} />
              <Route path="/orders" element={
                <Orders />
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App;
