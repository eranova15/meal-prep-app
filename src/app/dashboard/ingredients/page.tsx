'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { COMMON_INGREDIENTS, type Ingredient } from '@/types/ingredients'
import AddIngredientDialog from '@/components/features/AddIngredientDialog'
import IngredientsList from '@/components/features/IngredientsList'

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addIngredient = (ingredient: Ingredient) => {
    setIngredients(prev => [...prev, ingredient])
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Ingredients</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          Add Ingredient
        </Button>
      </div>

      <IngredientsList ingredients={ingredients} />
      
      <AddIngredientDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        onAdd={addIngredient}
      />
    </div>
  )
}