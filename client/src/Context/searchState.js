import React, { useState} from "react";
import searchContext from "./searchContext";

const SearchState = ({children})=>{
    const [values,setValues] = useState({
        keyword : "",
        result : []
    })

    return(
        <searchContext.Provider value = {{values,setValues}}>
            {children}
        </searchContext.Provider>
    )

}

export default SearchState