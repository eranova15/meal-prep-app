'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [userPreferences, setUserPreferences] = useState({
    nationality: '',
    metabolismRate: '',
    cookingExperience: ''
  })

  const questions = [
    {
      id: 'nationality',
      title: 'What cuisine do you prefer?',
      description: 'This helps us recommend recipes you\'ll love',
      options: ['Italian', 'Indian', 'Chinese', 'Mexican', 'American']
    },
    {
      id: 'metabolismRate',
      title: 'How would you describe your metabolism?',
      description: 'We\'ll adjust portion sizes accordingly',
      options: ['Slow', 'Medium', 'Fast']
    },
    {
      id: 'cookingExperience',
      title: 'How experienced are you with cooking?',
      description: 'We\'ll tailor recipe complexity to your level',
      options: ['Beginner', 'Intermediate', 'Advanced']
    }
  ]

  const handleSelection = (value: string) => {
    setUserPreferences(prev => ({
      ...prev,
      [questions[step].id]: value
    }))

    if (step < questions.length - 1) {
      setStep(prev => prev + 1)
    } else {
      // Save preferences and redirect
      localStorage.setItem('userPreferences', JSON.stringify(userPreferences))
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="max-w-md mx-auto mt-10">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>{questions[step].title}</CardTitle>
            <CardDescription>{questions[step].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {questions[step].options.map((option) => (
                <Button
                  key={option}
                  variant={userPreferences[questions[step].id as keyof typeof userPreferences] === option ? "default" : "outline"}
                  className="w-full justify-start text-left font-normal"
                  onClick={() => handleSelection(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={() => step > 0 && setStep(s => s - 1)}
                disabled={step === 0}
              >
                Back
              </Button>
              <div className="flex space-x-1">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === step ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}