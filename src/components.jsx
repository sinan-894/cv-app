import { useState } from "react";
import { getLastNumber } from "./functions";
import { data } from "./test-data";
import './resume-template.css'


export default  function App(){
    // const [data,setData] = useState({
    //     educationList:[],
    //     workList:[]
    // })

    // const [displayResume,setDisplayResume] = useState(false)
    const displayResume = true
    if(!displayResume)
    return(
        <Data onSubmit={setData} data={data} genrate={setDisplayResume}></Data>
    )
    else return(
        <Resume data={data}></Resume>
    )
}

function Data({onSubmit,data,genrate}){
    console.log(data)

    const [fullName,setFullName] = useState("")
    const [designation,setDesignation] = useState("")
    const [profileSummary,setProfileSummary] = useState('')
    const [email,setEmail] = useState("")
    const [contact,setContact] = useState("")
    const [address,setAddress] = useState("")
    const [workInputMode,setWorkInputMode] = useState(true)
    const [workDataId,setWorkDataId] = useState(0)
    const [educationInputMode,setEducationInputMode] =  useState(true)
    const [educationDataId,setEducationDataId] = useState(0)
    
    const handleGenrate = ()=>{
        onSubmit({
            ...data,
            fullName,
            designation,
            profileSummary,
            email,
            contact,
            address
        })
        genrate(true)

    }

    const handleAddForEducation = (id)=>{
        setEducationInputMode(true)
        setEducationDataId(id)

    }

    
    const handleAddForWork = (id)=>{
        setWorkInputMode(true)
        setWorkDataId(id)
    }

    const deletEducation = (educationToDelete)=>{
        onSubmit({
            ...data,
            educationList:data.educationList.filter(edu=>edu!=educationToDelete)
        })
    }

    const deleteWork = (workToDelete)=>{
        onSubmit({
            ...data,
            workList:data.workList.filter(work=>work!=workToDelete)
        })
    }

    return(
        <div className="main-input-div">
            <h1>Personal Information</h1>
            <div className="personal-information">
                <form action="#">
                    <Input type={'text'} name={'full-name'} value={fullName} setInput={setFullName}>
                        Full Name
                    </Input>
                    <Input type={'text'} name={'designation'} value={designation} setInput={setDesignation}>Designation</Input>
                    <label>Profile Summary</label>
                    <textarea name="" id="" cols="30" rows="10" value={profileSummary} onChange={(e)=>setProfileSummary(e.target.value)}></textarea>
                    <Input type={'text'} name={'email'} value={email} setInput={setEmail}>
                        email
                    </Input>
                    <Input type={'text'} name={'contact'} value={contact} setInput={setContact}>
                        contact
                    </Input>
                    <Input type={'text'} name={'address'} value={address} setInput={setAddress}>    
                        Address
                    </Input>
                </form>
            
            </div>
            <div className="education-container">
                <h1>Education</h1>
                {
                !educationInputMode?
                <>
                {data.educationList.map((e)=>{
                    return (
                        <div className="education-list">
                            <button className="eduction-button" key={e} onClick={()=>handleAddForEducation(e)}>
                                {e}
                            </button>
                            <button className="delete-work-education delete-education"
                            onClick={()=>deletEducation(e)}> 
                            delete
                            </button>
                        </div>
                    )
                })}
                <button onClick={()=>handleAddForEducation(0)}>add</button>
                </>
                : <Education onSubmit={onSubmit} data={data} toggleInputMode={setEducationInputMode} id={educationDataId} ></Education>

                }
                
            </div>
            <div className="work-container">
                <h1>Work Experience</h1>
                {
                !workInputMode?
                <>
                {data.workList.map((w)=>{
                    return (
                        <div className="work-list">
                            <button className="work-button" key={w} onClick={()=>handleAddForWork(w)}>
                                {w}
                            </button>
                            <button 
                            className="delete-work-education delete-work" 
                            onClick={()=>deleteWork(w)}>
                                delete
                            </button>
                        </div>

                    )
                })}
                <button onClick={()=>handleAddForWork(0)}>add</button>
                </>
                : <WorkExperience onSubmit={onSubmit} data={data} toggleInputMode={setWorkInputMode} id={workDataId} ></WorkExperience>

                }
            </div>
            <button className="genrate-button" onClick={handleGenrate}>Genrate CV</button>
        </div>
    )
}

