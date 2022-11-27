import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, timestamp } from '../../firebase/config'
import { useTheme } from '../../hooks/useTheme'
import { useAuthContext } from '../../hooks/useAuthContext'

import './Create.css'


const Create = () => {
    const [title, setTitle] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [method, setMethod] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])

    const { user } = useAuthContext()

    const ingredientInput = useRef(null)

    const { mode, color } = useTheme()


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const createdAt = timestamp.fromDate(new Date())
        const doc = {
            uid: user.uid, title, ingredients, method, cookingTime: cookingTime + ' minutes'
        }

        try {
            await db.collection('recipes').add({ ...doc, createdAt })
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()

        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngredients => [...prevIngredients, ing])
        }
        setNewIngredient('')
        ingredientInput.current.focus()
    }

    const removeIngredient = (index) => {
        setIngredients(prevIng => {
            return prevIng.filter(ing => ing !== prevIng[index])
        });
    }



    return (
        <div className={`create ${mode}`}>
            <h2 className="page-title">Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe Title:</span>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label>
                    <span>Recipe ingredients:</span>
                    <div className="ingredients">
                        <input
                            type="text"
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientInput}
                        />
                        <button className="btn" style={{ backgroundColor: color }} onClick={handleAdd}>add</button>
                    </div>
                </label>


                <p>Current Ingredients: {ingredients.map((ing, i) => {
                    return <em
                        className='new'
                        style={{
                            cursor: 'pointer'
                        }}
                        key={ing}
                        onClick={() => removeIngredient(i)}> {ing}</em>
                })}</p>
                <p style={{ fontSize: '0.8rem' }}>Click on an ingredient to delete it</p>

                <label>
                    <span>Recipe method:</span>
                    <textarea
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>
                <label>
                    <span>Cooking time (minutes):</span>
                    <input type="number"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>
                <button className='button' style={{ backgroundColor: color }}>submit</button>
            </form>
        </div>
    )
}




export default Create





// const Create = () => {
//     const [title, setTitle] = useState('')
//     const [cookingTime, setCookingTime] = useState('')
//     const [method, setMethod] = useState('')
//     const [newIngredient, setNewIngredient] = useState('')
//     const [ingredients, setIngredients] = useState([])

//     const { addDocument, response } = useFirestore('recipes')

//     const ingredientInput = useRef(null)

//     const { mode, color } = useTheme()


//     const navigate = useNavigate()

//     const { user } = useAuthContext()

//     const handleAdd = (e) => {
//         e.preventDefault()
//         const ing = newIngredient.trim()

//         if (ing && !ingredients.includes(ing)) {
//             setIngredients(prevIngredients => [...prevIngredients, ing])
//         }
//         setNewIngredient('')
//         ingredientInput.current.focus()
//     }

//     const removeIngredient = (index) => {
//         setIngredients(prevIng => {
//             return prevIng.filter(ing => ing !== prevIng[index])
//         });
//     }


//     const handleSubmit = (e) => {
//         e.preventDefault()
//         addDocument({
//             uid: user.uid,
//             title,
//             ingredients,
//             method,
//             cookingTime
//         })
//     }

//     // reset form fields
//     useEffect(() => {
//         if (response.success) {
//             setTitle('')
//             setIngredients('')
//             setNewIngredient('')
//             setMethod('')
//             setCookingTime('')
//         }
//     }, [response.success])






//     return (
//         <div className={`create ${mode}`}>
//             <h2 className="page-title">Add a New Recipe</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     <span>Recipe Title:</span>
//                     <input
//                         type="text"
//                         onChange={(e) => setTitle(e.target.value)}
//                         value={title}
//                         required
//                     />
//                 </label>

//                 <label>
//                     <span>Recipe ingredients:</span>
//                     <div className="ingredients">
//                         <input
//                             type="text"
//                             onChange={(e) => setNewIngredient(e.target.value)}
//                             value={newIngredient}
//                             ref={ingredientInput}
//                         />
//                         <button className="btn" style={{ backgroundColor: color }} onClick={handleAdd}>add</button>
//                     </div>
//                 </label>


//                 <p>Current Ingredients: {ingredients.map((ing, i) => {
//                     return <em
//                         className='new'
//                         style={{
//                             cursor: 'pointer'
//                         }}
//                         key={ing}
//                         onClick={() => removeIngredient(i)}> {ing}</em>
//                 })}</p>
//                 <p style={{ fontSize: '0.8rem' }}>Click on an ingredient to delete it</p>

//                 <label>
//                     <span>Recipe method:</span>
//                     <textarea
//                         onChange={(e) => setMethod(e.target.value)}
//                         value={method}
//                         required
//                     />
//                 </label>
//                 <label>
//                     <span>Cooking time (minutes):</span>
//                     <input type="number"
//                         onChange={(e) => setCookingTime(e.target.value)}
//                         value={cookingTime}
//                         required
//                     />
//                 </label>
//                 <button className='button' style={{ backgroundColor: color }}>submit</button>
//             </form>
//         </div>
//     )
// }




// export default Create
