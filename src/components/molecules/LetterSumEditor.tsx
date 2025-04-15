// src/components/LetterSumEditor.tsx
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FaSun, FaMoon } from "react-icons/fa";

const arabicValuesSun = {
  ا: 1,
  ى: 1,
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
  ة: 400,
  ث: 500,
  خ: 600,
  ذ: 700,
  ض: 800,
  ظ: 900,
  غ: 1000,
};
const arabicValuesMoon = {
  ء: 13,
  ا: 13,
  ى: 13,
  ب: 0,
  ج: 0,
  د: 0,
  ه: 2,
  و: 0,
  ز: 0,
  ح: 7,
  ط: 4,
  ي: 2,
  ك: 1,
  ل: 13,
  م: 17,
  ن: 1,
  س: 5,
  ع: 2,
  ف: 0,
  ص: 3,
  ق: 2,
  ر: 6,
  ش: 0,
  ت: 0,
  ة: 0,
  ث: 0,
  خ: 0,
  ذ: 0,
  ض: 0,
  ظ: 0,
  غ: 0,
};
let arabicValues: Record<string, number> = arabicValuesSun;

const getFrenchSum = (text: string) => {
  return text
    .toUpperCase()
    .split("")
    .filter((char) => /[A-Z]/.test(char))
    .reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);
};

const reduceToOneDigit = (num: number): number => {
  while (num >= 10) {
    num = num
      .toString()
      .split("")
      .map(Number)
      .reduce((acc, digit) => acc + digit, 0);
  }
  return num;
};

export default function LetterSumEditor() {
  const [text, setText] = useState("");
  const [isArabic, setIsArabic] = useState(false);
  const [isArSun, setisArSun] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleLanguageSwitch = () => {
    // Toggle language between Arabic and French
    setIsArabic(!isArabic);

    // Focus on the input after switching the language
    inputRef.current?.focus();
  };
  const handleArLanguageSwitch = () => {
    setisArSun(!isArSun);
  };
  const getArabicSum = (text: string) => {
    arabicValues = isArSun ? arabicValuesSun : arabicValuesMoon;
    return text
      .split("")
      .filter((char) => arabicValues[char])
      .reduce((sum, char) => sum + arabicValues[char], 0);
  };
  const sum = isArabic ? getArabicSum(text) : getFrenchSum(text);

  return (
    <div className="w-full min-w-[300px]">
      <div className="max-w-xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <Label htmlFor="lang-switch">{"English"}</Label>
          <Switch
            id="lang-switch"
            checked={isArabic}
            onCheckedChange={handleLanguageSwitch}
          />
          <Label>{"Arabic"}</Label>
        </div>
        {/* Sun/Moon Theme Toggle */}
        {isArabic ? (
          <div className="flex items-center justify-center space-x-4">
            <Label htmlFor="lang-switch">
              <FaSun className="text-yellow-500" />
            </Label>
            <Switch
              id="arabic-switch"
              checked={!isArSun}
              onCheckedChange={handleArLanguageSwitch}
            />
            <Label>
              <FaMoon className="text-gray-300" />
            </Label>
          </div>
        ) : null}

        <Textarea
          ref={inputRef}
          placeholder={isArabic ? "أدخل النص هنا" : "Enter text here"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[150px] w-full"
          dir={isArabic ? "rtl" : "ltr"}
        />
        <div className="text-xl font-semibold">
          {isArabic ? "المجموع" : "Sum"}:{" "}
          <span className="text-primary">{sum}</span>
        </div>
        <div className="text-xl font-semibold">
          <span className="text-primary">{reduceToOneDigit(sum)}</span>
        </div>
      </div>
    </div>
  );
}
