import React from "react";

import ScaleLoader from "react-spinners/ScaleLoader";


function Loader() {


    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
                   
                   <ScaleLoader size={20} color={"#1C39D0"} speedMultiplier={2}/>
                    
                </div>
            </div>
        </section>
    )
}

export default Loader