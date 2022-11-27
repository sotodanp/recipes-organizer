import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/config'

import './Search.css'
import { useTheme } from '../../hooks/useTheme';
import RecipeList from '../../components/RecipeList'


const Search = () => {

    const { mode } = useTheme()

    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q')

    const [recipes, setRecipes] = useState(null);
    const [error, setError] = useState(false);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        setIsPending(true)
        setRecipes(false)
        const collectionRef = db.collection('recipes');
        collectionRef.get().then(docs => {
            let docArray = [];
            docs.forEach(doc => {
                if (doc.data().title.toLowerCase().includes(query.toLowerCase()) || (doc.data().ingredients.includes(query.toLowerCase()))) {
                    docArray.push({ id: doc.id, ...doc.data() })
                }

                if (docArray.length === 0) {
                    setError(true)
                } else {
                    setError(false)
                }

            })
            setIsPending(false)
            setRecipes(docArray)

        })

    }, [query])


    return (
        <div className={`search ${mode}`}>
            <h2 className="page-title">Recipes including "{query}"</h2>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {recipes && <RecipeList recipes={recipes} />}
        </div>
    )
}

export default Search
