import { useState } from "react";



export default  function App(){
    const [data,setData] = useState({})
    return(
        <>
        <Data onSubmit={setData} data={data}></Data>
        <Resume data={data}></Resume>
        </>
    )
}

function Data({onSubmit,data}){
    console.log(data)
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
                <Input type={'text'} name={'full-name'} value={fullName} setInput={setFullName}>
                    Full Name
                </Input>
                <Input type={'text'} name={'email'} value={email} setInput={setEmail}>
                    email
                </Input>
                <Input type={'text'} name={'contact'} value={contact} setInput={setContact}>
                    contact
                </Input>
                <Input type={'text'} name={'address'} value={address} setInput={setAddress}>    
                    Address
                </Input>
                <button onClick={handleSubmit}>submit</button>
            </form>
            
        </div>
    )
}

function Education({onSubmit,data}){
    const [schoolName,setSchoolName] = useState('')
    const [course,setCourse] = useState('')
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        onSubmit({...data,schoolName,course,startDate,endDate})
    }

    return(
        <div className="education">
            <h1>Education</h1>
            <form action="#">
                <Input type={'text'} name={'school-name'} setInput={setSchoolName} value={schoolName}>
                    School Name
                </Input>
                <Input type={'text'} name={'course'} setInput={setCourse} value={course}>
                    Course Studied
                </Input>
                <Input type={'date'} name={'start-date'} setInput={setStartDate} value={startDate}>
                    Start Date
                </Input>
                <Input type={'date'} name={'end-date'} setInput={setEndDate} value={endDate}>
                    End Date
                </Input>
                <button onClick={handleSubmit}>submit</button>
            </form>

            
        </div>
    )


}

function WorkExperience({onSubmit}){

}

function Input({type,name,children,setInput,value}){
    const handleChange = (e)=>{
        setInput(e.target.value)
    }
    return(
        <>
        <label htmlFor={name}>{children}</label>
        <input type={type} name={name} value={value} id={name} onChange={handleChange}/>
        </>
    )
}

function Resume({data}){

}