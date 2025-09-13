import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Recycle } from "lucide-react";
import AIChat from "./AIChat";
import { Link } from 'react-router-dom';

const FloatingChatButton = () => {
  const [showAIChat, setShowAIChat] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <div className="flex flex-col items-center gap-3">
          <Link to="/dashboard?tab=ewaste" aria-label="Open E-Waste">
            <Button
              size="sm"
              className="rounded-full shadow-card bg-green-500 hover:bg-green-600 text-white h-10 w-10 p-0"
            >
              <Recycle className="w-5 h-5" />
            </Button>
          </Link>

          <Button
            onClick={() => setShowAIChat(true)}
            size="lg"
            className="rounded-full shadow-card-hover bg-primary hover:bg-primary-hover text-primary-foreground h-14 w-14 p-0"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      </div>
      
      <AIChat isOpen={showAIChat} onClose={() => setShowAIChat(false)} />
    </>
  );
};

export default FloatingChatButton;