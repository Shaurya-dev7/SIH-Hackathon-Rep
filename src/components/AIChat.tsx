import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  actions?: React.ReactNode;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChat = ({ isOpen, onClose }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm RepairUp's AI assistant. I can help diagnose appliance issues and guide you through troubleshooting steps. I can also help you prepare the right information for our technicians to ensure faster, more efficient repairs. What appliance problem can I help you with today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBookService = (service: string, problem: string) => {
    toast({
      title: "Redirecting to booking page...",
      description: `Pre-filling form for: ${service} - ${problem}`,
    });
    navigate('/book-now', { state: { service, problem } });
    onClose();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): { text: string, actions?: React.ReactNode } => {
    const message = userMessage.toLowerCase();
    
    // AC issues - Enhanced diagnostics
    if (message.includes('ac') || message.includes('air conditioner') || message.includes('cooling')) {
      if (message.includes('not cooling') || message.includes('warm air')) {
        return {
          text: "🌡️ AC not cooling properly? This is a common issue we see at RepairUp. It often points to dirty air filters, a refrigerant leak, or compressor problems. Would you like to book a technician?",
          actions: <Button onClick={() => handleBookService('AC', 'Not Cooling')} size="sm" className="mt-2">Book an AC Technician</Button>
        };
      }
      if (message.includes('noise') || message.includes('sound')) {
        return {
          text: "🔧 A noisy AC can be alarming. For your safety, avoid trying to fix it yourself. It's best to have a RepairUp expert take a look. Shall I book one for you?",
          actions: <Button onClick={() => handleBookService('AC', 'Making Noise')} size="sm" className="mt-2">Book an AC Technician</Button>
        };
      }
      if (message.includes('smell') || message.includes('odor')) {
        return {
          text: "👃 A strange smell from your AC? If you smell something burning, turn off the AC immediately. For other smells, booking a RepairUp technician is the best next step. Ready to book?",
          actions: <Button onClick={() => handleBookService('AC', 'Strange Smell')} size="sm" className="mt-2">Book an AC Technician</Button>
        };
      }
      return { text: "❄️ Having AC trouble? As your RepairUp assistant, I recommend noting the problem details. This helps our technicians provide a fast repair. Ready to book?", actions: <Button onClick={() => handleBookService('AC', 'General Issue')} size="sm" className="mt-2">Book an AC Technician</Button> };
    }
    
    // Washing machine issues
    if (message.includes('washing machine') || message.includes('washer')) {
      if (message.includes('not spinning') || message.includes('won\'t spin')) {
        return {
          text: "A washing machine that won't spin can be frustrating. If rebalancing the load doesn't work, it's time to call a RepairUp expert. Would you like to book a service?",
          actions: <Button onClick={() => handleBookService('Washing Machine', 'Not Spinning')} size="sm" className="mt-2">Book a Technician</Button>
        };
      }
      if (message.includes('leak') || message.includes('water')) {
        return {
          text: "A leaky washing machine needs immediate attention. A RepairUp technician can diagnose and fix the leak safely. Shall I help you book one?",
          actions: <Button onClick={() => handleBookService('Washing Machine', 'Leaking')} size="sm" className="mt-2">Book a Technician</Button>
        };
      }
      return { text: "For any washing machine problem, our RepairUp technicians are ready to help. Would you like to book a service now?", actions: <Button onClick={() => handleBookService('Washing Machine', 'General Issue')} size="sm" className="mt-2">Book a Technician</Button> };
    }
    
    // Refrigerator issues
    if (message.includes('refrigerator') || message.includes('fridge')) {
      if (message.includes('not cooling') || message.includes('warm')) {
        return {
          text: "A warm refrigerator is a major concern. To prevent food spoilage, it's best to book a RepairUp technician. We can diagnose and repair it quickly. Ready to book?",
          actions: <Button onClick={() => handleBookService('Refrigerator', 'Not Cooling')} size="sm" className="mt-2">Book a Refrigerator Technician</Button>
        };
      }
      if (message.includes('noise') || message.includes('loud')) {
        return {
          text: "Loud noises from your fridge can be a sign of a failing component. A RepairUp technician can fix it before it becomes a bigger problem. Would you like to book now?",
          actions: <Button onClick={() => handleBookService('Refrigerator', 'Loud Noise')} size="sm" className="mt-2">Book a Refrigerator Technician</Button>
        };
      }
      return { text: "For any refrigerator issue, your RepairUp team is ready to help. Shall we book a technician for you?", actions: <Button onClick={() => handleBookService('Refrigerator', 'General Issue')} size="sm" className="mt-2">Book a Refrigerator Technician</Button> };
    }
    
    // General appliance advice
    if (message.includes('help') || message.includes('what should i') || message.includes('how do i')) {
      return { text: "I'm your RepairUp AI assistant, here to help you with any appliance issue! Just tell me which appliance is causing trouble and what the problem is. I can provide troubleshooting tips and help you gather the right information for our technicians. How can I assist you today?" };
    }
    
    // Default response - Enhanced
    return { text: "🔧 Hello! I'm the RepairUp AI assistant. I can help you diagnose issues with your home appliances. To get started, please tell me: 1) Which appliance needs help (AC, fridge, etc.)? 2) What's the problem? The more details you provide, the better I can assist you." };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponseData = getAIResponse(inputMessage);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseData.text,
        isUser: false,
        timestamp: new Date(),
        actions: aiResponseData.actions
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            RepairUp AI Assistant
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.isUser ? 'bg-primary' : 'bg-muted'
              }`}>
                {message.isUser ? (
                  <User className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Bot className="w-4 h-4 text-foreground" />
                )}
              </div>
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                message.isUser 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-foreground'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                {message.actions && <div className="mt-2">{message.actions}</div>}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Bot className="w-4 h-4 text-foreground" />
              </div>
              <div className="bg-muted p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your appliance problem..."
              className="flex-1 px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            />
            <Button onClick={handleSendMessage} size="sm" className="px-4">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIChat;