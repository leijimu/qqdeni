import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { MessageFormData } from "@/types";
import { Heart } from "lucide-react";

const schema = z.object({
  to: z.string().min(1, "请填写想对谁说"),
  content: z.string().min(1, "请写下你的心声"),
  from: z.string().optional(),
});

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MessageFormData) => Promise<string>;
}

export function SubmitModal({ isOpen, onClose, onSubmit }: SubmitModalProps) {
  const [step, setStep] = useState<"form" | "submitting" | "success">("form");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<MessageFormData>({
    resolver: zodResolver(schema),
    defaultValues: { from: "匿名" }
  });

  const onFormSubmit = async (data: MessageFormData) => {
    setStep("submitting");
    // Simulate gentle delay
    await new Promise(r => setTimeout(r, 1500));
    
    await onSubmit(data);
    
    // No longer generating or showing link
    setStep("success");
    reset();
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep("form"), 300); // Reset after close animation
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-[#fdfbf7] border-none shadow-2xl font-serif">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-stone-700">亲亲的你</DialogTitle>
          <DialogDescription className="text-center text-stone-500">
            {step === "form" && "没人会看见，只有风和TA知道。"}
            {step === "submitting" && "正在把心声交给风..."}
            {step === "success" && "已轻轻贴上。"}
          </DialogDescription>
        </DialogHeader>

        {step === "form" && (
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="to" className="text-stone-600 font-bold">想对谁说？</Label>
              <Input 
                id="to" 
                placeholder="例如：妈妈 / 爷爷 / 小白" 
                className="bg-white border-stone-300 focus:border-primary focus:ring-primary/20 text-stone-900 font-sans shadow-sm placeholder:text-stone-400"
                {...register("to")}
              />
              {errors.to && <p className="text-xs text-red-500 font-medium">{errors.to.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-stone-600 font-bold">想说的话...</Label>
              <Textarea 
                id="content" 
                placeholder="在这里写下你的思念..." 
                className="min-h-[120px] bg-white border-stone-300 focus:border-primary focus:ring-primary/20 text-stone-900 font-sans resize-none shadow-sm placeholder:text-stone-400"
                {...register("content")}
              />
              {errors.content && <p className="text-xs text-red-500 font-medium">{errors.content.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="from" className="text-stone-600 font-bold">来自（可选）</Label>
              <Input 
                id="from" 
                placeholder="匿名" 
                className="bg-white border-stone-300 focus:border-primary focus:ring-primary/20 text-stone-900 font-sans shadow-sm placeholder:text-stone-400"
                {...register("from")}
              />
            </div>

            <div className="flex justify-center pt-2">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-full transition-all duration-500 shadow-lg hover:shadow-primary/30">
                <Heart className="w-4 h-4 mr-2 fill-current" /> 轻轻贴上
              </Button>
            </div>
            
            <p className="text-[10px] text-center text-stone-400">
              匿名 · 永不公开 · 提交后无法修改或删除
            </p>
          </form>
        )}

        {step === "submitting" && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
              <Heart className="w-12 h-12 text-primary animate-bounce fill-primary/50 relative z-10" />
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="py-8 space-y-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                 <Heart className="w-16 h-16 text-primary fill-primary/20 animate-pulse" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-serif text-stone-700">心声已随风而去</p>
                <p className="text-sm text-stone-500 max-w-[80%] mx-auto">
                   TA一定听见了 ♡
                </p>
              </div>
            </div>

            <Button onClick={handleClose} className="w-full bg-[#8c857b] hover:bg-[#787168] text-white border-none shadow-md transition-colors">
              我知道了
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
