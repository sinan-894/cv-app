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
        <Data onSubmit={setData} data={data}></Data>
        <Resume data={data}></Resume>
        </>
    )
}

function Data({onSubmit,data}){
    return(
        <div className="main-input-div">
            <PersonalInformation onSubmit={onSubmit} data={data}></PersonalInformation>
            <Education onSubmit={onSubmit} data={data}></Education>
            <WorkExperience onSubmit={onSubmit} data={data}></WorkExperience>
        </div>
    )
}


function PersonalInformation({onSubmit,data}){
    const [fullName,setFullName] = useState("")
    const [email,setEmail] = useState("")
    const [contact,setContact] = useState("")
    const [address,setAddress] = useState("")
    const handleSubmit = (e)=>{
        e.preventDefault()
        onSubmit({...data,fullName,email,contact,address})

    }

    return(
        <div className="personal-information">
            <h1>Personal Information</h1>
            <form action="#">
                <InputText name={'full-name'} value={fullName} setInput={setFullName}>
                    Full Name
                </InputText>
                <InputText name={'email'} value={email} setInput={setEmail}>
                    email
                </InputText>
                <InputText name={'contact'} value={contact} setInput={setContact}>
                    contact
                </InputText>
                <InputText name={'address'} value={address} setInput={setAddress}>    
                    Address
                </InputText>
            </form>
            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}

function Education({onSubmit}){

}

function WorkExperience({onSubmit}){

}

function InputText({name,children,setInput,value}){
    const handleChange = (e)=>{
        setInput(e.target.value)
    }
    return(
        <>
        <label htmlFor={name}>{children}</label>
        <input type="text" name={name} value={value} id={name} onChange={handleChange}/>
        </>
    )
}

function Resume({data}){

}