import { useState } from "react";
import { getLastNumber } from "./functions";


export default  function App(){
    const [data,setData] = useState({
        educationList:[],
        workList:[]
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
    const [educationInputMode,setEducationInputMode] =  useState(false)
    const [educationDataId,setEducationDataId] = useState(0)
    const handleAddForEducation = (id)=>{
        setEducationInputMode(true)
        setEducationDataId(id)

    }

    const handleAddForWork = (x)=>{
        let list = data.workList
    }

    return(
        <div className="main-input-div">
            <h1>Personal Information</h1>
            <PersonalInformation onSubmit={onSubmit} data={data}></PersonalInformation>
            <div className="education-container">
                <h1>Education</h1>
                {
                !educationInputMode?
                <>
                {data.educationList.map((e)=>{
                    return (
                        <button className="eduction-button" key={e} onClick={()=>handleAddForEducation(e)}>
                            {e}
                        </button>
                    )
                })}
                <button onClick={()=>handleAddForEducation(0)}>add</button>
                </>
                : <Education onSubmit={onSubmit} data={data} toggleInputMode={setEducationInputMode} id={educationDataId} ></Education>

                }
                
            </div>
            <div className="work-container">
                <h1>Work Experience</h1>
                {data.workList.map((e)=>{
                    return (
                        <WorkExperience onSubmit={onSubmit} data={data} key={e}></WorkExperience>
                    )
                })}
                <button onClick={handleAddForWork}>add</button>
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

function Education({onSubmit,data,toggleInputMode,id}){
    const [schoolName,setSchoolName] = useState(id?data[id].schoolName:'')
    const [course,setCourse] = useState(id?data[id].course:'')
    const [startDateEducation,setStartDate] = useState(id?data[id].startDateEducation:'')
    const [endDateEducation,setEndDate] = useState(id?data[id].endDateEducation:'')

    const handleSubmit = (e)=>{
        e.preventDefault()
        let list = data.educationList
        toggleInputMode(false)
        let dataId =id?id:`E-${getLastNumber(list)+1}`
        let educationList = id?[...list]:[...list,dataId]
        onSubmit({
            ...data,
            educationList,
            [dataId]:{
                schoolName,
                course,
                startDateEducation,
                endDateEducation
            }
        })
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