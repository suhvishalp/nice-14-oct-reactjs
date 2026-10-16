import { Children, type ReactNode } from "react"

interface CardPropType {
   title: string  
   children?: ReactNode
   action?: ReactNode
}

export default function Card({title, children, action}: CardPropType){
    return (
        <div style={ {border:'1px solid red', margin:'10px', padding:'10px'} }>

                <h4>This is a {title} </h4>

                {children}
                {action}

        </div>

    )
}