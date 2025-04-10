// src/components/LetterSumEditor.tsx
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const arabicValues: Record<string, number> = {
  ا: 1,
  ب: 2,
  ج: 3,
  د: 4,
  ه: 5,
  و: 6,
  ز: 7,
  ح: 8,
  ط: 9,
  ي: 10,
  ك: 20,
  ل: 30,
  م: 40,
  ن: 50,
  س: 60,
  ع: 70,
  ف: 80,
  ص: 90,
  ق: 100,
  ر: 200,
  ش: 300,
  ت: 400,
  ث: 500,
  خ: 600,
  ذ: 700,
  ض: 800,
  ظ: 900,
  غ: 1000,
};

const getFrenchSum = (text: string) => {
  return text
    .toUpperCase()
    .split("")
    .filter((char) => /[A-Z]/.test(char))
    .reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);
};

const getArabicSum = (text: string) => {
  return text
    .split("")
    .filter((char) => arabicValues[char])
    .reduce((sum, char) => sum + arabicValues[char], 0);
};

export default function LetterSumEditor() {
  const [text, setText] = useState("");
  const [isArabic, setIsArabic] = useState(false);

  const sum = isArabic ? getArabicSum(text) : getFrenchSum(text);

  return (
    <div className="w-full min-w-[300px]">
      <div className="max-w-xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <Label htmlFor="lang-switch">{"English"}</Label>
          <Switch
            id="lang-switch"
            checked={isArabic}
            onCheckedChange={setIsArabic}
          />
          <Label>{"Arabic"}</Label>
        </div>
        <Textarea
          placeholder="Type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[150px] w-full"
          dir={isArabic ? "rtl" : "ltr"}
        />
        <div className="text-xl font-semibold">
          {isArabic ? "المجموع" : "Sum"}:{" "}
          <span className="text-primary">{sum}</span>
        </div>
      </div>
    </div>
  );
}
