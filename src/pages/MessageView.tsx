import { useEffect, useState } from "react";
import type { Message } from "@/types";
import { useMessages } from "@/hooks/use-messages";
import { Button } from "@/components/ui/button";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft, Trash2, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function MessageView() {
  const [match, params] = useRoute("/message/:id");
  const { messages, removeMessage } = useMessages();
  const [message, setMessage] = useState<Message | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (match && params?.id) {
      const found = messages.find(m => m.id === params.id);
      setMessage(found || null);
    }
  }, [match, params, messages]);

  const handleDelete = () => {
    if (message) {
      removeMessage(message.id);
      setLocation("/");
    }
  };

  if (!match) return null;

  return (
    <div className="min-h-screen bg-[#1a1614] flex flex-col items-center justify-center p-4 relative overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <Button 
          variant="ghost" 
          className="text-stone-400 hover:text-white mb-8 hover:bg-white/5"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> 返回墙面
        </Button>

        {message ? (
          <div className="bg-[#fdfbf7] rounded-sm p-8 shadow-2xl rotate-1 relative animate-in fade-in zoom-in duration-700">
             {/* Tape */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/30 backdrop-blur-sm shadow-sm border border-white/20 rotate-1" />

            <div className="font-serif text-2xl text-stone-800 mb-8 border-b border-stone-100 pb-4">
              To {message.to}
            </div>

            <div className="font-sans text-stone-600 whitespace-pre-wrap leading-relaxed mb-12 min-h-[100px]">
              {message.content}
            </div>

            <div className="flex justify-between items-end">
              <div className="text-xs text-stone-400 font-mono">
                {new Date(message.timestamp).toLocaleDateString()}
              </div>
              <div className="text-stone-500 font-serif">
                From {message.from}
              </div>
            </div>

            <div className="absolute -bottom-16 left-0 right-0 flex justify-center">
              <Button 
                variant="ghost" 
                className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                onClick={() => setShowDelete(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" /> 删除这条心声
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center text-stone-500">
            <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>这条心声已随风而去...</p>
          </div>
        )}
      </div>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="bg-[#fdfbf7]">
          <DialogHeader>
            <DialogTitle>确要带走它吗？</DialogTitle>
            <DialogDescription>
              删除后将无法恢复，这条心声将永远消失在风中。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>留下</Button>
            <Button variant="destructive" onClick={handleDelete}>带走</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
