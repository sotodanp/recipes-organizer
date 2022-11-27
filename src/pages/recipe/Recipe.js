import './Recipe.css'
import TrashCan from '../../asset/delete-icon.svg'
import editIcon from '../../asset/edit-icon.svg'

import { db } from '../../firebase/config'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Recipe = () => {
    const { mode } = useTheme()
    const { id } = useParams()
    const navigate = useNavigate()

    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsPending(true)

        const unsub = db.collection('recipes').doc(id).onSnapshot((doc) => {
            if (doc.exists) {
                setIsPending(false)
                setRecipe(doc.data())
            } else {
                setIsPending(false)
                setError('Could not find that recipe')
            }
        })

        return () => unsub()

    }, [id])

    const handleDelete = () => {
        db.collection('recipes').doc(id).delete().then(() => {
            navigate('/')
        })
    }



    return (
        <div className={`recipe ${mode}`}>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {recipe && (
                <>
                    <div className='icons'>
                        <img
                            className={`delete2 ${mode}`}
                            src={editIcon}
                            alt='delete recipe icon'
                            onClick={() => navigate(`/recipe/${id}/edit`)}
                        />
                        <img
                            className={`delete2 ${mode}`}
                            src={TrashCan}
                            alt='delete recipe icon'
                            onClick={() => handleDelete(recipe.id)}
                        />
                    </div>

                    <h2 className="page-title">{recipe.title}</h2>


                    <p>Takes {recipe.cookingTime} to cook.</p>
                    <ul>
                        {recipe.ingredients.map((ingredient) => (
                            <li key={ingredient}>{ingredient}</li>
                        ))}
                    </ul>
                    <p className="method">{recipe.method}</p>
                </>
            )}

        </div>
    )
}

export default Recipe
