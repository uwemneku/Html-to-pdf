import React from 'react'
import PropTypes from 'prop-types';
import './print.css'
import faker from 'faker'

export default function TemplateCard() {
    return (

        <div className="w-screen h-screen flex  justify-center items-start" >
            <div className="max-w-3xl p-6 print-container  flex-shrink-0 flex-grow bg-gray-500" >
                
                {/* <div className="page-break" /> */}
                <Header text="Help" />
                <TextContent text={faker.lorem.paragraph(10)} />

                <div className="flex" >
                    <div className="flex-1" >
                        <Header text="CORE COMPETENCIES" />
                        <List  allList={[1,2,3,4,5,6,78,9,9]} />
                    </div>
                    <div className="w-5" />
                    <div className="flex-1" >
                        <Header text="CORE COMPETENCIES" />
                    </div>
                </div>
                <div className="flex" >
                    <div className="flex-1" >
                        <Header text="CORE COMPETENCIES" />
                        <List  allList={[1,2,3,4,5,6,78,9,9]} />
                    </div>
                    <div className="w-5" />
                    <div className="flex-1" >
                        <Header text="CORE COMPETENCIES" />
                    </div>
                </div>
                <div className="flex" >
                    <div className="flex-1" >
                        <Header text="CORE COMPETENCIES" />
                        <List  allList={[1,2,3,4,5,6,78,9,9]} />
                    </div>
                    <div className="w-5" />
                    <div className="flex-1" >
                        <Header text="CORE COMPETENCIES" />
                    </div>
                </div>
            </div>
        </div>
    )
}


const Header = ({text}) => {
    return(
        <div className="w-full border-b-2 border-red-700 flex justify-start" >
            <div className="text-white bg-red-600 p-2 px-3 font-bold text-lg" >
                {text}
            </div>
        </div>
    )
}

const TextContent = ({text}) => {
    return(
        <div className="w-full text-white py-3 print-text" >
            {text}
        </div>
    )
}


const List = ({allList}) => {
    return(
        <div>
            <ul className="" >
                {allList.map((item, index) =>(
                    <li key={item}> {item} </li>
                ) )}
            </ul>
        </div>
    )
}

List.propTypes = {
    allList: PropTypes.array.isRequired
};