import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Mic, Play, Plus, PhoneOff, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useInventory } from '@/contexts/InventoryContext';
import { useAgora } from '@/hooks/useAgora';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'ai' | 'user';
  text: string;
  isAudio: boolean;
  timestamp: Date;
}

export function VoiceCall() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, getStats } = useInventory();
  const { isJoined, join, leave, mute, unmute } = useAgora('inventory-voice');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text: 'Hello! I\'m your Agora AI assistant. How can I help you today?',
      isAudio: true,
      timestamp: new Date(),
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Join Agora channel on mount
    join();
    return () => {
      leave();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        console.log('Speech recognition started');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (isRecording) {
          // Restart if still recording
          try {
            recognitionRef.current?.start();
          } catch (e) {
            console.error('Failed to restart recognition:', e);
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'no-speech') {
          // No speech detected, restart
          if (isRecording) {
            setTimeout(() => {
              try {
                recognitionRef.current?.start();
              } catch (e) {
                console.error('Failed to restart after no-speech:', e);
              }
            }, 1000);
          }
        } else if (event.error === 'not-allowed') {
          alert('Microphone permission denied. Please allow microphone access.');
        }
      };

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }
        if (finalTranscript.trim()) {
          handleUserMessage(finalTranscript.trim());
        }
      };
    } else {
      console.warn('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isRecording]);

  const handleUserMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text,
      isAudio: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Generate AI response based on real inventory data
    setIsSpeaking(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const stats = getStats();
    const lowerText = text.toLowerCase();
    let response = '';

    if (lowerText.includes('inventory') || lowerText.includes('stock') || lowerText.includes('items')) {
      const categories = Object.entries(stats.categories)
        .map(([name, count]) => `${name} (${count})`)
        .slice(0, 3)
        .join(', ');
      response = `Your current inventory has ${stats.totalItems} items with a total value of $${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}. ${stats.lowStockItems} items are running low on stock. Top categories: ${categories || 'No categories yet'}.`;
    } else if (lowerText.includes('sales') || lowerText.includes('revenue') || lowerText.includes('money')) {
      const totalSales = items.reduce((sum, item) => sum + (item.quantity * item.price * 0.3), 0);
      response = `Your estimated sales revenue is $${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} based on your current inventory. You have ${items.length} different products in stock.`;
    } else if (lowerText.includes('low stock') || lowerText.includes('running low')) {
      const lowStockItems = items.filter(item => item.quantity <= (item.lowStockThreshold || 10));
      if (lowStockItems.length > 0) {
        const itemNames = lowStockItems.slice(0, 3).map(item => item.name).join(', ');
        response = `You have ${lowStockItems.length} items running low on stock: ${itemNames}${lowStockItems.length > 3 ? ' and more' : ''}. Consider restocking these items soon.`;
      } else {
        response = 'Great news! All your items have sufficient stock levels. No low stock alerts at the moment.';
      }
    } else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      response = `Hello ${user?.name || 'there'}! I'm your Agora AI assistant. I can help you manage your inventory, analyze sales, check stock levels, and answer questions about your business. What would you like to know?`;
    } else if (lowerText.includes('help') || lowerText.includes('what can you do')) {
      response = 'I can help you with: checking inventory status, viewing sales data, identifying low stock items, analyzing categories, and answering questions about your business. Just ask me anything!';
    } else if (lowerText.includes('add') || lowerText.includes('create') || lowerText.includes('new item')) {
      response = 'To add a new item, please go to the Inventory page and click the "Add Item" button. I can help you check your current inventory status if you need.';
    } else if (lowerText.includes('category') || lowerText.includes('categories')) {
      const categoryList = Object.keys(stats.categories).join(', ');
      response = `Your inventory has items in these categories: ${categoryList || 'No categories yet. Add items to see categories.'}`;
    } else {
      response = `I understand you mentioned "${text}". I can help you with inventory management, sales analysis, stock levels, and business insights. Try asking about your inventory, sales, or low stock items.`;
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      text: response,
      isAudio: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMessage]);
    setIsSpeaking(false);
  };

  const toggleRecording = async () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported. Please use Chrome or Edge browser.');
      return;
    }

    if (isRecording) {
      // Stop recording
      try {
        recognitionRef.current.stop();
        setIsRecording(false);
        setIsListening(false);
        if (isMuted) {
          await unmute();
          setIsMuted(false);
        }
      } catch (e) {
        console.error('Failed to stop recognition:', e);
      }
    } else {
      // Request microphone permission and start recording
      try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        
        // Start speech recognition
        recognitionRef.current.start();
        setIsRecording(true);
        setIsListening(true);
        
        if (!isMuted) {
          await mute();
          setIsMuted(true);
        }
      } catch (e: any) {
        console.error('Failed to start recognition:', e);
        if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
          alert('Microphone permission denied. Please allow microphone access in your browser settings.');
        } else if (e.name === 'NotFoundError') {
          alert('No microphone found. Please connect a microphone and try again.');
        } else {
          alert('Failed to start voice recognition. Please try again.');
        }
        setIsRecording(false);
        setIsListening(false);
      }
    }
  };

  const toggleMute = async () => {
    if (isMuted) {
      await unmute();
      setIsMuted(false);
    } else {
      await mute();
      setIsMuted(true);
    }
  };

  const handleLeave = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    await leave();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 backdrop-blur-sm border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 via-blue-500 to-yellow-500 flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-xs">I</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">INVENTURE</h1>
            <p className="text-xs text-gray-400">
              Powered By <span className="text-cyan-400 rainbow-text">agora</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white font-medium">{user?.name || 'Suyoshi R.'}</span>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center ring-2 ring-cyan-400/50 shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-6 gap-4">
        {/* Chat/Message Area */}
        <div className="flex-1 rounded-lg border-2 border-orange-400/50 bg-black p-6 overflow-y-auto">
          <div className="space-y-8">
            {/* Top Right - XyroBotAi */}
            <div className="flex items-center justify-end gap-2 mb-4">
              <span className="text-sm font-medium rainbow-text">XyroBotAi</span>
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center ring-2 ring-cyan-400/50">
                <Mic className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* AI Messages */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center ring-2 ring-purple-400/50 shadow-lg">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium rainbow-text">Agora</span>
              </div>
              <div className="flex-1 space-y-3">
                {messages
                  .filter(msg => msg.type === 'ai')
                  .map((message) => (
                    <div
                      key={message.id}
                      className="bg-white rounded-lg p-4 max-w-md flex items-center gap-3 shadow-lg"
                    >
                      {message.isAudio && (
                        <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors flex-shrink-0">
                          <Play className="w-4 h-4 text-white ml-0.5" />
                        </button>
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{message.text}</p>
                      </div>
                      {message.isAudio && (
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                          <Mic className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* User Messages */}
            <div className="flex items-start gap-4 justify-end">
              <div className="flex-1 space-y-3 flex flex-col items-end">
                {messages
                  .filter(msg => msg.type === 'user')
                  .map((message) => (
                    <div
                      key={message.id}
                      className="bg-blue-600 rounded-lg p-4 max-w-md flex items-center gap-3 shadow-lg"
                    >
                      {message.isAudio && (
                        <button className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-800 transition-colors flex-shrink-0">
                          <Play className="w-4 h-4 text-white ml-0.5" />
                        </button>
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-white">{message.text}</p>
                      </div>
                      {message.isAudio && (
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                          <Mic className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center ring-2 ring-cyan-400/50 shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-white">You</span>
              </div>
            </div>

            {/* AI Speaking Indicator */}
            {isSpeaking && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center ring-2 ring-purple-400/50 animate-pulse shadow-lg">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Control Panel */}
        <div className="rounded-lg border-2 border-orange-400/50 bg-black p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6 text-white" />
              </button>
              <div className="text-white text-sm font-medium">
                <span>श्री</span> <span>さん</span>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <button
                onClick={toggleRecording}
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center transition-all",
                  isRecording
                    ? "bg-purple-600 hover:bg-purple-700 scale-110 animate-pulse shadow-2xl ring-4 ring-purple-400/50"
                    : "bg-purple-500 hover:bg-purple-600 shadow-xl hover:scale-105",
                  isListening && "ring-4 ring-green-400/50"
                )}
                title={isRecording ? "Click to stop recording" : "Click to start recording"}
              >
                <Mic className={cn(
                  "w-10 h-10 text-white",
                  isRecording && "animate-pulse"
                )} />
              </button>
              {isRecording && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white bg-red-500 px-2 py-1 rounded">
                  {isListening ? "Listening..." : "Processing..."}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLeave}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
              >
                Leave
                <PhoneOff className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
