import { useState, useEffect, useCallback } from "react";
import type { Message, MessageFormData } from "@/types";
import { storage } from "@/lib/storage";

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    const data = await storage.getMessages();
    setMessages(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addMessage = async (data: MessageFormData) => {
    const newMsg = await storage.saveMessage(data);
    // Optimistic update or reload? Reload is safer for consistency
    await load(); 
    return newMsg;
  };

  const removeMessage = async (id: string) => {
    await storage.deleteMessage(id);
    await load();
  };

  return {
    messages,
    isLoading,
    addMessage,
    removeMessage,
    refresh: load
  };
}
