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
                        <th className="table_heading">Remaining</th>
                        <th className="table_heading">Amount Got</th>
                    </tr>
                </thead>
                <tbody className="table_body">
                    {data.map((item, index) => (
                        <tr key={index} className="body_row">
                            <td>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
                            <td>{999 - item.amountGot}</td>
                            <td>
                                <input
                                    className="amount_input"
                                    type="number"
                                    value={item.amountGot}
                                    onChange={(e) => handleEdit(index, 'amountGot', e.target.value)}
                                    min={0}
                                    max={999}
                                    step={1}
                                    onKeyDown={(e) => e.preventDefault()}
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