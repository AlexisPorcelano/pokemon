// import { useEffect } from 'react'
// import {useDispatch, useSelector} from 'react-redux'

// export default function OrderFilter(){
//     const types = useSelector((state)=> state.types)
//     const pokemon = useSelector((state) => state.pokemon)
//     const dispatch = useDispatch()

//     const [order, setOrder] = useState('')

//     useEffect(()=> {
//         // if(order === 'asc') dispatch()
//     }, [order])

//     return (
//         <div>
//             <select name="Order" id="">
//                 <option value="">---</option>
//                 <option value="asc">Ascendant</option>
//                 <option value="des">Descendant</option>
//             </select>
//             <select name="Filter" id="">
//                 <option value="">---</option>
//                 <option value=""></option>
//             </select>
//         </div>
//     )
// }