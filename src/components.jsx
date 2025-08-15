import { useState } from "react";



export default  function App(){
    const [data,setData] = useState({
        fullName:'',
        email:'',
        contact:'',
        address:'',
    })
    return(
        <>
        <Input onSubmit={setData}></Input>
        <Resume data={data}></Resume>
        </>
    )
}

function Input({onSubmit}){
    return(
        <div className="main-input-div">
            <PersonalInformation onSubmit={onSubmit}></PersonalInformation>
            <Education onSubmit={onSubmit}></Education>
            <WorkExperience onSubmit={onSubmit}></WorkExperience>
        </div>
    )
}


function PersonalInformation({onSubmit}){
}

function Education({onSubmit}){

}

function WorkExperience({onSubmit}){

}

function Resume({data}){

}