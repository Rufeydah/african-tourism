"use client"

import React, { useRef, useEffect } from "react";
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, Languages } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type SupportedTarget = "amharic" | "swahili"

const languageMap: Record<SupportedTarget, string> = {
  amharic: "Amharic",
  swahili: "Swahili"
}

export function ChatAssistant() {
  const { t } = useLanguage()
  const [input, setInput] = useState("")
  const [target, setTarget] = useState<SupportedTarget>("amharic")
  const [output, setOutput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")


    const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);
  console.log(target)
  const handleTranslate = async () => {
    setError("")
    setOutput("")
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const res = await fetch("https://c92e-34-56-93-175.ngrok-free.app/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: input,
          target_language: target // <-- CORRECTED!
        })
      })
      const data = await res.json()
      if (!res.ok || !data?.translated_text) {
        throw new Error(data?.error || "Translation failed")
      }
      setOutput(data.translated_text)
    } catch (e) {
      setError("Failed to translate. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300">{t("home.chat")}</h1>
        <Link href="/">
          <Button variant="outline" size="sm">
            Back
          </Button>
        </Link>
      </div>

      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800 p-4">
          <div className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium">Text Translator</span>
          </div>
        </CardHeader>

        <CardContent className="p-4 flex flex-col gap-4">
            <textarea
            ref={textareaRef}
            placeholder="Enter sentence in English"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleTranslate();
              }
            }}
            className="w-full resize-none rounded border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-300 min-h-[3rem] max-h-60"
            rows={1}
            disabled={isLoading}
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.5"
            }}
          />

          {/* Row 2: select and button side by side as before */}
          <div className="flex gap-2 w-full">
            <select
              value={target}
              onChange={e => setTarget(e.target.value as SupportedTarget)}
              className="flex-1 border rounded px-2 py-2 bg-white dark:bg-blue-900/20 text-base h-12"
              disabled={isLoading}
              style={{ minWidth: 0, height: "3rem" }}
            >
              <option value="amharic">Amharic</option>
              <option value="swahili">Swahili</option>
            </select>
            <Button
              onClick={handleTranslate}
              disabled={isLoading || !input.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 flex gap-1 items-center text-base h-12"
              style={{ minWidth: 0, height: "3rem", whiteSpace: "nowrap" }}
            >
              <Send className="h-4 w-4" />
              Translate
            </Button>
          </div>

          {isLoading && (
            <div className="flex items-center gap-2 text-blue-600 mt-4">
              <span>Translating...</span>
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          )}

          {output && (
            <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 rounded-lg p-3 mt-2">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs font-medium">{languageMap[target]}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{output}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 rounded-lg p-3 mt-2">
              {error}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 border-t border-blue-100 dark:border-blue-800">
          <span className="text-xs text-gray-500">
            English → {languageMap[target]} translation powered by AI
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}