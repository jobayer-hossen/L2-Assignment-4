import {
  BarChart3,
  BookOpen,
  LayoutGrid,
  Shield,
  Users,
  Zap,
} from "lucide-react";

import { useEffect } from "react";
import { useLocation } from "react-router";

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pathname]);
};

export const features = [
  {
    icon: BookOpen,
    title: "Book Management",
    description:
      "Easily add, edit, and organize your entire book collection with detailed metadata and cover images.",
  },
  {
    icon: Users,
    title: "Borrower Tracking",
    description:
      "Keep track of who borrowed what, when it's due, and send automated reminders.",
  },
  {
    icon: LayoutGrid,
    title: "Intuitive UI & Seamless UX",
    description:
      "Navigate effortlessly with a clean, modern interface designed for smooth interactions and quick access to all your library needs.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Get insights into your library usage with detailed reports and borrowing statistics.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Your data is protected with enterprise-grade security and automatic backups.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with modern technology for blazing-fast performance and seamless user experience.",
  },
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Head Librarian",
    content:
      "This system has revolutionized how we manage our library. The interface is intuitive and the features are exactly what we needed.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "School Administrator",
    content:
      "Implementation was smooth and our staff adapted quickly. The reporting features have been invaluable for our operations.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Community Library Manager",
    content:
      "The best library management system we've used. Clean, efficient, and packed with useful features.",
    rating: 5,
  },
];
