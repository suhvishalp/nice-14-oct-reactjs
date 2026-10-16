import { createContext, useContext, useState, type ReactNode } from "react"
import { SideNav } from "../components/SideNav"


interface WishlistContextType {
    savedIds: number[]
    toggleWishlist: (id: number) => void
}

interface WishListProviderProps{
    children: ReactNode
}

const WishlistContext = createContext<WishlistContextType | [] | undefined>(undefined)

export function WishlistProvider({children}: WishListProviderProps){

   const [savedIds, setSavedIds] =  useState<number[]>([])

   function toggleWishlist(id: number){
        setSavedIds((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]))
   }

    return (
        <WishlistContext.Provider value={ {savedIds, toggleWishlist} }>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist(){

    const context = useContext(WishlistContext)

    if(!context){
        throw new Error('useWishlist must be used inside WishlistProvider')
    }
    
    return context;
}




