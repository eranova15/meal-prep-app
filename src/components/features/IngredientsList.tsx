import { Card, CardContent } from "@/components/ui/card"
import { type Ingredient } from '@/types/ingredients'

interface IngredientsListProps {
  ingredients: Ingredient[]
}

export default function IngredientsList({ ingredients }: IngredientsListProps) {
  const getDaysUntilExpiry = (expiryDate: Date) => {
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getExpiryStatus = (days: number) => {
    if (days < 0) return 'expired'
    if (days <= 2) return 'critical'
    if (days <= 5) return 'warning'
    return 'good'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ingredients.map((ingredient) => {
        const daysUntilExpiry = getDaysUntilExpiry(ingredient.expiryDate)
        const status = getExpiryStatus(daysUntilExpiry)
        
        return (
          <Card key={ingredient.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={ingredient.imageUrl}
                alt={ingredient.name}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-sm 
                ${status === 'expired' ? 'bg-red-500 text-white' :
                  status === 'critical' ? 'bg-orange-500 text-white' :
                  status === 'warning' ? 'bg-yellow-500 text-black' :
                  'bg-green-500 text-white'}`}
              >
                {status === 'expired' ? 'Expired' :
                  `${daysUntilExpiry} day${daysUntilExpiry === 1 ? '' : 's'} left`}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{ingredient.name}</h3>
                  <p className="text-sm text-gray-500">
                    {ingredient.quantity} {ingredient.unit}
                  </p>
                </div>
                <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-full">
                  {ingredient.category}
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}