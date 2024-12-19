import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'

function PageTemplate() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
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
        };

        const localData = localStorage.getItem(`data-${id}`);
        if (localData) {
            setData(JSON.parse(localData));
        } else {
            fetchData();
        }
    }, [id]);

    const handleEdit = (index, key, value) => {
        const newData = [...data];
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
        <div>
            <h1> {id} </h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Remaining</th>
                        <th>Amount Got</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((fruit, index) => (
                        <tr key={index} className="tableRow">
                            <td>{fruit.name}</td>
                            <td>{999 - fruit.amountGot}</td>
                            <td>
                                <input
                                    type="number"
                                    value={fruit.amountGot}
                                    onChange={(e) => handleEdit(index, 'amountGot', e.target.value)}
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