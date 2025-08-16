import { useState } from "react";
import { getLastNumber } from "./functions";


export default  function App(){
    const [data,setData] = useState({
        educationList:['E-1'],
        workList:['W-1']
    })
    return(
        <>
        <Data onSubmit={setData} data={data}></Data>
        <Resume data={data}></Resume>
        </>
    )
}

function Data({onSubmit,data}){
    console.log(data)
    const handleAddForEducationOrWork = (x)=>{
        if(x){
            let list = data.educationList
            onSubmit({...data,educationList:[...list,`E-${getLastNumber(list)+1}`]})
        }
        else{
            let list = data.workList
            onSubmit({...data,workList:[...list,`W-${getLastNumber(list)+1}`]})
        }
    }
    return(
        <div className="main-input-div">
            <h1>Personal Information</h1>
            <PersonalInformation onSubmit={onSubmit} data={data}></PersonalInformation>
            <div className="education-container">
                <h1>Education</h1>
                {data.educationList.map((e)=>{
                    return (
                        <Education onSubmit={onSubmit} data={data} key={e}></Education>
                    )
                })}
                <button onClick={()=>handleAddForEducationOrWork(true)}>add</button>
            </div>
            <div className="work-container">
                <h1>Work Experience</h1>
                {data.workList.map((e)=>{
                    return (
                        <WorkExperience onSubmit={onSubmit} data={data} key={e}></WorkExperience>
                    )
                })}
                <button onClick={()=>handleAddForEducationOrWork(false)}>add</button>
            </div>
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
    const [startDateEducation,setStartDate] = useState('')
    const [endDateEducation,setEndDate] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        onSubmit({...data,schoolName,course,startDateEducation,endDateEducation})
    }

    return(
        <div className="education">
            <form action="#">
                <Input type={'text'} name={'school-name'} setInput={setSchoolName} value={schoolName}>
                    School Name
                </Input>
                <Input type={'text'} name={'course'} setInput={setCourse} value={course}>
                    Course Studied
                </Input>
                <Input type={'date'} name={'start-date-education'} setInput={setStartDate} value={startDateEducation}>
                    Start Date
                </Input>
                <Input type={'date'} name={'end-date-education'} setInput={setEndDate} value={endDateEducation}>
                    End Date
                </Input>
                <button onClick={handleSubmit}>submit</button>
            </form>

            
        </div>
    )


}

function WorkExperience({onSubmit,data}){
    const [companyName,setCompanyName] = useState('')
    const [role,setRole] = useState('')
    const [startDateWork,setStartDate] = useState('')
    const [endDateWork,setEndDate] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        onSubmit({...data,companyName,role,startDateWork,endDateWork})
    }

    return(
        <div className="education">
            <form action="#">
                <Input type={'text'} name={'company-name'} setInput={setCompanyName} value={companyName}>
                    Company Name
                </Input>
                <Input type={'text'} name={'role'} setInput={setRole} value={role}>
                    Role
                </Input>
                <Input type={'date'} name={'start-date-work'} setInput={setStartDate} value={startDateWork}>
                    Start Date
                </Input>
                <Input type={'date'} name={'end-date-work'} setInput={setEndDate} value={endDateWork}>
                    End Date
                </Input>
                <button onClick={handleSubmit}>submit</button>
            </form>



            
        </div>
    )
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