import  type { PropsWithChildren } from "react";
import Header from "./Header";


const Layout =({children}:PropsWithChildren)=>{
    return <div className=" bg-gradient-to-br from-background to-muted">
        <Header/>
        <main className="min-h-screen container mx-auto px-4 ">
          {children}  
        </main>
       < footer className=" backdrop-blur py-12 border-t supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 text-center text-gray-500">
                <p>Copyright by @SambitBinakar</p>
            </div>
       </footer>
        </div>
} 
  
export default Layout