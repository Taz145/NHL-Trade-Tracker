import React from 'react'
// import './trades.css'

const Trades = ({trades}) => {
    return (
            trades.map((trade) => (
                <tr class="text-center">
                    <td>{trade.team1}</td>
                    <td>{trade.team1_assets.replace(/;+$/, "").replace(/;/g, ", ")}</td>
                    <td>{trade.team2}</td>
                    <td>{trade.team2_assets.replace(/;+$/, "").replace(/;/g, ", ")}</td>
                    <td>{trade.trade_date}</td>
                </tr>
            ))
    )
};

export default Trades