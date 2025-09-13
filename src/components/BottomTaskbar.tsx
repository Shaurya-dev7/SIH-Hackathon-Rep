import { Button } from "@/components/ui/button";
import { Home, Wrench, Users, HelpCircle } from "lucide-react";

const BottomTaskbar = () => {
  const navItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: Wrench, label: "Services", href: "#services" },
    { icon: Users, label: "About", href: "#about" },
    { icon: HelpCircle, label: "FAQ", href: "#faq" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border shadow-card-hover md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className="flex flex-col items-center py-2 px-3 min-w-0 flex-1"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 mb-1 hover:bg-primary/10"
              >
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </Button>
              <span className="text-xs text-muted-foreground truncate">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTaskbar;