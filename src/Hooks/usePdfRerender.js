import {useContext} from 'react'
import { DataContext } from '../App'

export default function usePdfRerender() {
    const [data, setState] = useContext(DataContext)

    const triggerPdfRerender = () => {
        setState(prev => {
            const trigger = prev.triggerUpdate

            return ({...prev, triggerUpdate:!trigger})
        })
    }
    return triggerPdfRerender
}
