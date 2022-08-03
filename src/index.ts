import {useEffect, useRef, useState} from "react";

export const useDocumentVisibility = () => {

    const [visible, setVisible] = useState(typeof document !== 'undefined' && !document.hidden)
    const [count, setCount] = useState(0)

    const subsribers = useRef<Array<(data: boolean)=>void>>([])

    const visiblePage = () => {
        if (document.hidden) {
            setCount(prevCount => prevCount + 1)
        }
        subsribers.current.forEach(func => func(!document.hidden))
        setVisible(document.visibilityState === "visible")
    }

    const onVisibilityChange = (callback: (data: boolean)=>void) => {
        subsribers.current.push(callback);
    }

    useEffect(() => {
        document.addEventListener('visibilitychange', visiblePage)
        return () => { document.removeEventListener('visibilitychange', visiblePage) }
    }, [])

    return {onVisibilityChange, visible, count}
}