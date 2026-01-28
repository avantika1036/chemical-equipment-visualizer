import React from "react";
import { motion } from "framer-motion";
import {
  Beaker,
  BarChart3,
  Github,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/auth");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="gradient-header sticky top-0 z-50 shadow-lg"
    >
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* LEFT - LOGO & TITLE */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg"
            >
              <Beaker className="w-8 h-8 text-white" strokeWidth={2.5} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h1 className="text-2xl font-bold text-white tracking-tight">
                 Chemical Equipment Visualizer
              </h1>
              <p className="text-sm text-white/80 font-medium">
                Parameter Analysis & Data Visualization
              </p>
            </motion.div>
          </div>

          {/* RIGHT - USER INFO & ACTIONS */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex items-center gap-4"
          >
            {/* Hybrid Label */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20">
              <BarChart3 className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">
                Hybrid Web + Desktop App
              </span>
            </div>

            {/* USER INFO */}
            {user && (
              <div className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-white">
                  {user.email}
                </span>
              </div>
            )}

            {/* SIGN OUT BUTTON */}
            {user && (
              <Button
                onClick={handleLogout}
                className="h-11 px-6 gradient-button-danger hover:gradient-button-danger font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </Button>
            )}

            {/* GITHUB LINK */}
            <a
              href="https://github.com/avantika1036/chemical-equipment-visualizer.git"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/15 hover:bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 transition-all hover:scale-110 shadow-md"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
