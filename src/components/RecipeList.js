import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import TrashCan from '../asset/delete-icon.svg'
import { useState, useEffect } from 'react'

import './RecipeList.css'
import { db } from '../firebase/config'



const RecipeList = ({ recipes }) => {
    const { mode, color } = useTheme()
    const location = useLocation();

    const [addedRecipe, setAddedRecipe] = useState(null);
    const [updatedRecipe, setUpdatedRecipe] = useState(null);

    useEffect(() => {
        if (location.state) {
            if (location.state.addedRecipe) {
                setAddedRecipe(location.state.addedRecipe);
            } else if (location.state.updatedRecipe) {
                setUpdatedRecipe(location.state.updatedRecipe);
            }
            setTimeout(() => {
                location.state = null;
                setAddedRecipe(null)
                setUpdatedRecipe(null)
            }, [3000])
        }
    }, [location])

    const handleDelete = async (id) => {
        setAddedRecipe(null);
        const collectionRef = db.collection('recipes');
        const docToDelete = collectionRef.doc(id);
        await docToDelete.delete();
    }


    if (recipes.length === 0) {
        return <div className={`error ${mode}`}>No recipes to load...</div>
    }
    return (
        <>
            <div className='add-alert-container' style={{
                display: addedRecipe ? 'flex' : 'none'
            }}>
                <div className={addedRecipe ? 'add-alert show' : 'add-alert'}>
                    {`Recipe ${addedRecipe ? 'for ' + addedRecipe.title : ''} Added!`}
                </div>
            </div>

            <div className='update-alert-container' style={{
                display: updatedRecipe ? 'flex' : 'none'
            }}>
                <div className={updatedRecipe ? 'update-alert show' : 'update-alert'}>
                    {`Recipe Updated!`}
                </div>
            </div>

            <div className='recipe-list'>
                {recipes.map((recipe) => (

                    <div key={recipe.id} className={`card ${mode}`}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.cookingTime} to make.</p>
                        <div>{recipe.method.substring(0, 100)}...</div>
                        <Link style={{ backgroundColor: color, color: '#e2e2e2' }} to={`/recipes/${recipe.id}`}>Cook This</Link>
                        <img
                            className='delete'
                            src={TrashCan}
                            alt='delete recipe icon'
                            onClick={() => handleDelete(recipe.id)}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default RecipeList
