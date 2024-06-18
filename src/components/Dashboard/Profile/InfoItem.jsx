import { Link } from "react-router-dom";

const InfoItem = ({ data }) => {

    return (
        <div className="border-b border-[#b8b8b8] pb-4 pt-2 flex justify-between">
            <div className="flex items-center gap-2 font-semibold">{data.name}</div>
            <div>
                {
                    data?.value ?
                        data.name === "Email" || data.name === "Mobile" ?

                            <Link to={`${data.name === "Email" ? "mailto" : "tel"}:${data.value}`} className="link text-blue-600">{data.value}</Link> :
                            <p className="text-[#616060]">{data.value}</p>
                        : <p className="text-[#616060]">N/A</p>
                }
            </div>
        </div>
    )
};

export default InfoItem