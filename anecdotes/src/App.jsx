import { useState, useEffect } from 'react'

const randomInt = (array) => 
    Math.floor(Math.random() * array.length)

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Anecdote = ({ anecdotes, selected, votes }) => {

    return (
    <>
        <div>
            {anecdotes[selected]}
        </div>
        <div>
            has {votes[selected]} votes
        </div>
    </>
        
    )
}

function App() {

    const anecdotes = ['If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.']

    const [selected, setSelected] = useState(0)

    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const largestIndex = (arr) => {
        return arr.reduce((maxIndex, currentElement, currentIndex, array) => 
            currentElement > array[maxIndex] ? currentIndex : maxIndex, 0);
    }

    const handleClick = () => {
        setSelected(randomInt(anecdotes))
    }

    const handleVote = () => {
        setVotes(prevVotes => {
            const newVotes = [...prevVotes]
            newVotes[selected] += 1
            return newVotes
        })
    }
    
    useEffect(() => {
        setSelected(randomInt(anecdotes))
    },[])

    return (
    <>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdotes={anecdotes} selected={selected} votes={votes} />
        <Button handleClick={handleClick} text={'next anecdote'} />
        <Button handleClick={handleVote} text='vote'/>

        <h1>Anecdote with most votes</h1>
        <Anecdote anecdotes={anecdotes} selected={largestIndex(votes)} votes={votes} />
    </>
    )
}

export default App
