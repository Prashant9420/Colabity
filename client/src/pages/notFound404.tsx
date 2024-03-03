import { useEffect, useState } from "react"

const NotFound404 = () => {
    // const css1="border-accen"
    const[css,setCss]=useState("border-accent text-accent");

    useEffect(()=>{
        let num=0;
        setInterval(()=>{
            if(num%2===0){
                setCss("border-secondary text-secondary shadow-md shadow-secondary")
            }else{
                setCss("border-accent text-accent")
            }
            num++;
        },100)
    },[])

  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <div className={`flex border-8 rounded-2xl p-10 text-9xl ${css} justify-around`}>
            <div className="p-4 font-serif">4</div>  
            <div className="p-4 font-serif">0</div>  
            <div className="p-4 font-serif">4</div>  
        </div>
        <h1 className="mt-8 text-xl font-serif text-accent hover:text-secondary text- hover:shadow-secondary">Page Not Found</h1>
    </div>
  )
}

export default NotFound404