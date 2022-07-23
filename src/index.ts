import {useEffect, useRef, useState} from "react";

export const useDocumentVisibility = () => {

    const [visible, setVisible] = useState<boolean>(!document.hidden)
    const [count, setCount] = useState<number>(0)

    const subsribers = useRef<Array<(data: string)=>void>>([])

    const visiblePage = () => {
        if (document.hidden) {
            subsribers.current.forEach(func => func('hidden'))
            setCount(prevCount => prevCount + 1)
        } else {
            subsribers.current.forEach(func => func('visible'))
        }
        setVisible(document.visibilityState === "visible")
    }

    const onVisibilityChange = (callback: (data: string)=>void) => {
        subsribers.current.push(callback);
    }

    useEffect(() => {
        document.addEventListener('visibilitychange', visiblePage)
        return () => { document.removeEventListener('visibilitychange', visiblePage) }
    }, [])

    return {onVisibilityChange, visible, count}
}