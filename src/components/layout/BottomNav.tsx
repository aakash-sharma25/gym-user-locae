import { motion } from "framer-motion";
import { Home, Dumbbell, Utensils, TrendingUp, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/workout", icon: Dumbbell, label: "Workout" },
  { path: "/diet", icon: Utensils, label: "Diet" },
  { path: "/progress", icon: TrendingUp, label: "Progress" },
  { path: "/profile", icon: User, label: "Profile" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
    >
      <div className="mx-auto max-w-lg">
        <div className="mx-4 mb-4 overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="relative flex flex-1 flex-col items-center py-2"
                >
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`relative flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-colors ${
                      isActive ? "" : "hover:bg-muted/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl gradient-orange-yellow"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <Icon
                      className={`relative z-10 h-5 w-5 transition-colors ${
                        isActive ? "text-primary-foreground" : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`relative z-10 text-[10px] font-medium transition-colors ${
                        isActive ? "text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
