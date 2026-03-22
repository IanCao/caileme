"use client";

import { useState, useEffect } from "react";
import { layoffSteps, Step } from "@/data/layoffSteps";

export interface StepProgress {
  stepId: string;
  completed: boolean;
  notes: string;
  completedAt?: string;
}

export interface LayoffProgress {
  currentStep: number;
  completedSteps: string[];
  stepProgress: { [stepId: string]: StepProgress };
  lastUpdated: string;
}

const STORAGE_KEY = "caileme_layoff_progress";

export function useLayoffProgress() {
  const [progress, setProgress] = useState<LayoffProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 加载进度
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
      } else {
        // 初始化进度
        const initialProgress: LayoffProgress = {
          currentStep: 0,
          completedSteps: [],
          stepProgress: {},
          lastUpdated: new Date().toISOString(),
        };
        setProgress(initialProgress);
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
      // 初始化进度
      const initialProgress: LayoffProgress = {
        currentStep: 0,
        completedSteps: [],
        stepProgress: {},
        lastUpdated: new Date().toISOString(),
      };
      setProgress(initialProgress);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 保存进度
  const saveProgress = (newProgress: LayoffProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

  // 标记步骤完成
  const completeStep = (stepId: string) => {
    if (!progress) return;

    const stepIndex = layoffSteps.findIndex((s) => s.id === stepId);
    if (stepIndex === -1) return;

    const stepProgress: StepProgress = {
      stepId,
      completed: true,
      notes: progress.stepProgress[stepId]?.notes || "",
      completedAt: new Date().toISOString(),
    };

    const newProgress: LayoffProgress = {
      ...progress,
      stepProgress: {
        ...progress.stepProgress,
        [stepId]: stepProgress,
      },
      completedSteps: [...progress.completedSteps, stepId],
      currentStep: Math.max(progress.currentStep, stepIndex + 1),
      lastUpdated: new Date().toISOString(),
    };

    saveProgress(newProgress);
  };

  // 取消步骤完成
  const uncompleteStep = (stepId: string) => {
    if (!progress) return;

    const newProgress: LayoffProgress = {
      ...progress,
      stepProgress: {
        ...progress.stepProgress,
        [stepId]: {
          ...progress.stepProgress[stepId],
          completed: false,
          completedAt: undefined,
        },
      },
      completedSteps: progress.completedSteps.filter((id) => id !== stepId),
      lastUpdated: new Date().toISOString(),
    };

    saveProgress(newProgress);
  };

  // 更新步骤笔记
  const updateStepNotes = (stepId: string, notes: string) => {
    if (!progress) return;

    const newProgress: LayoffProgress = {
      ...progress,
      stepProgress: {
        ...progress.stepProgress,
        [stepId]: {
          ...progress.stepProgress[stepId],
          notes,
        },
      },
      lastUpdated: new Date().toISOString(),
    };

    saveProgress(newProgress);
  };

  // 切换步骤完成状态
  const toggleStep = (stepId: string) => {
    const isCompleted = progress?.completedSteps.includes(stepId);
    if (isCompleted) {
      uncompleteStep(stepId);
    } else {
      completeStep(stepId);
    }
  };

  // 重置进度
  const resetProgress = () => {
    const initialProgress: LayoffProgress = {
      currentStep: 0,
      completedSteps: [],
      stepProgress: {},
      lastUpdated: new Date().toISOString(),
    };
    saveProgress(initialProgress);
  };

  // 获取完成进度百分比
  const getProgressPercentage = () => {
    if (!progress) return 0;
    return Math.round((progress.completedSteps.length / layoffSteps.length) * 100);
  };

  return {
    progress,
    isLoading,
    completeStep,
    uncompleteStep,
    updateStepNotes,
    toggleStep,
    resetProgress,
    getProgressPercentage,
  };
}
