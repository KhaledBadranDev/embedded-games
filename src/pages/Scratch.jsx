import GameCard from '../components/GameCard'
import useAxios from "../hooks/useAxios";


const Scratch = (prop) => {
    // fetched data from scratch api
    const data = useAxios("/projects/723650095");

    const games = []
    console.log("data useAxios:", data)
    return (
        GameCard(games)
    ) 
}

export default Scratch