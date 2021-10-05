import { setCustomData } from 'atatus-spa';
import React, { useEffect, useState } from 'react';
import {
    PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    const genres = ['React', 'JavaScripst', 'Node', 'jQuery', 'AngularJS'];
    const COLORS = ['#FCECDD', '#FEDDBE', '#FFC288', '#FEA82F', '#FF6701'];

    const getData = () => {
        const data = genres.map((genre) => {
            const value = events.filter(({ summary }) =>
                summary.split(' ').includes(genre)
            ).length;
            return { name: genre, value };
        });
        return data;
    };

    useEffect(() => { setData(() => getData()); }, [events]);

    return (
        <ResponsiveContainer height={400} >
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