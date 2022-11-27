import { db } from '../../firebase/config'
import { useEffect, useState } from 'react'

import './Home.css'
import RecipeList from '../../components/RecipeList'
import { useTheme } from '../../hooks/useTheme'




const Home = () => {




    const [recipes, setRecipes] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);

    const { mode } = useTheme();
    const [deletedRecipe, setDeletedRecipe] = useState(false);

    useEffect(() => {
        setIsPending(true);

        const recipesCollection = db.collection('recipes');
        const unsub = recipesCollection.onSnapshot(snapshot => {
            if (snapshot.empty) {
                setError('No Recipes to Load. Please Add Some first!');
                setRecipes(null);
                setIsPending(false);
            } else {
                if (snapshot.docChanges()[0]._delegate.type === 'removed') {
                    setDeletedRecipe(true);
                    setTimeout(() => {
                        setDeletedRecipe(false)
                    }, 3000)
                } else {
                    setDeletedRecipe(false);
                }
                let results = [];
                snapshot.docs.forEach(doc => {
                    results.push({ id: doc.id, ...doc.data() })
                })
                setRecipes(results);
                setError(false);
                setIsPending(false);
            }
        }, error => {
            setError(error.message);
            setIsPending(false);
        })

        return () => {
            console.log("Cleanup time");
            unsub();
        }

    }, []);

    return (
        <div className={`home ${mode}`}>
            {error && <p className={`error ${mode}`}>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {recipes && <RecipeList recipes={recipes} isDeleted={deletedRecipe} />}
        </div>
    )
}

export default Home
