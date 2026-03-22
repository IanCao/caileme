"use client";

import { motion } from "framer-motion";
import { scenarios, Scenario } from "@/data/scenarios";

interface ScenarioSelectorProps {
  selectedScenario: Scenario | null;
  onSelect: (scenario: Scenario) => void;
}

export function ScenarioSelector({ selectedScenario, onSelect }: ScenarioSelectorProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "入门";
      case "medium":
        return "进阶";
      case "hard":
        return "挑战";
      default:
        return difficulty;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">选择场景</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map((scenario, index) => (
          <motion.button
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => onSelect(scenario)}
            className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
              selectedScenario?.id === scenario.id
                ? "border-black bg-black/5"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{scenario.icon}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                {getDifficultyLabel(scenario.difficulty)}
              </span>
            </div>
            <h3 className="font-semibold mb-2">{scenario.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
            <p className="text-xs text-gray-400">
              ⏱️ {scenario.estimatedTime}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
