import {useEffect, useRef, useState} from "react";

export const useDocumentVisibility = () => {

    const [visible, setVisible] = useState(!document.hidden)
    const [count, setCount] = useState(0)

    const visiblePage = () => {
        console.log(subsribers)
        if (document.hidden) {
            func('isVisible', 'hidden')
            setVisible(false)
            setCount(prevCount => prevCount + 1)
        } else {
            func('isVisible', 'visible')
            setVisible(true)
        }
    }

    useEffect(() => {
        document.addEventListener('visibilitychange', visiblePage)
        return () => document.removeEventListener('visibilitychange', visiblePage)
    }, [])

    const subsribers = useRef<{isVisible: Array<(data: string)=>void>}>({
        'isVisible': []
    })

    const onVisibilityChange = (callback: (data: string)=>void) => {
        subsribers.current.isVisible.push(callback);
    }

    const func = (name: 'isVisible', data: string) => {
        if (subsribers.current[name]) {
            for (let callback of subsribers.current[name]) {
                callback(data);
            }
        }
    }

    return {onVisibilityChange, visible, count}
}