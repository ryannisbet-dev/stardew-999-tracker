import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './page.less'

function PageTemplate() {
    let { id } = useParams(),
        [data, setData] = useState(null),
        [error, setError] = useState(null);

    useEffect(() => {
        let fetchData = async () => {
            try {
                const response = await fetch(`../public/json/${id}.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Received non-JSON response");
                }
                const jsonData = await response.json();
                localStorage.setItem(`data-${id}`, JSON.stringify(jsonData));
                setData(jsonData);
            } catch (error) {
                setError(error);
            }
        },
        localData = localStorage.getItem(`data-${id}`);

        if (localData) {
            setData(JSON.parse(localData));
        } else {
            fetchData();
        }
        
    }, [id]);

    let handleEdit = (index, key, value) => {
        let newData = [...data];

        if (value < 0 || value > 999) {
            alert("Number isn't valid");
            return;
        }
        
        newData[index][key] = value;
        setData(newData);
        localStorage.setItem(`data-${id}`, JSON.stringify(newData));
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page">
            <h1> {id.charAt(0).toUpperCase() + id.slice(1)} </h1>
            <table className="table_container">
                <thead className="table_head">
                    <tr className="table_row">
                        <th className="table_heading">Name</th>
                        <th className="table_heading">Season</th>
                        <th className="table_heading">Remaining</th>
                        <th className="table_heading">Amount Got</th>
                    </tr>
                </thead>
                <tbody className="table_body">
                    {data.map((item, index) => (
                        <tr key={index} className={999 - item.amountGot === 0 ? "completed body_row" : "body_row"}>
                            <td>{item.name}</td>
                            <td>{item.seasons ? item.seasons.join(', ') : 'N/A'}</td>
                            <td>{999 - item.amountGot === 0 ? 'Done! 🎉' : 999 - item.amountGot}</td>
                            <td>
                                <input
                                    className="amount_input"
                                    type="number"
                                    value={item.amountGot}
                                    onChange={(e) => handleEdit(index, 'amountGot', e.target.value)}
                                    min={0}
                                    max={999}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PageTemplate;