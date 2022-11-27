//CSS
import '../create/Create.css';

//React Imports
import { useState, useRef, useEffect } from 'react';

//React Router Imports
import { useNavigate, useLocation, useParams } from 'react-router-dom';

//Custom HOOK
import { useTheme } from '../../hooks/useTheme';

//Firestore
import { db } from '../../firebase/config';

const Edit = () => {
    const [title, setTitle] = useState("");
    const [method, setMethod] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [newIngredient, setNewIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [ingredientAddError, setIngredientAddError] = useState(false);
    const [noIngredientError, setNoIngredientError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isPending, setIsPending] = useState(false)

    const ingredientInput = useRef();
    const form = useRef();

    const navigate = useNavigate()

    const { mode, color } = useTheme();


    //Query Parameters

    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const action = queryParams.get('action');

    //Route parameteres
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        setNoIngredientError(ingredients.length === 0);
    }, [ingredients])

    useEffect(() => {
        if (!action) {
            setIsPending(true)
            setNoIngredientError(false);
            const docRef = db.collection('recipes').doc(id);
            docRef.get().then(document => {
                setIsPending(false)
                const data = document.data();
                setTitle(data.title);
                setMethod(data.method);
                setCookingTime(Number(data.cookingTime.split(" ")[0]));
                setIngredients(data.ingredients)
            })

        } else {
            setTitle("");
            setMethod("");
            setCookingTime("");
            setIngredients([])
        }
    }, [action, id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        const RecipeToAddOrUpdate = {
            title,
            ingredients,
            method,
            cookingTime: cookingTime + ' minutes'
        }

        if (!noIngredientError) {
            try {
                await db.collection('recipes').doc(id).update(RecipeToAddOrUpdate);
                setIsSubmitted(false);
                navigate('/')
            } catch (error) {
                console.log(error);
            }
        }
    }



    const handleAdd = (e) => {
        e.preventDefault();
        setIsSubmitted(false);
        if (newIngredient && ingredients.includes(newIngredient)) {
            setIngredientAddError(true);
            setTimeout(() => {
                setIngredientAddError(false);
            }, 2000);

        }
        if (newIngredient && !ingredients.includes(newIngredient)) {
            setIngredients(prev => {
                return [...prev, newIngredient.trim()]
            })
        }
        setNewIngredient('');

        //So that when one ingredient is added, the user can start typing right after that because input field if focused after adding
        ingredientInput.current.focus();
    }
    const removeIngredient = (index) => {
        setIngredients(prevIng => {
            return prevIng.filter(ing => ing !== prevIng[index])
        });
    }

    return (
        <div className={`create ${mode}`}>
            <h2 className='page-title'>Update your Recipe!</h2>
            <form onSubmit={handleSubmit} ref={form}>
                <label>
                    <span>New Title:</span>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required

                    />
                </label>

                <label>
                    <span>New Ingredients:</span>
                    <div className='ingredients'>
                        <input
                            type="text"
                            onChange={(e) => {
                                setNewIngredient(e.target.value);
                                setIngredientAddError(false);
                            }}
                            value={newIngredient}
                            ref={ingredientInput}
                        />
                        <button className='btn' onClick={handleAdd} style={{ backgroundColor: color }}>Add</button>
                    </div>
                    {ingredientAddError && <p className='ingredient-error'>Ingredient already added! </p>}

                    {noIngredientError && <p className='ingredient-error'>There should be at least one ingredient</p>}
                </label>
                <p>Current Ingredients: {ingredients.map((ing, i) => {
                    console.log({ ing, i })
                    return <em
                        key={ing}
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={() => removeIngredient(i)}>{ing}, </em>

                })}</p>
                <p style={{ fontSize: '0.8rem' }}>Click on an ingredient to delete it</p>

                <label>
                    <span>New Method:</span>
                    <textarea
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>

                <label>
                    <span>New Cooking Time(minutes)</span>
                    <input
                        type="number"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required

                    />
                </label>
                {isSubmitted && !noIngredientError && <div>
                    {isPending && <p className='loading'>Loading...</p>}
                </div>}
                {(!isSubmitted || noIngredientError) && <button className='button'
                    style={{ backgroundColor: color }}>
                    Update Recipe
                </button>}
            </form>
        </div>
    )
}

export default Edit
