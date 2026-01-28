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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card border-b border-border sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Beaker className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Chemical Equipment Visualizer
              </h1>
              <p className="text-xs text-muted-foreground">
                Parameter Analysis & Data Visualization
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {/* Hybrid label */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <BarChart3 className="w-4 h-4" />
              <span>Hybrid Web + Desktop App</span>
            </div>

            {/* USER INFO */}
            {user && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                {user.email}
              </div>
            )}

            {/* SIGN OUT */}
            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            )}

            {/* GitHub */}
            <a
              href="https://github.com/avantika1036/chemical-equipment-visualizer.git"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Github className="w-5 h-5 text-muted-foreground" />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
