import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SalonProvider } from "@/contexts/SalonContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import SalonAdminPanel from "./pages/SalonAdminPanel";
import SalonRegistration from "./pages/SalonRegistration";
import NotFound from "./pages/NotFound";
import AllBookings from "./pages/salonOnerPage/AllBookings";
import Payments from "./pages/salonOnerPage/Payments";
import UpcomingBookings from "./pages/salonOnerPage/UpcomingBookings";
import Services from "./pages/salonOnerPage/Services";
import Dashboard from "@/pages/salonOwnerDashBoard/salonOwnerDashBoard";
import Contact from "./pages/Contact";
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';


const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />, 
    children: [],
  },
  { path: 'auth', element: <Auth /> },
  { path: 'auth', element: <Contact /> },
  { path: 'salon_admin_pannel', element: <SalonAdminPanel /> },
  { path: 'register-salon', element: <SalonRegistration /> },
  { path: 'bookings', element: <AllBookings /> },
  { path: 'payments', element: <Payments /> },
  { path: 'upcoming', element: <UpcomingBookings /> },
  { path: 'services', element: <Services /> },
  { path: 'salon-owner/dashboard', element: <Dashboard /> },
  { path: '*', element: <NotFound /> },

]);

const App = () => (
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <SalonProvider>
          <RouterProvider router={router} />
        </SalonProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
