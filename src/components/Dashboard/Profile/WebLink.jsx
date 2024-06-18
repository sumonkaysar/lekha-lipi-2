import { Link } from "react-router-dom";

const WebLink = ({ children, data }) => {

    return (
        <div className="border-b border-[#b8b8b8] pb-4 pt-2 flex justify-between">
            <div className="flex items-center gap-2 font-semibold">
                {children}
                <span>{data.name}</span>
            </div>
            <div>
                <p className="text-[#616060]">
                    {
                        data.value ?
                            <Link className="link text-blue-600" target="_blank" to={data.url}>{data.value}</Link> :
                            "N/A"
                    }
                </p>
            </div>
        </div>
    )
};

export default WebLink