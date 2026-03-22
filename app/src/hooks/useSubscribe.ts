"use client";

import { useState } from "react";

interface SubscribeResponse {
  success: boolean;
  message: string;
}

export function useSubscribe() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const subscribe = async (email: string, city?: string, industry?: string): Promise<boolean> => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, city, industry }),
      });

      if (!response.ok) {
        throw new Error('订阅失败');
      }

      const result = await response.json();
      
      setMessage({
        type: 'success',
        text: '订阅成功！我们会将最新政策发送到您的邮箱',
      });
      
      return true;
    } catch (error) {
      setMessage({
        type: 'error',
        text: '订阅失败，请稍后重试',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscribe,
    isLoading,
    message,
    setMessage,
  };
}
