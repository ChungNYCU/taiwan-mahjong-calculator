import React from 'react';
import SingleTileDisplay from './SingleTileDisplay'


const StatusParser = ({ dataObject }) => {
    if (dataObject.now === 0 && 'wait' in dataObject) {
        return (
            <div>
                <div>聽</div>
                <ul>
                    {Object.entries(dataObject.wait).map(([key, value], index) => {
                        return (
                            <div key={index} className='flex'>
                                <SingleTileDisplay tile={key} />
                                <div>---共{value.toString()}張</div> 
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    } else if (dataObject.now === -1) {
        return (
            <div>榮</div>
        )
    } else if (dataObject.now === -2) {
        return (
            <div>牌型不對</div>
        )
    } else {
        return (
            <div>
                <div>{dataObject.now}向聽</div>
                {Object.entries(dataObject).map(([key, value], index) => {
                    if (key !== 'now') {
                        const total = Object.entries(value).reduce((sum, [_, val]) => sum + val, 0);

                        return (<div key={index} className='flex'>
                            <div>打---</div>
                            <SingleTileDisplay tile={key} />
                            <div>---等---</div>
                            {Object.entries(value).map(([key, value], index) => (<SingleTileDisplay tile={key} />))}
                            <div className='ml-5'>{"共"}{total}{"張"}</div>
                        </div>)
                    }
                })}
            </div>
        )
    }

}

export default StatusParser;
