"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

type Message = {
  role: "user" | "assistant"
  content: string
}

export function ChatAssistant() {
  const { t, language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        language === "en"
          ? "Hello! I'm your African tourism assistant. How can I help you today?"
          : language === "am"
            ? "ሰላም! የአፍሪካ ቱሪዝም ረዳትዎ ነኝ። ዛሬ እንዴት ልረዳዎት እችላለሁ?"
            : "Habari! Mimi ni msaidizi wako wa utalii wa Afrika. Nawezaje kukusaidia leo?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Create a system prompt based on the selected language
      const systemPrompt =
        language === "en"
          ? "You are a helpful tourism assistant for Africa. Provide concise and accurate information about tourist attractions, cultural experiences, and travel tips in Africa. Answer in English."
          : language === "am"
            ? "አንተ ለአፍሪካ ጠቃሚ የቱሪዝም ረዳት ነህ። ስለ ቱሪስት መስህቦች፣ ባህላዊ ተሞክሮዎች እና በአፍሪካ ውስጥ ስለ ጉዞ ምክሮች አጭር እና ትክክለኛ መረጃ ይስጡ። በአማርኛ ይመልሱ።"
            : "Wewe ni msaidizi wa utalii kwa Afrika. Toa taarifa fupi na sahihi kuhusu vivutio vya utalii, uzoefu wa kitamaduni, na vidokezo vya usafiri barani Afrika. Jibu kwa Kiswahili."

      // Combine all previous messages to provide context
      const conversationHistory = messages
        .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
        .join("\n")

      const prompt = `${conversationHistory}\nUser: ${input}\nAssistant:`

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
        system: systemPrompt,
        maxTokens: 500,
      })

      const assistantMessage: Message = {
        role: "assistant",
        content: text,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)

      // Add a fallback message in the appropriate language
      const errorMessage =
        language === "en"
          ? "I'm sorry, I couldn't process your request. Please try again later."
          : language === "am"
            ? "ይቅርታ፣ ጥያቄዎን ማስኬድ አልቻልኩም። እባክዎ ቆይተው እንደገና ይሞክሩ።"
            : "Samahani, sikuweza kuchakata ombi lako. Tafadhali jaribu tena baadaye."

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300">Translate</h1>
        <Link href="/">
          <Button variant="outline" size="sm">
            Back
          </Button>
        </Link>
      </div>

      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800 p-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium">Tourism Assistant</span>
          </div>
        </CardHeader>
        <CardContent className="p-4 h-[60vh] overflow-y-auto flex flex-col gap-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
              <div
                className={`
                  max-w-[80%] p-3 rounded-lg 
                  ${
                    message.role === "assistant"
                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100"
                      : "bg-blue-600 text-white"
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === "assistant" ? <MessageSquare className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  <span className="text-xs font-medium">{message.role === "assistant" ? "Assistant" : "You"}</span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-xs font-medium">Assistant</span>
                </div>
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 border-t border-blue-100 dark:border-blue-800">
          <div className="flex w-full gap-2">
            <Input
              placeholder={t("chat.placeholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-1" />
              {t("chat.send")}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
