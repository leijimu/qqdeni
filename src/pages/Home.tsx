import { useState } from "react";
import { BrickWall } from "@/components/BrickWall";
import { SubmitModal } from "@/components/SubmitModal";
import { useMessages } from "@/hooks/use-messages";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { messages, isLoading, addMessage } = useMessages();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleMessageSubmit = async (data: any) => {
    const msg = await addMessage(data);
    return msg.id;
  };

  return (
    <div className="min-h-screen bg-[#2d2a26] text-[#fdfbf7]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#2d2a26]/90 backdrop-blur-md border-b border-white/5 py-4 px-6 flex justify-between items-center shadow-2xl">
        <h1 className="text-xl md:text-2xl font-serif font-bold tracking-tight text-[#fdfbf7]">
          qqdeni.com｜亲亲的你
        </h1>
        <div className="flex gap-4 text-xs text-white/60">
           <span onClick={() => setIsPrivacyOpen(true)} className="cursor-pointer hover:text-white transition-colors">隐私 & 免责</span>
           <span onClick={() => document.getElementById("wall")?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer hover:text-white transition-colors hidden md:block">↓ 贴上心声</span>
        </div>
      </header>

      {/* Main Content */}
      <main id="wall" className="pt-20 min-h-screen bg-[#3a3530]">
         <div className="max-w-4xl mx-auto px-4 py-8 text-center space-y-4 mb-8">
            <p className="font-serif text-lg text-white/80 leading-relaxed">
              这里有一面墙，留给所有想说却来不及的话。<br/>
              点击任意砖块，悄悄贴上你的心声。
            </p>
         </div>

         {isLoading ? (
           <div className="flex flex-col items-center justify-center py-20 text-white/50">
             <Loader2 className="w-8 h-8 animate-spin mb-4" />
             <p className="text-xs">正在寻找这面墙...</p>
           </div>
         ) : (
           <>
             <BrickWall 
                messages={messages} 
                onBrickClick={() => setIsModalOpen(true)}
                onMessageClick={(msg) => {
                   toast.message("这是一条私密心声", {
                     description: "只有风和提交者知道它的内容。",
                     duration: 2000,
                   });
                }} 
              />
              <div className="py-20 text-center text-white/60 text-xs">
                向下生长...
              </div>
           </>
         )}
      </main>

      <SubmitModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleMessageSubmit} 
      />

      <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
        <DialogContent className="bg-[#fdfbf7] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>隐私政策 & 免责声明</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-stone-600 font-sans">
            <p><strong>1. 隐私承诺</strong><br/>我们不收集任何个人身份信息（PII）。您的心声内容仅存储在本地或匿名数据库中。</p>
            <p><strong>2. 数据安全</strong><br/>提交的内容是匿名的，我们尽力保护您的数据安全。</p>
            <p><strong>3. 免责声明</strong><br/>本网站仅提供情感倾诉空间，非专业心理咨询机构。如果您处于紧急心理危机中，请立即寻求专业帮助。</p>
            <p><strong>4. 心理热线</strong><br/>
            - 中国希望24热线：400-161-9995<br/>
            - 中国心理危机干预：010-82951332<br/>
            - 美国/加拿大：988
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