function Education({onSubmit,data,toggleInputMode,id}){
    const [schoolName,setSchoolName] = useState(id?data[id].schoolName:'')
    const [course,setCourse] = useState(id?data[id].course:'')
    const [startDateEducation,setStartDate] = useState(id?data[id].startDateEducation:'')
    const [endDateEducation,setEndDate] = useState(id?data[id].endDateEducation:'')
    const [isOnGoing,setIsOnGoing] = useState((endDateEducation=='present')?true:false)

    const handleOnGoing = ()=>{
        setIsOnGoing(!isOnGoing)
        if(!isOnGoing){
            setEndDate('present')
        }
    }


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
                <label htmlFor="">Is On going</label>
                <input type="checkbox" checked={isOnGoing} onChange={handleOnGoing}/>
                {!isOnGoing && <Input type={'date'} name={'end-date-education'} setInput={setEndDate} value={endDateEducation}>
                    End Date
                </Input>}
                <button onClick={handleSubmit}>submit</button>
                {(data.educationList.length>0) && 
                <button onClick={()=>toggleInputMode(false)}>cancel</button>}
            </form>

            
        </div>
    )


}

function WorkExperience({onSubmit,data,toggleInputMode,id}){
    const [companyName,setCompanyName] = useState(id?data[id].companyName:'')
    const [role,setRole] = useState(id?data[id].role:'')
    const [startDateWork,setStartDate] = useState(id?data[id].startDateWork:'')
    const [endDateWork,setEndDate] = useState(id?data[id].endDateWork:'')
    const [isOnGoing,setIsOnGoing] = useState((endDateWork=='present')?true:false)
    const [jobDiscription,setJobDiscription] = useState(id?data[id].jobDiscription:'')

    const handleOnGoing = ()=>{
        setIsOnGoing(!isOnGoing)
        if(!isOnGoing){
            setEndDate('present')
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        let list = data.workList
        toggleInputMode(false)
        let dataId =id?id:`W-${getLastNumber(list)+1}`
        let workList = id?[...list]:[...list,dataId]
        onSubmit({
            ...data,
            workList,
            [dataId]:{
                companyName,
                role,
                startDateWork,
                endDateWork,
                jobDiscription
            }
        })
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
                <label htmlFor="">Is On going</label>
                <input type="checkbox" checked={isOnGoing} onChange={handleOnGoing}/>
                {!isOnGoing && <Input type={'date'} name={'end-date-work'} setInput={setEndDate} value={endDateWork}>
                    End Date
                </Input>}
                <label htmlFor="">Job Discription</label>
                <textarea name="" id="" cols="30" rows="10" value={jobDiscription} 
                onChange={(e)=>setJobDiscription(e.target.value)}>

                </textarea>
                <button onClick={handleSubmit}>submit</button>
                {(data.workList.length>0) && 
                <button onClick={()=>toggleInputMode(false)}>cancel</button>}
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
    return(
        <div className="resume-main">
            <section className="resume-header">
                <h1>{data.fullName}</h1>
                <h3>{data.designation}</h3>
            </section>
            <section className="personal-details">
                <div className="profile">
                    <h2>PROFILE</h2>
                    <p>{data.discription}</p>
                </div>
                <div className="contact-me">
                    <h2>CONTACT ME</h2>
                    <ul className="contact-details">
                        <li>
                            <img src="src/static/phone-svgrepo-com.svg" alt="" />
                            {data.contact}
                        </li>
                        <li>
                            <img src="src/static/envelope-mail-svgrepo-com.svg" alt="" />
                            {data.email}
                        </li>
                        <li>
                            <img src="src/static/location-svgrepo-com.svg" alt="" />
                            {data.address}
                        </li>
                    </ul>
                </div>

            </section>
            <section className="work-education">
                <div className="education">
                    <h2 className="section-header">EDUCATION</h2>
                    {data.educationList.map(e=>(
                        <div className="education-details">
                            <p className="school">{data[e].schoolName}</p>
                            <p className="date">
                                {data[e].startDateEducation}-{data[e].endDateEducation}
                            </p>
                            <p className="course">{data[e].course}</p>
                        </div>
                    ))}
                </div>
                <div className="skills">
                    <h2 className="section-header">SKILLS</h2>
                    <ul>
                        {data.skillList.map(s=>(
                            <li>{s}</li>
                        ))}
                    </ul>
                </div>
                <div className="work">
                    <h2 className="section-header">WORK EXPERIENCE</h2>
                    {data.workList.map(w=>(
                        <div className="work-details">
                            <p className="company-name">{data[w].companyName}</p>
                            <p className="date">
                                {data[w].startDateWork}-{data[w].endDateWork}
                            </p>
                            <p className="role">{data[w].role}</p>
                            <p className="work-discription">
                                {data[w].workDiscription}
                            </p>
                        </div>
                    ))}
                </div>

            </section>
        </div>
    )
}