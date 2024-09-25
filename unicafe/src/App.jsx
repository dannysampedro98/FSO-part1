import { useEffect, useState } from 'react'

const isEmpty = (obj) => Object.values(obj).every(value => value === 0)

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}
  

const StatisticsLine = ({ value, text, isPercent }) => {
    value = Number.isInteger(value) ? value : value.toFixed(1)

    return (
        <tr>
            <td>{text}</td>
            <td>{value}{isPercent ? ' %' : null}</td>
        </tr>
    )
}

const Statistics = ({ feedback, total, average, percent }) => {
    return (
        <table>
            <tbody>
                <StatisticsLine text='good' value={feedback.good} isPercent={false} />
                <StatisticsLine text='neutral' value={feedback.neutral} isPercent={false} />
                <StatisticsLine text='bad' value={feedback.bad} isPercent={false} />
                <StatisticsLine text='all' value={total} isPercent={false} />
                <StatisticsLine text='average' value={average} isPercent={false} />
                <StatisticsLine text='positive' value={total > 0 ? percent : 0} isPercent={true} />
            </tbody>
        </table>
    )
}

const App = () => {
    const [feedback, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
    })
    const [average, setAverage] = useState(0)

    const total = feedback.good + feedback.neutral + feedback.bad
    const percent = feedback.good / total * 100

    useEffect(() => {
        if (total > 0) {
            setAverage((feedback.good - feedback.bad) / total)
        } else {
            setAverage(0)
        }
    }, [feedback])

    const handleClick = (fbackType) => () => {
        setFeedback({ ...feedback, [fbackType]: feedback[fbackType] + 1 })
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handleClick('good')} text='good' />
            <Button handleClick={handleClick('neutral')} text='neutral' />
            <Button handleClick={handleClick('bad')} text='bad' />

            <h1>statistics</h1>
            {isEmpty(feedback) ? <p>no feedback given</p>
                : <Statistics
                    feedback={feedback}
                    average={average}
                    total={total}
                    percent={percent} />}
        </div>
    )
}

export default App
