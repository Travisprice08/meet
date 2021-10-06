import { setCustomData } from 'atatus-spa';
import React, { useEffect, useState } from 'react';
import {
    PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const EventGenre = ({ events }) => {

    const [data, setData] = useState([]);
    // const setData = useState([]);
    const genres = ['React', 'JavaScripst', 'Node', 'jQuery', 'AngularJS'];
    const COLORS = ['#FCECDD', '#FEDDBE', '#FFC288', '#FEA82F', '#FF6701'];

    //Example data to get pie chart to appear
    // const data = [
    //     { name: 'GROUP A', value: 400 },
    //     { name: 'GROUP B', value: 300 },
    //     { name: 'GROUP C', value: 200 },
    //     { name: 'GROUP D', value: 100 }
    // ]

    const getData = () => {
        const data = genres.map((genre) => {
            const value = events.filter((event) =>
                event.summary.split(' ').includes(genre)
            ).length;
            return { name: genre, value };
        });
        return data;
    };

    useEffect(() => { setData(() => getData()); }, [events]);

    return (
        <ResponsiveContainer height={400} width={400} >
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

export default EventGenre;